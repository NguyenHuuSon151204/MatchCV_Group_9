using matchCV_Project.Data;
using matchCV_Project.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace matchCV_Project.Services;

public class NotificationService
{
    private readonly MatchCvContext _db;
    private readonly ILogger<NotificationService> _logger;

    public NotificationService(MatchCvContext db, ILogger<NotificationService> logger)
    {
        _db = db;
        _logger = logger;
    }

    public async Task<int> CreateForRoleAsync(string role, string title, string message, string category = "info", int? userId = null)
    {
        var notification = new Notification
        {
            Role = role,
            UserId = userId,
            Title = title,
            Message = message,
            Category = category,
            CreatedAt = DateTime.UtcNow,
            IsRead = false
        };

        _db.Notifications.Add(notification);
        await _db.SaveChangesAsync();
        _logger.LogInformation("Notification created for role {Role} userId {UserId}: {Title}", role, userId, title);
        return notification.Id;
    }

    public async Task<int> CreateForUserAsync(int userId, string title, string message, string category = "info")
    {
        return await CreateForRoleAsync("User", title, message, category, userId);
    }

    public async Task<int> CreateForRecruiterAsync(int userId, string title, string message, string category = "info")
    {
        return await CreateForRoleAsync("Recruiter", title, message, category, userId);
    }

    public async Task<int> CreateForAdminAsync(string title, string message, string category = "info")
    {
        return await CreateForRoleAsync("Admin", title, message, category, null);
    }
}

