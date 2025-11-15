using System.Text.Json;
using matchCV_Project.Data;
using matchCV_Project.Interfaces;
using matchCV_Project.Models;

namespace matchCV_Project.Services;

public class AiService : IAiService
{
    private readonly AppDbContext _db;
    public AiService(AppDbContext db) => _db = db;

    public int ScoreMatch(Job job, Document cv)
    {
        // Load required skills for the job
        var reqSkills = _db.RequiredSkills
            .Where(r => r.JobId == job.Id)
            .Join(_db.Skills, r => r.SkillId, s => s.Id,
                (r, s) => new { r.MustHave, r.Weight, s.NormName })
            .ToList();

        // Load document skills if available
        var cvSkills = _db.DocumentSkills
            .Where(ds => ds.DocumentId == cv.Id)
            .Join(_db.Skills, ds => ds.SkillId, s => s.Id,
                (ds, s) => s.NormName)
            .ToHashSet(StringComparer.OrdinalIgnoreCase);

        // Fallback: check in filename
        var text = (cv.OriginalName ?? "").ToLowerInvariant();
        if (cvSkills.Count == 0)
        {
            foreach (var s in reqSkills.Select(x => x.NormName))
                if (text.Contains(s.ToLowerInvariant()))
                    cvSkills.Add(s);
        }

        if (reqSkills.Count == 0)
            return 60;

        double totalWeight = reqSkills.Sum(r => r.Weight ?? 1.0);
        if (totalWeight <= 0) totalWeight = reqSkills.Count;

        double score = 0;
        foreach (var r in reqSkills)
        {
            var w = r.Weight ?? 1.0;
            var has = cvSkills.Contains(r.NormName);
            if (has)
                score += w;
            else if (!r.MustHave)
                score += w * 0.3;
        }

        var ratio = score / totalWeight;
        return Math.Clamp((int)(50 + 50 * ratio), 0, 100);
    }

    public string SummarizeCv(Document cv)
        => $"Summary of CV \"{cv.OriginalName}\" (Doc #{cv.Id}).";
}
