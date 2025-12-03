using matchCV_Project.Models;
using matchCV_Project.Utils;

namespace matchCV_Project.Services;

public class HeuristicAnalyzer
{
    private readonly string[] _skills = { "C#", ".NET", "JavaScript", "React", "SQL", "Docker", "AWS", "Python", "Git", "Agile" };

    public AnalyzeResponse Analyze(string cvText, string jdText)
    {
        var cv = cvText.ToLowerInvariant();
        var jd = jdText.ToLowerInvariant();

        var jdSkills = _skills.Where(s => jd.Contains(s.ToLowerInvariant())).ToHashSet(StringComparer.OrdinalIgnoreCase);
        var cvSkills = _skills.Where(s => cv.Contains(s.ToLowerInvariant())).ToHashSet(StringComparer.OrdinalIgnoreCase);

        var matched = jdSkills.Intersect(cvSkills).ToList();
        var missing = jdSkills.Except(cvSkills).ToList();

        double baseScore = jdSkills.Count > 0 ? (double)matched.Count / jdSkills.Count * 100 : 0;
        double similarity = CosineSimilarity.Calculate(cvText, jdText) * 100;
        double score = Math.Round(baseScore * 0.7 + similarity * 0.3, 1);

        return new AnalyzeResponse
        {
            Score = score,
            MatchedSkills = matched,
            MissingSkills = missing,
            Evidence = matched.Take(3).Select(s => $"- {s} found in CV").ToList(),
            Method = "Heuristic"
        };
    }

    private HashSet<string> ExtractSkills(string text)
    {
        var skills = new[] { "C#", ".NET", "JavaScript", "React", "SQL", "Docker", "AWS", "Python", "Git", "Agile" };
        var found = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        var lower = text.ToLower();
        foreach (var s in skills)
            if (lower.Contains(s.ToLower())) found.Add(s);
        return found;
    }
}