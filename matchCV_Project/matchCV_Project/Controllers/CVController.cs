using MatchCV_Project.Interfaces;
using MatchCV_Project.Models.Dtos;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace MatchCV_Project.Controllers;

[ApiController]
[Route("api/cv")]
public class CvController : ControllerBase
{
    private readonly IDocumentService _documentService;
    private readonly ILogger<CvController> _logger;

    public CvController(IDocumentService documentService, ILogger<CvController> logger)
    {
        _documentService = documentService;
        _logger = logger;
    }

    /// <summary>
    /// Create a new CV record
    /// </summary>
    [HttpPost("create")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateCv([FromQuery] int userId, [FromBody] CreateDocumentDto dto)
    {
        try
        {
            var result = await _documentService.CreateDocumentAsync(dto, userId);
            return CreatedAtAction(nameof(GetCv), new { id = result.Id },
                BaseResponseDto<DocumentDto>.SuccessResponse(result, "CV created successfully"));
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning(ex, "Invalid request to create CV for user {UserId}", userId);
            return BadRequest(BaseResponseDto<DocumentDto>.FailureResponse(ex.Message));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating CV for user {UserId}", userId);
            return StatusCode(
                StatusCodes.Status500InternalServerError,
                BaseResponseDto<DocumentDto>.FailureResponse("An error occurred while creating the CV. Please try again later.")
            );
        }
    }

    /// <summary>
    /// Save CV (Create or Update)
    /// </summary>
    [HttpPost("save")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> SaveCv([FromQuery] int userId, [FromBody] SaveCvDto dto)
    {
        try
        {
            if (dto.Id > 0)
            {
                var updateDto = new UpdateDocumentDto
                {
                    Title = dto.Title,
                    TemplateType = dto.TemplateType,
                    CvData = dto.CvData
                };
                return await UpdateCv(dto.Id, userId, updateDto);
            }
            else
            {
                var createDto = new CreateDocumentDto
                {
                    Title = dto.Title,
                    TemplateType = dto.TemplateType,
                    CvData = dto.CvData
                };
                return await CreateCv(userId, createDto);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error saving CV for user {UserId}", userId);
            return StatusCode(500, BaseResponseDto<DocumentDto>.FailureResponse("Error saving CV"));
        }
    }

    /// <summary>
    /// Get all CVs for a user
    /// </summary>
    [HttpGet("user/{userId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetUserCvs(int userId)
    {
        try
        {
            var documents = await _documentService.GetUserDocumentsAsync(userId);
            return Ok(BaseResponseDto<IEnumerable<DocumentDto>>.SuccessResponse(
                documents ?? Enumerable.Empty<DocumentDto>(), 
                "CVs retrieved successfully"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving CVs for user {UserId}", userId);
            return StatusCode(
                StatusCodes.Status500InternalServerError,
                BaseResponseDto<IEnumerable<DocumentDto>>.FailureResponse(
                    "An error occurred while retrieving CVs. Please try again later.")
            );
        }
    }

    /// <summary>
    /// Get a specific CV by ID
    /// </summary>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetCv(int id, [FromQuery] int userId)
    {
        try
        {
            var document = await _documentService.GetDocumentAsync(id, userId);
            return Ok(BaseResponseDto<DocumentDto>.SuccessResponse(document, "CV retrieved successfully"));
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning(ex, "CV {CvId} not found for user {UserId}", id, userId);
            return NotFound(BaseResponseDto<DocumentDto>.FailureResponse(ex.Message));
        }
        catch (UnauthorizedAccessException ex)
        {
            _logger.LogWarning(ex, "Unauthorized access attempt to CV {CvId} by user {UserId}", id, userId);
            return StatusCode(
                StatusCodes.Status403Forbidden,
                BaseResponseDto<DocumentDto>.FailureResponse("You are not allowed to access this CV")
            );
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving CV {CvId} for user {UserId}", id, userId);
            return StatusCode(
                StatusCodes.Status500InternalServerError,
                BaseResponseDto<DocumentDto>.FailureResponse("An error occurred while retrieving the CV. Please try again later.")
            );
        }
    }

    /// <summary>
    /// Update a CV record
    /// </summary>
    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateCv(int id, [FromQuery] int userId, [FromBody] UpdateDocumentDto dto)
    {
        try
        {
            var result = await _documentService.UpdateDocumentAsync(id, dto, userId);
            return Ok(BaseResponseDto<DocumentDto>.SuccessResponse(result, "CV updated successfully"));
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning(ex, "CV {CvId} not found for update by user {UserId}", id, userId);
            return NotFound(BaseResponseDto<DocumentDto>.FailureResponse(ex.Message));
        }
        catch (UnauthorizedAccessException ex)
        {
            _logger.LogWarning(ex, "Unauthorized update attempt to CV {CvId} by user {UserId}", id, userId);
            return StatusCode(
                StatusCodes.Status403Forbidden,
                BaseResponseDto<DocumentDto>.FailureResponse("You are not allowed to update this CV")
            );
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating CV {CvId} for user {UserId}", id, userId);
            return StatusCode(
                StatusCodes.Status500InternalServerError,
                BaseResponseDto<DocumentDto>.FailureResponse("An error occurred while updating the CV. Please try again later.")
            );
        }
    }

    /// <summary>
    /// Delete a CV record
    /// </summary>
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeleteCv(int id, [FromQuery] int userId)
    {
        try
        {
            await _documentService.DeleteDocumentAsync(id, userId);
            return NoContent();
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning(ex, "CV {CvId} not found for deletion by user {UserId}", id, userId);
            return NotFound(BaseResponseDto<DocumentDto>.FailureResponse(ex.Message));
        }
        catch (UnauthorizedAccessException ex)
        {
            _logger.LogWarning(ex, "Unauthorized delete attempt to CV {CvId} by user {UserId}", id, userId);
            return StatusCode(
                StatusCodes.Status403Forbidden,
                BaseResponseDto<DocumentDto>.FailureResponse("You are not allowed to delete this CV")
            );
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting CV {CvId} for user {UserId}", id, userId);
            return StatusCode(
                StatusCodes.Status500InternalServerError,
                BaseResponseDto<DocumentDto>.FailureResponse("An error occurred while deleting the CV. Please try again later.")
            );
        }
    }

    /// <summary>
    /// Upload CV file (PDF or DOCX)
    /// </summary>
    [HttpPost("upload")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UploadFile([FromQuery] int userId, [FromQuery] int? id, IFormFile file)
    {
        try
        {
            // Validate file exists
            if (file == null || file.Length == 0)
                return BadRequest(BaseResponseDto<DocumentDto>.FailureResponse("No file provided"));

            // Validate file extension
            var allowedExtensions = new[] { ".pdf", ".doc", ".docx" };
            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (string.IsNullOrEmpty(extension) || !allowedExtensions.Contains(extension))
            {
                return BadRequest(BaseResponseDto<DocumentDto>.FailureResponse(
                    "Invalid file format. Only PDF, DOC, and DOCX files are allowed."));
            }

            // Validate file size (10MB limit)
            const long maxFileSize = 10 * 1024 * 1024; // 10MB
            if (file.Length > maxFileSize)
            {
                var fileSizeMB = file.Length / 1024.0 / 1024.0;
                return BadRequest(BaseResponseDto<DocumentDto>.FailureResponse(
                    $"File size exceeds the 10MB limit. Current size: {fileSizeMB:F2}MB"));
            }

            // Validate content type
            var allowedContentTypes = new[]
            {
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            };
            if (string.IsNullOrEmpty(file.ContentType) || 
                !allowedContentTypes.Contains(file.ContentType.ToLowerInvariant()))
            {
                return BadRequest(BaseResponseDto<DocumentDto>.FailureResponse(
                    "Invalid content type. Please upload a valid PDF or Word document."));
            }

            // Process upload
            // If id is provided and > 0, update existing CV; otherwise create new CV
            if (id.HasValue && id.Value > 0)
            {
                var resultExisting = await _documentService.UploadFileAsync(id.Value, file, userId);
                return Ok(BaseResponseDto<DocumentDto>.SuccessResponse(resultExisting, "File uploaded successfully"));
            }
            else
            {
                // Create new CV and upload file
                var resultNew = await _documentService.CreateAndUploadAsync(file, userId);
                return Ok(BaseResponseDto<DocumentDto>.SuccessResponse(resultNew, "File uploaded and CV created successfully"));
            }
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning(ex, "Invalid file upload request from user {UserId}", userId);
            return BadRequest(BaseResponseDto<DocumentDto>.FailureResponse(ex.Message));
        }
        catch (UnauthorizedAccessException ex)
        {
            _logger.LogWarning(ex, "Unauthorized upload attempt by user {UserId}", userId);
            return StatusCode(
                StatusCodes.Status403Forbidden,
                BaseResponseDto<DocumentDto>.FailureResponse("You are not allowed to upload to this CV")
            );
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error uploading file for user {UserId}", userId);
            return StatusCode(
                StatusCodes.Status500InternalServerError,
                BaseResponseDto<DocumentDto>.FailureResponse("An error occurred while uploading the file. Please try again later.")
            );
        }
    }

    /// <summary>
    /// Analyze a CV using AI
    /// </summary>
    [HttpPost("analyze/{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> AnalyzeCv(int id, [FromQuery] int userId)
    {
        try
        {
            var result = await _documentService.AnalyzeDocumentAsync(id, userId);
            return Ok(BaseResponseDto<AnalysisResultDto>.SuccessResponse(result, "CV analyzed successfully"));
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning(ex, "CV {CvId} not found for analysis by user {UserId}", id, userId);
            return NotFound(BaseResponseDto<AnalysisResultDto>.FailureResponse(ex.Message));
        }
        catch (UnauthorizedAccessException ex)
        {
            _logger.LogWarning(ex, "Unauthorized analysis attempt to CV {CvId} by user {UserId}", id, userId);
            return StatusCode(
                StatusCodes.Status403Forbidden,
                BaseResponseDto<AnalysisResultDto>.FailureResponse("You are not allowed to analyze this CV")
            );
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error analyzing CV {CvId} for user {UserId}", id, userId);
            return StatusCode(
                StatusCodes.Status500InternalServerError,
                BaseResponseDto<AnalysisResultDto>.FailureResponse("An error occurred while analyzing the CV. Please try again later.")
            );
        }
    }
}
