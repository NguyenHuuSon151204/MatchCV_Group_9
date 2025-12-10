using matchCV_Project.Models;
using ApiRestFul.Models.DTOs;
using ApiRestFul.DTOs;
using ApiRestFul.Services;
using iTextSharp.text;
using iTextSharp.text.pdf;
using matchCV_Project.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Threading.Tasks;
using System.Linq;
using System.Text.Json;
using matchCV_Project.Interfaces;

using Microsoft.AspNetCore.Hosting;

namespace matchCV_Project.Services
{
    public class ExportService : IExportService
    {
        private readonly MatchCvContext _context;
        private readonly ILogger<ExportService> _logger;
        private readonly ITemplateService _templateService;
        private readonly IWebHostEnvironment _env;

        public ExportService(MatchCvContext context, ILogger<ExportService> logger, ITemplateService templateService, IWebHostEnvironment env)
        {
            _context = context;
            _logger = logger;
            _templateService = templateService;
            _env = env;
        }

        public async Task<(byte[] Data, string FileName, string ContentType)> ExportCvAsync(ExportRequest request)
        {
            _logger.LogInformation($"Bắt đầu xuất CV với ID: {request.CvId}");

            var cv = await _context.Documents
                .AsNoTracking()
                .Include(d => d.User)
                .Where(d => d.Id == request.CvId)
                .Select(d => new
                {
                    d.Id,
                    d.DocType,
                    d.FileName,
                    d.OriginalName,
                    d.StoragePath,
                    d.FileSize,
                    d.CreatedAt,
                    d.User,
                    d.CvData,
                    d.Status,
                    d.ContentType,
                    TemplateKey = d.CvTemplate != null ? d.CvTemplate.Key : null
                })
                .FirstOrDefaultAsync();

            if (cv == null)
            {
                _logger.LogWarning($"Không tìm thấy CV với ID: {request.CvId}");
                throw new FileNotFoundException("Không tìm thấy CV");
            }

            // Case 1: Uploaded File (Download)
            // If StoragePath exists, it means it was uploaded.
            if (!string.IsNullOrEmpty(cv.StoragePath))
            {
                byte[] fileBytes = null;

                // Try 1: Using WebRootPath (Standard)
                string webRoot = _env.WebRootPath ?? "wwwroot";
                string path1 = Path.Combine(webRoot, cv.StoragePath);
                if (File.Exists(path1)) 
                {
                     fileBytes = await File.ReadAllBytesAsync(path1);
                }
                // Try 2: Relative checks
                else 
                {
                    string path2 = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", cv.StoragePath);
                    if (File.Exists(path2)) 
                        fileBytes = await File.ReadAllBytesAsync(path2);
                    else if (File.Exists(cv.StoragePath))
                        fileBytes = await File.ReadAllBytesAsync(cv.StoragePath);
                }

                if (fileBytes != null)
                {
                    var contentType = !string.IsNullOrEmpty(cv.ContentType) ? cv.ContentType : GetContentType(cv.StoragePath);
                    var fileName = !string.IsNullOrEmpty(cv.FileName) ? cv.FileName : (!string.IsNullOrEmpty(cv.OriginalName) ? cv.OriginalName : $"download_{cv.Id}{Path.GetExtension(cv.StoragePath)}");
                    
                    // Ensure fileName has extension
                    if (!Path.HasExtension(fileName))
                        fileName += Path.GetExtension(cv.StoragePath) ?? ".pdf";

                    return (fileBytes, fileName, contentType);
                }
                
                _logger.LogWarning($"Uploaded file found in DB but missing on disk. ID: {cv.Id}, Path: {cv.StoragePath}");
            }

            // Case 2: CV Builder (Export PDF)
            // Check if we can export using TemplateService (Actual CV Content)
            if (!string.IsNullOrEmpty(cv.CvData))
            {
                var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
                CVDataDto cvDataDto = null;
                try 
                {
                   cvDataDto = JsonSerializer.Deserialize<CVDataDto>(cv.CvData, options);
                }
                catch(JsonException jex)
                {
                   _logger.LogError(jex, "JSON Deserialization failed for CV {CvId}. Data: {Data}", cv.Id, cv.CvData);
                   throw new InvalidDataException("Dữ liệu CV không hợp lệ, không thể xuất PDF.", jex);
                }
                
                if (cvDataDto != null)
                {
                    // Determine template type
                    if (!string.IsNullOrEmpty(request.Template))
                        cvDataDto.TemplateType = request.Template;
                    else if (!string.IsNullOrEmpty(cv.TemplateKey))
                        cvDataDto.TemplateType = cv.TemplateKey;
                    else if (string.IsNullOrEmpty(cvDataDto.TemplateType))
                        cvDataDto.TemplateType = "modern";

                    // If format is PDF, use TemplateService
                    if (request.Format.ToLowerInvariant() == "pdf")
                    {
                        var pdfBytes = await _templateService.ExportToPdfAsync(cvDataDto);
                        return (pdfBytes, $"CV_{cv.Id}.pdf", "application/pdf");
                    }
                }
            }

            // Fallback / Last Resort: Metadata Export (Old logic)
            var metadataPdf = GeneratePdf(new matchCV_Project.Models.Document
            {
                Id = cv.Id,
                DocType = cv.DocType,
                OriginalName = cv.OriginalName,
                StoragePath = cv.StoragePath,
                FileSize = cv.FileSize,
                CreatedAt = cv.CreatedAt,
                User = cv.User
            });
            return (metadataPdf, $"Info_CV_{cv.Id}.pdf", "application/pdf");
        }

