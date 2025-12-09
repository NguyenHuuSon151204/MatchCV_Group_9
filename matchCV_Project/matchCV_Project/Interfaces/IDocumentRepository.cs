using matchCV_Project.Models;

namespace matchCV_Project.Interfaces;

public interface IDocumentRepository : IBaseRepository<Document>
{
    Task<IEnumerable<Document>> GetByUserIdAsync(int userId);
    Task<Document> GetWithDetailsAsync(int id);
    Task<IEnumerable<Document>> GetUserDocumentsWithSkillsAsync(int userId);
    Task<IEnumerable<Document>> GetUserDocumentsSummaryAsync(int userId);
}
