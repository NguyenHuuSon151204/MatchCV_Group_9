using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using matchCV_Project.Data;
using matchCV_Project.Interfaces;
using matchCV_Project.Models;

namespace matchCV_Project.Controllers;

[ApiController]
[Route("api/recruiter")]
public class RecruiterController : ControllerBase
{
    private readonly MatchCvContext _db;
    private readonly IAiService _ai;
    private readonly IEmailService _email;
    private readonly ILogger<RecruiterController> _logger;

    public record JobRequestDto(
        string Title,
        string? Company,
        string Description,
        List<string>? Skills,
        int? RecruiterId
    );


    public RecruiterController(MatchCvContext db, IAiService ai, IEmailService email, ILogger<RecruiterController> logger)
    {
        _db = db;
        _ai = ai;
        _email = email;
        _logger = logger;
    }

    // GET: /api/recruiter/dashboard
    [HttpGet("dashboard")]
    public async Task<IActionResult> GetDashboard()
    {
        try
        {
            _logger.LogInformation("GetDashboard called");
            
            var scoresQuery = _db.Applications
                .Where(a => a.ScoreSnapshot.HasValue)
                .Select(a => a.ScoreSnapshot!.Value);

            double? averageScore = null;
            if (await scoresQuery.AnyAsync())
            {
                var avgValue = await scoresQuery.AverageAsync();
                averageScore = Math.Round(avgValue, 1);
            }

            var currentUserId = 0;
            if (User.Identity?.IsAuthenticated == true)
            {
                var idClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
                if (idClaim != null && int.TryParse(idClaim.Value, out int uid))
                {
                    currentUserId = uid;
                }
            }

            if (currentUserId == 0)
            {
                return Unauthorized("User not authenticated or invalid ID.");
            }

            var sevenDaysAgo = DateTime.UtcNow.AddDays(-7);

            // Calculate summary safely - Filter by currentUserId
            var totalJobs = await _db.Jobs.CountAsync(j => j.UserId == currentUserId);
            
            // For applicants, we need to join with jobs owned by this user
            var totalApplicants = await _db.Applications
                .CountAsync(a => _db.Jobs.Any(j => j.Id == a.JobId && j.UserId == currentUserId));
                
            var newApplications = await _db.Applications
                .CountAsync(a => a.CreatedAt >= sevenDaysAgo && _db.Jobs.Any(j => j.Id == a.JobId && j.UserId == currentUserId));
            
            // Count active jobs - jobs that have at least one application
            var allJobsWithApps = await _db.Jobs
                .Where(j => j.UserId == currentUserId && _db.Applications.Any(a => a.JobId == j.Id))
                .CountAsync();

            var summary = new
            {
                totalJobs,
                activeJobs = allJobsWithApps,
                totalApplicants,
                averageScore,
                newApplications
            };

            // Load jobs - simplified approach - Filter by currentUserId
            var jobCards = await _db.Jobs
                .Where(j => j.UserId == currentUserId)
                .OrderByDescending(j => j.CreatedAt)
                .Take(10)
                .AsNoTracking()
                .ToListAsync();

            // Load related data separately to avoid Include issues
            var jobIds = jobCards.Select(j => j.Id).ToList();
            
            if (jobIds.Count == 0)
            {
                // No jobs, return empty data
                return Ok(new
                {
                    summary,
                    jobs = new List<object>(),
                    recentApplicants = new List<object>(),
                    topSkills = new List<object>()
                });
            }
            
            var allApplications = await _db.Applications
                .Where(a => jobIds.Contains(a.JobId))
                .AsNoTracking()
                .ToListAsync();

            var candidateIds = allApplications.Select(a => a.CandidateId).Distinct().ToList();
            var candidates = candidateIds.Count > 0 
                ? await _db.Users.Where(u => candidateIds.Contains(u.Id)).AsNoTracking().ToDictionaryAsync(u => u.Id, u => u)
                : new Dictionary<int, User>();

            var allRequiredSkills = await _db.RequiredSkills
                .Where(rs => jobIds.Contains(rs.JobId))
                .AsNoTracking()
                .ToListAsync();

            var skillIds = allRequiredSkills.Select(rs => rs.SkillId).Distinct().ToList();
            var skills = skillIds.Count > 0
                ? await _db.Skills.Where(s => skillIds.Contains(s.Id)).AsNoTracking().ToDictionaryAsync(s => s.Id, s => s)
                : new Dictionary<int, Skill>();

            // Group by job for easier access
            var applicationsByJob = allApplications
                .GroupBy(a => a.JobId)
                .ToDictionary(g => g.Key, g => g.ToList());
            var skillsByJob = allRequiredSkills
                .GroupBy(rs => rs.JobId)
                .ToDictionary(g => g.Key, g => g.ToList());

            var jobs = new List<object>();
            foreach (var j in jobCards)
            {
                try
                {
                    // Get applications for this job
                    var applications = applicationsByJob.ContainsKey(j.Id) ? applicationsByJob[j.Id] : new List<Application>();
                    
                    // Get required skills for this job
                    var requiredSkills = skillsByJob.ContainsKey(j.Id) ? skillsByJob[j.Id] : new List<RequiredSkill>();
                    
                    // Calculate top skill
                    var topSkill = requiredSkills
                        .Where(rs => skills.ContainsKey(rs.SkillId))
                        .Select(rs => skills[rs.SkillId].NormName)
                        .GroupBy(name => name)
                        .OrderByDescending(g => g.Count())
                        .Select(g => g.Key)
                        .FirstOrDefault();

                    // Calculate average score
                    var scores = applications
                        .Where(a => a.ScoreSnapshot.HasValue)
                        .Select(a => a.ScoreSnapshot!.Value)
                        .ToList();
                    double? avgScore = scores.Count > 0 ? Math.Round(scores.Average(), 1) : null;

                    // Get top candidates
                    var topCandidates = applications
                        .Where(a => candidates.ContainsKey(a.CandidateId))
                        .OrderByDescending(a => a.ScoreSnapshot)
                        .ThenByDescending(a => a.CreatedAt)
                        .Take(3)
                        .Select(a =>
                        {
                            var candidate = candidates[a.CandidateId];
                            return new
                            {
                                id = a.Id,
                                name = candidate?.DisplayName ?? "Unknown",
                                email = candidate?.Email ?? "",
                                score = a.ScoreSnapshot,
                                status = a.Status ?? "Pending"
                            };
                        })
                        .ToList();

                    jobs.Add(new
                    {
                        id = j.Id,
                        title = j.Title ?? "",
                        company = j.Company,
                        createdAt = j.CreatedAt,
                        applicants = applications.Count,
                        avgScore,
                        topSkill,
                        topCandidates
                    });
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "Error processing job {JobId} in dashboard", j.Id);
                    // Continue with next job instead of failing entire request
                }
            }

            // Load recent applicants separately to avoid Include issues
            var recentApplicantsList = await _db.Applications
                .Where(a => _db.Jobs.Any(j => j.Id == a.JobId && j.UserId == currentUserId)) // Filter by user's jobs
                .OrderByDescending(a => a.CreatedAt)
                .Take(8)
                .AsNoTracking()
                .ToListAsync();

            List<object> recentApplicants;
            if (recentApplicantsList.Count > 0)
            {
                var recentCandidateIds = recentApplicantsList.Select(a => a.CandidateId).Distinct().ToList();
                var recentJobIds = recentApplicantsList.Select(a => a.JobId).Distinct().ToList();
                
                var candidatesDict = recentCandidateIds.Count > 0
                    ? await _db.Users.Where(u => recentCandidateIds.Contains(u.Id)).AsNoTracking().ToDictionaryAsync(u => u.Id, u => u)
                    : new Dictionary<int, User>();
                
                var jobsDict = recentJobIds.Count > 0
                    ? await _db.Jobs.Where(j => recentJobIds.Contains(j.Id)).AsNoTracking().ToDictionaryAsync(j => j.Id, j => j)
                    : new Dictionary<int, Job>();

                recentApplicants = recentApplicantsList.Select(a => new
                {
                    id = a.Id,
                    candidateName = candidatesDict.ContainsKey(a.CandidateId) 
                        ? candidatesDict[a.CandidateId].DisplayName ?? "Unknown"
                        : "Unknown",
                    candidateEmail = candidatesDict.ContainsKey(a.CandidateId)
                        ? candidatesDict[a.CandidateId].Email ?? ""
                        : "",
                    jobTitle = jobsDict.ContainsKey(a.JobId)
                        ? jobsDict[a.JobId].Title ?? "Unknown"
                        : "Unknown",
                    jobId = a.JobId,
                    status = a.Status ?? "Pending",
                    score = a.ScoreSnapshot,
                    createdAt = a.CreatedAt
                }).Cast<object>().ToList();
            }
            else
            {
                recentApplicants = new List<object>();
            }

            // Get top required skills across all jobs - simplified approach
            var topSkillsList = await _db.RequiredSkills
                .AsNoTracking()
                .ToListAsync();

            var topSkillIds = topSkillsList.Select(rs => rs.SkillId).Distinct().ToList();
            var skillsForTop = topSkillIds.Count > 0
                ? await _db.Skills.Where(s => topSkillIds.Contains(s.Id)).AsNoTracking().ToDictionaryAsync(s => s.Id, s => s)
                : new Dictionary<int, Skill>();

            var topSkills = topSkillsList
                .Where(rs => skillsForTop.ContainsKey(rs.SkillId))
                .GroupBy(rs => skillsForTop[rs.SkillId].NormName)
                .Select(g => new
                {
                    name = g.Key,
                    count = g.Count()
                })
                .OrderByDescending(x => x.count)
                .Take(8)
                .ToList();

            return Ok(new
            {
                summary,
                jobs,
                recentApplicants,
                topSkills
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error in GetDashboard: {Message}\n{StackTrace}", ex.Message, ex.StackTrace);
            return StatusCode(500, new { message = "An error occurred while loading dashboard data.", error = ex.Message, stackTrace = ex.StackTrace });
        }
    }

    // GET: /api/recruiter/jobs
    [HttpGet("jobs")]
    public async Task<IActionResult> GetJobs([FromQuery] string? q, [FromQuery] string? company)
    {
        try
        {
            var currentUserId = 0;
            if (User.Identity?.IsAuthenticated == true)
            {
                var idClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
                if (idClaim != null && int.TryParse(idClaim.Value, out int uid))
                {
                    currentUserId = uid;
                }
            }

            if (currentUserId == 0)
            {
                return Unauthorized("User not authenticated.");
            }

            var query = _db.Jobs.Where(j => j.UserId == currentUserId).AsQueryable();

            if (!string.IsNullOrWhiteSpace(q))
            {
                var searchTerm = q.Trim().ToLower();
                query = query.Where(j => 
                    j.Title.ToLower().Contains(searchTerm) ||
                    (j.Company != null && j.Company.ToLower().Contains(searchTerm)) ||
                    (j.RawText != null && j.RawText.ToLower().Contains(searchTerm))
                );
            }

            if (!string.IsNullOrWhiteSpace(company))
            {
                query = query.Where(j => j.Company != null && j.Company.ToLower().Contains(company.Trim().ToLower()));
            }

            var jobList = await query
                .OrderByDescending(j => j.CreatedAt)
                .AsNoTracking()
                .ToListAsync();

            if (jobList.Count == 0)
            {
                return Ok(new List<object>());
            }

            // Load related data separately
            var jobIds = jobList.Select(j => j.Id).ToList();
            
            var allApplications = await _db.Applications
                .Where(a => jobIds.Contains(a.JobId))
                .AsNoTracking()
                .ToListAsync();

            var allRequiredSkills = await _db.RequiredSkills
                .Where(rs => jobIds.Contains(rs.JobId))
                .AsNoTracking()
                .ToListAsync();

            var jobSkillIds = allRequiredSkills.Select(rs => rs.SkillId).Distinct().ToList();
            var skills = jobSkillIds.Count > 0
                ? await _db.Skills.Where(s => jobSkillIds.Contains(s.Id)).AsNoTracking().ToDictionaryAsync(s => s.Id, s => s)
                : new Dictionary<int, Skill>();

            // Group by job
            var applicationsByJob = allApplications
                .GroupBy(a => a.JobId)
                .ToDictionary(g => g.Key, g => g.ToList());
            var skillsByJob = allRequiredSkills
                .GroupBy(rs => rs.JobId)
                .ToDictionary(g => g.Key, g => g.ToList());

            var jobs = new List<object>();
            foreach (var j in jobList)
            {
                try
                {
                    // Get applications for this job
                    var applications = applicationsByJob.ContainsKey(j.Id) ? applicationsByJob[j.Id] : new List<Application>();
                    
                    // Calculate average score
                    var scores = applications
                        .Where(a => a.ScoreSnapshot.HasValue)
                        .Select(a => a.ScoreSnapshot!.Value)
                        .ToList();
                    double? avgScore = scores.Count > 0 ? Math.Round(scores.Average(), 1) : null;

                    // Get required skills for this job
                    var requiredSkills = skillsByJob.ContainsKey(j.Id) ? skillsByJob[j.Id] : new List<RequiredSkill>();
                    
                    // Calculate top skill
                    var topSkill = requiredSkills
                        .Where(rs => skills.ContainsKey(rs.SkillId))
                        .Select(rs => skills[rs.SkillId].NormName)
                        .GroupBy(name => name)
                        .OrderByDescending(g => g.Count())
                        .Select(g => g.Key)
                        .FirstOrDefault();

                    jobs.Add(new
                    {
                        id = j.Id,
                        title = j.Title ?? "",
                        company = j.Company,
                        createdAt = j.CreatedAt,
                        applicants = applications.Count,
                        avgScore,
                        topSkill
                    });
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "Error processing job {JobId} in GetJobs", j.Id);
                    // Continue with next job instead of failing entire request
                }
            }

            return Ok(jobs);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error in GetJobs");
            return StatusCode(500, new { message = "An error occurred while loading jobs.", error = ex.Message });
        }
    }

