using matchCV_Project.Data;
using matchCV_Project.Interfaces;
using matchCV_Project.Models;
using Microsoft.EntityFrameworkCore;

namespace matchCV_Project.Repositories;

public class JobRepository : BaseRepository<Job>, IJobRepository
{
    private readonly MatchCvContext _context;

    public JobRepository(MatchCvContext context) : base(context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Job>> GetUserJobsAsync(int userId)
    {
        return await _context.Jobs
            .Where(j => j.UserId == userId)
            .Include(j => j.Applications)
            .OrderByDescending(j => j.CreatedAt)
            .ToListAsync();
    }

    public async Task<IEnumerable<Job>> SearchJobsAsync(string? searchTerm, string? status = null)
    {
        var query = _context.Jobs
            .Include(j => j.Applications)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(searchTerm))
        {
            var term = searchTerm.ToLower();
            query = query.Where(j =>
                j.Title.ToLower().Contains(term) ||
                j.Company.ToLower().Contains(term) ||
                (j.JobDescription != null && j.JobDescription.ToLower().Contains(term)) ||
                (j.RawText != null && j.RawText.ToLower().Contains(term))
            );
        }

        if (!string.IsNullOrWhiteSpace(status))
        {
            query = query.Where(j => j.Status == status);
        }

        // Auto-sort JD list:
        //  - Open jobs first (Status != "Closed")
        //  - Then by nearest deadline (null deadlines go last)
        //  - Then by number of applications (descending)
        //  - Finally by created date (newest first)
        return await query
            .OrderBy(j => j.Status == "Closed") // false (open) comes first
            .ThenBy(j => j.Deadline ?? DateTime.MaxValue)
            .ThenByDescending(j => j.Applications.Count)
            .ThenByDescending(j => j.CreatedAt)
            .ToListAsync();
    }

    public async Task<Job?> GetByIdWithDetailsAsync(int id)
    {
        return await _context.Jobs
            .Include(j => j.User)
            .Include(j => j.MatchRuns)
            .Include(j => j.Applications)
            .FirstOrDefaultAsync(j => j.Id == id);
    }

    public async Task<int> GetApplicationsCountAsync(int jobId)
    {
        return await _context.Applications.CountAsync(a => a.JobId == jobId);
    }
}

