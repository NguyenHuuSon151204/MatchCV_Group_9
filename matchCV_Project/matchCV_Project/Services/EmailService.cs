using System.Net;
using System.Net.Mail;
using matchCV_Project.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace matchCV_Project.Services;

public class EmailService : IEmailService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<EmailService> _logger;

    public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
    {
        _configuration = configuration;
        _logger = logger;
    }

    public async Task SendNewApplicationAsync(string toEmail, string recruiterName, string jobTitle, string candidateName, double? score)
    {
        if (string.IsNullOrWhiteSpace(toEmail))
        {
            _logger.LogInformation("Skip sending email because recruiter email is empty.");
            return;
        }

        var emailSection = _configuration.GetSection("Email");
        var enabled = emailSection.GetValue<bool?>("Enabled") ?? false;
        if (!enabled)
        {
            _logger.LogDebug("Email notifications disabled via configuration.");
            return;
        }

        var fromAddress = emailSection["From"];
        var smtpHost = emailSection["SmtpHost"];
        var smtpPort = emailSection.GetValue<int?>("SmtpPort") ?? 25;
        var username = emailSection["Username"];
        var password = emailSection["Password"];
        var useSsl = emailSection.GetValue<bool?>("UseSsl") ?? false;

        if (string.IsNullOrWhiteSpace(fromAddress) || string.IsNullOrWhiteSpace(smtpHost))
        {
            _logger.LogWarning("Email settings are incomplete. Please configure Email:From and Email:SmtpHost.");
            return;
        }

        using var client = new SmtpClient(smtpHost, smtpPort)
        {
            EnableSsl = useSsl
        };

        if (!string.IsNullOrWhiteSpace(username) && !string.IsNullOrWhiteSpace(password))
        {
            client.Credentials = new NetworkCredential(username, password);
        }
        else
        {
            client.UseDefaultCredentials = true;
        }

        var bodyLines = new List<string>
        {
            $"Hello {recruiterName ?? "Recruiter"},",
            "",
            $"You have received a new CV for JD \"{jobTitle}\".",
            $"Candidate: {candidateName}",
            score.HasValue ? $"AI Score: {Math.Round(score.Value, 1)}%" : "AI Score: N/A",
            "",
            "Please log in to MatchCV to view details."
        };

        var mail = new MailMessage(fromAddress, toEmail)
        {
            Subject = $"[MatchCV] New CV for JD {jobTitle}",
            Body = string.Join(Environment.NewLine, bodyLines),
            IsBodyHtml = false
        };

        try
        {
            await client.SendMailAsync(mail);
            _logger.LogInformation("Sent new application notification email to {Email}", toEmail);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send email to {Email}", toEmail);
        }
    }
}


