using MatchCV_Project.Models.Dtos;

namespace MatchCV_Project.Interfaces;

public interface IAnalyzerService
{
    Task<AnalysisResultDto> AnalyzeDocumentAsync(int documentId);
    Task<float> CalculateJobMatchScoreAsync(int documentId, int jobId);
}
