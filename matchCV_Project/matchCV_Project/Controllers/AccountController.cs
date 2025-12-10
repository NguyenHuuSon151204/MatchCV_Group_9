using matchCV_Project.Data;
using matchCV_Project.Interfaces;
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
        private readonly IAccountService _service;
        private readonly ILogger<AccountController> _logger;

        public AccountController(IAccountService service, ILogger<AccountController> logger)
        {
            _service = service;
            _logger = logger;
        }

        // -------------------------
        // REGISTER
        // -------------------------
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequestDto req)
        {
            var baseUrl = $"{Request.Scheme}://{Request.Host}";
            Console.WriteLine(baseUrl);
            var (success, error) = await _service.RegisterAsync(req, baseUrl);
            if (!success)
                return BadRequest(new { message = error });

            return Ok(new { message = "Registration complete. Check your email." });
        }

        // -------------------------
        // VERIFY EMAIL
        // -------------------------
        [HttpGet("verify-email")]
        public async Task<IActionResult> VerifyEmail(int userId, string token)
        {
            var (success, error) = await _service.VerifyEmailAsync(userId, token);

            if (!success)
                return BadRequest(new { message = error });

            return Redirect("http://localhost:3000/auth/login");
        }

        // -------------------------
        // LOGIN
        // -------------------------
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequestDto req)
        {
            var (user, error) = await _service.LoginAsync(req);

            if (user == null)
            {
                _logger.LogWarning("Login failed for email {Email}: {Error}", req.Email, error ?? "Unknown error");
                return BadRequest(new { message = error });
            }

            await SignIn(user);

            return Ok(new
            {
                message = "Login successful",
                user = new { user.Id, user.Email, user.DisplayName, user.Role }
            });
        }

        // -------------------------
        // GOOGLE LOGIN
        // -------------------------
        [HttpGet("google")]
        public IActionResult GoogleLogin()
        {
            var redirectUrl = Url.Action("GoogleCallback");
            var props = new AuthenticationProperties { RedirectUri = redirectUrl };

            return Challenge(props, GoogleDefaults.AuthenticationScheme);
        }

        [HttpGet("google-callback")]
        public async Task<IActionResult> GoogleCallback()
        {
            var result = await HttpContext.AuthenticateAsync(GoogleDefaults.AuthenticationScheme);
            if (result?.Principal == null)
                return BadRequest(new { message = "Google authentication failed" });

            var email = result.Principal.FindFirst(ClaimTypes.Email)?.Value;
            var name = result.Principal.FindFirst(ClaimTypes.Name)?.Value;

            if (email == null)
                return BadRequest(new { message = "No email received" });

            var existing = await _service.GetUserByEmailAsync(email);

            if (existing != null)
            {
                await SignIn(existing);
                return Redirect("http://localhost:3000/auth/google-success");
            }

            return Redirect($"http://localhost:3000/auth/choose-role?email={WebUtility.UrlEncode(email)}&name={WebUtility.UrlEncode(name)}");
        }

        [HttpPost("google-complete")]
        public async Task<IActionResult> GoogleComplete(GoogleSignupRequestDto req)
        {
            var user = await _service.CreateGoogleUserAsync(req.Email, req.Name, req.Role);

            await SignIn(user);

            return Ok(new
            {
                message = "Google signup complete",
                user = new { user.Id, user.Email, user.DisplayName, user.Role }
            });
        }

        // -------------------------
        // ME
        // -------------------------
        [HttpGet("me")]
        public async Task<IActionResult> Me()
        {
            var principal = HttpContext.User;

            if (!principal.Identity?.IsAuthenticated ?? true)
                return Unauthorized(new { message = "Not logged in" });

            var idClaim = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (idClaim == null)
                return Unauthorized(new { message = "Invalid session" });

            var user = await _service.GetUserByIdAsync(int.Parse(idClaim));
            if (user == null)
                return Unauthorized(new { message = "Invalid session" });

            return Ok(new
            {
                user = new { user.Id, user.Email, user.DisplayName, user.Role }
            });
        }

        // -------------------------
        // LOGOUT
        // -------------------------
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok(new { message = "Logged out" });
        }

        // -------------------------
        // HELPER: SIGN IN
        // -------------------------
        private async Task SignIn(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.DisplayName ?? user.Email),
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
                    ExpiresUtc = DateTime.UtcNow.AddHours(1)
                }
            );
        }

        // ---------------------------------------------
        // FORGOT PASSWORD (send reset email)
        // POST: /api/account/forgot-password
        // ---------------------------------------------
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordDto dto)
        {
            var baseUrl = $"{Request.Scheme}://{Request.Host}";

            var result = await _service.ForgotPasswordAsync(dto.Email, baseUrl);

            if (!result.success)
                return BadRequest(new { message = result.error });

            return Ok(new { message = "Reset link sent to email." });
        }

        // ---------------------------------------------
        // RESET PASSWORD (validate token + update)
        // POST: /api/account/reset-password
        // ---------------------------------------------
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto dto)
        {
            var result = await _service.ResetPasswordAsync(dto.Token, dto.NewPassword);

            if (!result.success)
                return BadRequest(new { message = result.error });

            return Ok(new { message = "Password has been reset successfully." });
        }
    }
}
