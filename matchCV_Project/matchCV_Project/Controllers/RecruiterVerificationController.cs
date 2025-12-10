using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using matchCV_Project.Data;
using matchCV_Project.Interfaces;
using matchCV_Project.Models;
using matchCV_Project.Validators;

namespace matchCV_Project.Controllers;

[ApiController]
[Route("api/recruiter-verification")]
public class RecruiterVerificationController : ControllerBase
{
    private readonly MatchCvContext _db;
    private readonly IRecruiterVerificationService _verificationService;
    private readonly ILogger<RecruiterVerificationController> _logger;

    public RecruiterVerificationController(
        MatchCvContext db,
        IRecruiterVerificationService verificationService,
        ILogger<RecruiterVerificationController> logger)
    {
        _db = db;
        _verificationService = verificationService;
        _logger = logger;
    }

    // POST: /api/recruiter-verification/submit
    // Recruiter submits verification request
    [HttpPost("submit")]
    public async Task<IActionResult> SubmitVerification(
        [FromForm] SubmitVerificationRequest request,
        [FromForm] IFormFile? businessLicenseFile,
        [FromForm] IFormFile? companyProofFile,
        [FromQuery] int recruiterId)
    {
        // Validate recruiter exists and is a recruiter
        var recruiter = await _db.Users
            .FirstOrDefaultAsync(u => u.Id == recruiterId && u.Role == "Recruiter");
        
        if (recruiter == null)
            return BadRequest("Invalid recruiter ID or user is not a recruiter.");

        // Check if there's already a pending or approved verification
        var existingVerification = await _db.RecruiterVerifications
            .Where(v => v.RecruiterId == recruiterId && (v.Status == "Pending" || v.Status == "Approved"))
            .FirstOrDefaultAsync();

        if (existingVerification != null)
        {
            return BadRequest($"You already have a {existingVerification.Status.ToLower()} verification request.");
        }

        // Validate email format and company domain
        var emailValid = await _verificationService.ValidateCompanyEmailAsync(request.CompanyEmail, request.CompanyName);
        if (!emailValid)
        {
            _logger.LogWarning("Company email validation failed for {Email} and company {CompanyName}", 
                request.CompanyEmail, request.CompanyName);
            // Note: We still allow submission but log a warning
        }

        // Validate phone if provided
        if (!string.IsNullOrWhiteSpace(request.CompanyPhone))
        {
            var phoneValid = await _verificationService.ValidateCompanyPhoneAsync(request.CompanyPhone);
            if (!phoneValid)
            {
                return BadRequest("Invalid phone number format.");
            }
        }

        // Validate and save documents
        Document? businessLicenseDoc = null;
        Document? companyProofDoc = null;

        if (businessLicenseFile != null)
        {
            if (!_verificationService.IsValidDocumentType(businessLicenseFile))
                return BadRequest("Invalid business license file type. Allowed: PDF, JPG, PNG, DOC, DOCX");

            if (!_verificationService.IsValidDocumentSize(businessLicenseFile))
                return BadRequest("Business license file size exceeds 10MB limit.");

            businessLicenseDoc = await _verificationService.SaveVerificationDocumentAsync(
                businessLicenseFile, recruiterId, "BusinessLicense");
            
            if (businessLicenseDoc == null)
                return StatusCode(500, "Failed to save business license document.");
        }

        if (companyProofFile != null)
        {
            if (!_verificationService.IsValidDocumentType(companyProofFile))
                return BadRequest("Invalid company proof file type. Allowed: PDF, JPG, PNG, DOC, DOCX");

            if (!_verificationService.IsValidDocumentSize(companyProofFile))
                return BadRequest("Company proof file size exceeds 10MB limit.");

            companyProofDoc = await _verificationService.SaveVerificationDocumentAsync(
                companyProofFile, recruiterId, "CompanyProof");
            
            if (companyProofDoc == null)
                return StatusCode(500, "Failed to save company proof document.");
        }

        // Require at least one document
        if (businessLicenseDoc == null && companyProofDoc == null)
        {
            return BadRequest("At least one document (business license or company proof) is required.");
        }

        // Create verification record
        var verification = new RecruiterVerification
        {
            RecruiterId = recruiterId,
            CompanyName = request.CompanyName.Trim(),
            CompanyEmail = request.CompanyEmail.Trim(),
            CompanyPhone = request.CompanyPhone?.Trim(),
            CompanyAddress = request.CompanyAddress?.Trim(),
            TaxCode = request.TaxCode?.Trim(),
            BusinessLicenseDocumentId = businessLicenseDoc?.Id,
            CompanyProofDocumentId = companyProofDoc?.Id,
            Status = "Pending",
            CreatedAt = DateTime.UtcNow
        };

        _db.RecruiterVerifications.Add(verification);
        
        // Log action
        _db.AdminLogs.Add(new AdminLog
        {
            Actor = recruiter.Email,
            Action = "SubmitVerification",
            Entity = "RecruiterVerification",
            EntityId = verification.Id,
            MetaJson = System.Text.Json.JsonSerializer.Serialize(new
            {
                CompanyName = verification.CompanyName,
                CompanyEmail = verification.CompanyEmail
            }),
            CreatedAt = DateTime.UtcNow
        });

        await _db.SaveChangesAsync();

        _logger.LogInformation("Recruiter {RecruiterId} submitted verification request {VerificationId}", 
            recruiterId, verification.Id);

        var result = await BuildVerificationDtoAsync(verification.Id);
        return CreatedAtAction(nameof(GetVerificationStatus), new { recruiterId }, result);
    }

