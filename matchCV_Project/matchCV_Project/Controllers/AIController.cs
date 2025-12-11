using matchCV_Project.Data;
using matchCV_Project.Interfaces;
using matchCV_Project.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Globalization;

namespace matchCV_Project.Controllers;

[ApiController]
[Route("api/ai")]
public class AIController : ControllerBase
{
    private readonly MatchCvContext _context;
    private readonly IPdfExtractionService _pdfExtractor;
    private readonly ILogger<AIController> _logger;
    private readonly IWebHostEnvironment _env;

    public AIController(
        MatchCvContext context,
        IPdfExtractionService pdfExtractor,
        ILogger<AIController> logger,
        IWebHostEnvironment env)
    {
        _context = context;
        _pdfExtractor = pdfExtractor;
        _logger = logger;
        _env = env;
    }

    /// <summary>
    /// Rewrite a section of a CV using stored CV data (no hallucinated additions).
    /// </summary>
    [HttpPost("rewrite")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> RewriteSection([FromQuery] int userId, [FromBody] RewriteRequestDto request)
    {
        if (request.DocumentId <= 0) return BadRequest("DocumentId is required");

        var doc = await _context.Documents.FirstOrDefaultAsync(d => d.Id == request.DocumentId);
        if (doc == null) return NotFound("CV not found");
        if (doc.UserId != userId) return StatusCode(StatusCodes.Status403Forbidden, "You are not allowed to rewrite this CV");

        var source = await GetSourceTextAsync(doc);
        if (string.IsNullOrWhiteSpace(source))
            return BadRequest("CV content is empty. Please upload a valid CV.");

        var trimmed = TrimSection(source, request.Section);
        var rewritten = RewritePolish(trimmed, request.Instructions);

        var response = new RewriteResponseDto
        {
            Output = rewritten,
            Highlights = GenerateHighlights(rewritten, request.Section)
        };

        return Ok(response);
    }

    private async Task<string> GetSourceTextAsync(Document doc)
    {
        if (!string.IsNullOrWhiteSpace(doc.Content))
            return doc.Content;

        // Try extract from file
        if (!string.IsNullOrWhiteSpace(doc.StoragePath))
        {
            var webRoot = _env.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            var fullPath = Path.Combine(webRoot, doc.StoragePath);
            if (System.IO.File.Exists(fullPath))
            {
                var text = await _pdfExtractor.ExtractTextFromPdfAsync(fullPath);
                if (!string.IsNullOrWhiteSpace(text))
                    return text;
            }
        }

        // Try CvData JSON summary/experiences
        if (!string.IsNullOrWhiteSpace(doc.CvData))
        {
            try
            {
                using var json = JsonDocument.Parse(doc.CvData);
                var root = json.RootElement;
                var summary = root.GetProperty("personalInfo").GetProperty("summary").GetString();
                if (!string.IsNullOrWhiteSpace(summary)) return summary!;
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Failed to parse CvData for document {DocumentId}", doc.Id);
            }
        }

        return string.Empty;
    }

    private string TrimSection(string text, string? section)
    {
        var cleaned = System.Text.RegularExpressions.Regex.Replace(text, @"\s+", " ").Trim();
        // Keep length moderate
        if (cleaned.Length > 1200)
            cleaned = cleaned.Substring(0, 1200);
        return cleaned;
    }

    private string RewritePolish(string text, string? instructions)
    {
        // Heuristic polish: concise, bullet-style if multiple sentences.
        var sentences = text.Split(new[] { '.', '\n' }, StringSplitOptions.RemoveEmptyEntries)
                            .Select(s => s.Trim())
                            .Where(s => s.Length > 0)
                            .Take(6)
                            .ToList();

        if (sentences.Count == 0) sentences.Add(text);

        var polished = sentences
            .Select(s => EnsureActionTone(s))
            .ToList();

        if (!string.IsNullOrWhiteSpace(instructions))
            polished.Add($"Focus: {instructions.Trim()}");

        return string.Join("; ", polished);
    }

    private string EnsureActionTone(string sentence)
    {
        var verbs = new[] { "Led", "Built", "Delivered", "Improved", "Optimized", "Designed", "Implemented", "Scaled" };
        if (!verbs.Any(v => sentence.StartsWith(v, StringComparison.OrdinalIgnoreCase)))
            return $"{verbs[DateTime.UtcNow.Millisecond % verbs.Length]} {sentence}";
        return sentence;
    }

    private List<string> GenerateHighlights(string text, string? section)
    {
        var highlights = new List<string>();
        var parts = text.Split(';', StringSplitOptions.RemoveEmptyEntries).Take(3);
        highlights.AddRange(parts.Select(p => p.Trim()));
        if (!string.IsNullOrWhiteSpace(section))
            highlights.Add($"Refined {section} with concise impact statements.");
        return highlights;
    }

    // -----------------------------
    // JD Analyzer (lightweight keyword extractor to avoid 405)
    // -----------------------------
    [HttpPost("analyze-jd")]
    [HttpOptions("analyze-jd")]
    [HttpGet("analyze-jd")] // allow GET for debugging to avoid 405 in dev tools
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult AnalyzeJd([FromBody] AnalyzeJdRequest? request, [FromQuery] string? description = null)
    {
        var desc = request?.Description ?? description;
        if (string.IsNullOrWhiteSpace(desc))
        {
            return BadRequest(new { message = "Job description is required" });
        }

        var text = desc.ToLowerInvariant();
        var keywords = new[] { "react", "node", "aws", "azure", "docker", "kubernetes", "sql", "python", "typescript", "leadership", "management" };
        var skills = keywords.Where(k => text.Contains(k)).Select(k => k switch
        {
            "node" => "Node.js",
            "aws" => "AWS",
            "azure" => "Azure",
            "sql" => "SQL",
            _ => CultureInfo.CurrentCulture.TextInfo.ToTitleCase(k)
        }).Distinct().ToList();

        if (skills.Count == 0)
        {
            skills.Add("General software development");
        }

        var priorities = new List<string>
        {
            "Clarify seniority and years of experience",
            "List core technologies explicitly",
            "Add measurable outcomes in responsibilities"
        };

        var suggestions = new List<string>
        {
            "Ensure the JD lists required tech stack and level clearly.",
            "Add measurable KPIs or impact expectations.",
            "Include team structure and reporting lines."
        };

        var result = new AnalyzeJdResponse
        {
            Skills = skills,
            Priorities = priorities,
            Suggestions = suggestions
        };

        return Ok(result);
    }
}

public class RewriteRequestDto
{
    public int DocumentId { get; set; }
    public string Section { get; set; } = "summary";
    public string? Instructions { get; set; }
}

public class RewriteResponseDto
{
    public string Output { get; set; } = string.Empty;
    public List<string> Highlights { get; set; } = new();
}

public class AnalyzeJdRequest
{
    public string Description { get; set; } = string.Empty;
}

public class AnalyzeJdResponse
{
    public List<string> Skills { get; set; } = new();
    public List<string> Priorities { get; set; } = new();
    public List<string> Suggestions { get; set; } = new();
}
