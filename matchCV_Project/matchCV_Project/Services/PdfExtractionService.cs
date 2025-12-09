using matchCV_Project.Interfaces;
// using UglyToad.PdfPig;
// using UglyToad.PdfPig.Content;
using System.Text.RegularExpressions;

namespace matchCV_Project.Services;

public class PdfExtractionService : IPdfExtractionService
{
    private readonly ILogger<PdfExtractionService> _logger;

    public PdfExtractionService(ILogger<PdfExtractionService> logger)
    {
        _logger = logger;
    }

    public async Task<string> ExtractTextFromPdfAsync(string filePath)
    {
        if (!File.Exists(filePath))
        {
            _logger.LogWarning($"File not found: {filePath}");
            return string.Empty;
        }

        try
        {
            return await Task.Run(() =>
            {
                using (var reader = new iTextSharp.text.pdf.PdfReader(filePath))
                {
                    return ExtractTextFromReader(reader);
                }
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error extracting text from PDF file: {FilePath}", filePath);
            return string.Empty;
        }
    }

    public async Task<string> ExtractTextFromPdfAsync(byte[] pdfBytes)
    {
        try
        {
            return await Task.Run(() =>
            {
                using (var reader = new iTextSharp.text.pdf.PdfReader(pdfBytes))
                {
                    return ExtractTextFromReader(reader);
                }
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error extracting text from PDF bytes");
            return string.Empty;
        }
    }

    private string ExtractTextFromReader(iTextSharp.text.pdf.PdfReader reader)
    {
        var text = new StringWriter();
        for (int i = 1; i <= reader.NumberOfPages; i++)
        {
            text.WriteLine(iTextSharp.text.pdf.parser.PdfTextExtractor.GetTextFromPage(reader, i));
        }
        return text.ToString();
    }

    public async Task<Dictionary<string, object>> ExtractStructuredDataAsync(string filePath)
    {
        // Placeholder for structured extraction (e.g. using AI or regex on extracted text)
        var text = await ExtractTextFromPdfAsync(filePath);
        return new Dictionary<string, object> { { "raw_text", text } };
    }

    public async Task<Dictionary<string, object>> ExtractStructuredDataAsync(byte[] pdfBytes)
    {
         // Placeholder for structured extraction
        var text = await ExtractTextFromPdfAsync(pdfBytes);
        return new Dictionary<string, object> { { "raw_text", text } };
    }
}
