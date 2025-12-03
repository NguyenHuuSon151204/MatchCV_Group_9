namespace MatchCV.Project.Services.Scoring;

public class RedFlagDetector
{
    public Task<int> DetectPenaltyAsync(string cvText)
    {
        if (string.IsNullOrWhiteSpace(cvText)) return Task.FromResult(0);

        int penalty = 0;

        // Nhảy việc quá nhiều (<12 tháng)
        var shortJobs = System.Text.RegularExpressions.Regex.Matches(cvText, @"\b(20\d{2} – 20\d{2})\b")
            .Cast<System.Text.RegularExpressions.Match>()
            .Select(m => m.Value)
            .Where(date => CalculateMonths(date) < 12);

        if (shortJobs.Count() >= 4) penalty -= 30;
        else if (shortJobs.Count() >= 3) penalty -= 20;

        // Gap year
        if (System.Text.RegularExpressions.Regex.IsMatch(cvText, @"gap|nghỉ việc|năm nghỉ|break|sabbatical", System.Text.RegularExpressions.RegexOptions.IgnoreCase))
            if (!cvText.Contains("học") && !cvText.Contains("sinh con") && !cvText.Contains("chăm sóc"))
                penalty -= 15;

        // Copy JD quá nhiều
        // (sẽ so sánh với JD ở ngoài)

        return Task.FromResult(Math.Max(penalty, -50));
    }

    private int CalculateMonths(string period)
    {
        // đơn giản: 2022 – 2023 = 12 tháng
        var years = System.Text.RegularExpressions.Regex.Matches(period, @"\d{4}").Select(m => int.Parse(m.Value)).ToArray();
        return years.Length == 2 ? (years[1] - years[0]) * 12 : 0;
    }
}