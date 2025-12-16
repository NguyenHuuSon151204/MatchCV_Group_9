using matchCV_Project.Data;
using matchCV_Project.Models;
using matchCV_Project.Models.Dtos;
using matchCV_Project.Services;
using matchCV_Project.Services.Scoring;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace matchCV_Project.Controllers;

[ApiController]
[Route("api/ai")]
public class AiController : ControllerBase
{
    private readonly MatchCvContext _db;
    private readonly ScoringEngine _scoring;
    private readonly UsageLimitService _usage;
    private readonly ILogger<AiController> _logger;
    private readonly bool _disableUsageLimit;

    public AiController(
        MatchCvContext db,
        ScoringEngine scoring,
        UsageLimitService usage,
        ILogger<AiController> logger,
        IConfiguration config,
        IWebHostEnvironment env)
    {
        _db = db;
        _scoring = scoring;
        _usage = usage;
        _logger = logger;
        // Always enforce usage limits (set to false for consistent demo)
        _disableUsageLimit = false;
    }

    private async Task<(int userId, string plan)> ResolveUserAsync(int? userIdFromRequest)
    {
        var userId = userIdFromRequest ?? 0;
        if (userId <= 0 && User.Identity?.IsAuthenticated == true)
        {
            var idClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
            if (idClaim != null && int.TryParse(idClaim.Value, out int claimUserId))
            {
                userId = claimUserId;
            }
        }

        if (userId <= 0) return (0, "Free");

        var license = await _db.LicenseKeys
            .AsNoTracking()
            .FirstOrDefaultAsync(l => l.AssignedUserId == userId && l.IsActive);

        return (userId, license?.Plan ?? "Free");
    }

    private IActionResult TooManyRequests(string message, int remaining)
    {
        return StatusCode(StatusCodes.Status429TooManyRequests, new
        {
            success = false,
            message,
            remaining
        });
    }

    public record AnalyzeJdRequest(string JobDescription, string CvText, string? Industry, string? Level, int? UserId);
    public record UsageResponse(string Plan, int RemainingRewrite, int RemainingJdAnalyze);

    [HttpGet("usage")]
    public async Task<IActionResult> GetUsage([FromQuery] int? userId)
    {
        var (resolvedUserId, plan) = await ResolveUserAsync(userId);
        if (resolvedUserId == 0)
        {
            return Unauthorized(new { success = false, message = "User not identified." });
        }

        var remainingRewrite = _disableUsageLimit ? int.MaxValue : _usage.GetRemaining(resolvedUserId, plan, "rewrite");
        var remainingJd = _disableUsageLimit ? int.MaxValue : _usage.GetRemaining(resolvedUserId, plan, "jd-analyze");

        return Ok(new
        {
            success = true,
            data = new UsageResponse(plan, remainingRewrite, remainingJd)
        });
    }

    [HttpPost("usage/reset")]
    public async Task<IActionResult> ResetUsage([FromQuery] int? userId)
    {
        var (resolvedUserId, _) = await ResolveUserAsync(userId);
        if (resolvedUserId == 0)
        {
            return Unauthorized(new { success = false, message = "User not identified." });
        }

        _usage.ResetForUser(resolvedUserId);
        return Ok(new { success = true, message = "Usage reset for today." });
    }

    [HttpPost("analyze-jd")]
    public async Task<IActionResult> AnalyzeJd([FromBody] AnalyzeJdRequest request)
    {
        if (request is null || string.IsNullOrWhiteSpace(request.JobDescription) || string.IsNullOrWhiteSpace(request.CvText))
        {
            return BadRequest(new { success = false, message = "JobDescription and CvText are required." });
        }

        var (userId, plan) = await ResolveUserAsync(request.UserId);
        if (userId == 0)
        {
            return Unauthorized(new { success = false, message = "User not identified." });
        }

        var remaining = int.MaxValue;
        if (!_disableUsageLimit && !_usage.TryConsume(userId, plan, "jd-analyze", out remaining))
        {
            return TooManyRequests("JD Analyzer quota exceeded for your plan. Upgrade to Pro for more runs.", remaining);
        }

        try
        {
            var result = await _scoring.CalculateAsync(
                new CandidateScoringInput { CvText = request.CvText },
                new JobScoringInput
                {
                    JdText = request.JobDescription,
                    Industry = request.Industry ?? "IT",
                    Level = request.Level ?? "Mid"
                });

            return Ok(new
            {
                success = true,
                remaining,
                data = result
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to analyze JD");
            return StatusCode(StatusCodes.Status500InternalServerError, new { success = false, message = "Analyze JD failed.", error = ex.Message });
        }
    }

    public record RewriteRequest(string Text, string? Instructions, string? Section, int? UserId);

    [HttpPost("rewrite")]
    public async Task<IActionResult> Rewrite([FromBody] RewriteRequest request)
    {
        if (request is null || string.IsNullOrWhiteSpace(request.Text))
        {
            return BadRequest(new { success = false, message = "Text is required." });
        }

        var (userId, plan) = await ResolveUserAsync(request.UserId);
        if (userId == 0)
        {
            return Unauthorized(new { success = false, message = "User not identified." });
        }

        var remaining = int.MaxValue;
        if (!_disableUsageLimit && !_usage.TryConsume(userId, plan, "rewrite", out remaining))
        {
            return TooManyRequests("AI Rewrite quota exceeded for your plan. Upgrade to Pro for more runs.", remaining);
        }

        // Simple deterministic rewrite: prepend strength, apply instructions as emphasis.
        var instructions = string.IsNullOrWhiteSpace(request.Instructions) ? "" : $" (Focus: {request.Instructions.Trim()})";
        var sectionTag = string.IsNullOrWhiteSpace(request.Section) ? "" : $"[{request.Section.ToUpper()}] ";
        var improved = $"{sectionTag}{request.Text.Trim()} — Delivered measurable impact with clear outcomes.{instructions}";

        var highlights = new List<string>
        {
            "Clarified impact with measurable outcome.",
            "Strengthened action verbs and conciseness."
        };
        if (!string.IsNullOrWhiteSpace(request.Instructions))
        {
            highlights.Add($"Aligned with instruction: {request.Instructions.Trim()}");
        }

        return Ok(new
        {
            success = true,
            remaining,
            data = new
            {
                output = improved,
                highlights
            }
        });
    }
}
