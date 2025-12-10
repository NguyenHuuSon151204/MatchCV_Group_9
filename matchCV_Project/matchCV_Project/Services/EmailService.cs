using MailKit.Net.Smtp;
using MimeKit;
using matchCV_Project.Interfaces;

namespace matchCV_Project.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public async Task SendEmailAsync(string to, string subject, string html)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(_config["Email:SenderEmail"]));
            email.To.Add(MailboxAddress.Parse(to));
            email.Subject = subject;

            email.Body = new TextPart("html") { Text = html };

            using var smtp = new SmtpClient();
            await smtp.ConnectAsync(_config["Email:SmtpServer"], 587, false);
            await smtp.AuthenticateAsync(
                _config["Email:SenderEmail"],
                _config["Email:AppPassword"]
            );

            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);
        }

        public async Task SendNewApplicationAsync(string toEmail, string recruiterName, string jobTitle, string candidateName, double? score)
        {
            var scoreText = score.HasValue ? $"{score.Value:F1}" : "N/A";
            var html = $@"
                <html>
                <body>
                    <h2>New Application Received</h2>
                    <p>Dear {recruiterName},</p>
                    <p>A new candidate has applied for your job posting:</p>
                    <ul>
                        <li><strong>Job:</strong> {jobTitle}</li>
                        <li><strong>Candidate:</strong> {candidateName}</li>
                        <li><strong>Match Score:</strong> {scoreText}</li>
                    </ul>
                    <p>Please review the application in your dashboard.</p>
                </body>
                </html>
            ";

            await SendEmailAsync(toEmail, $"New Application: {jobTitle}", html);
        }
    }
}
