using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using matchCV_Project.Models;

namespace matchCV_Project.Interfaces;

public interface IRecruiterVerificationService
{
    Task<Document?> SaveVerificationDocumentAsync(IFormFile file, int recruiterId, string documentType);
    Task<bool> ValidateCompanyEmailAsync(string email, string companyName);
    Task<bool> ValidateCompanyPhoneAsync(string phone);
    Task<string> GenerateSecureFileNameAsync(string originalFileName, int recruiterId);
    bool IsValidDocumentType(IFormFile file);
    bool IsValidDocumentSize(IFormFile file);
}

