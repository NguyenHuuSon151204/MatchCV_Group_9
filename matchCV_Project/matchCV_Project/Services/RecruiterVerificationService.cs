using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using matchCV_Project.Data;
using matchCV_Project.Interfaces;
using matchCV_Project.Models;

namespace matchCV_Project.Services;

public class RecruiterVerificationService : IRecruiterVerificationService
{
    private readonly MatchCvContext _db;
    private readonly IConfiguration _configuration;
    private readonly ILogger<RecruiterVerificationService> _logger;

    // Allowed file types for verification documents
    private static readonly string[] AllowedExtensions = { ".pdf", ".jpg", ".jpeg", ".png", ".doc", ".docx" };
    private const long MaxFileSize = 10 * 1024 * 1024; // 10 MB

    public RecruiterVerificationService(
        MatchCvContext db,
        IConfiguration configuration,
        ILogger<RecruiterVerificationService> logger)
    {
        _db = db;
        _configuration = configuration;
        _logger = logger;
    }

    public async Task<Document?> SaveVerificationDocumentAsync(IFormFile file, int recruiterId, string documentType)
    {
        if (file == null || file.Length == 0)
            return null;

        if (!IsValidDocumentType(file) || !IsValidDocumentSize(file))
            return null;

        try
        {
            var uploadsPath = _configuration["FileStorage:VerificationPath"] ?? "uploads/verifications";
            var fullPath = Path.Combine(Directory.GetCurrentDirectory(), uploadsPath);
            
            if (!Directory.Exists(fullPath))
            {
                Directory.CreateDirectory(fullPath);
            }

            var secureFileName = await GenerateSecureFileNameAsync(file.FileName, recruiterId);
            var filePath = Path.Combine(fullPath, secureFileName);
            var relativePath = Path.Combine(uploadsPath, secureFileName).Replace('\\', '/');

            // Save file
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Calculate file hash
            var fileHash = await CalculateFileHashAsync(filePath);

            // Create document record
            var document = new Document
            {
                UserId = recruiterId,
                DocType = documentType, // "BusinessLicense" or "CompanyProof"
                OriginalName = file.FileName,
                ContentType = file.ContentType,
                StoragePath = relativePath,
                FileHash = fileHash,
                FileSize = file.Length,
                CreatedAt = DateTime.UtcNow,
                IsDeleted = false
            };

            _db.Documents.Add(document);
            await _db.SaveChangesAsync();

            _logger.LogInformation("Saved verification document {FileName} for recruiter {RecruiterId}", file.FileName, recruiterId);

            return document;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to save verification document {FileName} for recruiter {RecruiterId}", file.FileName, recruiterId);
            return null;
        }
    }

    public async Task<bool> ValidateCompanyEmailAsync(string email, string companyName)
    {
        if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(companyName))
            return false;

        // Basic email format validation
        var emailRegex = new Regex(@"^[^@\s]+@[^@\s]+\.[^@\s]+$", RegexOptions.IgnoreCase);
        if (!emailRegex.IsMatch(email))
            return false;

        // Extract domain from email
        var domain = email.Split('@')[1].ToLower();
        var companyDomain = companyName.ToLower()
            .Replace(" ", "")
            .Replace(".", "")
            .Replace("-", "");

        // Check if domain contains company name (basic check)
        // In production, you might want to do more sophisticated domain validation
        return domain.Contains(companyDomain) || companyDomain.Contains(domain.Split('.')[0]);
    }

    public async Task<bool> ValidateCompanyPhoneAsync(string phone)
    {
        if (string.IsNullOrWhiteSpace(phone))
            return false;

        // Remove common phone formatting characters
        var cleaned = Regex.Replace(phone, @"[\s\-\(\)\+]", "");
        
        // Check if it's a valid phone number (digits only, reasonable length)
        return Regex.IsMatch(cleaned, @"^\d{8,15}$");
    }

    public async Task<string> GenerateSecureFileNameAsync(string originalFileName, int recruiterId)
    {
        var extension = Path.GetExtension(originalFileName);
        var timestamp = DateTime.UtcNow.ToString("yyyyMMddHHmmss");
        var random = Guid.NewGuid().ToString("N")[..8];
        
        return $"verification_{recruiterId}_{timestamp}_{random}{extension}";
    }

    public bool IsValidDocumentType(IFormFile file)
    {
        if (file == null || string.IsNullOrEmpty(file.FileName))
            return false;

        var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
        return Array.Exists(AllowedExtensions, ext => ext.Equals(extension, StringComparison.OrdinalIgnoreCase));
    }

    public bool IsValidDocumentSize(IFormFile file)
    {
        return file != null && file.Length > 0 && file.Length <= MaxFileSize;
    }

    private async Task<string> CalculateFileHashAsync(string filePath)
    {
        using var sha256 = SHA256.Create();
        using var stream = File.OpenRead(filePath);
        var hash = await sha256.ComputeHashAsync(stream);
        return BitConverter.ToString(hash).Replace("-", "").ToLowerInvariant();
    }
}

