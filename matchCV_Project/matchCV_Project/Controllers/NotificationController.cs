using matchCV_Project.Data;
using matchCV_Project.Models.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace matchCV_Project.Controllers;

[ApiController]
[Route("api/notifications")]
public class NotificationController : ControllerBase
{
    private readonly MatchCvContext _db;

    public NotificationController(MatchCvContext db)
    {
        _db = db;
    }

    public record NotificationDto(
        int Id,
        string Title,
        string Message,
        string Role,
        string Time,
        string Category,
        bool IsRead
    );

    [HttpGet]
    public async Task<ActionResult<BaseResponseDto<IEnumerable<NotificationDto>>>> Get(
        [FromQuery] string? role = null,
        [FromQuery] int? userId = null,
        [FromQuery] int take = 50)
    {
        var query = _db.Notifications.AsNoTracking().AsQueryable();

        if (userId.HasValue && userId.Value > 0)
        {
            query = query.Where(n => n.UserId == userId.Value);
        }
        else if (!string.IsNullOrWhiteSpace(role))
        {
            query = query.Where(n => n.Role == role);
        }

        var items = await query
            .OrderByDescending(n => n.CreatedAt)
            .Take(Math.Clamp(take, 10, 200))
            .Select(n => new NotificationDto(
                n.Id,
                n.Title,
                n.Message,
                n.Role,
                ToRelativeTime(n.CreatedAt),
                n.Category,
                n.IsRead
            ))
            .ToListAsync();

        return Ok(BaseResponseDto<IEnumerable<NotificationDto>>.SuccessResponse(items, "Notifications fetched"));
    }

    [HttpPost("{id:int}/read")]
    public async Task<ActionResult<BaseResponseDto<object>>> MarkRead(int id)
    {
        var notification = await _db.Notifications.FirstOrDefaultAsync(n => n.Id == id);
        if (notification == null)
            return NotFound(BaseResponseDto<object>.FailureResponse("Notification not found"));

        notification.IsRead = true;
        await _db.SaveChangesAsync();
        return Ok(BaseResponseDto<object>.SuccessResponse(new { id }, "Marked as read"));
    }

    [HttpPost("read-all")]
    public async Task<ActionResult<BaseResponseDto<object>>> MarkAllRead([FromQuery] string? role = null, [FromQuery] int? userId = null)
    {
        var query = _db.Notifications.AsQueryable();

        if (userId.HasValue && userId.Value > 0)
        {
            query = query.Where(n => n.UserId == userId.Value);
        }
        else if (!string.IsNullOrWhiteSpace(role))
        {
            query = query.Where(n => n.Role == role);
        }

        var updated = await query.ExecuteUpdateAsync(setters => setters.SetProperty(n => n.IsRead, true));
        return Ok(BaseResponseDto<object>.SuccessResponse(new { updated }, "Marked all as read"));
    }

    private static string ToRelativeTime(DateTime createdAtUtc)
    {
        var span = DateTime.UtcNow - createdAtUtc;
        if (span.TotalMinutes < 1) return "Vừa xong";
        if (span.TotalMinutes < 60) return $"{Math.Max(1, (int)span.TotalMinutes)} phút trước";
        if (span.TotalHours < 24) return $"{Math.Max(1, (int)span.TotalHours)} giờ trước";
        if (span.TotalDays < 30) return $"{Math.Max(1, (int)span.TotalDays)} ngày trước";
        return createdAtUtc.ToString("dd/MM/yyyy");
    }
}

