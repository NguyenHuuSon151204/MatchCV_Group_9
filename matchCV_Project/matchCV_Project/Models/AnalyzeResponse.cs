namespace matchCV_Project.Models;

public class AnalyzeResponse
{
    public double Score { get; set; }
    public List<string> MatchedSkills { get; set; } = new();
    public List<string> MissingSkills { get; set; } = new();
    public List<string> Evidence { get; set; } = new();
    public List<string> RewriteSuggestions { get; set; } = new();
    public string Method { get; set; } = "Gemini";
}