    // GET: /api/recruiter/jobs/{id}
    [HttpGet("jobs/{id:int}")]
    public async Task<IActionResult> GetJob(int id)
    {
        var currentUserId = 0;
        if (User.Identity?.IsAuthenticated == true)
        {
            var idClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
            if (idClaim != null && int.TryParse(idClaim.Value, out int uid))
            {
                currentUserId = uid;
            }
        }
        
        // Security check: verify job exists and belongs to current user
        if (currentUserId != 0)
        {
            var jobOwnerId = await _db.Jobs
                .Where(j => j.Id == id)
                .Select(j => (int?)j.UserId)
                .FirstOrDefaultAsync();
                
            if (jobOwnerId == null)
            {
                return NotFound("Job not found.");
            }
            
            if (jobOwnerId != currentUserId && !User.IsInRole("Admin"))
            {
                return Forbid();
            }
        }
        
        var job = await BuildJobDetailDto(id);
        return job is null ? NotFound("Job not found.") : Ok(job);
    }

    // POST: /api/recruiter/jobs
    [HttpPost("jobs")]
    public async Task<IActionResult> CreateJob([FromBody] JobRequestDto input)
    {
        if (input is null)
            return BadRequest("Payload is required.");

        if (string.IsNullOrWhiteSpace(input.Title))
            return BadRequest("Title is required.");

        if (string.IsNullOrWhiteSpace(input.Description))
            return BadRequest("Description is required.");

        var recruiterId = input.RecruiterId;
        if (!recruiterId.HasValue || recruiterId.Value == 0)
        {
            recruiterId = await _db.Users
                .Where(u => u.Role == "Recruiter")
                .Select(u => u.Id)
                .FirstOrDefaultAsync();
        }

        if (!recruiterId.HasValue || recruiterId.Value == 0)
        {
            return BadRequest("No recruiter user found to own this job.");
        }

        var job = new Job
        {
            Title = input.Title.Trim(),
            Company = string.IsNullOrWhiteSpace(input.Company) ? "Your Company" : input.Company.Trim(),
            RawText = input.Description.Trim(),
            UserId = recruiterId.Value,
            CreatedAt = DateTime.UtcNow
        };

        _db.Jobs.Add(job);
        await _db.SaveChangesAsync();

        await ReplaceJobSkillsAsync(job, input.Skills);

        var result = await BuildJobDetailDto(job.Id);
        return CreatedAtAction(nameof(GetJob), new { id = job.Id }, result);
    }


