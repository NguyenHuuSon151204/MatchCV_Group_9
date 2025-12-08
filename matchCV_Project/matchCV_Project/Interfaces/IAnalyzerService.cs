using matchCV_Project.Models.Dtos;
using matchCV_Project.Models;

namespace matchCV_Project.Interfaces;

public interface IAnalyzerService
{
    Task<AnalysisResultDto> AnalyzeDocumentAsync(int documentId);
    Task<float> CalculateJobMatchScoreAsync(int documentId, int jobId);
    Task<ScoringResult> ScoreCvVsJobAsync(string cvText, string jobDescription, string industry = "IT", string level = "Mid");
}

