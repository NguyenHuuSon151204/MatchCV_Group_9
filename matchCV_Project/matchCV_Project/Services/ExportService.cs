using matchCV_Project.Models;
using ApiRestFul.Models.DTOs;
using ApiRestFul.Services;
using iTextSharp.text;
using iTextSharp.text.pdf;
using matchCV_Project.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Threading.Tasks;

namespace matchCV_Project.Services
{
    public class ExportService : IExportService
    {
        private readonly MatchCvContext _context;
        private readonly ILogger<ExportService> _logger;

        public ExportService(MatchCvContext context, ILogger<ExportService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<byte[]> ExportCvAsync(ExportRequest request)
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
                    d.OriginalName,
                    d.StoragePath,
                    d.FileSize,
                    d.CreatedAt,
                    d.User
                })
                .FirstOrDefaultAsync();

            if (cv == null)
            {
                _logger.LogWarning($"Không tìm thấy CV với ID: {request.CvId}");
                throw new FileNotFoundException("Không tìm thấy CV");
            }

            return request.Format.ToLowerInvariant() switch
            {
                "pdf" => GeneratePdf(new matchCV_Project.Models.Document
                {
                    Id = cv.Id,
                    DocType = cv.DocType,
                    OriginalName = cv.OriginalName,
                    StoragePath = cv.StoragePath,
                    FileSize = cv.FileSize,
                    CreatedAt = cv.CreatedAt,
                    User = cv.User
                }),
                _ => throw new NotSupportedException("Chỉ hỗ trợ định dạng PDF")
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

                // Improved font setup for portability and Vietnamese support
                var fontPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Fonts), "arial.ttf");
                if (!File.Exists(fontPath))
                {
                    fontPath = BaseFont.HELVETICA.ToString();
                }

                var baseFont = BaseFont.CreateFont(fontPath, BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
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
                AddInfoLine(document, "Loại tài liệu", cv.DocType, normalFont);
                AddInfoLine(document, "Tên file gốc", cv.OriginalName, normalFont);
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