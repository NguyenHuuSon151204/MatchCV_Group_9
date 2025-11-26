using MatchCV_Project.Interfaces;
using UglyToad.PdfPig;
using UglyToad.PdfPig.Content;
using System.Text.RegularExpressions;

namespace MatchCV_Project.Services;

public class PdfExtractionService : IPdfExtractionService
{
    private readonly ILogger<PdfExtractionService> _logger;

    public PdfExtractionService(ILogger<PdfExtractionService> logger)
    {
        _logger = logger;
    }

    public async Task<string> ExtractTextFromPdfAsync(string filePath)
    {
        try
        {
            if (!File.Exists(filePath))
                throw new FileNotFoundException($"PDF file not found: {filePath}");

            var pdfBytes = await File.ReadAllBytesAsync(filePath);
            return await ExtractTextFromPdfAsync(pdfBytes);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error extracting text from PDF {filePath}: {ex.Message}");
            throw;
        }
    }

    public async Task<string> ExtractTextFromPdfAsync(byte[] pdfBytes)
    {
        try
        {
            using var document = PdfDocument.Open(pdfBytes);
            var textBuilder = new System.Text.StringBuilder();

            foreach (var page in document.GetPages())
            {
                var pageText = page.Text;
                textBuilder.AppendLine(pageText);
            }

            return textBuilder.ToString();
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error extracting text from PDF bytes: {ex.Message}");
            throw;
        }
    }

    public async Task<Dictionary<string, object>> ExtractStructuredDataAsync(string filePath)
    {
        if (!File.Exists(filePath))
            throw new FileNotFoundException($"PDF file not found: {filePath}");

        var pdfBytes = await File.ReadAllBytesAsync(filePath);
        return await ExtractStructuredDataAsync(pdfBytes);
    }

    public async Task<Dictionary<string, object>> ExtractStructuredDataAsync(byte[] pdfBytes)
    {
        var text = await ExtractTextFromPdfAsync(pdfBytes);
        return ParseStructuredData(text);
    }

    private Dictionary<string, object> ParseStructuredData(string text)
    {
        var data = new Dictionary<string, object>
        {
            ["FullText"] = text
        };

        // Extract email
        var emailPattern = @"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b";
        var emailMatch = Regex.Match(text, emailPattern);
        if (emailMatch.Success)
            data["Email"] = emailMatch.Value;

        // Extract phone number
        var phonePattern = @"(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}";
        var phoneMatches = Regex.Matches(text, phonePattern);
        if (phoneMatches.Count > 0)
            data["Phone"] = phoneMatches[0].Value;

        // Extract skills (common keywords)
        var skillKeywords = new[] { "C#", "Java", "Python", "JavaScript", "SQL", "React", "Angular", "Node.js", 
            "ASP.NET", ".NET", "Azure", "AWS", "Docker", "Kubernetes", "Git", "Agile", "Scrum" };
        var foundSkills = skillKeywords.Where(skill => 
            text.Contains(skill, StringComparison.OrdinalIgnoreCase)).ToList();
        if (foundSkills.Any())
            data["Skills"] = foundSkills;

        // Extract years of experience
        var experiencePattern = @"(\d+)\+?\s*(years?|yrs?)\s*(of\s*)?(experience|exp)";
        var expMatch = Regex.Match(text, experiencePattern, RegexOptions.IgnoreCase);
        if (expMatch.Success && int.TryParse(expMatch.Groups[1].Value, out var years))
            data["YearsOfExperience"] = years;

        // Extract education (common keywords)
        var educationKeywords = new[] { "Bachelor", "Master", "PhD", "Degree", "University", "College", "BS", "MS", "MBA" };
        var foundEducation = educationKeywords.Where(edu => 
            text.Contains(edu, StringComparison.OrdinalIgnoreCase)).ToList();
        if (foundEducation.Any())
            data["Education"] = foundEducation;

        return data;
    }
}

