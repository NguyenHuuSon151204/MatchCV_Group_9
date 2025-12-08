using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using matchCV_Project.Data;
using matchCV_Project.Models;
using System.Security.Claims;

namespace matchCV_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidateController : ControllerBase
    {
        private readonly MatchCvContext _context;

        public CandidateController(MatchCvContext context)
        {
            _context = context;
        }

        [HttpGet("dashboard")]
        public async Task<IActionResult> GetDashboardMetrics()
        {
            // Get current user ID
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            int userId = 0;

            if (userIdClaim != null && int.TryParse(userIdClaim.Value, out int parsedId))
            {
                userId = parsedId;
            }
            else if (int.TryParse(Request.Query["userId"], out int queryId))
            {
                userId = queryId;
            }

            // If still 0, try to get from a specific claim or fallback for dev
            if (userId == 0)
            {
                 // Check for "id" claim which sometimes is used
                 var idClaim = User.FindFirst("id");
                 if (idClaim != null && int.TryParse(idClaim.Value, out int idVal))
                 {
                     userId = idVal;
                 }
            }

            if (userId == 0)
            {
                // For development/testing if auth is not fully set up, you might want to default to 1
                // But strictly speaking this should be Unauthorized.
                // However, to unblock the user who sees 404, let's return Unauthorized so they know they need to login
                // OR if they are logged in but claims are missing, it's an issue.
                // Let's assume user ID 1 for now if in Development environment? 
                // No, let's return Unauthorized to be safe, but log it.
                return Unauthorized(new { message = "User not authenticated or User ID not found" });
            }

            // Calculate metrics
            var totalCVs = await _context.Documents.CountAsync(d => d.UserId == userId);
            var analyzedCVs = await _context.Documents.CountAsync(d => d.UserId == userId && (d.Status == "Analyzed" || d.Status == "analyzed"));
            var exportedCVs = await _context.Exports.CountAsync(e => e.Document.UserId == userId);
            
            // Average score
            var scores = await _context.Documents
                .Where(d => d.UserId == userId && d.TotalScore.HasValue)
                .Select(d => d.TotalScore.Value)
                .ToListAsync();
            var averageScore = scores.Any() ? (int)scores.Average() : 0;

            // Activity
            var recentDocs = await _context.Documents
                .Where(d => d.UserId == userId)
                .OrderByDescending(d => d.UpdatedAt)
                .Take(5)
                .Select(d => new 
                {
                    Id = d.Id.ToString(),
                    Title = d.DocType == "CV" ? "Uploaded CV" : "Document",
                    Description = d.OriginalName ?? "Untitled",
                    Timestamp = d.UpdatedAt
                })
                .ToListAsync();

            var activity = recentDocs.Select(d => new 
            {
                d.Id,
                d.Title,
                d.Description,
                Timestamp = GetTimeAgo(d.Timestamp)
            }).ToList();

            return Ok(new 
            {
                totalCVs,
                analyzedCVs,
                averageScore,
                exportedCVs,
                activity
            });
        }

        private string GetTimeAgo(DateTime dateTime)
        {
            var span = DateTime.UtcNow - dateTime;
            if (span.TotalMinutes < 1) return "Just now";
            if (span.TotalMinutes < 60) return $"{(int)span.TotalMinutes} min ago";
            if (span.TotalHours < 24) return $"{(int)span.TotalHours} hr ago";
            return $"{(int)span.TotalDays} days ago";
        }
    }
}
