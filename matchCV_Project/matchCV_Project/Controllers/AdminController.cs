using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using matchCV_Project.Data;
using matchCV_Project.Models;
using System.Text.Json;

namespace matchCV_Project.Controllers;

[ApiController]
[Route("api/admin")]
public class AdminController : ControllerBase
{
    private readonly MatchCvContext _db;
    public AdminController(MatchCvContext db) => _db = db;

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
                .OrderByDescending(d => d.CreatedAt)
                .Select(d => d.CreatedAt)
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

    // GET: /api/admin/jobs - Get all jobs with recruiter info
    [HttpGet("jobs")]
    public async Task<IActionResult> GetAllJobs([FromQuery] string? search)
    {
        var query = _db.Jobs
            .Include(j => j.User)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(j =>
                j.Title.Contains(search) ||
                j.Company.Contains(search) ||
                (j.JobDescription != null && j.JobDescription.Contains(search)));
        }

        var jobs = await query
            .OrderByDescending(j => j.CreatedAt)
            .ToListAsync();

        var result = jobs.Select(j =>
        {
            var applicationsCount = _db.Applications.Count(a => a.JobId == j.Id);
            var avgScore = _db.Applications
                .Where(a => a.JobId == j.Id && a.ScoreSnapshot.HasValue)
                .Average(a => (double?)a.ScoreSnapshot);

            return new
            {
                j.Id,
                j.Title,
                j.Company,
                Description = j.JobDescription,
                j.CreatedAt,
                j.UserId,
                RecruiterName = j.User?.DisplayName,
                RecruiterEmail = j.User?.Email,
                ApplicationsCount = applicationsCount,
                AvgScore = avgScore
            };
        }).ToList();

