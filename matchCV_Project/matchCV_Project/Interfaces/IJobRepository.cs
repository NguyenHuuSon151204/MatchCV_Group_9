using matchCV_Project.Models;

namespace matchCV_Project.Interfaces;

public interface IJobRepository : IBaseRepository<Job>
{
    Task<IEnumerable<Job>> GetUserJobsAsync(int userId);
    Task<IEnumerable<Job>> SearchJobsAsync(string? searchTerm, string? status = null);
    Task<Job?> GetByIdWithDetailsAsync(int id);
    Task<int> GetApplicationsCountAsync(int jobId);
}

