using matchCV_Project.Models.Dtos;

namespace matchCV_Project.Interfaces;

public interface IAnalyzerService
{
    Task<AnalysisResultDto> AnalyzeDocumentAsync(int documentId);
    Task<float> CalculateJobMatchScoreAsync(int documentId, int jobId);
}
