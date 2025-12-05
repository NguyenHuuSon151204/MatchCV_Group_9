<<<<<<< HEAD
﻿namespace MatchCV.Project.Services.Scoring;
=======
﻿namespace matchCV_Project.Services.Scoring;
>>>>>>> cc5f27092afd6cf6f701b8fbb0be3a8b618f8c93

public class PortfolioScorer
{
    private readonly HttpClient _http;

    public PortfolioScorer(IHttpClientFactory factory) => _http = factory.CreateClient();

    public async Task<int> CalculateScoreAsync(string? url, string industry)
    {
        if (string.IsNullOrWhiteSpace(url)) return 0;

        url = url.ToLower();

        if (url.Contains("github.com"))
            return await ScoreGitHub(url);
        if (url.Contains("behance.net") || url.Contains("dribbble.com"))
            return await ScoreDesign(url);
        if (url.Contains("drive.google.com") || url.Contains("notion.site") || url.Contains("docs.google"))
            return await ScoreCaseStudy(url);

        return 12; // có link là được +12
    }

    private async Task<int> ScoreGitHub(string url)
    {
        try
        {
            var username = url.Split(new[] { "github.com/" }, StringSplitOptions.None)[1].Trim('/').Split('/')[0];
            var json = await _http.GetStringAsync($"https://api.github.com/users/{username}");
            var doc = System.Text.Json.JsonDocument.Parse(json);
            int repos = doc.RootElement.GetProperty("public_repos").GetInt32();
            int stars = 0; // có thể mở rộng lấy stars từ repos

            return repos > 50 ? 30 : repos > 20 ? 25 : repos > 5 ? 18 : 12;
        }
        catch { return 15; }
    }

    private Task<int> ScoreDesign(string url) => Task.FromResult(28); // trung bình designer giỏi
    private Task<int> ScoreCaseStudy(string url) => Task.FromResult(25); // có case study rõ ràng
}