    // PUT: /api/recruiter/jobs/{id}
    [HttpPut("jobs/{id:int}")]
    public async Task<IActionResult> UpdateJob(int id, [FromBody] JobRequestDto input)
    {
        if (input is null)
            return BadRequest("Payload is required.");

        if (string.IsNullOrWhiteSpace(input.Title))
            return BadRequest("Title is required.");

        if (string.IsNullOrWhiteSpace(input.Description))
            return BadRequest("Description is required.");

        var job = await _db.Jobs.FirstOrDefaultAsync(j => j.Id == id);
        if (job is null) return NotFound("Job not found.");

        job.Title = input.Title.Trim();
        job.Company = string.IsNullOrWhiteSpace(input.Company) ? job.Company : input.Company.Trim();
        job.RawText = input.Description.Trim();

        await _db.SaveChangesAsync();
        await ReplaceJobSkillsAsync(job, input.Skills);

        var result = await BuildJobDetailDto(job.Id);
        return Ok(result);
    }

    // DELETE: /api/recruiter/jobs/{id}
    [HttpDelete("jobs/{id:int}")]
    public async Task<IActionResult> DeleteJob(int id)
    {
        var job = await _db.Jobs.FindAsync(id);
        if (job is null) return NotFound("Job not found.");
        _db.Jobs.Remove(job);
        await _db.SaveChangesAsync();
        return NoContent();
    }

