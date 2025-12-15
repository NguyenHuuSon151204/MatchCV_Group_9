using matchCV_Project.Data;
using matchCV_Project.Interfaces;
using matchCV_Project.Models;
using Microsoft.EntityFrameworkCore;

namespace matchCV_Project.Repositories;

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
            .Include(d => d.Template)
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

    public async Task<IEnumerable<Document>> GetUserDocumentsSummaryAsync(int userId)
    {
        // Project only necessary fields to avoid fetching CvData (which is large)
        // We return Document entities but with only specific fields populated
        return await _dbSet
            .Where(d => d.UserId == userId)
            .Include(d => d.Template) // Include template to get the Key
            .Select(d => new Document
            {
                Id = d.Id,
                UserId = d.UserId,
                OriginalName = d.OriginalName,
                FileName = d.FileName,
                StoragePath = d.StoragePath,
                ContentType = d.ContentType,
                FileSize = d.FileSize,
                Status = d.Status,
                CreatedAt = d.CreatedAt,
                UpdatedAt = d.UpdatedAt,
                TemplateId = d.TemplateId,
                Template = d.Template, // EF might not project this automatically in Select new Document, but let's try or map manually
                // CvData is EXCLUDED
            })
            .OrderByDescending(d => d.UpdatedAt)
            .ToListAsync();
    }
}

