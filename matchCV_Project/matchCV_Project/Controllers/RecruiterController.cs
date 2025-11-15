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

        var list = await query
            .OrderByDescending(j => j.CreatedAt)
            .Select(j => new
            {
                j.Id,
                j.Title,
                j.Company,
                j.CreatedAt,
                Applications = _db.Applications.Count(a => a.JobId == j.Id)
            })
            .ToListAsync();

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
    public async Task<IActionResult> CreateJob([FromBody] Job input)
    {
        if (string.IsNullOrWhiteSpace(input.Title) || string.IsNullOrWhiteSpace(input.Company))
            return BadRequest("Title and Company are required.");

        input.CreatedAt = DateTime.UtcNow;
        if (input.UserId == 0)
            input.UserId = await _db.Users
                .Where(u => u.Role == "Recruiter")
                .Select(u => u.Id)
                .FirstOrDefaultAsync();

        _db.Jobs.Add(input);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetJob), new { id = input.Id }, input);
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

        var q = _db.Applications
            .Where(a => a.JobId == id)
            .Join(_db.Users, a => a.CandidateId, u => u.Id, (a, u) => new { a, Candidate = u })
            .Join(_db.Documents, x => x.a.DocumentId, d => d.Id, (x, d) => new { x.a, x.Candidate, Cv = d });

        if (!string.IsNullOrWhiteSpace(status))
            q = q.Where(x => x.a.Status == status);
        if (minScore.HasValue)
            q = q.Where(x => (x.a.ScoreSnapshot ?? 0) >= minScore.Value);

        var list = await q
            .OrderByDescending(x => x.a.ScoreSnapshot)
            .Select(x => new
            {
                x.a.Id,
                x.a.Status,
                x.a.ScoreSnapshot,
                x.a.Summary,
                x.a.CreatedAt,
                Candidate = new
                {
                    x.Candidate.Id,
                    x.Candidate.DisplayName,
                    x.Candidate.Email
                },
                Document = new
                {
                    x.Cv.Id,
                    x.Cv.OriginalName,
                    x.Cv.StoragePath
                }
            })
            .ToListAsync();

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
}
