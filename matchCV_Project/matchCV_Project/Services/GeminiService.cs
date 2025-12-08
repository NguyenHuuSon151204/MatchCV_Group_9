namespace matchCV_Project.Services;

public class GeminiService : IGeminiService
{
    private readonly string? _apiKey;

    public GeminiService(IConfiguration config)
    {
        _apiKey = config["Gemini:ApiKey"];
    }

    public async Task<string?> GenerateContentAsync(string prompt)
    {
        // For testing, return mock data
        // In production with real API key, integrate with actual Gemini API
        await Task.Delay(100);

        if (prompt.Contains("achievement", StringComparison.OrdinalIgnoreCase))
            return "• Led team of 5 developers\n• Implemented feature with 20% improvement\n• Mentored 2 junior developers";
        
        if (prompt.Contains("project", StringComparison.OrdinalIgnoreCase))
            return "• Built React dashboard\n• Developed REST API\n• Optimized database queries by 40%";

        return "Strong technical foundation and leadership";
    }
}