    // GET: /api/recruiter/jobs/{id}/applications
    [HttpGet("jobs/{id:int}/applications")]
    public async Task<IActionResult> GetApplications(int id,
        [FromQuery] string? status,
        [FromQuery] int? minScore)
    {
        var jobExists = await _db.Jobs.AnyAsync(j => j.Id == id);
        if (!jobExists) return NotFound("Job not found.");

        // Security check: ensure job belongs to current user
        if (User.Identity?.IsAuthenticated == true)
        {
            var idClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
            if (idClaim != null && int.TryParse(idClaim.Value, out int currentUserId))
            {
                 var isOwner = await _db.Jobs.AnyAsync(j => j.Id == id && j.UserId == currentUserId);
                 if (!isOwner && !User.IsInRole("Admin"))
                 {
                     return Forbid();
                 }
            }
        }

        // Lấy danh sách RequiredSkills của job
        var requiredSkillIds = await _db.RequiredSkills
            .Where(r => r.JobId == id)
            .Select(r => r.SkillId)
            .ToListAsync();

        var q = _db.Applications
            .Where(a => a.JobId == id)
            .Join(_db.Users, a => a.CandidateId, u => u.Id, (a, u) => new { a, Candidate = u })
            .Join(_db.Documents, x => x.a.DocumentId, d => d.Id, (x, d) => new { x.a, x.Candidate, Cv = d });

        if (!string.IsNullOrWhiteSpace(status))
            q = q.Where(x => x.a.Status == status);
        if (minScore.HasValue)
            q = q.Where(x => (x.a.ScoreSnapshot ?? 0) >= minScore.Value);

        var applications = await q
            .OrderByDescending(x => x.a.ScoreSnapshot)
            .ToListAsync();

        // Tính Matching Skills cho mỗi application
        var list = applications.Select(x =>
        {
            // Lấy các skills của CV mà cũng là RequiredSkills của job
            var matchingSkills = _db.DocumentSkills
                .Where(ds => ds.DocumentId == x.Cv.Id && requiredSkillIds.Contains(ds.SkillId))
                .Join(_db.Skills, ds => ds.SkillId, s => s.Id, (ds, s) => s.NormName)
                .Distinct()
                .ToList();

            // Get candidate's plan
            var license = _db.LicenseKeys
                .FirstOrDefault(l => l.AssignedUserId == x.Candidate.Id && l.IsActive);
            var candidatePlan = license?.Plan ?? "Free";

            return new
            {
                x.a.Id,
                x.a.Status,
                x.a.ScoreSnapshot,
                x.a.Summary,
                x.a.CreatedAt,
                MatchingSkills = matchingSkills,
                Candidate = new
                {
                    x.Candidate.Id,
                    x.Candidate.DisplayName,
                    x.Candidate.Email,
                    Plan = candidatePlan
                },
                Document = new
                {
                    x.Cv.Id,
                    x.Cv.OriginalName,
                    x.Cv.StoragePath
                }
            };
        }).ToList();

        return Ok(list);
    }