    // GET: /api/recruiter-verification/status?recruiterId={id}
    // Get verification status for a recruiter
    [HttpGet("status")]
    public async Task<IActionResult> GetVerificationStatus([FromQuery] int recruiterId)
    {
        var verification = await _db.RecruiterVerifications
            .Include(v => v.BusinessLicenseDocument)
            .Include(v => v.CompanyProofDocument)
            .Include(v => v.ReviewedByAdmin)
            .Where(v => v.RecruiterId == recruiterId)
            .OrderByDescending(v => v.CreatedAt)
            .FirstOrDefaultAsync();

        if (verification == null)
        {
            return Ok(new { status = "NotSubmitted", message = "No verification request found." });
        }

        var result = await BuildVerificationDtoAsync(verification.Id);
        return Ok(result);
    }

    // GET: /api/recruiter-verification/{id}
    // Get specific verification details
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetVerification(int id)
    {
        var verification = await _db.RecruiterVerifications
            .Include(v => v.Recruiter)
            .Include(v => v.BusinessLicenseDocument)
            .Include(v => v.CompanyProofDocument)
            .Include(v => v.ReviewedByAdmin)
            .FirstOrDefaultAsync(v => v.Id == id);

        if (verification == null)
            return NotFound("Verification not found.");

        var result = await BuildVerificationDtoAsync(verification.Id);
        return Ok(result);
    }

    // GET: /api/recruiter-verification/admin/pending
    // Admin: Get all pending verification requests
    [HttpGet("admin/pending")]
    public async Task<IActionResult> GetPendingVerifications()
    {
        var verifications = await _db.RecruiterVerifications
            .Include(v => v.Recruiter)
            .Include(v => v.BusinessLicenseDocument)
            .Include(v => v.CompanyProofDocument)
            .Where(v => v.Status == "Pending")
            .OrderBy(v => v.CreatedAt)
            .ToListAsync();

        var results = verifications.Select(v => new
        {
            v.Id,
            v.RecruiterId,
            Recruiter = new
            {
                v.Recruiter.Id,
                v.Recruiter.DisplayName,
                v.Recruiter.Email
            },
            v.CompanyName,
            v.CompanyEmail,
            v.CompanyPhone,
            v.CompanyAddress,
            v.TaxCode,
            v.Status,
            v.CreatedAt,
            HasBusinessLicense = v.BusinessLicenseDocumentId.HasValue,
            HasCompanyProof = v.CompanyProofDocumentId.HasValue
        }).ToList();

        return Ok(results);
    }

    // GET: /api/recruiter-verification/admin/all
    // Admin: Get all verification requests
    [HttpGet("admin/all")]
    public async Task<IActionResult> GetAllVerifications([FromQuery] string? status)
    {
        var query = _db.RecruiterVerifications
            .Include(v => v.Recruiter)
            .Include(v => v.ReviewedByAdmin)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(status))
        {
            query = query.Where(v => v.Status == status);
        }

        var verifications = await query
            .OrderByDescending(v => v.CreatedAt)
            .ToListAsync();

