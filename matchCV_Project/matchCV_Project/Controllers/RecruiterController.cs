using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using matchCV_Project.Data;
using matchCV_Project.Interfaces;
using matchCV_Project.Models;

namespace matchCV_Project.Controllers;

[ApiController]
[Route("api/recruiter")]
public class RecruiterController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IAiService _ai;

    public record CreateJobDto(
    string Title,
    string Company,
    string RawText
);


    public RecruiterController(AppDbContext db, IAiService ai)
    {
        _db = db;
        _ai = ai;
    }

    // GET: /api/recruiter/jobs
    [HttpGet("jobs")]
    public async Task<IActionResult> GetJobs([FromQuery] string? q, [FromQuery] string? company)
    {
        var query = _db.Jobs.AsQueryable();

        if (!string.IsNullOrWhiteSpace(q))
            query = query.Where(j => j.Title.Contains(q) || j.RawText.Contains(q));

        if (!string.IsNullOrWhiteSpace(company))
            query = query.Where(j => j.Company == company);

        var jobs = await query
            .OrderByDescending(j => j.CreatedAt)
            .ToListAsync();

        // Tính toán avgScore và topSkill cho mỗi job
        var list = jobs.Select(j =>
        {
            var applications = _db.Applications
                .Where(a => a.JobId == j.Id && a.ScoreSnapshot.HasValue)
                .ToList();

            // Tính avgScore
            double? avgScore = applications.Count > 0
                ? applications.Average(a => a.ScoreSnapshot!.Value)
                : null;

            // Tìm topSkill (skill xuất hiện nhiều nhất trong RequiredSkills)
            var topSkill = _db.RequiredSkills
                .Where(r => r.JobId == j.Id)
                .Join(_db.Skills, r => r.SkillId, s => s.Id, (r, s) => s.NormName)
                .GroupBy(s => s)
                .OrderByDescending(g => g.Count())
                .Select(g => g.Key)
                .FirstOrDefault();

            return new
            {
                j.Id,
                j.Title,
                j.Company,
                j.CreatedAt,
                Applications = applications.Count + _db.Applications.Count(a => a.JobId == j.Id && !a.ScoreSnapshot.HasValue),
                AvgScore = avgScore.HasValue ? Math.Round(avgScore.Value, 1) : (double?)null,
                TopSkill = topSkill
            };
        }).ToList();

        return Ok(list);
    }

    // GET: /api/recruiter/jobs/{id}
    [HttpGet("jobs/{id:int}")]
    public async Task<IActionResult> GetJob(int id)
    {
        var job = await _db.Jobs.FindAsync(id);
        return job is null ? NotFound("Job not found.") : Ok(job);
    }

    // POST: /api/recruiter/jobs
    [HttpPost("jobs")]
    public async Task<IActionResult> CreateJob([FromBody] CreateJobDto input)
    {
        if (string.IsNullOrWhiteSpace(input.Title) || string.IsNullOrWhiteSpace(input.Company))
            return BadRequest("Title and Company are required.");

        // Tìm user recruiter mặc định (giống logic cũ)
        var recruiterId = await _db.Users
            .Where(u => u.Role == "Recruiter")
            .Select(u => u.Id)
            .FirstOrDefaultAsync();

        if (recruiterId == 0)
        {
            return BadRequest("No recruiter user found to own this job.");
        }

        var job = new Job
        {
            Title = input.Title.Trim(),
            Company = input.Company.Trim(),
            RawText = input.RawText?.Trim() ?? "",
            UserId = recruiterId,
            CreatedAt = DateTime.UtcNow
        };

        _db.Jobs.Add(job);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetJob), new { id = job.Id }, job);
    }


    // PUT: /api/recruiter/jobs/{id}
    [HttpPut("jobs/{id:int}")]
    public async Task<IActionResult> UpdateJob(int id, [FromBody] Job input)
    {
        if (id != input.Id) return BadRequest("ID mismatch.");
        var exists = await _db.Jobs.AnyAsync(j => j.Id == id);
        if (!exists) return NotFound("Job not found.");

        _db.Entry(input).State = EntityState.Modified;
        await _db.SaveChangesAsync();
        return NoContent();
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
        var job = await _db.Jobs.FindAsync(id);
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
            CreatedAt = DateTime.UtcNow
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
        return Ok(new { app.Id, app.ScoreSnapshot, app.Status });
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
}
