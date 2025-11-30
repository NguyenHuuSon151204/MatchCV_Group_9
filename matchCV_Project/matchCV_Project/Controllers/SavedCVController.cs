using ApiRestFul.DTOs;
using ApiRestFul.Services;
using MatchCV_Project.Interfaces;
using MatchCV_Project.Models.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace MatchCV_Project.Controllers
{
    [Route("api/saved-cv")]
    [ApiController]
    public class SavedCVController : ControllerBase
    {
        private readonly IDocumentService _documentService;
        private readonly ICVService _cvService; // Keeping for backward compatibility if needed, but primary logic moves to DocumentService

        public SavedCVController(IDocumentService documentService, ICVService cvService)
        {
            _documentService = documentService;
            _cvService = cvService;
        }

        /// <summary>
        /// Save or update a CV
        /// </summary>
        [HttpPost("save")]
        public async Task<ActionResult<SavedCVDto>> SaveCV([FromBody] SaveCVRequestDto request)
        {
            // Redirecting to DocumentService logic would be ideal, but for now let's keep this as legacy
            // or we can implement a bridge. 
            // Given the user wants "history" fixed, let's focus on that.
            try
            {
                var result = await _cvService.SaveCVAsync(request);
                return Ok(result);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while saving the CV", error = ex.Message });
            }
        }

        /// <summary>
        /// Get all saved CVs (history)
        /// </summary>
        [HttpGet("history")]
        public async Task<ActionResult<List<CVHistoryItemDto>>> GetCVHistory()
        {
            try
            {
                // Use DocumentService to get data from the Documents table
                // Defaulting to User 1 as this is a legacy/test endpoint without auth context
                int defaultUserId = 1; 
                var documents = await _documentService.GetUserDocumentsAsync(defaultUserId);

                // Map DocumentDto to CVHistoryItemDto
                var history = documents.Select(doc => new CVHistoryItemDto
                {
                    Id = doc.Id,
                    Title = doc.OriginalName, // Map OriginalName to Title
                    TemplateType = doc.TemplateType ?? "professional", // Use TemplateType from DTO
                    CreatedAt = doc.CreatedAt,
                    UpdatedAt = doc.UpdatedAt
                }).ToList();

                return Ok(history);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving CV history", error = ex.Message });
            }
        }

        /// <summary>
        /// Get a specific CV by ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<SavedCVDto>> GetCVById(int id)
        {
            try
            {
                // Try to get from DocumentService first
                int defaultUserId = 1;
                var doc = await _documentService.GetDocumentAsync(id, defaultUserId);
                
                if (doc != null)
                {
                    return Ok(new SavedCVDto
                    {
                        Id = doc.Id,
                        Title = doc.OriginalName,
                        TemplateType = "professional",
                        CVData = null, // DocumentDto structure is different, might need complex mapping
                        CreatedAt = doc.CreatedAt,
                        UpdatedAt = doc.UpdatedAt
                    });
                }

                // Fallback to legacy service
                var cv = await _cvService.GetCVByIdAsync(id);
                
                if (cv == null)
                {
                    return NotFound(new { message = $"CV with ID {id} not found" });
                }

                return Ok(cv);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving the CV", error = ex.Message });
            }
        }

        /// <summary>
        /// Update an existing CV
        /// </summary>
        [HttpPut("{id}")]
        public async Task<ActionResult<SavedCVDto>> UpdateCV(int id, [FromBody] SaveCVRequestDto request)
        {
            try
            {
                var result = await _cvService.UpdateCVAsync(id, request);
                return Ok(result);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while updating the CV", error = ex.Message });
            }
        }

        /// <summary>
        /// Delete a CV
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCV(int id)
        {
            try
            {
                // Try to delete via DocumentService
                int defaultUserId = 1;
                await _documentService.DeleteDocumentAsync(id, defaultUserId);
                return Ok(new { success = true, message = "CV deleted successfully" });
            }
            catch (Exception)
            {
                // Fallback to legacy
                try 
                {
                    var success = await _cvService.DeleteCVAsync(id);
                    if (!success) return NotFound(new { message = $"CV with ID {id} not found" });
                    return Ok(new { success = true, message = "CV deleted successfully" });
                }
                catch(Exception ex)
                {
                    return StatusCode(500, new { message = "An error occurred while deleting the CV", error = ex.Message });
                }
            }
        }
    }
}