    // POST: /api/recruiter/jobs/{id}/apply
    public record ApplyDto(int DocumentId, int CandidateId);

    [HttpPost("jobs/{id:int}/apply")]
    public async Task<IActionResult> Apply(int id, [FromBody] ApplyDto dto)
    {
        var job = await _db.Jobs
            .Include(j => j.User)
            .FirstOrDefaultAsync(j => j.Id == id);
        var cv = await _db.Documents.FirstOrDefaultAsync(d => d.Id == dto.DocumentId && d.DocType == "CV");
        var user = await _db.Users.FindAsync(dto.CandidateId);

        if (job is null || cv is null || user is null)
            return BadRequest("Invalid Job/CV/User.");

        var score = _ai.ScoreMatch(job, cv);
        var summary = _ai.SummarizeCv(cv);

        var app = new Application
        {
            JobId = job.Id,
            DocumentId = cv.Id,
            CandidateId = user.Id,
            Status = "Pending",
            ScoreSnapshot = score,
            Summary = summary,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _db.Applications.Add(app);
        _db.AdminLogs.Add(new AdminLog
        {
            Actor = user.Email,
            Action = "Apply",
            Entity = "Application",
            EntityId = app.Id,
            MetaJson = "{}",
            CreatedAt = DateTime.UtcNow
        });

        await _db.SaveChangesAsync();

        if (job.User != null)
        {
            try
            {
                await _email.SendNewApplicationAsync(
                    job.User.Email,
                    job.User.DisplayName,
                    job.Title,
                    user.DisplayName,
                    app.ScoreSnapshot);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to send notification email for application {ApplicationId}", app.Id);
            }
        }

        return Ok(new { app.Id, app.ScoreSnapshot, app.Status });
    }

    // GET: /api/recruiter/applications/{id}
    [HttpGet("applications/{id:int}")]
    public async Task<IActionResult> GetApplication(int id)
    {
        var app = await _db.Applications
            .Where(a => a.Id == id)
            .Join(_db.Users, a => a.CandidateId, u => u.Id, (a, u) => new { a, Candidate = u })
            .Join(_db.Documents, x => x.a.DocumentId, d => d.Id, (x, d) => new { x.a, x.Candidate, Cv = d })
            .Join(_db.Jobs, x => x.a.JobId, j => j.Id, (x, j) => new { x.a, x.Candidate, x.Cv, Job = j })
            .FirstOrDefaultAsync();

        if (app is null) return NotFound("Application not found.");

        // Lấy RequiredSkills của job
        var requiredSkillIds = await _db.RequiredSkills
            .Where(r => r.JobId == app.a.JobId)
            .Select(r => r.SkillId)
            .ToListAsync();

        // Tính Matching Skills
        var matchingSkills = _db.DocumentSkills
            .Where(ds => ds.DocumentId == app.Cv.Id && requiredSkillIds.Contains(ds.SkillId))
            .Join(_db.Skills, ds => ds.SkillId, s => s.Id, (ds, s) => s.NormName)
            .Distinct()
            .ToList();

        // Get candidate's plan
        var license = _db.LicenseKeys
            .FirstOrDefault(l => l.AssignedUserId == app.Candidate.Id && l.IsActive);
        var candidatePlan = license?.Plan ?? "Free";

        var result = new
        {
            app.a.Id,
            app.a.Status,
            app.a.ScoreSnapshot,
            app.a.Summary,
            app.a.CreatedAt,
            app.a.UpdatedAt,
            MatchingSkills = matchingSkills,
            Candidate = new
            {
                app.Candidate.Id,
                app.Candidate.DisplayName,
                app.Candidate.Email,
                Plan = candidatePlan
            },
            Document = new
            {
                app.Cv.Id,
                app.Cv.OriginalName,
                app.Cv.StoragePath
            },
            Job = new
            {
                app.Job.Id,
                app.Job.Title,
                app.Job.Company,
                app.Job.RawText
            }
        };

        return Ok(result);
    }

    // PATCH: /api/recruiter/applications/{id}/status
    public record StatusDto(string Status);

    [HttpPatch("applications/{id:int}/status")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] StatusDto dto)
    {
        var app = await _db.Applications.FindAsync(id);
        if (app is null) return NotFound("Application not found.");

        app.Status = dto.Status;
        app.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return NoContent();
    }