        var results = verifications.Select(v => new
        {
            v.Id,
            v.RecruiterId,
            Recruiter = new
            {
                v.Recruiter.Id,
                v.Recruiter.DisplayName,
                v.Recruiter.Email
            },
            v.CompanyName,
            v.CompanyEmail,
            v.CompanyPhone,
            v.Status,
            v.AdminNotes,
            ReviewedBy = v.ReviewedByAdmin != null ? new
            {
                v.ReviewedByAdmin.Id,
                v.ReviewedByAdmin.DisplayName
            } : null,
            v.ReviewedAt,
            v.CreatedAt
        }).ToList();

        return Ok(results);
    }

    // PUT: /api/recruiter-verification/admin/{id}/status
    // Admin: Approve or reject verification
    [HttpPut("admin/{id:int}/status")]
    public async Task<IActionResult> UpdateVerificationStatus(
        int id,
        [FromBody] UpdateVerificationStatusRequest request,
        [FromQuery] int adminId)
    {
        var verification = await _db.RecruiterVerifications
            .Include(v => v.Recruiter)
            .FirstOrDefaultAsync(v => v.Id == id);

        if (verification == null)
            return NotFound("Verification not found.");

        // Validate admin
        var admin = await _db.Users
            .FirstOrDefaultAsync(u => u.Id == adminId && u.Role == "Admin");
        
        if (admin == null)
            return Unauthorized("Only admins can update verification status.");

        if (verification.Status != "Pending")
            return BadRequest($"Cannot update status. Current status is {verification.Status}.");

        var oldStatus = verification.Status;
        verification.Status = request.Status;
        verification.AdminNotes = request.AdminNotes?.Trim();
        verification.ReviewedByAdminId = adminId;
        verification.ReviewedAt = DateTime.UtcNow;
        verification.UpdatedAt = DateTime.UtcNow;

        // Log action
        _db.AdminLogs.Add(new AdminLog
        {
            Actor = admin.Email,
            Action = $"Verification{request.Status}",
            Entity = "RecruiterVerification",
            EntityId = verification.Id,
            MetaJson = System.Text.Json.JsonSerializer.Serialize(new
            {
                RecruiterId = verification.RecruiterId,
                CompanyName = verification.CompanyName,
                OldStatus = oldStatus,
                NewStatus = request.Status,
                Notes = request.AdminNotes
            }),
            CreatedAt = DateTime.UtcNow
        });

        await _db.SaveChangesAsync();

        _logger.LogInformation("Admin {AdminId} {Action} verification {VerificationId} for recruiter {RecruiterId}",
            adminId, request.Status, id, verification.RecruiterId);

        var result = await BuildVerificationDtoAsync(verification.Id);
        return Ok(result);
    }

    // Helper method to build DTO
    private async Task<object> BuildVerificationDtoAsync(int verificationId)
    {
        var verification = await _db.RecruiterVerifications
            .Include(v => v.Recruiter)
            .Include(v => v.BusinessLicenseDocument)
            .Include(v => v.CompanyProofDocument)
            .Include(v => v.ReviewedByAdmin)
            .FirstOrDefaultAsync(v => v.Id == verificationId);

        if (verification == null)
            return null!;

        return new
        {
            verification.Id,
            verification.RecruiterId,
            Recruiter = new
            {
                verification.Recruiter.Id,
                verification.Recruiter.DisplayName,
                verification.Recruiter.Email
            },
            verification.CompanyName,
            verification.CompanyEmail,
            verification.CompanyPhone,
            verification.CompanyAddress,
            verification.TaxCode,
            verification.Status,
            verification.AdminNotes,
            BusinessLicense = verification.BusinessLicenseDocument != null ? new
            {
                verification.BusinessLicenseDocument.Id,
                verification.BusinessLicenseDocument.OriginalName,
                verification.BusinessLicenseDocument.StoragePath,
                verification.BusinessLicenseDocument.FileSize
            } : null,
            CompanyProof = verification.CompanyProofDocument != null ? new
            {
                verification.CompanyProofDocument.Id,
                verification.CompanyProofDocument.OriginalName,
                verification.CompanyProofDocument.StoragePath,
                verification.CompanyProofDocument.FileSize
            } : null,
            ReviewedBy = verification.ReviewedByAdmin != null ? new
            {
                verification.ReviewedByAdmin.Id,
                verification.ReviewedByAdmin.DisplayName
            } : null,
            verification.ReviewedAt,
            verification.CreatedAt,
            verification.UpdatedAt
        };
    }
}

