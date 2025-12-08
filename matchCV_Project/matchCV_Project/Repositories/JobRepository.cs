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
            .OrderByDescending(j => j.CreatedAt)
            .ToListAsync();
    }

    public async Task<IEnumerable<Job>> SearchJobsAsync(string? searchTerm, string? status = null)
    {
        var query = _context.Jobs.AsQueryable();

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

        return await query
            .OrderByDescending(j => j.CreatedAt)
            .ToListAsync();
    }

    public async Task<Job?> GetByIdWithDetailsAsync(int id)
    {
        return await _context.Jobs
            .Include(j => j.User)
            .Include(j => j.MatchRuns)
            .FirstOrDefaultAsync(j => j.Id == id);
    }
}

