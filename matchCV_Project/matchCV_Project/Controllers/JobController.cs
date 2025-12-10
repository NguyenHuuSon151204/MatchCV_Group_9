using matchCV_Project.Interfaces;
using matchCV_Project.Models.Dtos;
using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace matchCV_Project.Controllers;

[ApiController]
[Route("api/job")]
public class JobController : ControllerBase
{
    private readonly IJobService _jobService;
    private readonly ILogger<JobController> _logger;

    public JobController(IJobService jobService, ILogger<JobController> logger)
    {
        _jobService = jobService;
        _logger = logger;
    }

    // ============================== CREATE ==============================
    [HttpPost("create")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateJob([FromQuery] int userId, [FromBody] CreateJobDto dto)
    {
        try
        {
            if (userId <= 0)
            {
                userId = 1;
                _logger.LogWarning("UserId not provided or invalid. Defaulting to User 1.");
            }

            var result = await _jobService.CreateJobAsync(dto, userId);
            return CreatedAtAction(nameof(GetJob), new { id = result.Id },
                BaseResponseDto<JobDto>.SuccessResponse(result, "Job created successfully"));
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning(ex, "Invalid request to create job for user {UserId}", userId);
            return BadRequest(BaseResponseDto<JobDto>.FailureResponse(ex.Message));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating job for user {UserId}", userId);
            return StatusCode(StatusCodes.Status500InternalServerError,
                BaseResponseDto<JobDto>.FailureResponse("An error occurred while creating the job."));
        }
    }

    // ======================= SEARCH - ĐÃ SỬA HOÀN CHỈNH =======================
    /// <summary>
    /// Tìm kiếm job
    /// • Nếu KHÔNG truyền userId → Candidate thấy tất cả job Active (public view)
    /// • Nếu CÓ truyền userId → Recruiter chỉ thấy job của mình
    /// </summary>
    [HttpGet("search")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> SearchJobs(
        [FromQuery] string? searchTerm,
        [FromQuery] string? status,
        [FromQuery] int? userId) // ← Giữ nguyên tham số để Recruiter vẫn dùng được
    {
        try
        {
            // QUAN TRỌNG: Chỉ filter theo userId khi userId được truyền lên
            // → Candidate gọi API mà không truyền userId → userId = null → lấy hết Active job
            var jobs = await _jobService.SearchJobsAsync(searchTerm, status, userId);

            return Ok(BaseResponseDto<IEnumerable<JobDto>>.SuccessResponse(
                jobs,
                userId.HasValue 
                    ? "Your jobs retrieved successfully" 
                    : "All available jobs retrieved successfully"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error searching jobs");
            return StatusCode(StatusCodes.Status500InternalServerError,
                BaseResponseDto<IEnumerable<JobDto>>.FailureResponse(
                    "An error occurred while searching jobs."));
        }
    }

    // ============================== USER JOBS (dành riêng Recruiter) ==============================
    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetUserJobs(int userId)
    {
        try
        {
            var jobs = await _jobService.GetUserJobsAsync(userId);
            return Ok(BaseResponseDto<IEnumerable<JobDto>>.SuccessResponse(jobs, "Your jobs retrieved successfully"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving jobs for user {UserId}", userId);
            return StatusCode(StatusCodes.Status500InternalServerError,
                BaseResponseDto<IEnumerable<JobDto>>.FailureResponse("An error occurred."));
        }
    }

    // ============================== GET BY ID ==============================
    [HttpGet("{id}")]
    public async Task<IActionResult> GetJob(int id, [FromQuery] int userId)
    {
        try
        {
            var job = await _jobService.GetJobAsync(id, userId);
            return Ok(BaseResponseDto<JobDto>.SuccessResponse(job, "Job retrieved successfully"));
        }
        catch (ArgumentException ex)
        {
            return NotFound(BaseResponseDto<JobDto>.FailureResponse(ex.Message));
        }
        catch (UnauthorizedAccessException)
        {
            return StatusCode(StatusCodes.Status403Forbidden,
                BaseResponseDto<JobDto>.FailureResponse("You are not allowed to access this job"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving job {JobId}", id);
            return StatusCode(StatusCodes.Status500InternalServerError,
                BaseResponseDto<JobDto>.FailureResponse("An error occurred."));
        }
    }

    // ============================== UPDATE ==============================
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateJob(int id, [FromQuery] int userId, [FromBody] UpdateJobDto dto)
    {
        try
        {
            var result = await _jobService.UpdateJobAsync(id, dto, userId);
            return Ok(BaseResponseDto<JobDto>.SuccessResponse(result, "Job updated successfully"));
        }
        catch (ArgumentException ex)
        {
            return NotFound(BaseResponseDto<JobDto>.FailureResponse(ex.Message));
        }
        catch (UnauthorizedAccessException)
        {
            return StatusCode(StatusCodes.Status403Forbidden,
                BaseResponseDto<JobDto>.FailureResponse("You are not allowed to update this job"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating job {JobId}", id);
            return StatusCode(StatusCodes.Status500InternalServerError,
                BaseResponseDto<JobDto>.FailureResponse("An error occurred."));
        }
    }

    // ============================== DELETE ==============================
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteJob(int id, [FromQuery] int userId)
    {
        try
        {
            await _jobService.DeleteJobAsync(id, userId);
            return NoContent();
        }
        catch (ArgumentException ex)
        {
            return NotFound(BaseResponseDto<JobDto>.FailureResponse(ex.Message));
        }
        catch (UnauthorizedAccessException)
        {
            return StatusCode(StatusCodes.Status403Forbidden,
                BaseResponseDto<JobDto>.FailureResponse("You are not allowed to delete this job"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting job {JobId}", id);
            return StatusCode(StatusCodes.Status500InternalServerError,
                BaseResponseDto<JobDto>.FailureResponse("An error occurred."));
        }
    }

    // ============================== UPLOAD FILE ==============================
    [HttpPost("upload")]
    public async Task<IActionResult> UploadJobFile([FromQuery] int userId, IFormFile file)
    {
        // (giữ nguyên code cũ của bạn, mình chỉ rút gọn comment cho gọn)
        try
        {
            if (file == null || file.Length == 0)
                return BadRequest(BaseResponseDto<JobDto>.FailureResponse("No file provided"));

            var allowedExtensions = new[] { ".pdf", ".txt" };
            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (string.IsNullOrEmpty(extension) || !allowedExtensions.Contains(extension))
                return BadRequest(BaseResponseDto<JobDto>.FailureResponse("Only PDF and TXT files are allowed."));

            const long maxFileSize = 10 * 1024 * 1024;
            if (file.Length > maxFileSize)
                return BadRequest(BaseResponseDto<JobDto>.FailureResponse("File size exceeds 10MB limit."));

            if (userId <= 0)
            {
                userId = 1;
                _logger.LogWarning("UserId not provided. Defaulting to User 1.");
            }

            var result = await _jobService.UploadJobFromFileAsync(file, userId);
            return Ok(BaseResponseDto<JobDto>.SuccessResponse(result, "Job uploaded successfully"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error uploading job file");
            return StatusCode(StatusCodes.Status500InternalServerError,
                BaseResponseDto<JobDto>.FailureResponse("An error occurred while uploading the file."));
        }
    }
}