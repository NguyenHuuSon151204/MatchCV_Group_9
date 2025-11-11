using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using matchCV_Project.Data;

namespace matchCV_Project.Controllers;

[ApiController]
[Route("api/license")]
public class LicenseController : ControllerBase
{
    private readonly AppDbContext _db;
    public LicenseController(AppDbContext db) => _db = db;

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
        var lic = await _db.LicenseKey.FirstOrDefaultAsync(x => x.KeyHash == hash);
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
        var lic = await _db.LicenseKey
            .FirstOrDefaultAsync(x => x.AssignedUserId == userId && x.IsActive);

        if (lic is null)
            return Ok(new { plan = "Free", quota = "Base" });

        return Ok(new { lic.Plan, lic.Expiry, quota = "Pro" });
    }
}
