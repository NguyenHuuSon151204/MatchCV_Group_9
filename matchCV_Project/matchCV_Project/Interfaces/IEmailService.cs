using System.Threading.Tasks;

namespace matchCV_Project.Interfaces;

public interface IEmailService
{
    Task SendNewApplicationAsync(string toEmail, string recruiterName, string jobTitle, string candidateName, double? score);
}