        return Ok(result);
    }

    // DELETE: /api/admin/jobs/{id} - Delete a job with reason logging
    [HttpDelete("jobs/{id:int}")]
    public async Task<IActionResult> DeleteJob(int id, [FromQuery] string reason)
    {
        if (string.IsNullOrWhiteSpace(reason))
            return BadRequest("Deletion reason is required.");

        var job = await _db.Jobs.FindAsync(id);
        if (job == null)
            return NotFound("Job not found.");

        // Log the deletion
        _db.AdminLogs.Add(new AdminLog
        {
            Actor = "Admin",
            Action = "DELETE",
            Entity = "Job",
            EntityId = id,
            CreatedAt = DateTime.UtcNow,
            MetaJson = $"{{\"reason\":\"{reason}\"}}"
        });

        _db.Jobs.Remove(job);
        await _db.SaveChangesAsync();

        return Ok(new { Message = "Job deleted successfully." });
    }

    // GET: /api/admin/applications - Get all applications
    [HttpGet("applications")]
    public async Task<IActionResult> GetAllApplications(
        [FromQuery] string? search,
        [FromQuery] string? status)
    {
        var query = _db.Applications
            .Include(a => a.Candidate)
            .Include(a => a.Job)
                .ThenInclude(j => j.User)
            .Include(a => a.Document)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(a =>
                a.Candidate.DisplayName.Contains(search) ||
                a.Candidate.Email.Contains(search) ||
                a.Job.Title.Contains(search) ||
                a.Job.Company.Contains(search));
        }

        if (!string.IsNullOrWhiteSpace(status))
        {
            query = query.Where(a => a.Status == status);
        }

        var applications = await query
            .OrderByDescending(a => a.CreatedAt)
            .ToListAsync();

        var result = applications.Select(a => new
        {
            a.Id,
            a.JobId,
            a.CandidateId,
            a.Status,
            a.ScoreSnapshot,
            a.Summary,
            a.CreatedAt,
            a.UpdatedAt,
            CandidateName = a.Candidate.DisplayName,
            CandidateEmail = a.Candidate.Email,
            JobTitle = a.Job.Title,
            JobCompany = a.Job.Company,
            RecruiterName = a.Job.User?.DisplayName,
            RecruiterEmail = a.Job.User?.Email,
            RecruiterId = a.Job.UserId
        }).ToList();

        return Ok(result);
    }

    // PUT: /api/admin/applications/{id}/status - Update application status
    [HttpPut("applications/{id:int}/status")]
    public async Task<IActionResult> UpdateApplicationStatus(
        int id,
        [FromBody] UpdateApplicationStatusDto dto)
    {
        var application = await _db.Applications.FindAsync(id);
        if (application == null)
            return NotFound("Application not found.");

        var oldStatus = application.Status;
        application.Status = dto.Status;
        application.UpdatedAt = DateTime.UtcNow;

        // Log the status change
        _db.AdminLogs.Add(new AdminLog
        {
            Actor = "Admin",
            Action = "UPDATE",
            Entity = "Application",
            EntityId = id,
            CreatedAt = DateTime.UtcNow,
            MetaJson = $"{{\"oldStatus\":\"{oldStatus}\",\"newStatus\":\"{dto.Status}\",\"notes\":\"{dto.AdminNotes}\"}}"
        });

        await _db.SaveChangesAsync();

        return Ok(new
        {
            Message = "Application status updated successfully.",
            Application = new
            {
                application.Id,
                application.Status,
                application.UpdatedAt
            }
        });
    }

    // GET: /api/admin/ai-status - Get AI system status and statistics
    [HttpGet("ai-status")]
    public async Task<IActionResult> GetAIStatus()
    {
        var now = DateTime.UtcNow;
        var last30Days = now.AddDays(-30);

        // Total AI calls
        var totalCalls = _db.ApicallLogs != null
            ? await _db.ApicallLogs.CountAsync()
            : 0;

        // Recent calls (last 30 days)
        var recentCalls = _db.ApicallLogs != null
            ? await _db.ApicallLogs
                .Where(l => l.CreatedAt >= last30Days)
                .ToListAsync()
            : new List<ApicallLog>();

        // Success rate
        var successCount = recentCalls.Count(l => l.Status == "success" || l.Status == "Success");
        var successRate = recentCalls.Count > 0
            ? (double)successCount / recentCalls.Count * 100
            : 0;

        // Average latency
        var avgLatency = recentCalls.Any(l => l.LatencyMs.HasValue)
            ? recentCalls.Where(l => l.LatencyMs.HasValue).Average(l => l.LatencyMs!.Value)
            : 0;

        // Most used model
        var mostUsedModel = recentCalls
            .GroupBy(l => l.Model)
            .OrderByDescending(g => g.Count())
            .Select(g => g.Key)
            .FirstOrDefault() ?? "gemini-pro";

        // Most used provider
        var mostUsedProvider = recentCalls
            .GroupBy(l => l.Provider)
            .OrderByDescending(g => g.Count())
            .Select(g => g.Key)
            .FirstOrDefault() ?? "Google";

        // Total tokens
        var totalTokensIn = recentCalls.Sum(l => l.TokensIn ?? 0);
        var totalTokensOut = recentCalls.Sum(l => l.TokensOut ?? 0);

        // Total cost estimate
        var totalCost = recentCalls.Sum(l => l.CostEstimate ?? 0);

        // Recent activity (last 10 calls)
        var recentActivity = _db.ApicallLogs != null
            ? (await _db.ApicallLogs
                .OrderByDescending(l => l.CreatedAt)
                .Take(10)
                .Select(l => new
                {
                    l.Id,
                    l.Provider,
                    l.Model,
                    l.Status,
                    l.LatencyMs,
                    l.CreatedAt
                })
                .ToListAsync())
                .Cast<object>()
                .ToList()
            : new List<object>();

        return Ok(new
        {
            IsOnline = true,
            Model = mostUsedModel,
            Provider = mostUsedProvider,
            TotalCalls = totalCalls,
            RecentCalls = recentCalls.Count,
            SuccessRate = Math.Round(successRate, 2),
            ResponseTime = Math.Round(avgLatency, 0),
            TotalTokensIn = totalTokensIn,
            TotalTokensOut = totalTokensOut,
            TotalCost = Math.Round(totalCost, 4),
            RecentActivity = recentActivity,
            LastSync = DateTime.UtcNow
        });
    }

    public record UpdateUserDto(string? DisplayName, string? Email);
    public record UpdateApplicationStatusDto(string Status, string? AdminNotes);
}