        private string GetContentType(string fileName)
        {
            var ext = Path.GetExtension(fileName).ToLowerInvariant();
            return ext switch
            {
                ".pdf" => "application/pdf",
                ".doc" => "application/msword",
                ".docx" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                _ => "application/octet-stream"
            };
        }

        private byte[] GeneratePdf(matchCV_Project.Models.Document cv)
        {
            using var ms = new MemoryStream();
            try
            {
                // Set up the document (iTextSharp one)
                var document = new iTextSharp.text.Document(PageSize.A4, 50, 50, 25, 25);
                var writer = PdfWriter.GetInstance(document, ms);
                document.Open();

                // Safer font handling
                var fontPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Fonts), "arial.ttf");
                BaseFont baseFont;
                if (!File.Exists(fontPath))
                {
                    // Fallback to standard font
                    baseFont = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.WINANSI, BaseFont.NOT_EMBEDDED);
                }
                else 
                {
                    baseFont = BaseFont.CreateFont(fontPath, BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
                }

                var titleFont = new iTextSharp.text.Font(baseFont, 18, iTextSharp.text.Font.BOLD);
                var normalFont = new iTextSharp.text.Font(baseFont, 12);
                var smallFont = new iTextSharp.text.Font(baseFont, 10, iTextSharp.text.Font.ITALIC);

                // Add title
                var title = new Paragraph("THÔNG TIN ỨNG VIÊN", titleFont)
                {
                    Alignment = Element.ALIGN_CENTER,
                    SpacingAfter = 20f
                };
                document.Add(title);

                // Add user info
                AddInfoLine(document, "Họ và tên", cv.User?.DisplayName ?? "N/A", normalFont);
                AddInfoLine(document, "Email", cv.User?.Email ?? "N/A", normalFont);
                AddInfoLine(document, "Loại tài liệu", cv.DocType ?? "CV", normalFont);
                AddInfoLine(document, "Tên file gốc", cv.OriginalName ?? "Untitled", normalFont);
                AddInfoLine(document, "Ngày tải lên", cv.CreatedAt.ToString("dd/MM/yyyy HH:mm"), normalFont);
                if (cv.FileSize.HasValue)
                {
                    var sizeMB = Math.Round(cv.FileSize.Value / (1024.0 * 1024.0), 2);
                    AddInfoLine(document, "Kích thước", $"{sizeMB} MB", normalFont);
                }

                // Add footer
                var footer = new Paragraph($"Xuất ngày: {DateTime.UtcNow:dd/MM/yyyy HH:mm}", smallFont)
                {
                    Alignment = Element.ALIGN_RIGHT
                };
                document.Add(footer);

                document.Close();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Lỗi khi tạo PDF cho CV ID: {CvId}", cv.Id);
                throw;
            }

            return ms.ToArray();
        }

        private void AddInfoLine(iTextSharp.text.Document doc, string label, string value, iTextSharp.text.Font font)
        {
            var para = new Paragraph
            {
                new Chunk($"{label}: ", new iTextSharp.text.Font(font.BaseFont, font.Size, iTextSharp.text.Font.BOLD)),
                new Chunk(value, font)
            };
            para.SpacingAfter = 10f;
            doc.Add(para);
        }
    }
}