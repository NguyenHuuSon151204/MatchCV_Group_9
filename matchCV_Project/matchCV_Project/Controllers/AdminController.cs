using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using matchCV_Project.Data;
using System.Text.Json;

namespace matchCV_Project.Controllers;

[ApiController]
[Route("api/admin")]
public class AdminController : ControllerBase
{
    private readonly AppDbContext _db;
    public AdminController(AppDbContext db) => _db = db;

    [HttpGet("summary")]
    public async Task<IActionResult> Summary([FromQuery] DateTime? from, [FromQuery] DateTime? to)
    {
        var start = from ?? DateTime.UtcNow.AddDays(-30);
        var end = to ?? DateTime.UtcNow;

        var totals = new
        {
            users = await _db.Users.CountAsync(),
            recruiters = await _db.Users.CountAsync(u => u.Role == "Recruiter"),
            cvs = await _db.Documents.CountAsync(d => d.DocType == "CV" && !d.IsDeleted),
            jobs = await _db.Jobs.CountAsync(),
            apps = await _db.Applications.CountAsync()
        };

        var avgScoreByDay = await _db.Applications
            .Where(a => a.CreatedAt >= start && a.CreatedAt <= end && a.ScoreSnapshot.HasValue)
            .GroupBy(a => a.CreatedAt.Date)
            .Select(g => new { day = g.Key, avg = g.Average(x => x.ScoreSnapshot!.Value) })
            .OrderBy(x => x.day)
            .ToListAsync();

        var skillCounts = new Dictionary<string, int>(StringComparer.OrdinalIgnoreCase);

        var req = await _db.RequiredSkills
            .Join(_db.Skills, r => r.SkillId, s => s.Id, (r, s) => s.NormName)
            .ToListAsync();
        foreach (var s in req)
            skillCounts[s] = skillCounts.TryGetValue(s, out var c) ? c + 1 : 1;

        var docSkills = await _db.DocumentSkills
            .Join(_db.Skills, ds => ds.SkillId, s => s.Id, (ds, s) => s.NormName)
            .ToListAsync();
        foreach (var s in docSkills)
            skillCounts[s] = skillCounts.TryGetValue(s, out var c) ? c + 1 : 1;

        var topSkills = skillCounts
            .OrderByDescending(x => x.Value)
            .Take(10)
            .Select(x => new { skill = x.Key, count = x.Value })
            .ToList();

        int aiCalls = _db.ApicallLogs != null
            ? await _db.ApicallLogs.CountAsync(l => l.CreatedAt >= start && l.CreatedAt <= end)
            : await _db.Applications.CountAsync(a => a.CreatedAt >= start && a.CreatedAt <= end);

        // Get recent admin logs
        var recentLogs = await _db.AdminLogs
            .Where(l => l.CreatedAt >= start && l.CreatedAt <= end)
            .OrderByDescending(l => l.CreatedAt)
            .Take(10)
            .Select(l => new
            {
                l.Id,
                l.Actor,
                l.Action,
                l.Entity,
                l.EntityId,
                l.CreatedAt
            })
            .ToListAsync();

        return Ok(new { totals, range = new { start, end }, avgScoreByDay, topSkills, aiCalls, logs = recentLogs });
    }

    [HttpGet("logs")]
    public async Task<IActionResult> Logs([FromQuery] DateTime? from, [FromQuery] DateTime? to)
    {
        var start = from ?? DateTime.UtcNow.AddDays(-7);
        var end = to ?? DateTime.UtcNow;

        var logs = await _db.AdminLogs
            .Where(l => l.CreatedAt >= start && l.CreatedAt <= end)
            .OrderByDescending(l => l.CreatedAt)
            .Take(200)
            .ToListAsync();

        return Ok(logs);
    }

