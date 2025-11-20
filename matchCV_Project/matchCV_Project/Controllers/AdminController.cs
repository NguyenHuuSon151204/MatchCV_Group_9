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

        return Ok(new { totals, range = new { start, end }, avgScoreByDay, topSkills, aiCalls });
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
}