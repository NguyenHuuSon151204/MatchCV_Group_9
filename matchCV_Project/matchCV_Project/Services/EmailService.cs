using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace matchCV_Project.Services
{
    public class EmailService
    {
        private readonly IConfiguration _config;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IConfiguration config, ILogger<EmailService> logger)
        {
            _config = config;
            _logger = logger;
        }

        public async Task SendEmailAsync(string to, string subject, string html)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(_config["Email:SenderEmail"]));
            email.To.Add(MailboxAddress.Parse(to));
            email.Subject = subject;
            email.Body = new TextPart("html") { Text = html };

            try
            {
                using var smtp = new SmtpClient();
                await smtp.ConnectAsync(_config["Email:SmtpServer"], 587, SecureSocketOptions.StartTls);
                await smtp.AuthenticateAsync(
                    _config["Email:SenderEmail"],
                    _config["Email:AppPassword"]
                );

                await smtp.SendAsync(email);
                await smtp.DisconnectAsync(true);
                _logger.LogInformation("Sent email to {To} with subject {Subject}", to, subject);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to send email to {To} with subject {Subject}", to, subject);
                throw;
            }
        }
    }
}
