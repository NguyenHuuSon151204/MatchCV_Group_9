namespace matchCV_Project.Models;

public class CandidateScoringInput
{
    public string CvText { get; set; } = string.Empty;
    public string PortfolioUrl { get; set; } = string.Empty;        // GitHub, Behance, Drive, Notion...
    public decimal? ExpectedSalary { get; set; }
    public string? GithubUsername { get; set; }
}

public class JobScoringInput
{
    public string JdText { get; set; } = string.Empty;
    public string Industry { get; set; } = "IT";                    // IT, Marketing, Sales, Finance...
    public string Level { get; set; } = "Junior";                   // Junior, Mid, Senior, Manager...
    public decimal? BudgetMin { get; set; }
    public decimal? BudgetMax { get; set; }
}

public class ScoringResult
{
    public int TotalScore { get; set; }
    public string Label => TotalScore switch
    {
        >= 90 => "Excellent",
        >= 80 => "Very Good",
        >= 70 => "Good",
        >= 60 => "Average",
        _ => "Low Match"
    };
    public string Color => TotalScore switch
    {
        >= 90 => "#10b981",
        >= 80 => "#22c55e",
        >= 70 => "#f59e0b",
        >= 60 => "#f97316",
        _ => "#ef4444"
    };

    public Dictionary<string, int> Breakdown { get; set; } = new();
    public List<string> Highlights { get; set; } = new();   // VD: "Tăng doanh thu 250%", "Managed team of 15"
    public List<string> Warnings { get; set; } = new();      // VD: "Có gap 14 tháng", "Lương mong muốn cao hơn 45%"
}