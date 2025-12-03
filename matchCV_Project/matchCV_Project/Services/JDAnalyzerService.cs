using matchCV_Project.Models;

namespace matchCV_Project.Services;

public class JDAnalyzerService
{
    private readonly IEnumerable<ITextExtractor> _extractors;
    private readonly IGeminiService _gemini;
    private readonly HeuristicAnalyzer _heuristic;

    public JDAnalyzerService(IEnumerable<ITextExtractor> extractors, IGeminiService gemini)
    {
        _extractors = extractors;
        _gemini = gemini;
        _heuristic = new HeuristicAnalyzer();
    }

    public async Task<AnalyzeResponse> AnalyzeAsync(IFormFile cvFile, string jdText)
    {
        var extractor = _extractors.FirstOrDefault(e => e.CanExtract(cvFile.FileName))
            ?? throw new NotSupportedException("Only PDF/DOCX supported.");

        string cvText;
        using (var stream = cvFile.OpenReadStream())
            cvText = await extractor.ExtractAsync(stream);

        if (string.IsNullOrWhiteSpace(cvText))
            throw new InvalidOperationException("Empty CV.");

        var geminiResult = await TryGemini(cvText, jdText);
        return geminiResult ?? _heuristic.Analyze(cvText, jdText);
    }

    private async Task<AnalyzeResponse?> TryGemini(string cv, string jd)
    {
        var prompt = $@"
Return ONLY valid JSON:
{{
  ""score"": 0-100,
  ""matched_skills"": [""C#"", "".NET""],
  ""missing_skills"": [""Docker"", ""AWS""],
  ""evidence"": [""C# found in CV""]
}}
CV: {cv[..Math.Min(8000, cv.Length)]}
JD: {jd[..Math.Min(4000, jd.Length)]}
";

        var raw = await _gemini.GenerateContentAsync(prompt);
        if (string.IsNullOrWhiteSpace(raw)) return null;

        try
        {
            var jsonStart = raw.IndexOf('{');
            var jsonEnd = raw.LastIndexOf('}');
            if (jsonStart < 0 || jsonEnd < 0) return null;

            var json = raw.Substring(jsonStart, jsonEnd - jsonStart + 1);
            var data = System.Text.Json.JsonSerializer.Deserialize<Dictionary<string, System.Text.Json.JsonElement>>(json);

            return new AnalyzeResponse
            {
                Score = data["score"].GetDouble(),
                MatchedSkills = ParseList(data["matched_skills"]),
                MissingSkills = ParseList(data["missing_skills"]),
                Evidence = ParseList(data["evidence"]),
                Method = "Gemini"
            };
        }
        catch
        {
            return null;
        }
    }

    private List<string> ParseList(System.Text.Json.JsonElement el)
    {
        if (el.ValueKind != System.Text.Json.JsonValueKind.Array) return new();
        return el.EnumerateArray().Select(x => x.GetString() ?? "").Where(s => !string.IsNullOrEmpty(s)).ToList();
    }
}