    // DELETE: /api/recruiter/applications/{id}
    [HttpDelete("applications/{id:int}")]
    public async Task<IActionResult> DeleteApplication(int id)
    {
        var app = await _db.Applications.FindAsync(id);
        if (app is null) return NotFound("Application not found.");

        _db.Applications.Remove(app);
        await _db.SaveChangesAsync();
        return NoContent();
    }

    private async Task<object?> BuildJobDetailDto(int id)
    {
        return await _db.Jobs
            .AsNoTracking()
            .Where(j => j.Id == id)
            .Select(j => new
            {
                j.Id,
                j.Title,
                j.Company,
                j.RawText,
                j.UserId,
                j.CreatedAt,
                skills = j.RequiredSkills
                    .Where(rs => rs.Skill != null)
                    .OrderBy(rs => rs.Skill!.NormName)
                    .Select(rs => rs.Skill!.NormName)
                    .ToList()
            })
            .FirstOrDefaultAsync();
    }

    private async Task ReplaceJobSkillsAsync(Job job, IEnumerable<string>? skillNames)
    {
        if (skillNames is null)
        {
            return;
        }

        var normalized = NormalizeSkills(skillNames);
        var existing = await _db.RequiredSkills
            .Where(rs => rs.JobId == job.Id)
            .ToListAsync();

        if (existing.Count > 0)
        {
            _db.RequiredSkills.RemoveRange(existing);
            await _db.SaveChangesAsync();
        }

        if (normalized.Count == 0)
        {
            return;
        }

        var skills = await EnsureSkillsExistAsync(normalized);
        var requiredSkills = normalized.Select(name =>
        {
            var skill = skills.First(s => s.NormName.Equals(name, StringComparison.OrdinalIgnoreCase));
            return new RequiredSkill
            {
                JobId = job.Id,
                SkillId = skill.Id,
                MustHave = true
            };
        }).ToList();

        _db.RequiredSkills.AddRange(requiredSkills);
        await _db.SaveChangesAsync();
    }

