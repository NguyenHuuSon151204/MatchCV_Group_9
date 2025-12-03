using MatchCV_Project.Data;
using MatchCV_Project.Interfaces;
using MatchCV_Project.Models;
using MatchCV_Project.Models.Dtos;
using Microsoft.EntityFrameworkCore;

namespace MatchCV_Project.Services;

public class AnalyzerService : IAnalyzerService
{
    private readonly MatchCvContext _context;
    private readonly ILogger<AnalyzerService> _logger;

    public AnalyzerService(MatchCvContext context, ILogger<AnalyzerService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<AnalysisResultDto> AnalyzeDocumentAsync(int documentId)
    {
        try
        {
            var document = await _context.Documents
                .Include(d => d.DocumentSkills)
                .ThenInclude(ds => ds.Skill)
                .Include(d => d.Experiences)
                .Include(d => d.Educations)
                .FirstOrDefaultAsync(d => d.Id == documentId);

            if (document == null)
                throw new ArgumentException($"Document with ID {documentId} not found");

            // Mock AI Analysis - In production, integrate with real AI service
            var result = new AnalysisResultDto
            {
                DocumentId = documentId,
                Score = CalculateMockScore(document),
                Confidence = 0.85f,
                Evidence = GenerateMockEvidence(document),
                AnalysisDate = DateTime.UtcNow,
                Skills = document.DocumentSkills.Select(ds => new SkillAnalysisDto
                {
                    Name = ds.Skill.Name,
                    Proficiency = ds.Proficiency,
                    Confidence = ds.Confidence ?? 0.8f
                }).ToList(),
                Experiences = document.Experiences.Count,
                Educations = document.Educations.Count
            };

            // Update document with analysis results
            document.TotalScore = result.Score;
            document.AiConfidence = result.Confidence;
            document.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            _logger.LogInformation($"Document {documentId} analyzed successfully. Score: {result.Score}");

            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error analyzing document: {ex.Message}");
            throw;
        }
    }

    public async Task<float> CalculateJobMatchScoreAsync(int documentId, int jobId)
    {
        try
        {
            var document = await _context.Documents
                .Include(d => d.DocumentSkills)
                .ThenInclude(ds => ds.Skill)
                .FirstOrDefaultAsync(d => d.Id == documentId);

            var job = await _context.Jobs.FirstOrDefaultAsync(j => j.Id == jobId);

            if (document == null || job == null)
                throw new ArgumentException("Document or Job not found");

            // Mock matching calculation
            var skillMatchScore = CalculateSkillMatch(document, job);
            var experienceScore = CalculateExperienceScore(document, job);

            var finalScore = (skillMatchScore * 0.6f) + (experienceScore * 0.4f);

            return Math.Min(finalScore, 100);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error calculating job match: {ex.Message}");
            throw;
        }
    }

    private float CalculateMockScore(Document document)
    {
        float score = 50; // Base score

        // Bonus for skills
        score += document.DocumentSkills.Count * 5;

        // Bonus for experiences
        score += document.Experiences.Count * 3;

        // Bonus for education
        score += document.Educations.Count * 2;

        return Math.Min(score, 100);
    }

    private string GenerateMockEvidence(Document document)
    {
        var evidenceList = new List<string>();

        if (document.DocumentSkills.Count > 0)
            evidenceList.Add($"Found {document.DocumentSkills.Count} relevant skills");

        if (document.Experiences.Count > 0)
            evidenceList.Add($"Detected {document.Experiences.Count} professional experiences");

        if (document.Educations.Count > 0)
            evidenceList.Add($"Identified {document.Educations.Count} educational qualifications");

        return string.Join("; ", evidenceList);
    }

    private float CalculateSkillMatch(Document document, Job job)
    {
        // Mock: 70% base match
        return 70;
    }

    private float CalculateExperienceScore(Document document, Job job)
    {
        // Mock: 75% base match
        return 75;
    }
}
