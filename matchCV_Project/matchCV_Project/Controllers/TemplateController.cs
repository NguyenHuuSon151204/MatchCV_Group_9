using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ApiRestFul.DTOs;
using ApiRestFul.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ApiRestFul.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TemplateController : ControllerBase
    {
        private readonly ITemplateService _templateService;
        private readonly ILogger<TemplateController> _logger;

        public TemplateController(ITemplateService templateService, ILogger<TemplateController> logger)
        {
            _templateService = templateService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<List<CVTemplateDto>>> GetTemplates()
        {
            try
            {
                var templates = await _templateService.GetAvailableTemplatesAsync();
                return Ok(templates);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Lỗi khi lấy danh sách mẫu CV");
                return StatusCode(500, new { message = "Đã xảy ra lỗi khi lấy danh sách mẫu CV" });
            }
        }

        [HttpPost("preview")]
        public async Task<IActionResult> GeneratePreview([FromBody] CVDataDto cvData)
        {
            try
            {
                if (cvData == null)
                {
                    return BadRequest(new { message = "Dữ liệu CV không hợp lệ" });
                }

                var htmlBytes = await _templateService.GenerateCVPreviewAsync(cvData);
                return File(htmlBytes, "text/html");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Lỗi khi tạo xem trước CV");
                return StatusCode(500, new
                {
                    message = "Đã xảy ra lỗi khi tạo xem trước CV",
                    error = ex.Message
                });
            }
        }

        [HttpPost("export/pdf")]
        public async Task<IActionResult> ExportToPdf([FromBody] System.Text.Json.JsonElement rawJson)
        {
            try
            {
                var json = rawJson.GetRawText();
                _logger.LogInformation($"Received JSON for PDF Export: {json}");

                var options = new System.Text.Json.JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true,
                    PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase
                };

                CVDataDto cvData = null;
                try 
                {
                    cvData = System.Text.Json.JsonSerializer.Deserialize<CVDataDto>(json, options);
                }
                catch(Exception deserEx)
                {
                     _logger.LogError(deserEx, "JSON Deserialization failed.");
                     return BadRequest(new { message = "Lỗi dữ liệu CV (JSON)", details = deserEx.Message });
                }

                if (cvData == null)
                {
                    return BadRequest(new { message = "Dữ liệu CV không hợp lệ (NULL)" });
                }

                 _logger.LogInformation($"Deserialized successfully. CustomSections: {cvData.CustomSections?.Count}");
                 if (cvData.PersonalInfo != null)
                 {
                     _logger.LogInformation($"PersonalInfo present. CustomContacts: {cvData.PersonalInfo.CustomContacts?.Count ?? 0}");
                     if (cvData.PersonalInfo.CustomContacts != null)
                     {
                        foreach(var c in cvData.PersonalInfo.CustomContacts)
                            _logger.LogInformation($"Contact: {c.Value}");
                     }
                 }

                var pdfBytes = await _templateService.ExportToPdfAsync(cvData);
                var fileName = $"CV_{cvData.PersonalInfo?.FullName?.Replace(" ", "_") ?? "MyCV"}.pdf";
                return File(pdfBytes, "application/pdf", fileName);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Lỗi khi xuất CV sang PDF");
                return StatusCode(500, new
                {
                    message = "Đã xảy ra lỗi khi xuất CV sang PDF",
                    error = ex.Message
                });
            }
        }
    }
}