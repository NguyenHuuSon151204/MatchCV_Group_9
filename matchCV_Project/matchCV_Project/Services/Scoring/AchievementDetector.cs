using matchCV_Project.Services;
using System.Text.RegularExpressions;

namespace matchCV_Project.Services.Scoring;

public class AchievementDetector
{
    private readonly IGeminiService _gemini;

    public AchievementDetector(IGeminiService gemini) => _gemini = gemini;

    public async Task<int> CalculateScoreAsync(string cvText)
    {
        if (string.IsNullOrWhiteSpace(cvText)) return 0;

        // Regex patterns to detect quantifiable achievements
        var patterns = new[]
        {
            @"(tăng|increase|grow|tăng trưởng).{0,30}(doanh thu|revenue|sales|traffic|khách hàng).{0,30}(\d+%|\d+ ?[tỷ|triệu|billion])",
            @"(giảm|reduce|save|cut).{0,30}(chi phí|cost|thời gian|time|chi phí vận hành).{0,30}(\d+%|\d+ ?[tỷ|triệu])",
            @"(đạt|achieve|hit).{0,20}(KPI|quota|target).{0,20}(\d+%|1\d\d%)",
            @"(tuyển|recruited|hired).{0,20}\d{1,4}.{0,15}(người|people|nhân sự|employees)",
            @"(xây dựng|built|developed).{0,20}(team|đội|department).{0,20}(of \d+|\d+ người)"
        };

        int regexScore = patterns.Count(p => Regex.IsMatch(cvText, p, RegexOptions.IgnoreCase)) * 12;

        // Use Gemini to catch achievements regex might miss
        var prompt = $"""
            From the CV below, list all achievements with specific metrics (revenue, cost, KPI, team size, etc.)
            Only one achievement per line, no explanation:

            {cvText.Substring(0, Math.Min(cvText.Length, 4000))}
            """;

        var geminiResult = await _gemini.GenerateContentAsync(prompt);
        int geminiScore = geminiResult?.Split('\n', StringSplitOptions.RemoveEmptyEntries)
                                      .Count(line => line.Contains('%') || line.Contains("tỷ") || line.Contains("triệu") || line.Contains("người")) * 8 ?? 0;

        return Math.Min(regexScore + geminiScore, 40); // max 40 points
    }
}