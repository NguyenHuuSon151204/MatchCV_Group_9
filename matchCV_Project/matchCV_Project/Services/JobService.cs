using matchCV_Project.Interfaces;
using matchCV_Project.Models;
using matchCV_Project.Models.Dtos;
using Microsoft.AspNetCore.Hosting;

namespace matchCV_Project.Services;

public class JobService : IJobService
{
    private readonly IJobRepository _jobRepository;
    private readonly IPdfExtractionService _pdfExtractionService;
    private readonly ILogger<JobService> _logger;
    private readonly IWebHostEnvironment _environment;

    public JobService(
        IJobRepository jobRepository,
        IPdfExtractionService pdfExtractionService,
        ILogger<JobService> logger,
        IWebHostEnvironment environment)
    {
        _jobRepository = jobRepository;
        _pdfExtractionService = pdfExtractionService;
        _logger = logger;
        _environment = environment;
    }

    public async Task<JobDto> CreateJobAsync(CreateJobDto dto, int userId)
    {
        try
        {
            var job = new Job
            {
                UserId = userId,
                Title = dto.Title,
                Company = dto.Company,
                JobDescription = dto.JobDescription,
                RawText = dto.RawText,
                Status = "Active",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            var created = await _jobRepository.AddAsync(job);
            await _jobRepository.SaveChangesAsync();

            _logger.LogInformation($"Job created: {created.Id} by user {userId}");
            return MapToDto(created);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error creating job: {ex.Message}");
            throw;
        }
    }

    public async Task<JobDto> GetJobAsync(int id, int userId)
    {
        var job = await _jobRepository.GetByIdAsync(id);
        if (job == null)
            throw new ArgumentException($"Job with ID {id} not found");

        // Chỉ cho phép truy cập nếu: là chủ job HOẶC job đang Active (public)
        if (job.UserId != userId && job.Status != "Active")
            throw new UnauthorizedAccessException("You are not allowed to access this job");

        return MapToDto(job);
    }

    public async Task<IEnumerable<JobDto>> GetUserJobsAsync(int userId)
    {
        var jobs = await _jobRepository.GetUserJobsAsync(userId);
        return jobs.Select(MapToDto).ToList();
    }

    // ĐÃ SỬA HOÀN CHỈNH - ĐÂY LÀ CHÌA KHÓA!
    public async Task<IEnumerable<JobDto>> SearchJobsAsync(string? searchTerm, string? status = null, int? userId = null)
    {
        // Lấy danh sách job từ repository (có thể đã filter theo searchTerm)
        var jobs = await _jobRepository.SearchJobsAsync(searchTerm, status);

        // QUY TẮC MỚI - RÕ RÀNG, CHUẨN XÁC:
        // 1. Nếu KHÔNG truyền userId → Là Candidate → Chỉ hiện job Active
        // 2. Nếu CÓ truyền userId → Là Recruiter → Chỉ hiện job của mình (kể cả Inactive)
        if (!userId.HasValue)
        {
            jobs = jobs.Where(j => j.Status == "Active");
        }
        else
        {
            jobs = jobs.Where(j => j.UserId == userId.Value);
        }

        return jobs
            .OrderByDescending(j => j.CreatedAt)
            .Select(MapToDto)
            .ToList();
    }

    public async Task<JobDto> UpdateJobAsync(int id, UpdateJobDto dto, int userId)
    {
        var job = await _jobRepository.GetByIdAsync(id);
        if (job == null)
            throw new ArgumentException($"Job with ID {id} not found");

        if (job.UserId != userId)
            throw new UnauthorizedAccessException("You are not allowed to update this job");

        if (!string.IsNullOrWhiteSpace(dto.Title))
            job.Title = dto.Title;
        if (!string.IsNullOrWhiteSpace(dto.Company))
            job.Company = dto.Company;
        if (dto.JobDescription != null)
            job.JobDescription = dto.JobDescription;
        if (dto.RawText != null)
            job.RawText = dto.RawText;
        if (!string.IsNullOrWhiteSpace(dto.Status))
            job.Status = dto.Status;

        job.UpdatedAt = DateTime.UtcNow;

        await _jobRepository.UpdateAsync(job);
        await _jobRepository.SaveChangesAsync();

        _logger.LogInformation($"Job updated: {id}");
        return MapToDto(job);
    }

    public async Task DeleteJobAsync(int id, int userId)
    {
        var job = await _jobRepository.GetByIdAsync(id);
        if (job == null)
            throw new ArgumentException($"Job with ID {id} not found");

        if (job.UserId != userId)
            throw new UnauthorizedAccessException("You are not allowed to delete this job");

        await _jobRepository.DeleteAsync(id);
        await _jobRepository.SaveChangesAsync();

        _logger.LogInformation($"Job deleted: {id}");
    }

    public async Task<JobDto> UploadJobFromFileAsync(IFormFile file, int userId)
    {
        if (file == null || file.Length == 0)
            throw new ArgumentException("No file provided");

        try
        {
            var tempPath = Path.Combine(Path.GetTempPath(), Guid.NewGuid().ToString() + Path.GetExtension(file.FileName));
            using (var stream = new FileStream(tempPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            string extractedText = string.Empty;
            if (file.ContentType == "application/pdf" || Path.GetExtension(file.FileName).ToLower() == ".pdf")
            {
                extractedText = await _pdfExtractionService.ExtractTextFromPdfAsync(tempPath);
            }
            else if (file.ContentType.Contains("text") || Path.GetExtension(file.FileName).ToLower() == ".txt")
            {
                extractedText = await File.ReadAllTextAsync(tempPath);
            }

            if (File.Exists(tempPath))
                File.Delete(tempPath);

            var job = new Job
            {
                UserId = userId,
                Title = ExtractJobTitle(extractedText) ?? "Job from file upload",
                Company = ExtractCompany(extractedText) ?? "Unknown Company",
                RawText = extractedText,
                JobDescription = extractedText,
                Status = "Active",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            var created = await _jobRepository.AddAsync(job);
            await _jobRepository.SaveChangesAsync();

            _logger.LogInformation($"Job created from file: {created.Id}");
            return MapToDto(created);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error uploading job from file: {ex.Message}");
            throw;
        }
    }

    private string? ExtractJobTitle(string text)
    {
        var lines = text.Split('\n', StringSplitOptions.RemoveEmptyEntries);
        if (lines.Length > 0)
        {
            var firstLine = lines[0].Trim();
            if (firstLine.Length > 0 && firstLine.Length < 150)
                return firstLine;
        }
        return null;
    }

    private string? ExtractCompany(string text)
    {
        var companyPatterns = new[] { "Company:", "Employer:", "Organization:", "Công ty:", "Nhà tuyển dụng:" };
        foreach (var pattern in companyPatterns)
        {
            var index = text.IndexOf(pattern, StringComparison.OrdinalIgnoreCase);
            if (index >= 0)
            {
                var start = index + pattern.Length;
                var end = text.IndexOf('\n', start);
                if (end > start)
                {
                    return text.Substring(start, end - start).Trim();
                }
            }
        }
        return null;
    }

    private JobDto MapToDto(Job job)
    {
        return new JobDto
        {
            Id = job.Id,
            UserId = job.UserId,
            Title = job.Title,
            Company = job.Company,
            RawText = job.RawText,
            JobDescription = job.JobDescription,
            Status = job.Status,
            CreatedAt = job.CreatedAt,
            UpdatedAt = job.UpdatedAt
        };
    }
}