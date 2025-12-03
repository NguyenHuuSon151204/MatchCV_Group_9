using MatchCV_Project.Interfaces;
using MatchCV_Project.Models.Dtos;
using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace MatchCV_Project.Controllers;

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

    /// <summary>
    /// Create a new job posting
    /// </summary>
    [HttpPost("create")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateJob([FromQuery] int userId, [FromBody] CreateJobDto dto)
    {
        try
        {
            // Default to User 1 (Admin) for testing if not provided
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
            return StatusCode(
                StatusCodes.Status500InternalServerError,
                BaseResponseDto<JobDto>.FailureResponse("An error occurred while creating the job. Please try again later.")
            );
        }
    }

    /// <summary>
    /// Get all jobs (with optional search and filter)
    /// </summary>
    [HttpGet("search")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> SearchJobs([FromQuery] string? searchTerm, [FromQuery] string? status, [FromQuery] int? userId)
    {
        try
        {
            var jobs = await _jobService.SearchJobsAsync(searchTerm, status, userId);
            return Ok(BaseResponseDto<IEnumerable<JobDto>>.SuccessResponse(
                jobs,
                "Jobs retrieved successfully"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error searching jobs");
            return StatusCode(
                StatusCodes.Status500InternalServerError,
                BaseResponseDto<IEnumerable<JobDto>>.FailureResponse(
                    "An error occurred while searching jobs. Please try again later.")
            );
        }
    }

    /// <summary>
    /// Get all jobs for a specific user
    /// </summary>
    [HttpGet("user/{userId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetUserJobs(int userId)
    {
        try
        {
            var jobs = await _jobService.GetUserJobsAsync(userId);
            return Ok(BaseResponseDto<IEnumerable<JobDto>>.SuccessResponse(
                jobs,
                "Jobs retrieved successfully"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving jobs for user {UserId}", userId);
            return StatusCode(
                StatusCodes.Status500InternalServerError,
                BaseResponseDto<IEnumerable<JobDto>>.FailureResponse(
                    "An error occurred while retrieving jobs. Please try again later.")
            );
        }
    }

    /// <summary>
    /// Get a specific job by ID
    /// </summary>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetJob(int id, [FromQuery] int userId)
    {
        try
        {
            var job = await _jobService.GetJobAsync(id, userId);
            return Ok(BaseResponseDto<JobDto>.SuccessResponse(job, "Job retrieved successfully"));
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning(ex, "Job {JobId} not found for user {UserId}", id, userId);
            return NotFound(BaseResponseDto<JobDto>.FailureResponse(ex.Message));
        }
        catch (UnauthorizedAccessException ex)
        {
            _logger.LogWarning(ex, "Unauthorized access attempt to job {JobId} by user {UserId}", id, userId);
            return StatusCode(
                StatusCodes.Status403Forbidden,
                BaseResponseDto<JobDto>.FailureResponse("You are not allowed to access this job")
            );
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving job {JobId} for user {UserId}", id, userId);
            return StatusCode(
                StatusCodes.Status500InternalServerError,
                BaseResponseDto<JobDto>.FailureResponse("An error occurred while retrieving the job. Please try again later.")
            );
        }
    }

    /// <summary>
    /// Update a job posting
    /// </summary>
    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateJob(int id, [FromQuery] int userId, [FromBody] UpdateJobDto dto)
    {
        try
        {
            var result = await _jobService.UpdateJobAsync(id, dto, userId);
            return Ok(BaseResponseDto<JobDto>.SuccessResponse(result, "Job updated successfully"));
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning(ex, "Job {JobId} not found for update by user {UserId}", id, userId);
            return NotFound(BaseResponseDto<JobDto>.FailureResponse(ex.Message));
        }
        catch (UnauthorizedAccessException ex)
        {
            _logger.LogWarning(ex, "Unauthorized update attempt to job {JobId} by user {UserId}", id, userId);
            return StatusCode(
                StatusCodes.Status403Forbidden,
                BaseResponseDto<JobDto>.FailureResponse("You are not allowed to update this job")
            );
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating job {JobId} for user {UserId}", id, userId);
            return StatusCode(
                StatusCodes.Status500InternalServerError,
                BaseResponseDto<JobDto>.FailureResponse("An error occurred while updating the job. Please try again later.")
            );
        }
    }

    /// <summary>
    /// Delete a job posting
    /// </summary>
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeleteJob(int id, [FromQuery] int userId)
    {
        try
        {
            await _jobService.DeleteJobAsync(id, userId);
            return NoContent();
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning(ex, "Job {JobId} not found for deletion by user {UserId}", id, userId);
            return NotFound(BaseResponseDto<JobDto>.FailureResponse(ex.Message));
        }
        catch (UnauthorizedAccessException ex)
        {
            _logger.LogWarning(ex, "Unauthorized delete attempt to job {JobId} by user {UserId}", id, userId);
            return StatusCode(
                StatusCodes.Status403Forbidden,
                BaseResponseDto<JobDto>.FailureResponse("You are not allowed to delete this job")
            );
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting job {JobId} for user {UserId}", id, userId);
            return StatusCode(
                StatusCodes.Status500InternalServerError,
                BaseResponseDto<JobDto>.FailureResponse("An error occurred while deleting the job. Please try again later.")
            );
        }
    }

    /// <summary>
    /// Upload job posting from file (PDF or TXT)
    /// </summary>
    [HttpPost("upload")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UploadJobFile([FromQuery] int userId, IFormFile file)
    {
        try
        {
            if (file == null || file.Length == 0)
                return BadRequest(BaseResponseDto<JobDto>.FailureResponse("No file provided"));

            var allowedExtensions = new[] { ".pdf", ".txt" };
            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (string.IsNullOrEmpty(extension) || !allowedExtensions.Contains(extension))
            {
                return BadRequest(BaseResponseDto<JobDto>.FailureResponse(
                    "Invalid file format. Only PDF and TXT files are allowed."));
            }

            const long maxFileSize = 10 * 1024 * 1024; // 10MB
            if (file.Length > maxFileSize)
            {
                var fileSizeMB = file.Length / 1024.0 / 1024.0;
                return BadRequest(BaseResponseDto<JobDto>.FailureResponse(
                    $"File size exceeds the 10MB limit. Current size: {fileSizeMB:F2}MB"));
            }

            // Default to User 1 (Admin) for testing if not provided
            if (userId <= 0)
            {
                userId = 1;
                _logger.LogWarning("UserId not provided or invalid. Defaulting to User 1.");
            }

            var result = await _jobService.UploadJobFromFileAsync(file, userId);
            return Ok(BaseResponseDto<JobDto>.SuccessResponse(result, "Job uploaded successfully"));
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning(ex, "Invalid file upload request from user {UserId}", userId);
            return BadRequest(BaseResponseDto<JobDto>.FailureResponse(ex.Message));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error uploading job file for user {UserId}", userId);
            return StatusCode(
                StatusCodes.Status500InternalServerError,
                BaseResponseDto<JobDto>.FailureResponse("An error occurred while uploading the file. Please try again later.")
            );
        }
    }
}