    private async Task<List<Skill>> EnsureSkillsExistAsync(IEnumerable<string> skillNames)
    {
        var names = skillNames.ToList();
        if (names.Count == 0) return new List<Skill>();

        var lowered = names.Select(n => n.ToLower()).ToList();
        var existing = await _db.Skills
            .Where(s => lowered.Contains(s.NormName.ToLower()))
            .ToListAsync();

        var missing = names
            .Where(name => !existing.Any(s => s.NormName.Equals(name, StringComparison.OrdinalIgnoreCase)))
            .ToList();

        if (missing.Count > 0)
        {
            var newSkills = missing.Select(name => new Skill
            {
                Name = name,
                NormName = name
            }).ToList();

            _db.Skills.AddRange(newSkills);
            await _db.SaveChangesAsync();
            existing.AddRange(newSkills);
        }

        return existing;
    }

    private static List<string> NormalizeSkills(IEnumerable<string> skillNames)
    {
        return skillNames
            .Select(s => (s ?? string.Empty).Trim())
            .Where(s => !string.IsNullOrWhiteSpace(s))
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToList();
    }

    private static double? CalculateAverageScore(IEnumerable<Application> applications)
    {
        var scores = applications
            .Where(a => a.ScoreSnapshot.HasValue)
            .Select(a => a.ScoreSnapshot!.Value)
            .ToList();

        if (scores.Count == 0) return null;

        return Math.Round(scores.Average(), 1);
    }
}
