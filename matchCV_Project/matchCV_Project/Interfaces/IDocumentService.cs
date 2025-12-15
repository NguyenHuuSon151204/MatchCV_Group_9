using matchCV_Project.Models;
using matchCV_Project.Models.Dtos;
namespace matchCV_Project.Interfaces;

public interface IDocumentService
{
    Task<DocumentDto> CreateDocumentAsync(CreateDocumentDto dto, int userId);
    Task<DocumentDto> GetDocumentAsync(int id, int userId);
    Task<DocumentDto> GetDocumentWithCvDataAsync(int id, int userId);
    Task<IEnumerable<DocumentDto>> GetUserDocumentsAsync(int userId);
    Task<DocumentDto> UpdateDocumentAsync(int id, UpdateDocumentDto dto, int userId);
    Task DeleteDocumentAsync(int id, int userId);
    Task<DocumentDto> UploadFileAsync(int documentId, IFormFile file, int userId);
    Task<DocumentDto> CreateAndUploadAsync(IFormFile file, int userId, string? title = null);
    Task<AnalysisResultDto> AnalyzeDocumentAsync(int documentId, int userId);
}
