using matchCV_Project.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace matchCV_Project.Controllers
{
    [ApiController]
    [Route("api/license")]
    public class LicenseController : ControllerBase
    {
        private readonly ILicenseService _licenseKeyService;

        public LicenseController(ILicenseService licenseKeyService)
        {
            _licenseKeyService = licenseKeyService;
        }

        /// <summary>
        /// Create a Pro license key for a user
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
    }
}
