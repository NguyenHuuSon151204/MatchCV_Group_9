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
        var text = await ExtractTextFromPdfAsync(filePath);
        return ParseCvText(text);
    }

    public async Task<Dictionary<string, object>> ExtractStructuredDataAsync(byte[] pdfBytes)
    {
        var text = await ExtractTextFromPdfAsync(pdfBytes);
        return ParseCvText(text);
    }

    private Dictionary<string, object> ParseCvText(string text)
    {
        var data = new Dictionary<string, object>();
        data["raw_text"] = text;

        // Simple Regex for Email
        var emailMatch = Regex.Match(text, @"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}");
        if (emailMatch.Success) data["email"] = emailMatch.Value;

        // Simple Regex for Phone
        var phoneMatch = Regex.Match(text, @"(\+84|0)\d{9,10}");
        if (phoneMatch.Success) data["phone"] = phoneMatch.Value;

        // Try to guess name (first line usually)
        var lines = text.Split(new[] { '\r', '\n' }, StringSplitOptions.RemoveEmptyEntries);
        if (lines.Length > 0)
        {
             // Assume first non-empty line is name if it's short enough
             var possibleName = lines[0].Trim();
             if (possibleName.Length < 50 && !possibleName.Contains("@"))
             {
                 data["fullName"] = possibleName;
             }
        }

        // Detect Sections
        bool hasExperience = Regex.IsMatch(text, @"(work experience|kinh nghiệm|employment)", RegexOptions.IgnoreCase);
        bool hasEducation = Regex.IsMatch(text, @"(education|học vấn|đào tạo|trình độ)", RegexOptions.IgnoreCase);
        
        data["hasExperience"] = hasExperience;
        data["hasEducation"] = hasEducation;

        return data;
    }
}
