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
                .AsNoTracking()
                .FirstOrDefault(l => l.AssignedUserId == u.Id && l.IsActive);

            return new
            {
                u.Id,
                u.DisplayName,
                u.Email,
                u.CreatedAt,
                OpenJobsCount = openJobsCount,
                Plan = license?.Plan ?? "Free",
                LicenseExpiry = license?.Expiry,
                u.IsBanned,
                u.BanReason,
                u.BannedAt,
                u.BannedUntil
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

    [HttpGet("reports")]
    public async Task<IActionResult> GetReports([FromQuery] DateTime? from, [FromQuery] DateTime? to)
    {
        var start = from ?? DateTime.UtcNow.AddMonths(-6);
        var end = to ?? DateTime.UtcNow;

        // Applications over time (monthly)
        var applicationsRaw = await _db.Applications
            .Where(a => a.CreatedAt >= start && a.CreatedAt <= end)
            .GroupBy(a => new { a.CreatedAt.Year, a.CreatedAt.Month })
            .Select(g => new
            {
                Year = g.Key.Year,
                Month = g.Key.Month,
                count = g.Count(),
                accepted = g.Count(a => a.Status != null && a.Status.ToLower().Contains("accept"))
            })
            .ToListAsync();

        var applicationsOverTime = applicationsRaw
            .Select(x => new
            {
                date = $"{x.Year}-{x.Month:D2}",
                count = x.count,
                accepted = x.accepted
            })
            .OrderBy(x => x.date)
            .ToList();

        // Jobs by status
        var jobsByStatus = await _db.Jobs
            .GroupBy(j => j.Status ?? "Unknown")
            .Select(g => new { status = g.Key, count = g.Count() })
            .ToListAsync();

        // User growth (monthly for last 6 months)
        var userGrowth = new List<object>();
        for (int i = 5; i >= 0; i--)
        {
            var monthStart = DateTime.UtcNow.AddMonths(-i).Date;
            var monthEnd = monthStart.AddMonths(1);
            var users = await _db.Users.CountAsync(u => u.CreatedAt < monthEnd);
            var recruiters = await _db.Users.CountAsync(u => u.CreatedAt < monthEnd && u.Role == "Recruiter");
            userGrowth.Add(new
            {
                month = monthStart.ToString("MMM"),
                users,
                recruiters
            });
        }

        // Top skills
        var skillCounts = new Dictionary<string, int>(StringComparer.OrdinalIgnoreCase);
        var reqSkills = await _db.RequiredSkills
            .Join(_db.Skills, r => r.SkillId, s => s.Id, (r, s) => s.NormName)
            .ToListAsync();
        foreach (var s in reqSkills)
            skillCounts[s] = skillCounts.TryGetValue(s, out var c) ? c + 1 : 1;

        var docSkills = await _db.DocumentSkills
            .Join(_db.Skills, ds => ds.SkillId, s => s.Id, (ds, s) => s.NormName)
            .ToListAsync();
        foreach (var s in docSkills)
            skillCounts[s] = skillCounts.TryGetValue(s, out var c) ? c + 1 : 1;

        var topSkills = skillCounts
            .OrderByDescending(x => x.Value)
            .Take(6)
            .Select(x => new { skill = x.Key, count = x.Value })
            .ToList();

        // Match score distribution
        var scores = await _db.Applications
            .Where(a => a.ScoreSnapshot.HasValue)
            .Select(a => a.ScoreSnapshot!.Value)
            .ToListAsync();

        var matchScoreDistribution = new[]
        {
            new { range = "90-100", count = scores.Count(s => s >= 90 && s <= 100) },
            new { range = "80-89", count = scores.Count(s => s >= 80 && s < 90) },
            new { range = "70-79", count = scores.Count(s => s >= 70 && s < 80) },
            new { range = "60-69", count = scores.Count(s => s >= 60 && s < 70) },
            new { range = "50-59", count = scores.Count(s => s >= 50 && s < 60) },
            new { range = "<50", count = scores.Count(s => s < 50) }
        };

        // Application pipeline (mock funnel data based on actual counts)
        var totalApps = await _db.Applications.CountAsync();
        var applicationPipeline = new[]
        {
            new { stage = "Total Applications", value = totalApps, fill = "#3b82f6" },
            new { stage = "CV Reviewed", value = (int)(totalApps * 0.85), fill = "#10b981" },
            new { stage = "Interview Scheduled", value = (int)(totalApps * 0.45), fill = "#f59e0b" },
            new { stage = "Interviewed", value = (int)(totalApps * 0.32), fill = "#ef4444" },
            new { stage = "Offered", value = (int)(totalApps * 0.18), fill = "#8b5cf6" },
            new { stage = "Hired", value = (int)(totalApps * 0.12), fill = "#ec4899" }
        };

        // Summary
        var summary = new
        {
            totalUsers = await _db.Users.CountAsync(),
            totalJobs = await _db.Jobs.CountAsync(),
            totalApplications = totalApps,
            avgMatchScore = scores.Any() ? Math.Round(scores.Average(), 1) : 0
        };

        return Ok(new
        {
            applicationsOverTime,
            jobsByStatus,
            userGrowth,
            topSkills,
            matchScoreDistribution,
            applicationPipeline,
            summary
        });
    }

    // GET: /api/admin/licenses - Get all license keys
    [HttpGet("licenses")]
    public async Task<IActionResult> GetLicenses(
        [FromQuery] string? search,
        [FromQuery] string? status)
    {
        var query = _db.LicenseKeys.AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(l =>
                l.Plan.Contains(search) ||
                (l.OriginalKey != null && l.OriginalKey.Contains(search)));
        }

        if (!string.IsNullOrWhiteSpace(status))
        {
            if (status.ToLower() == "active")
                query = query.Where(l => l.IsActive);
            else if (status.ToLower() == "inactive")
                query = query.Where(l => !l.IsActive);
        }

        var licenses = await query
            .OrderByDescending(l => l.CreatedAt)
            .ToListAsync();

        var result = licenses.Select(l => new
        {
            l.Id,
            l.Plan,
            l.OriginalKey,
            l.AssignedUserId,
            AssignedUser = l.AssignedUserId != null
                ? new
                {
                    Id = l.AssignedUserId,
                    DisplayName = _db.Users.FirstOrDefault(u => u.Id == l.AssignedUserId)?.DisplayName,
                    Email = _db.Users.FirstOrDefault(u => u.Id == l.AssignedUserId)?.Email
                }
                : null,
            AssignedUserName = l.AssignedUserId != null
                ? _db.Users.FirstOrDefault(u => u.Id == l.AssignedUserId)?.DisplayName
                : null,
            l.IsActive,
            l.Expiry,
            DaysRemaining = l.Expiry.HasValue
                ? (int)(l.Expiry.Value - DateTime.UtcNow).TotalDays
                : (int?)null,
            l.CreatedAt
        }).ToList();

        return Ok(result);
    }

    // POST: /api/admin/licenses/generate - Generate a new license key
    [HttpPost("licenses/generate")]
    public async Task<IActionResult> GenerateLicense([FromBody] GenerateLicenseDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Plan))
            return BadRequest("Plan is required.");

        // Generate a random license key
        var key = Guid.NewGuid().ToString("N").ToUpper().Substring(0, 16);
        var formattedKey = $"{dto.Plan.ToUpper()}-{key.Substring(0, 4)}-{key.Substring(4, 4)}-{key.Substring(8, 4)}-{key.Substring(12, 4)}";

        // Calculate expiry date
        DateTime? expiryDate = null;
        if (dto.ExpiryDays.HasValue && dto.ExpiryDays.Value > 0)
        {
            expiryDate = DateTime.UtcNow.AddDays(dto.ExpiryDays.Value);
        }

        // Create license key
        var license = new LicenseKey
        {
            KeyHash = formattedKey,
            OriginalKey = formattedKey,
            Plan = dto.Plan,
            Expiry = expiryDate,
            IsActive = false, // Not active until assigned
            CreatedAt = DateTime.UtcNow
        };

        _db.LicenseKeys.Add(license);

        // Log the generation
        _db.AdminLogs.Add(new AdminLog
        {
            Actor = "Admin",
            Action = "CREATE",
            Entity = "License",
            EntityId = null,
            CreatedAt = DateTime.UtcNow,
            MetaJson = $"{{\"plan\":\"{dto.Plan}\",\"expiryDays\":{dto.ExpiryDays?.ToString() ?? "null"},\"key\":\"{formattedKey}\"}}"
        });

        await _db.SaveChangesAsync();

        return Ok(new
        {
            Message = "License generated successfully!",
            License = new
            {
                Id = license.Id,
                Key = formattedKey,
                Plan = license.Plan,
                Expiry = license.Expiry,
                ExpiryDays = dto.ExpiryDays,
                CreatedAt = license.CreatedAt
            }
        });
    }

    // DELETE: /api/admin/licenses/{id} - Delete a license key
    [HttpDelete("licenses/{id:int}")]
    public async Task<IActionResult> DeleteLicense(int id)
    {
        var license = await _db.LicenseKeys.FindAsync(id);
        if (license == null)
            return NotFound("License not found.");

        // Log the deletion
        _db.AdminLogs.Add(new AdminLog
        {
            Actor = "Admin",
            Action = "DELETE",
            Entity = "License",
            EntityId = id,
            CreatedAt = DateTime.UtcNow,
            MetaJson = $"{{\"plan\":\"{license.Plan}\",\"assignedUserId\":{license.AssignedUserId?.ToString() ?? "null"}}}"
        });

        _db.LicenseKeys.Remove(license);
        await _db.SaveChangesAsync();

        return Ok(new { Message = "License deleted successfully." });
    }

    // GET: /api/admin/verifications - Get all recruiter verifications
    [HttpGet("verifications")]
    public async Task<IActionResult> GetVerifications([FromQuery] string? status)
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

        var result = verifications.Select(v => new
        {
            v.Id,
            v.RecruiterId,
            RecruiterName = v.Recruiter?.DisplayName,
            RecruiterEmail = v.Recruiter?.Email,
            v.CompanyName,
            CompanyWebsite = v.CompanyEmail,
            BusinessLicenseId = v.BusinessLicenseDocumentId,
            CompanyProofId = v.CompanyProofDocumentId,
            v.Status,
            SubmittedAt = v.CreatedAt,
            v.ReviewedAt,
            ReviewedBy = v.ReviewedByAdminId,
            ReviewerName = v.ReviewedByAdmin?.DisplayName,
            v.AdminNotes
        }).ToList();

        return Ok(result);
    }

    // POST: /api/admin/recruiters/{id}/ban - Ban a recruiter
    [HttpPost("recruiters/{id:int}/ban")]
    public async Task<IActionResult> BanRecruiter(int id, [FromBody] BanRecruiterDto dto)
    {
        var recruiter = await _db.Users.FindAsync(id);
        if (recruiter == null || recruiter.Role != "Recruiter")
            return NotFound("Recruiter not found.");

        if (recruiter.IsBanned)
            return BadRequest("Recruiter is already banned.");

        if (string.IsNullOrWhiteSpace(dto.Reason))
            return BadRequest("Ban reason is required.");

        recruiter.IsBanned = true;
        recruiter.BanReason = dto.Reason.Trim();
        recruiter.BannedAt = DateTime.UtcNow;
        
        // Set ban duration
        if (dto.DurationDays.HasValue && dto.DurationDays.Value > 0)
        {
            recruiter.BannedUntil = DateTime.UtcNow.AddDays(dto.DurationDays.Value);
        }
        else
        {
            recruiter.BannedUntil = null; // Permanent ban
        }

        // Log the ban action
        _db.AdminLogs.Add(new AdminLog
        {
            Actor = "Admin",
            Action = "BAN",
            Entity = "Recruiter",
            EntityId = id,
            CreatedAt = DateTime.UtcNow,
            MetaJson = $"{{\"reason\":\"{dto.Reason}\",\"durationDays\":{dto.DurationDays?.ToString() ?? "null"},\"bannedUntil\":\"{recruiter.BannedUntil?.ToString("o") ?? "permanent"}\"}}"
        });

        await _db.SaveChangesAsync();

        return Ok(new { 
            Message = "Recruiter banned successfully.",
            Recruiter = new
            {
                recruiter.Id,
                recruiter.DisplayName,
                recruiter.IsBanned,
                recruiter.BanReason,
                recruiter.BannedAt,
                recruiter.BannedUntil
            }
        });
    }

    // POST: /api/admin/recruiters/{id}/unban - Unban a recruiter
    [HttpPost("recruiters/{id:int}/unban")]
    public async Task<IActionResult> UnbanRecruiter(int id)
    {
        var recruiter = await _db.Users.FindAsync(id);
        if (recruiter == null || recruiter.Role != "Recruiter")
            return NotFound("Recruiter not found.");

        if (!recruiter.IsBanned)
            return BadRequest("Recruiter is not banned.");

        recruiter.IsBanned = false;
        recruiter.BanReason = null;
        recruiter.BannedAt = null;
        recruiter.BannedUntil = null;

        // Log the unban action
        _db.AdminLogs.Add(new AdminLog
        {
            Actor = "Admin",
            Action = "UNBAN",
            Entity = "Recruiter",
            EntityId = id,
            CreatedAt = DateTime.UtcNow,
            MetaJson = $"{{\"recruiterId\":{id}}}"
        });

        await _db.SaveChangesAsync();

        return Ok(new { 
            Message = "Recruiter unbanned successfully.",
            Recruiter = new
            {
                recruiter.Id,
                recruiter.DisplayName,
                recruiter.IsBanned
            }
        });
    }

    public record UpdateUserDto(string? DisplayName, string? Email);
    public record UpdateApplicationStatusDto(string Status, string? AdminNotes);
    public record BanRecruiterDto(string Reason, int? DurationDays);
    public record GenerateLicenseDto(string Plan, int? ExpiryDays);
}
