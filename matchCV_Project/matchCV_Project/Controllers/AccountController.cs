using matchCV_Project.Data;
using matchCV_Project.Models;
using matchCV_Project.Models.Dtos;
using matchCV_Project.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Security.Claims;

namespace matchCV_Project.Controllers
{
    [ApiController]
    [Route("api/account")]
    public class AccountController : ControllerBase
    {
        private readonly MatchCvContext _context;
        private readonly EmailService _email;

        public AccountController(MatchCvContext context, EmailService email)
        {
            _context = context;
            _email = email;
        }

        // -----------------------------
        // REGISTER
        // -----------------------------
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequestDto req)
        {
            if (string.IsNullOrWhiteSpace(req.Email) || string.IsNullOrWhiteSpace(req.Password))
                return BadRequest(new { message = "Email and password are required." });

            if (_context.Users.Any(u => u.Email == req.Email))
                return BadRequest(new { message = "Email already registered" });

            var user = new User
            {
                DisplayName = req.DisplayName,
                Email = req.Email,
                Password = req.Password,
                Role = req.Role,
                Verified = false
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            await SendVerificationEmail(user);

            return Ok(new { message = "Registration complete. Check your email for verification." });
        }

        // -----------------------------
        // EMAIL VERIFICATION
        // -----------------------------
        [HttpGet("verify-email")]
        public IActionResult VerifyEmail(int userId, string token)
        {
            var rec = _context.EmailVerificationTokens
                        .Include(t => t.User)
                        .FirstOrDefault(t => t.UserId == userId && t.Token == token);

            if (rec == null || rec.ExpiresAt < DateTime.UtcNow)
                return BadRequest(new { message = "Invalid or expired token." });

            rec.User.Verified = true;
            _context.EmailVerificationTokens.Remove(rec);
            _context.SaveChanges();

            return Ok(new { message = "Email verified successfully." });
        }

        private async Task SendVerificationEmail(User user)
        {
            var oldTokens = _context.EmailVerificationTokens.Where(t => t.UserId == user.Id);
            _context.EmailVerificationTokens.RemoveRange(oldTokens);

            var token = Guid.NewGuid().ToString("N");

            var ev = new EmailVerificationToken
            {
                UserId = user.Id,
                Token = token,
                ExpiresAt = DateTime.UtcNow.AddHours(24)
            };

            _context.EmailVerificationTokens.Add(ev);
            await _context.SaveChangesAsync();

            var verifyUrl = $"{Request.Scheme}://{Request.Host}/api/account/verify-email?userId={user.Id}&token={token}";
            var html = $"<p>Hello {user.DisplayName},</p><p>Verify your account: <a href=\"{verifyUrl}\">Verify Email</a></p>";

            await _email.SendEmailAsync(user.Email, "Verify your account", html);
        }

        // -----------------------------
        // LOGIN
        // -----------------------------
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequestDto req)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == req.Email);

            if (user == null || user.Password != req.Password)
                return BadRequest(new { message = "Invalid email or password" });

            if (!user.Verified)
                return BadRequest(new { message = "Please verify your email first." });

            await SignInUser(user);

            return Ok(new
            {
                message = "Login successful",
                user = new
                {
                    user.Id,
                    user.Email,
                    user.DisplayName,
                    user.Role
                }
            });
        }

        private async Task SignInUser(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.DisplayName ?? user.Email),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            var principal = new ClaimsPrincipal(identity);

            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                principal,
                new AuthenticationProperties
                {
                    IsPersistent = true,
                    ExpiresUtc = DateTime.UtcNow.AddHours(12)
                }
            );
        }

        // -----------------------------
        // GOOGLE LOGIN
        // -----------------------------
        [HttpGet("google")]
        public IActionResult GoogleLogin()
        {
            var redirectUrl = Url.Action("GoogleCallback");
            var properties = new AuthenticationProperties { RedirectUri = redirectUrl };
            return Challenge(properties, GoogleDefaults.AuthenticationScheme);
        }

        [HttpGet("google-callback")]
        public async Task<IActionResult> GoogleCallback()
        {
            var result = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            if (result?.Principal == null)
                return BadRequest(new { message = "Google authentication failed" });

            var email = result.Principal.FindFirst(ClaimTypes.Email)?.Value;
            var name = result.Principal.FindFirst(ClaimTypes.Name)?.Value;

            if (email == null)
                return BadRequest(new { message = "No email received from Google" });

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            // if user already exists → login
            if (user != null)
            {
                await SignInUser(user);
                return Redirect("http://localhost:3000/google-success");
            }

            var encodedEmail = WebUtility.UrlEncode(email);
            var encodedName = WebUtility.UrlEncode(name);

            // requires frontend to choose role
            return Redirect($"http://localhost:3000/choose-role?email={encodedEmail}&name={encodedName}");
        }

        [HttpPost("google-complete")]
        public async Task<IActionResult> CompleteGoogleSignup(GoogleSignupRequestDto req)
        {
            var user = new User
            {
                DisplayName = req.Name,
                Email = req.Email,
                Password = Guid.NewGuid().ToString("N"),
                Role = req.Role,
                Verified = true
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            await SignInUser(user);

            return Ok(new
            {
                message = "Google signup complete",
                user = new
                {
                    user.Id,
                    user.Email,
                    user.DisplayName,
                    user.Role
                }
            });
        }

        [HttpGet("me")]
        public IActionResult Me()
        {
            var userPrincipal = HttpContext.User;

            if (userPrincipal?.Identity?.IsAuthenticated != true)
                return Unauthorized(new { message = "Not logged in" });

            var id = userPrincipal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var email = userPrincipal.FindFirst(ClaimTypes.Email)?.Value;
            var displayName = userPrincipal.FindFirst(ClaimTypes.Name)?.Value;
            var role = userPrincipal.FindFirst(ClaimTypes.Role)?.Value;

            if (id == null)
                return Unauthorized(new { message = "Invalid session" });

            return Ok(new
            {
                user = new
                {
                    Id = int.Parse(id),
                    Email = email,
                    DisplayName = displayName,
                    Role = role
                }
            });
        }


        // -----------------------------
        // LOGOUT
        // -----------------------------
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok(new { message = "Logged out" });
        }
    }
}
