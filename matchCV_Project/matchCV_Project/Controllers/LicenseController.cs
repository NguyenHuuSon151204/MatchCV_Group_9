using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using matchCV_Project.Data;
using matchCV_Project.Models;

namespace matchCV_Project.Controllers;

[ApiController]
[Route("api/license")]
public class LicenseController : ControllerBase
{
    private readonly MatchCvContext _db;
    public LicenseController(MatchCvContext db) => _db = db;

    private static string Sha256(string value)
    {
        using var sha = SHA256.Create();
        return Convert.ToHexString(sha.ComputeHash(Encoding.UTF8.GetBytes(value)));
    }

    public record ActivateDto(string Key, int UserId);

    [HttpPost("activate")]
    public async Task<IActionResult> Activate([FromBody] ActivateDto dto)
    {
        var hash = Sha256(dto.Key);
        var lic = await _db.LicenseKeys.FirstOrDefaultAsync(x => x.KeyHash == hash);
        if (lic is null) return BadRequest("Invalid license key.");

        lic.IsActive = true;
        lic.AssignedUserId = dto.UserId;
        lic.Expiry ??= DateTime.UtcNow.AddYears(1);

        await _db.SaveChangesAsync();

        return Ok(new { lic.Plan, lic.Expiry, lic.IsActive });
    }

    [HttpGet("me")]
    public async Task<IActionResult> Me([FromQuery] int userId)
    {
        var lic = await _db.LicenseKeys
            .FirstOrDefaultAsync(x => x.AssignedUserId == userId && x.IsActive);

        if (lic is null)
            return Ok(new { plan = "Free", quota = "Base" });

        return Ok(new { lic.Plan, lic.Expiry, quota = "Pro" });
    }

    // GET: /api/license/all - Get all license keys (Admin only)
    [HttpGet("all")]
    public async Task<IActionResult> GetAllLicenses([FromQuery] string? search, [FromQuery] string? plan)
    {
        var query = _db.LicenseKeys
            .Include(l => l.AssignedUser)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(l => 
                l.AssignedUser != null && 
                (l.AssignedUser.DisplayName.Contains(search) || 
                 l.AssignedUser.Email.Contains(search)));
        }

        if (!string.IsNullOrWhiteSpace(plan))
        {
            query = query.Where(l => l.Plan == plan);
        }

        var licenses = await query
            .OrderByDescending(l => l.CreatedAt)
            .ToListAsync();

        var result = licenses.Select(l => new
        {
            l.Id,
            l.Plan,
            l.Expiry,
            l.IsActive,
            l.CreatedAt,
            KeyHash = l.KeyHash, // Include hash for reference
            OriginalKey = l.OriginalKey, // Include original key for admin viewing
            AssignedUser = l.AssignedUser != null ? new
            {
                l.AssignedUser.Id,
                l.AssignedUser.DisplayName,
                l.AssignedUser.Email,
                l.AssignedUser.Role
            } : null,
            Status = l.IsActive ? 
                (l.Expiry.HasValue && l.Expiry < DateTime.UtcNow ? "Expired" : "Active") : 
                "Inactive",
            DaysRemaining = l.Expiry.HasValue ? 
                Math.Max(0, (int)(l.Expiry.Value - DateTime.UtcNow).TotalDays) : 
                (int?)null
        }).ToList();

