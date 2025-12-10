using matchCV_Project.Interfaces;
using matchCV_Project.Models.Dtos;
using matchCV_Project.Models;
using Microsoft.AspNetCore.Mvc;

namespace matchCV_Project.Controllers;

[ApiController]
[Route("api/analyzer")]
public class AnalyzerController : ControllerBase
{
    private readonly IAnalyzerService _analyzerService;
    private readonly ILogger<AnalyzerController> _logger;

    public AnalyzerController(IAnalyzerService analyzerService, ILogger<AnalyzerController> logger)
    {
        _analyzerService = analyzerService;
        _logger = logger;
    }

    /// <summary>
    /// Score a CV against a Job Description
    /// </summary>
    [HttpPost("score")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> ScoreCvVsJob([FromBody] ScoreCvRequestDto request)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(request.CvText))
                return BadRequest(BaseResponseDto<ScoringResult>.FailureResponse("CV text is required"));

            if (string.IsNullOrWhiteSpace(request.JobDescription))
                return BadRequest(BaseResponseDto<ScoringResult>.FailureResponse("Job description is required"));

            var result = await _analyzerService.ScoreCvVsJobAsync(
                request.CvText,
                request.JobDescription,
                request.Industry ?? "IT",
                request.Level ?? "Mid"
            );

            return Ok(BaseResponseDto<ScoringResult>.SuccessResponse(
                result,
                "CV scored successfully"
            ));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error scoring CV");
            return StatusCode(
                StatusCodes.Status500InternalServerError,
                BaseResponseDto<ScoringResult>.FailureResponse(
                    "An error occurred while scoring the CV. Please try again later."
                )
            );
        }
    }

    /// <summary>
    /// Score a stored CV (Document) against a Job using weight-matrix
    /// </summary>
    [HttpPost("score-document")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> ScoreDocumentVsJob([FromBody] ScoreDocumentRequestDto request)
    {
        try
        {
          if (request.DocumentId <= 0 || request.JobId <= 0)
              return BadRequest(BaseResponseDto<ScoringResult>.FailureResponse("DocumentId and JobId are required"));

          var result = await _analyzerService.ScoreDocumentVsJobAsync(
              request.DocumentId,
              request.JobId,
              request.Industry ?? "IT",
              request.Level ?? "Mid"
          );

          return Ok(BaseResponseDto<ScoringResult>.SuccessResponse(
              result,
              "CV scored successfully"
          ));
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning(ex, "Invalid request to score document {DocumentId} vs job {JobId}", request.DocumentId, request.JobId);
            return BadRequest(BaseResponseDto<ScoringResult>.FailureResponse(ex.Message));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error scoring document {DocumentId} vs job {JobId}", request.DocumentId, request.JobId);
            return StatusCode(
                StatusCodes.Status500InternalServerError,
                BaseResponseDto<ScoringResult>.FailureResponse(
                    "An error occurred while scoring the CV. Please try again later."
                )
            );
        }
    }

    /// <summary>
    /// Analyze a document by ID
    /// </summary>
    [HttpPost("analyze/{documentId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> AnalyzeDocument(int documentId)
    {
        try
        {
            var result = await _analyzerService.AnalyzeDocumentAsync(documentId);
            return Ok(BaseResponseDto<AnalysisResultDto>.SuccessResponse(
                result,
                "Document analyzed successfully"
            ));
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning(ex, "Document {DocumentId} not found", documentId);
            return NotFound(BaseResponseDto<AnalysisResultDto>.FailureResponse(ex.Message));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error analyzing document {DocumentId}", documentId);
            return StatusCode(
                StatusCodes.Status500InternalServerError,
                BaseResponseDto<AnalysisResultDto>.FailureResponse(
                    "An error occurred while analyzing the document. Please try again later."
                )
            );
        }
    }
}

/// <summary>
/// Request DTO for CV vs Job scoring
/// </summary>
public class ScoreCvRequestDto
{
    /// <summary>
    /// CV text content
    /// </summary>
    public string CvText { get; set; } = string.Empty;

    /// <summary>
    /// Job description text
    /// </summary>
    public string JobDescription { get; set; } = string.Empty;

    /// <summary>
    /// Industry (IT, Marketing, Sales, Finance, etc.)
    /// Default: IT
    /// </summary>
    public string? Industry { get; set; }

    /// <summary>
    /// Job level (Junior, Mid, Senior, Manager, etc.)
    /// Default: Mid
    /// </summary>
    public string? Level { get; set; }
}

/// <summary>
/// Request DTO for scoring a stored Document against a Job
/// </summary>
public class ScoreDocumentRequestDto
{
    public int DocumentId { get; set; }
    public int JobId { get; set; }
    public string? Industry { get; set; }
    public string? Level { get; set; }
}
