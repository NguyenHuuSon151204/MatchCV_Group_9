using MatchCV_Project.Data;
using MatchCV_Project.Interfaces;
using MatchCV_Project.Models;
using Microsoft.EntityFrameworkCore;

namespace MatchCV_Project.Repositories;

public class DocumentRepository : BaseRepository<Document>, IDocumentRepository
{
    public DocumentRepository(MatchCvContext context) : base(context)
    {
    }

    public async Task<IEnumerable<Document>> GetByUserIdAsync(int userId)
    {
        return await _dbSet
            .Where(d => d.UserId == userId)
            .OrderByDescending(d => d.CreatedAt)
            .ToListAsync();
    }

    public async Task<Document> GetWithDetailsAsync(int id)
    {
        return await _dbSet
            .Include(d => d.User)
            .Include(d => d.CvTemplate)
            .Include(d => d.DocumentSkills)
                .ThenInclude(ds => ds.Skill)
            .Include(d => d.Experiences)
            .Include(d => d.Educations)
            .FirstOrDefaultAsync(d => d.Id == id);
    }

    public async Task<IEnumerable<Document>> GetUserDocumentsWithSkillsAsync(int userId)
    {
        return await _dbSet
            .Where(d => d.UserId == userId)
            .Include(d => d.DocumentSkills)
                .ThenInclude(ds => ds.Skill)
            .Include(d => d.Experiences)
            .Include(d => d.Educations)
            .OrderByDescending(d => d.CreatedAt)
            .ToListAsync();
    }
}

