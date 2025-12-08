using System.Text.Json;

public class DynamicWeightService
{
    private readonly Dictionary<string, Dictionary<string, Weight>> _matrix;

    public DynamicWeightService(IWebHostEnvironment env)
    {
        var path = Path.Combine(env.ContentRootPath, "Services", "Scoring", "Data", "weight-matrix.json");
        var json = File.ReadAllText(path);
        _matrix = JsonSerializer.Deserialize<Dictionary<string, Dictionary<string, Weight>>>(json)!;
    }

    public Weight Get(string industry, string level)
    {
        industry = industry.ToUpperInvariant();
        level = level.ToUpperInvariant();

        if (_matrix.TryGetValue(industry, out var levels) && levels.TryGetValue(level, out var weight))
            return weight;

        return new Weight { keyword = 35, exp = 25, achievement = 20, portfolio = 15, leadership = 5 };
    }
}

public class Weight
{
    public int keyword { get; set; }
    public int exp { get; set; }
    public int achievement { get; set; }
    public int portfolio { get; set; }
    public int leadership { get; set; }
    public int certification { get; set; }
}