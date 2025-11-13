using MatchCV_Project.Models;
using MatchCV_Project.Interfaces;

namespace MatchCV_Project.Interfaces;

public interface IDocumentRepository : IBaseRepository<Document>
{
    Task<IEnumerable<Document>> GetByUserIdAsync(int userId);
    Task<Document> GetWithDetailsAsync(int id);
    Task<IEnumerable<Document>> GetUserDocumentsWithSkillsAsync(int userId);
}
