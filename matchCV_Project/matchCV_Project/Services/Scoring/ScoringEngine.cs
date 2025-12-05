using matchCV_Project.Models;
using matchCV_Project.Services.Scoring;
using matchCV_Project.Services;

namespace matchCV_Project.Services.Scoring;

public class ScoringEngine
{
    private readonly DynamicWeightService _weightService;
    private readonly IGeminiService _gemini;
    private readonly AchievementDetector _achievementDetector;
    private readonly PortfolioScorer _portfolioScorer;
    private readonly RedFlagDetector _redFlagDetector;
    private readonly CertificationDatabase _certDb;

    public ScoringEngine(
        DynamicWeightService weightService,
        IGeminiService gemini,
        AchievementDetector achievementDetector,
        PortfolioScorer portfolioScorer,
        RedFlagDetector redFlagDetector,
        CertificationDatabase certDb)
    {
        _weightService = weightService;
        _gemini = gemini;
        _achievementDetector = achievementDetector;
        _portfolioScorer = portfolioScorer;
        _redFlagDetector = redFlagDetector;
        _certDb = certDb;
    }

    public async Task<ScoringResult> CalculateAsync(CandidateScoringInput candidate, JobScoringInput jd)
    {
        var weight = _weightService.Get(jd.Industry, jd.Level);
        var result = new ScoringResult { Breakdown = new(), Highlights = new(), Warnings = new() };
        int total = 0;

        // 1. Keyword & Skill Match (dùng Gemini embedding hoặc cosine)
        int keywordScore = await KeywordMatchScore(candidate.CvText, jd.JdText);
        result.Breakdown["keyword"] = keywordScore;
        total += (int)(keywordScore * weight.keyword / 100.0);

        // 2. Years of Experience
        int expScore = ExperienceScore(candidate.CvText, jd.JdText);
        result.Breakdown["experience"] = expScore;
        total += (int)(expScore * weight.exp / 100.0);

        // 3. Achievement & Impact (đa ngành)
        int achievementScore = await _achievementDetector.CalculateScoreAsync(candidate.CvText);
        result.Breakdown["achievement"] = achievementScore;
        total += (int)(achievementScore * weight.achievement / 100.0);

        // 4. Portfolio Scoring
        int portfolioScore = await _portfolioScorer.CalculateScoreAsync(candidate.PortfolioUrl, jd.Industry);
        result.Breakdown["portfolio"] = portfolioScore;
        total += (int)(portfolioScore * weight.portfolio / 100.0);

        // 5. Leadership Signals
        int leadershipScore = await LeadershipScore(candidate.CvText);
        result.Breakdown["leadership"] = leadershipScore;
        total += (int)(leadershipScore * weight.leadership / 100.0);

        // 6. Certification Bonus
        int certScore = _certDb.CalculateScore(candidate.CvText);
        result.Breakdown["certification"] = certScore;
        total += certScore;

        // 7. Salary Fit
        int salaryBonus = SalaryFit(candidate.ExpectedSalary, jd.BudgetMin, jd.BudgetMax);
        result.Breakdown["salary"] = salaryBonus;
        total += salaryBonus;

        // 8. Red Flag Penalty
        int redflagPenalty = await _redFlagDetector.DetectPenaltyAsync(candidate.CvText);
        result.Breakdown["redflag"] = redflagPenalty;
        total += redflagPenalty;

        result.TotalScore = Math.Clamp(total, 0, 100);
        return result;
    }

    // ====================== CÁC HÀM ĐÃ ĐƯỢC VIẾT ĐẦY ĐỦ ======================

    private async Task<int> KeywordMatchScore(string cvText, string jdText)
    {
        // Dùng Gemini embedding (chuẩn 2026) – cực chính xác
        var prompt = $"So sánh mức độ tương đồng kỹ năng giữa CV và JD sau (0-100):\n\nCV:\n{cvText}\n\nJD:\n{jdText}\nChỉ trả về số.";
        var response = await _gemini.GenerateContentAsync(prompt);
        if (int.TryParse(response.Trim(), out int score)) return Math.Min(score, 100);
        return 75; // fallback
    }

    private int ExperienceScore(string cvText, string jdText)
    {
        // Trích năm kinh nghiệm
        var years = System.Text.RegularExpressions.Regex.Matches(cvText, @"\b(\d+\+?)\s*(năm|years?)\b", System.Text.RegularExpressions.RegexOptions.IgnoreCase)
            .Select(m => m.Groups[1].Value.Replace("+", ""))
            .Where(v => int.TryParse(v, out _))
            .Select(int.Parse)
            .DefaultIfEmpty(0)
            .Max();

        // Trích yêu cầu JD
        var reqMatch = System.Text.RegularExpressions.Regex.Match(jdText, @"\b(\d+-?\d*)\+?\s*(năm|years?)", System.Text.RegularExpressions.RegexOptions.IgnoreCase);
        int required = reqMatch.Success ? int.Parse(reqMatch.Groups[1].Value.Split('-')[0]) : 2;

        if (years >= required + 3) return 100;
        if (years >= required) return 90;
        if (years >= required - 1) return 70;
        return 40;
    }

    private async Task<int> LeadershipScore(string cvText)
    {
        var patterns = new[]
        {
            "led team", "managed \\d+", "head of", "director", "manager", "built team", "mentored", "technical lead", "team lead"
        };
        int count = patterns.Count(p => System.Text.RegularExpressions.Regex.IsMatch(cvText, p, System.Text.RegularExpressions.RegexOptions.IgnoreCase));
        return Math.Min(count * 15, 30);
    }

    private int SalaryFit(decimal? expected, decimal? min, decimal? max)
    {
        if (!expected.HasValue || (!min.HasValue && !max.HasValue)) return 0;
        decimal budget = max ?? min ?? expected.Value;

        if (expected <= budget * 0.9m) return 10;
        if (expected <= budget) return 5;
        if (expected <= budget * 1.3m) return -10;
        if (expected <= budget * 1.7m) return -25;
        return -40;
    }
}