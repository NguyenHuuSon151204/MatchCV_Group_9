using System.Collections.Concurrent;
using matchCV_Project.Data;
using Microsoft.EntityFrameworkCore;

namespace matchCV_Project.Services;

/// <summary>
/// Simple in-memory, per-day usage limiter keyed by user + action.
/// Free plan: small daily quota; Pro: unlimited (int.MaxValue).
/// This is stateless across restarts but adequate for short-term rate limiting.
/// </summary>
public class UsageLimitService
{
    private readonly ConcurrentDictionary<string, (DateTime Date, int Count)> _counters = new();
    private readonly ILogger<UsageLimitService> _logger;

    // Default daily limits for Free plan
    private static readonly Dictionary<string, int> FreeLimits = new(StringComparer.OrdinalIgnoreCase)
    {
        ["rewrite"] = 5,
        ["jd-analyze"] = 5
    };

    public UsageLimitService(ILogger<UsageLimitService> logger)
    {
        _logger = logger;
    }

    public int GetLimit(string plan, string action)
    {
        if (plan.Equals("Pro", StringComparison.OrdinalIgnoreCase))
            return int.MaxValue;
        return FreeLimits.TryGetValue(action, out var limit) ? limit : 5;
    }

    public bool TryConsume(int userId, string plan, string action, out int remaining)
    {
        var limit = GetLimit(plan, action);
        // Unlimited
        if (limit == int.MaxValue)
        {
            remaining = int.MaxValue;
            return true;
        }

        var key = $"{action}:{userId}:{DateTime.UtcNow:yyyyMMdd}";
        var today = DateTime.UtcNow.Date;
        _counters.AddOrUpdate(key, _ => (Date: today, Count: 0), (_, current) =>
        {
            // Reset counter when day changes
            return current.Date == today ? current : (Date: today, Count: 0);
        });

        var entry = _counters[key];
        if (entry.Count >= limit)
        {
            remaining = 0;
            return false;
        }

        var updated = (Date: entry.Date, Count: entry.Count + 1);
        _counters[key] = updated;
        remaining = limit - updated.Count;
        return true;
    }
}

