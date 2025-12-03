using MatchCV_Project.Models.Dtos;

namespace MatchCV_Project.Interfaces;

public interface IJobService
{
    Task<JobDto> CreateJobAsync(CreateJobDto dto, int userId);
    Task<JobDto> GetJobAsync(int id, int userId);
    Task<IEnumerable<JobDto>> GetUserJobsAsync(int userId);
    Task<IEnumerable<JobDto>> SearchJobsAsync(string? searchTerm, string? status = null, int? userId = null);
    Task<JobDto> UpdateJobAsync(int id, UpdateJobDto dto, int userId);
    Task DeleteJobAsync(int id, int userId);
    Task<JobDto> UploadJobFromFileAsync(IFormFile file, int userId);
}

