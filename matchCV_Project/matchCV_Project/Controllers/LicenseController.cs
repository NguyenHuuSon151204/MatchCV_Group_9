using matchCV_Project.Data;
using matchCV_Project.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace matchCV_Project.Controllers
{
    [ApiController]
    [Route("api/license")]
    public class LicenseController : ControllerBase
    {
        private readonly ILicenseService _licenseKeyService;
        private readonly MatchCvContext _db;

        public LicenseController(ILicenseService licenseKeyService, MatchCvContext db)
        {
            _licenseKeyService = licenseKeyService;
            _db = db;
        }

        /// <summary>
        /// Create a Pro license key for a user (legacy)
        /// </summary>
        [HttpPost("create/{userId}")]
        public async Task<IActionResult> CreateLicense(int userId)
        {
            var license = await _licenseKeyService.CreateLicenseKeyAsync(userId);

            return Ok(new
            {
                license.Id,
                license.KeyHash,
                license.Plan,
                license.IsActive,
                license.AssignedUserId,
                license.CreatedAt
            });
        }

        /// <summary>
        /// Get active plan of a user
        /// </summary>
        [HttpGet("plan/{userId}")]
        public async Task<IActionResult> GetUserPlan(int userId)
        {
            var plan = await _licenseKeyService.GetUserPlanAsync(userId);
            return Ok(new { plan });
        }

        [HttpPost("generate")]
        public async Task<IActionResult> Generate([FromBody] GenerateDto dto)
        {
            var expiryDays = dto?.ExpiryDays ?? 365;
            var plan = string.IsNullOrWhiteSpace(dto?.Plan) ? "Pro" : dto!.Plan;
            var license = await _licenseKeyService.GenerateLicenseAsync(plan, expiryDays, dto?.AssignedUserId);
            return Ok(new
            {
                license.Id,
                license.Plan,
                license.IsActive,
                license.AssignedUserId,
                license.CreatedAt,
                license.Expiry,
                key = license.KeyHash,
                originalKey = license.KeyHash
            });
        }

        [HttpPut("{id}/deactivate")]
        public async Task<IActionResult> Deactivate(int id)
        {
            var ok = await _licenseKeyService.DeactivateAsync(id);
            if (!ok) return NotFound(new { success = false, message = "License not found" });
            return Ok(new { success = true });
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserLicense(int userId)
        {
            var license = await _licenseKeyService.GetLatestForUserAsync(userId);
            if (license == null) return Ok(new { plan = "Free" });
            var daysRemaining = license.Expiry.HasValue ? (int)(license.Expiry.Value.Date - DateTime.UtcNow.Date).TotalDays : (int?)null;
            return Ok(new
            {
                license.Id,
                license.Plan,
                license.IsActive,
                license.AssignedUserId,
                license.CreatedAt,
                license.Expiry,
                daysRemaining,
                originalKey = license.KeyHash
            });
        }

        [HttpPut("user/{userId}/plan")]
        public async Task<IActionResult> UpdateUserPlan(int userId, [FromBody] UpdateUserPlanDto dto)
        {
            var updated = await _licenseKeyService.UpdateUserPlanAsync(userId, dto.Plan, dto.ExpiryDays);
            if (updated == null) return NotFound(new { success = false, message = "User not found" });
            return Ok(new
            {
                success = true,
                plan = updated.Plan,
                expiry = updated.Expiry,
                id = updated.Id
            });
        }

        public record GenerateDto(string? Plan, int? ExpiryDays, int? AssignedUserId);
        public record UpdateUserPlanDto(string Plan, int ExpiryDays);
    }
}
