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
            users = await _db.User.CountAsync(),
            cvs = await _db.Document.CountAsync(d => d.DocType == "CV" && !d.IsDeleted),
            jobs = await _db.Job.CountAsync(),
            apps = await _db.Application.CountAsync()
        };

        var avgScoreByDay = await _db.Application
            .Where(a => a.CreatedAt >= start && a.CreatedAt <= end && a.ScoreSnapshot.HasValue)
            .GroupBy(a => a.CreatedAt.Date)
            .Select(g => new { day = g.Key, avg = g.Average(x => x.ScoreSnapshot!.Value) })
            .OrderBy(x => x.day)
            .ToListAsync();

        var skillCounts = new Dictionary<string, int>(StringComparer.OrdinalIgnoreCase);

        var req = await _db.RequiredSkill
            .Join(_db.Skill, r => r.SkillId, s => s.Id, (r, s) => s.NormName)
            .ToListAsync();
        foreach (var s in req)
            skillCounts[s] = skillCounts.TryGetValue(s, out var c) ? c + 1 : 1;

        var docSkills = await _db.DocumentSkill
            .Join(_db.Skill, ds => ds.SkillId, s => s.Id, (ds, s) => s.NormName)
            .ToListAsync();
        foreach (var s in docSkills)
            skillCounts[s] = skillCounts.TryGetValue(s, out var c) ? c + 1 : 1;

        var topSkills = skillCounts
            .OrderByDescending(x => x.Value)
            .Take(10)
            .Select(x => new { skill = x.Key, count = x.Value })
            .ToList();

        int aiCalls = _db.ApicallLog != null
            ? await _db.ApicallLog.CountAsync(l => l.CreatedAt >= start && l.CreatedAt <= end)
            : await _db.Application.CountAsync(a => a.CreatedAt >= start && a.CreatedAt <= end);

        return Ok(new { totals, range = new { start, end }, avgScoreByDay, topSkills, aiCalls });
    }

    [HttpGet("logs")]
    public async Task<IActionResult> Logs([FromQuery] DateTime? from, [FromQuery] DateTime? to)
    {
        var start = from ?? DateTime.UtcNow.AddDays(-7);
        var end = to ?? DateTime.UtcNow;

        var logs = await _db.AdminLog
            .Where(l => l.CreatedAt >= start && l.CreatedAt <= end)
            .OrderByDescending(l => l.CreatedAt)
            .Take(200)
            .ToListAsync();

        return Ok(logs);
    }
}