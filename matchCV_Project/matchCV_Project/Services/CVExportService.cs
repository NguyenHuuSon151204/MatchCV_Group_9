// Services/CVExportService.cs
using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using iText.Html2pdf;
using iText.Kernel.Pdf;
using ApiRestFul.DTOs;

namespace ApiRestFul.Services
{
    /// <summary>
    /// Service for exporting HTML content to PDF format
    /// </summary>
    public class CVExportService : ICVExportService
    {
        private readonly ILogger<CVExportService> _logger;

        /// <summary>
        /// Initializes a new instance of the <see cref="CVExportService"/> class
        /// </summary>
        /// <param name="logger">Logger instance</param>
        /// <exception cref="ArgumentNullException">Thrown when logger is null</exception>
        public CVExportService(ILogger<CVExportService> logger)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        /// <summary>
        /// Converts HTML content to PDF byte array
        /// </summary>
        /// <param name="htmlContent">HTML content to convert</param>
        /// <returns>PDF file as byte array</returns>
        /// <exception cref="ArgumentException">Thrown when htmlContent is null or empty</exception>
        /// <exception cref="PdfExportException">Thrown when PDF generation fails</exception>
        public async Task<byte[]> ExportToPdfAsync(string htmlContent)
        {
            if (string.IsNullOrWhiteSpace(htmlContent))
            {
                _logger.LogWarning("ExportToPdfAsync called with null or empty HTML content");
                throw new ArgumentException("HTML content cannot be null or empty", nameof(htmlContent));
            }

            try
            {
                _logger.LogInformation("Starting PDF export process...");
                var stopwatch = System.Diagnostics.Stopwatch.StartNew();

                using (var memoryStream = new MemoryStream())
                {
                    // Configure PDF writer
                    var writer = new PdfWriter(memoryStream);

                    // Configure PDF document
                    using (var pdf = new PdfDocument(writer))
                    {
                        // Set conversion properties
                        var converterProperties = new ConverterProperties()
                            .SetCharset("UTF-8")                    // Set character encoding
                            .SetCreateAcroForm(false)               // Disable form creation
                            .SetBaseUri(".");                       // Set base directory for resources

                        // Convert HTML to PDF
                        HtmlConverter.ConvertToPdf(htmlContent, pdf, converterProperties);
                    } // PdfDocument is disposed here

                    var result = memoryStream.ToArray();

                    stopwatch.Stop();
                    _logger.LogInformation(
                        "PDF export completed successfully. Size: {Size} bytes, Duration: {ElapsedMs}ms",
                        result.Length,
                        stopwatch.ElapsedMilliseconds
                    );

                    return result;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error occurred while exporting PDF. Error: {ErrorMessage}",
                    ex.Message
                );
                throw new PdfExportException("Failed to generate PDF. Please try again later.", ex);
            }
        }

        public Task<byte[]> ExportToPdfAsync(CVDataDto cvData)
        {
            throw new NotImplementedException();
        }
    }

    /// <summary>
    /// Custom exception for PDF export related errors
    /// </summary>
    public class PdfExportException : Exception
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="PdfExportException"/> class
        /// </summary>
        public PdfExportException() { }

        /// <summary>
        /// Initializes a new instance of the <see cref="PdfExportException"/> class with a specified error message
        /// </summary>
        /// <param name="message">The message that describes the error</param>
        public PdfExportException(string message) : base(message) { }

        /// <summary>
        /// Initializes a new instance of the <see cref="PdfExportException"/> class with a specified error message and a reference to the inner exception
        /// </summary>
        /// <param name="message">The error message that explains the reason for the exception</param>
        /// <param name="innerException">The exception that is the cause of the current exception</param>
        public PdfExportException(string message, Exception inner)
            : base(message, inner) { }
    }
}