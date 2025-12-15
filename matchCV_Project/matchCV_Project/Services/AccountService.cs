using iText.Kernel.Pdf.Tagging;
using matchCV_Project.Data;
using matchCV_Project.Interfaces;
using matchCV_Project.Models;
using matchCV_Project.Models.Dtos;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Ocsp;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Logging;

namespace matchCV_Project.Services
{
    public class AccountService : IAccountService
    {
        private readonly MatchCvContext _context;
        private readonly EmailService _email;
        private readonly IConfiguration _config;
        private readonly ILogger<AccountService> _logger;
        private bool RequireEmailVerification => _config.GetValue<bool>("Auth:RequireEmailVerification", false);
        private string PasswordResetKey => _config["JwtKeys:PasswordResetKey"] ?? "dev-reset-secret-key";

        public AccountService(MatchCvContext context, EmailService email, IConfiguration configuration, ILogger<AccountService> logger)
        {
            _context = context;
            _email = email;
            _config = configuration;
            _logger = logger;
        }

        // -------------------------
        // PASSWORD HASHING
        // -------------------------
        private string HashPassword(string password)
        {
            using var sha = SHA256.Create();
            var bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToHexString(bytes);
        }

        private bool VerifyPassword(string password, string hash)
        {
            return HashPassword(password) == hash;
        }

