using System;
using System.Threading.Tasks;
using ApiRestFul.Models.DTOs;
using ApiRestFul.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ApiRestFul.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExportController : ControllerBase
    {
        private readonly IExportService _exportService;
        private readonly ILogger<ExportController> _logger;

        public ExportController(IExportService exportService, ILogger<ExportController> logger)
        {
            _exportService = exportService;
            _logger = logger;
        }

        [HttpPost("cv")]
        public async Task<IActionResult> ExportCv([FromBody] ExportRequest request)
        {
            try
            {
                var fileBytes = await _exportService.ExportCvAsync(request);
                var fileName = $"CV_{DateTime.Now:yyyyMMddHHmmss}.{request.Format}";

                return File(fileBytes, "application/pdf", fileName);
            }
            catch (FileNotFoundException ex)
            {
                _logger.LogWarning(ex, "Không tìm thấy CV");
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Lỗi khi xuất CV");
                return BadRequest(new { message = "Có lỗi xảy ra khi xuất CV" });
            }
        }
    }
}