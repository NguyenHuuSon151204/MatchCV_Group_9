using System.Collections.Concurrent;
using System.Text.Json;
using System.IO;
using System.Linq;
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
    private readonly string _storePath;
    private readonly object _persistenceLock = new();

    // Default daily limits for Free plan
    private static readonly Dictionary<string, int> FreeLimits = new(StringComparer.OrdinalIgnoreCase)
    {
        ["rewrite"] = 5,
        ["jd-analyze"] = 5
    };

    public UsageLimitService(ILogger<UsageLimitService> logger)
    {
        _logger = logger;
        var baseDir = AppContext.BaseDirectory;
        _storePath = Path.Combine(baseDir, "App_Data", "usage-counters.json");
        EnsureStoreLoaded();
    }

    private void EnsureStoreLoaded()
    {
        try
        {
            var dir = Path.GetDirectoryName(_storePath);
            if (!string.IsNullOrEmpty(dir) && !Directory.Exists(dir))
            {
                Directory.CreateDirectory(dir);
            }

            if (File.Exists(_storePath))
            {
                var json = File.ReadAllText(_storePath);
                var entries = JsonSerializer.Deserialize<List<CounterDto>>(json) ?? new();
                foreach (var entry in entries)
                {
                    var key = entry.Key;
                    _counters[key] = (entry.Date, entry.Count);
                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Failed to load usage counters from disk; starting with empty store.");
        }
    }

    private void Persist()
    {
        try
        {
            lock (_persistenceLock)
            {
                var snapshot = _counters.Select(kvp => new CounterDto
                {
                    Key = kvp.Key,
                    Date = kvp.Value.Date,
                    Count = kvp.Value.Count
                }).ToList();

                var json = JsonSerializer.Serialize(snapshot, new JsonSerializerOptions
                {
                    WriteIndented = false
                });
                File.WriteAllText(_storePath, json);
            }
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Failed to persist usage counters to disk.");
        }
    }

    private record CounterDto
    {
        public string Key { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public int Count { get; set; }
    }

    public void ResetForUser(int userId)
    {
        var prefix = $":{userId}:{DateTime.UtcNow:yyyyMMdd}";
        foreach (var key in _counters.Keys.Where(k => k.Contains(prefix)).ToList())
        {
            _counters[key] = (DateTime.UtcNow.Date, 0);
        }
        Persist();
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
        Persist();
        return true;
    }

    public int GetRemaining(int userId, string plan, string action)
    {
        var limit = GetLimit(plan, action);
        if (limit == int.MaxValue) return int.MaxValue;

        var key = $"{action}:{userId}:{DateTime.UtcNow:yyyyMMdd}";
        if (_counters.TryGetValue(key, out var entry) && entry.Date == DateTime.UtcNow.Date)
        {
            return Math.Max(limit - entry.Count, 0);
        }
        // No entry for today: ensure we have a zero entry persisted so reloads don't reset
        _counters[key] = (DateTime.UtcNow.Date, 0);
        Persist();
        return limit;
    }
}