        // -------------------------
        // REGISTER
        // -------------------------
        public async Task<(bool success, string? error)> RegisterAsync(RegisterRequestDto req, string baseUrl)
        {
            if (await UserExistsAsync(req.Email))
                return (false, "Email already registered");

            var user = new User
            {
                DisplayName = req.DisplayName,
                Email = req.Email,
                Password = HashPassword(req.Password),
                Role = req.Role,
                Verified = !RequireEmailVerification
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // In local/dev we skip email verification to unblock login with email/password.
            if (RequireEmailVerification)
            {
                await SendEmailVerification(user, baseUrl);
            }

            return (true, null);
        }

        private async Task SendEmailVerification(User user, string baseUrl)
        {
            var token = Guid.NewGuid().ToString("N");

            var ev = new EmailVerificationToken
            {
                UserId = user.Id,
                Token = token,
                ExpiresAt = DateTime.UtcNow.AddHours(24)
            };

            _context.EmailVerificationTokens.Add(ev);
            await _context.SaveChangesAsync();

            var verifyUrl = $"{baseUrl}/api/account/verify-email?userId={user.Id}&token={token}";
            var html = $@"
                <!DOCTYPE html>
                <html lang=""en"">
                <head>
                    <meta charset=""UTF-8"" />
                    <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"" />
                    <title>Email Verification</title>
                </head>
                <body style=""font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;"">
                    <div style=""max-width: 600px; margin: auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"">

                        <!-- Header -->
                        <div style=""background-color: #4f46e5; padding: 20px; text-align: center; color: white;"">
                            <h2 style=""margin: 0; font-size: 24px;"">MatchCV</h2>
                        </div>

                        <!-- Body -->
                        <div style=""padding: 30px;"">
                            <p style=""font-size: 16px; color: #333;"">Hello {user.DisplayName},</p>

                            <p style=""font-size: 16px; color: #333;"">
                                Thank you for signing in with Google on MatchCV.  
                                Please confirm your email address to secure your account and complete your registration.
                            </p>

                            <div style=""text-align: center; margin: 40px 0;"">
                                <a href=""{verifyUrl}""
                                   style=""background-color:#4f46e5; color:white; padding:14px 28px; border-radius:6px; 
                                   text-decoration:none; font-size:16px; display:inline-block;"">
                                    Verify Email
                                </a>
                            </div>

                            <p style=""font-size: 14px; color: #555;"">
                                If the button above does not work, you can copy and paste this link into your browser:
                            </p>

                            <p style=""word-break: break-all; font-size: 14px; color: #555;"">
                                {verifyUrl}
                            </p>

                            <p style=""font-size: 14px; color: #555;"">This link will expire in 24 hours.</p>

                            <p style=""font-size: 14px; color: #555;"">
                                If you did not request this, you can safely ignore this email.
                            </p>
                        </div>

                        <!-- Footer -->
                        <div style=""padding: 20px; text-align: center; font-size: 12px; color: #888; background: #fafafa;"">
                            <p style=""margin: 0;"">© {DateTime.UtcNow.Year} MatchCV. All rights reserved.</p>
                            <p style=""margin: 4px 0 0;"">This is an automated message, please do not reply.</p>
                        </div>

                    </div>
                </body>
                </html>";

            await _email.SendEmailAsync(user.Email, "Verify your account", html);
        }

        // -------------------------
        // VERIFY EMAIL
        // -------------------------
        public async Task<(bool success, string? error)> VerifyEmailAsync(int userId, string token)
        {
            var record = await _context.EmailVerificationTokens
                .Include(t => t.User)
                .FirstOrDefaultAsync(t => t.UserId == userId && t.Token == token);

            if (record == null || record.ExpiresAt < DateTime.UtcNow)
                return (false, "Invalid or expired token");

            record.User.Verified = true;

            _context.EmailVerificationTokens.Remove(record);
            await _context.SaveChangesAsync();

            return (true, null);
        }

        // -------------------------
        // LOGIN
        // -------------------------
        public async Task<(User? user, string? error)> LoginAsync(LoginRequestDto req)
        {
            var user = await GetUserByEmailAsync(req.Email);
            if (user == null)
            {
                _logger.LogWarning("Login failed - user not found for email {Email}", req.Email);
                return (null, "Invalid email or password");
            }

            if (!VerifyPassword(req.Password, user.Password))
            {
                _logger.LogWarning("Login failed - invalid password for email {Email}", req.Email);
                return (null, "Invalid email or password");
            }

            if (!user.Verified)
            {
                if (RequireEmailVerification)
                {
                    _logger.LogWarning("Login blocked - email not verified for {Email}", req.Email);
                    return (null, "Please verify your email first");
                }

                // Auto-verify in non-production/local mode so email/password login works.
                user.Verified = true;
                await _context.SaveChangesAsync();
            }

            return (user, null);
        }

        // -------------------------
        // GOOGLE
        // -------------------------
        public async Task<bool> UserExistsAsync(string email) =>
            await _context.Users.AnyAsync(u => u.Email == email);

        public async Task<User?> GetUserByEmailAsync(string email) =>
            await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

        public async Task<User> CreateGoogleUserAsync(string email, string name, string role)
        {
            var user = new User
            {
                Email = email,
                DisplayName = name,
                Role = role,
                Verified = true,
                Password = Guid.NewGuid().ToString("N")
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        // -------------------------
        // GET USER
        // -------------------------
        public async Task<User?> GetUserByIdAsync(int id) =>
            await _context.Users.FindAsync(id);

        public async Task<(bool success, string? error)> ForgotPasswordAsync(string email, string baseUrl)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
                return (false, "Email not found");

            var token = GenerateResetToken(user.Id);
            var resetUrl = $"http://localhost:3000/auth/reset-pass?token={Uri.EscapeDataString(token)}";

            var html = $@"
                <div style=""font-family: Arial, sans-serif; color: #333; line-height: 1.6;"">
                    <h2 style=""color:#0d6efd;"">MatchCV Password Reset Request</h2>

                    <p>Hi <strong>{user.DisplayName}</strong>,</p>

                    <p>We received a request to reset the password for your MatchCV account.  
                    If you initiated this request, please click the button below to create a new password:</p>

                    <p style=""margin: 24px 0;"">
                        <a href=""{resetUrl}"" 
                           style=""background-color:#0d6efd; color:#fff; padding:12px 20px; text-decoration:none; border-radius:6px;"">
                            Reset Your Password
                        </a>
                    </p>

                    <p>If the button above doesn't work, you can also copy and paste this link into your browser:</p>
                    <p><a href=""{resetUrl}"">{resetUrl}</a></p>

                    <p>This reset link will expire in <strong>1 hour</strong> for security reasons.</p>

                    <p>If you didn’t request a password reset, you can safely ignore this email—your account will remain secure.</p>

                    <br />

                    <p>Best regards,<br>
                    <strong>The MatchCV Team</strong></p>
                </div>";

            await _email.SendEmailAsync(user.Email, "Reset Your Password – MatchCV", html);

            return (true, null);
        }


        public async Task<(bool success, string? error)> ResetPasswordAsync(string token, string newPassword)
        {
            if (!ValidateResetToken(token, out int userId))
                return (false, "Invalid or expired token");

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return (false, "User not found");

            user.Password = HashPassword(newPassword);
            await _context.SaveChangesAsync();

            return (true, null);
        }


        private string GenerateResetToken(int userId)
        {
            var key = Encoding.UTF8.GetBytes(PasswordResetKey);

            var expiry = DateTime.UtcNow.AddHours(1);

            var payload = $"{userId}|{expiry:o}";

            using var hmac = new HMACSHA256(key);
            var signature = Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(payload)));

            var token = $"{payload}|{signature}";
            return Convert.ToBase64String(Encoding.UTF8.GetBytes(token));
        }

        private bool ValidateResetToken(string token, out int userId)
        {
            userId = 0;

            try
            {
                var decoded = Encoding.UTF8.GetString(Convert.FromBase64String(token));
                var parts = decoded.Split('|');

                if (parts.Length != 3) return false;

                userId = int.Parse(parts[0]);
                var expiry = DateTime.Parse(parts[1]);
                var signature = parts[2];

                if (expiry < DateTime.UtcNow) return false;

                var key = Encoding.UTF8.GetBytes(PasswordResetKey);
                var payload = $"{parts[0]}|{parts[1]}";

                using var hmac = new HMACSHA256(key);
                var expectedSig = Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(payload)));

                if (signature != expectedSig) return false;

                return true;
            }
            catch
            {
                return false;
            }
        }

    }
}