    // GET: /api/admin/candidates
    [HttpGet("candidates")]
    public async Task<IActionResult> GetCandidates(
        [FromQuery] string? search,
        [FromQuery] string? status)
    {
        var query = _db.Users
            .Where(u => u.Role == "Candidate" || string.IsNullOrEmpty(u.Role))
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(u => 
                u.DisplayName.Contains(search) || 
                u.Email.Contains(search));
        }

        var candidates = await query
            .OrderByDescending(u => u.CreatedAt)
            .ToListAsync();

        var list = candidates.Select(u =>
        {
            var cvCount = _db.Documents
                .Count(d => d.UserId == u.Id && d.DocType == "CV" && !d.IsDeleted);

            var lastActive = _db.Documents
                .Where(d => d.UserId == u.Id)
                .OrderByDescending(d => d.UploadedAt)
                .Select(d => d.UploadedAt)
                .FirstOrDefault();

            return new
            {
                u.Id,
                u.DisplayName,
                u.Email,
                u.Role,
                u.CreatedAt,
                CvCount = cvCount,
                LastActive = lastActive
            };
        }).ToList();

        return Ok(list);
    }

    // GET: /api/admin/recruiters
    [HttpGet("recruiters")]
    public async Task<IActionResult> GetRecruiters(
        [FromQuery] string? search,
        [FromQuery] string? accountType)
    {
        var query = _db.Users
            .Where(u => u.Role == "Recruiter")
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(u => 
                u.DisplayName.Contains(search) || 
                u.Email.Contains(search));
        }

        var recruiters = await query
            .OrderByDescending(u => u.CreatedAt)
            .ToListAsync();

        var list = recruiters.Select(u =>
        {
            var openJobsCount = _db.Jobs
                .Count(j => j.UserId == u.Id);

            var license = _db.LicenseKeys
                .FirstOrDefault(l => l.AssignedUserId == u.Id && l.IsActive);

            return new
            {
                u.Id,
                u.DisplayName,
                u.Email,
                u.CreatedAt,
                OpenJobsCount = openJobsCount,
                Plan = license?.Plan ?? "Free",
                LicenseExpiry = license?.Expiry
            };
        }).ToList();

        return Ok(list);
    }

    // GET: /api/admin/recruiters/{id}/jobs - Get jobs for a specific recruiter
    [HttpGet("recruiters/{id:int}/jobs")]
    public async Task<IActionResult> GetRecruiterJobs(int id)
    {
        var recruiter = await _db.Users.FindAsync(id);
        if (recruiter == null || recruiter.Role != "Recruiter")
            return NotFound("Recruiter not found.");

        var jobs = await _db.Jobs
            .Where(j => j.UserId == id)
            .Select(j => new
            {
                j.Id,
                j.Title,
                j.Company,
                j.CreatedAt
            })
            .OrderByDescending(j => j.CreatedAt)
            .ToListAsync();

        return Ok(jobs);
    }

    // PUT: /api/admin/users/{id} - Update user information
    [HttpPut("users/{id:int}")]
    public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdateUserDto dto)
    {
        var user = await _db.Users.FindAsync(id);
        if (user == null)
            return NotFound("User not found.");

        // Check if email is already taken by another user
        if (!string.IsNullOrWhiteSpace(dto.Email) && dto.Email != user.Email)
        {
            var emailExists = await _db.Users
                .AnyAsync(u => u.Email == dto.Email && u.Id != id);
            if (emailExists)
                return BadRequest("Email is already taken by another user.");
        }

        if (!string.IsNullOrWhiteSpace(dto.DisplayName))
            user.DisplayName = dto.DisplayName;

        if (!string.IsNullOrWhiteSpace(dto.Email))
            user.Email = dto.Email;

        await _db.SaveChangesAsync();

        return Ok(new { 
            Message = "User updated successfully.",
            User = new
            {
                user.Id,
                user.DisplayName,
                user.Email,
                user.Role
            }
        });
    }

    public record UpdateUserDto(string? DisplayName, string? Email);
}