        return Ok(result);
    }

    // POST: /api/license/generate - Generate new license key
    [HttpPost("generate")]
    public async Task<IActionResult> GenerateLicense([FromBody] GenerateLicenseDto dto)
    {
        // Generate a random license key
        var keyBytes = new byte[32];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(keyBytes);
        }
        var licenseKey = Convert.ToBase64String(keyBytes).Replace("+", "").Replace("/", "").Replace("=", "")[..24];
        var hash = Sha256(licenseKey);

        var license = new LicenseKey
        {
            KeyHash = hash,
            OriginalKey = licenseKey, // Store original key for admin viewing
            Plan = dto.Plan,
            Expiry = dto.ExpiryDays.HasValue ? DateTime.UtcNow.AddDays(dto.ExpiryDays.Value) : null,
            IsActive = false,
            CreatedAt = DateTime.UtcNow
        };

        _db.LicenseKeys.Add(license);
        await _db.SaveChangesAsync();

        return Ok(new { 
            LicenseKey = licenseKey, 
            license.Id, 
            license.Plan, 
            license.Expiry,
            Message = "License key generated successfully. Share this key with the user to activate." 
        });
    }

    // PUT: /api/license/{id}/deactivate - Deactivate license
    [HttpPut("{id:int}/deactivate")]
    public async Task<IActionResult> DeactivateLicense(int id)
    {
        var license = await _db.LicenseKeys.FindAsync(id);
        if (license == null)
            return NotFound("License not found.");

        license.IsActive = false;
        license.AssignedUserId = null;
        await _db.SaveChangesAsync();

        return Ok(new { Message = "License deactivated successfully." });
    }

    // DELETE: /api/license/{id} - Delete license
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteLicense(int id)
    {
        var license = await _db.LicenseKeys.FindAsync(id);
        if (license == null)
            return NotFound("License not found.");

        _db.LicenseKeys.Remove(license);
        await _db.SaveChangesAsync();

        return Ok(new { Message = "License deleted successfully." });
    }

    // PUT: /api/license/user/{userId}/plan - Update user's plan
    [HttpPut("user/{userId:int}/plan")]
    public async Task<IActionResult> UpdateUserPlan(int userId, [FromBody] UpdatePlanDto dto)
    {
        var user = await _db.Users.FindAsync(userId);
        if (user == null)
            return NotFound("User not found.");

        // Deactivate current license if any
        var currentLicense = await _db.LicenseKeys
            .FirstOrDefaultAsync(l => l.AssignedUserId == userId && l.IsActive);
        
        if (currentLicense != null)
        {
            currentLicense.IsActive = false;
        }

        // If setting to Free, just deactivate current license
        if (dto.Plan == "Free")
        {
            await _db.SaveChangesAsync();
            return Ok(new { Message = "User plan updated to Free.", Plan = "Free" });
        }

        // Generate new license for Pro/Enterprise
        var keyBytes = new byte[32];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(keyBytes);
        }
        var licenseKey = Convert.ToBase64String(keyBytes).Replace("+", "").Replace("/", "").Replace("=", "")[..24];
        var hash = Sha256(licenseKey);

        var newLicense = new LicenseKey
        {
            KeyHash = hash,
            OriginalKey = licenseKey,
            Plan = dto.Plan,
            Expiry = dto.ExpiryDays.HasValue ? DateTime.UtcNow.AddDays(dto.ExpiryDays.Value) : null,
            IsActive = true,
            AssignedUserId = userId,
            CreatedAt = DateTime.UtcNow
        };

        _db.LicenseKeys.Add(newLicense);
        await _db.SaveChangesAsync();

        return Ok(new { 
            Message = $"User plan updated to {dto.Plan}.", 
            Plan = dto.Plan,
            LicenseKey = licenseKey,
            Expiry = newLicense.Expiry
        });
    }

    // GET: /api/license/user/{userId} - Get user's current license info
    [HttpGet("user/{userId:int}")]
    public async Task<IActionResult> GetUserLicense(int userId)
    {
        var user = await _db.Users.FindAsync(userId);
        if (user == null)
            return NotFound("User not found.");

        var license = await _db.LicenseKeys
            .FirstOrDefaultAsync(l => l.AssignedUserId == userId && l.IsActive);

        if (license == null)
        {
            return Ok(new { 
                UserId = userId,
                UserName = user.DisplayName,
                UserEmail = user.Email,
                Plan = "Free", 
                Status = "Active",
                Expiry = (DateTime?)null,
                DaysRemaining = (int?)null,
                LicenseKey = (string?)null
            });
        }

        var status = license.IsActive ? 
            (license.Expiry.HasValue && license.Expiry < DateTime.UtcNow ? "Expired" : "Active") : 
            "Inactive";

        return Ok(new { 
            UserId = userId,
            UserName = user.DisplayName,
            UserEmail = user.Email,
            Plan = license.Plan,
            Status = status,
            Expiry = license.Expiry,
            DaysRemaining = license.Expiry.HasValue ? 
                Math.Max(0, (int)(license.Expiry.Value - DateTime.UtcNow).TotalDays) : 
                (int?)null,
            LicenseKey = license.OriginalKey
        });
    }

    public record GenerateLicenseDto(string Plan, int? ExpiryDays);
    public record UpdatePlanDto(string Plan, int? ExpiryDays);
}
