using matchCV_Project.Data;
using matchCV_Project.Interfaces;
using matchCV_Project.Models;
using matchCV_Project.Models.Dtos;
using matchCV_Project.Services.Scoring;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using System.IO;

namespace matchCV_Project.Services;

public class AnalyzerService : IAnalyzerService
{
    private readonly MatchCvContext _context;
    private readonly ILogger<AnalyzerService> _logger;
    private readonly ScoringEngine _scoringEngine;
    private readonly IPdfExtractionService _pdfExtraction;
    private readonly IWebHostEnvironment _env;

    public AnalyzerService(
        MatchCvContext context,
        ILogger<AnalyzerService> logger,
        ScoringEngine scoringEngine,
        IPdfExtractionService pdfExtraction,
        IWebHostEnvironment env)
    {
        _context = context;
        _logger = logger;
        _scoringEngine = scoringEngine;
        _pdfExtraction = pdfExtraction;
        _env = env;
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
                    Confidence = (float)(ds.Confidence ?? 0.8f)
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

    /// <summary>
    /// Score a stored CV (Document) against a Job using weight-matrix (ScoringEngine)
    /// </summary>
    public async Task<ScoringResult> ScoreDocumentVsJobAsync(int documentId, int jobId, string industry = "IT", string level = "Mid")
    {
        var document = await _context.Documents.FirstOrDefaultAsync(d => d.Id == documentId);
        var job = await _context.Jobs.FirstOrDefaultAsync(j => j.Id == jobId);

        if (document == null || job == null)
            throw new ArgumentException("Document or Job not found");

        var cvText = await GetCvTextAsync(document);
        if (string.IsNullOrWhiteSpace(cvText))
        {
            _logger.LogWarning("Document {DocumentId} has empty content. Returning zero score.", documentId);
            return new ScoringResult
            {
                TotalScore = 0,
                Breakdown = new Dictionary<string, int>
                {
                    ["keyword"] = 0,
                    ["experience"] = 0,
                    ["achievement"] = 0,
                    ["portfolio"] = 0,
                    ["leadership"] = 0,
                    ["certification"] = 0,
                    ["salary"] = 0,
                    ["redflag"] = 0
                },
                Highlights = new List<string>(),
                Warnings = new List<string> { "CV content is empty. Please upload a valid CV before analyzing." }
            };
        }

        var jobText = job.JobDescription ?? job.RawText ?? job.Title ?? string.Empty;

        var candidateInput = new CandidateScoringInput
        {
            CvText = cvText,
            PortfolioUrl = "",
            ExpectedSalary = null,
            GithubUsername = null
        };

        var jobInput = new JobScoringInput
        {
            JdText = jobText,
            Industry = industry,
            Level = level,
            BudgetMin = null,
            BudgetMax = null
        };

        var result = await _scoringEngine.CalculateAsync(candidateInput, jobInput);
        _logger.LogInformation("Scored document {DocumentId} vs job {JobId}. Score: {Score}", documentId, jobId, result.TotalScore);
        return result;
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

    /// <summary>
    /// Score a CV against a Job Description using AI
    /// </summary>
    public async Task<ScoringResult> ScoreCvVsJobAsync(string cvText, string jobDescription, string industry = "IT", string level = "Mid")
    {
        try
        {
            var candidateInput = new CandidateScoringInput
            {
                CvText = cvText,
                PortfolioUrl = "",
                ExpectedSalary = null,
                GithubUsername = null
            };

            var jobInput = new JobScoringInput
            {
                JdText = jobDescription,
                Industry = industry,
                Level = level,
                BudgetMin = null,
                BudgetMax = null
            };

            var result = await _scoringEngine.CalculateAsync(candidateInput, jobInput);
            
            _logger.LogInformation($"CV scored successfully against JD. Score: {result.TotalScore}");
            
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error scoring CV against JD");
            throw;
        }
    }

    private async Task<string> GetCvTextAsync(Document document)
    {
        if (!string.IsNullOrWhiteSpace(document.Content))
            return document.Content;

        if (string.IsNullOrWhiteSpace(document.StoragePath))
            return string.Empty;

        var webRoot = _env.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
        var fullPath = Path.Combine(webRoot, document.StoragePath);
        return await _pdfExtraction.ExtractTextFromPdfAsync(fullPath);
    }
}

