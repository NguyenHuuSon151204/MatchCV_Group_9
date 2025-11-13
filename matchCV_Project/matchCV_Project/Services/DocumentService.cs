using MatchCV_Project.Data;
using MatchCV_Project.Interfaces;
using MatchCV_Project.Models;
using MatchCV_Project.Models.Dtos;
using Microsoft.EntityFrameworkCore;

namespace MatchCV_Project.Services;

public class DocumentService : IDocumentService
{
    private readonly IDocumentRepository _documentRepository;
    private readonly IFileService _fileService;
    private readonly IAnalyzerService _analyzerService;
    private readonly MatchCvContext _context;
    private readonly ILogger<DocumentService> _logger;

    public DocumentService(
        IDocumentRepository documentRepository,
        IFileService fileService,
        IAnalyzerService analyzerService,
        MatchCvContext context,
        ILogger<DocumentService> logger)
    {
        _documentRepository = documentRepository;
        _fileService = fileService;
        _analyzerService = analyzerService;
        _context = context;
        _logger = logger;
    }

    public async Task<DocumentDto> CreateDocumentAsync(CreateDocumentDto dto, int userId)
    {
        try
        {
            var document = new Document
            {
                UserId = userId,
                OriginalName = dto.OriginalName,
                TemplateId = dto.TemplateId,
                DocType = "CV",
                Status = "Draft",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            var createdDoc = await _documentRepository.AddAsync(document);
            await _documentRepository.SaveChangesAsync();

            _logger.LogInformation($"Document created: {createdDoc.Id}");

            return MapToDto(createdDoc);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error creating document: {ex.Message}");
            throw;
        }
    }

    public async Task<DocumentDto> GetDocumentAsync(int id, int userId)
    {
        var document = await _documentRepository.GetWithDetailsAsync(id);
        if (document == null)
            throw new ArgumentException($"Document with ID {id} not found");

        if (document.UserId != userId)
            throw new UnauthorizedAccessException("You are not allowed to access this CV");

        return MapToDto(document);
    }

    public async Task<IEnumerable<DocumentDto>> GetUserDocumentsAsync(int userId)
    {
        var documents = await _documentRepository.GetUserDocumentsWithSkillsAsync(userId);
        return documents.Select(MapToDto).ToList();
    }

    public async Task<DocumentDto> UpdateDocumentAsync(int id, UpdateDocumentDto dto, int userId)
    {
        var document = await _documentRepository.GetByIdAsync(id);
        if (document == null)
            throw new ArgumentException($"Document with ID {id} not found");

        if (document.UserId != userId)
            throw new UnauthorizedAccessException("You are not allowed to update this CV");

        document.OriginalName = dto.OriginalName ?? document.OriginalName;
        document.TemplateId = dto.TemplateId ?? document.TemplateId;
        document.UpdatedAt = DateTime.UtcNow;

        await _documentRepository.UpdateAsync(document);
        await _documentRepository.SaveChangesAsync();
        return MapToDto(document);
    }

    public async Task DeleteDocumentAsync(int id, int userId)
    {
        var document = await _documentRepository.GetByIdAsync(id);
        if (document == null)
            throw new ArgumentException($"Document with ID {id} not found");

        if (document.UserId != userId)
            throw new UnauthorizedAccessException("You are not allowed to delete this CV");

        if (!string.IsNullOrEmpty(document.StoragePath))
        {
            await _fileService.DeleteFileAsync(document.StoragePath);
        }

        await _documentRepository.DeleteAsync(id);
        await _documentRepository.SaveChangesAsync();
        _logger.LogInformation($"Document deleted: {id}");
    }

    public async Task<DocumentDto> UploadFileAsync(int documentId, IFormFile file, int userId)
    {
        var document = await _documentRepository.GetByIdAsync(documentId);
        if (document == null)
            throw new ArgumentException($"Document with ID {documentId} not found");

        if (document.UserId != userId)
            throw new UnauthorizedAccessException("You are not allowed to upload to this CV");

        try
        {
            var storagePath = await _fileService.SaveFileAsync(file, document.UserId.ToString());

            document.StoragePath = storagePath;
            document.FileName = file.FileName;
            document.ContentType = file.ContentType;
            document.FileSize = file.Length;
            document.DocType = Path.GetExtension(file.FileName).ToUpper();
            document.Status = "Uploaded";
            document.UpdatedAt = DateTime.UtcNow;

            await _documentRepository.UpdateAsync(document);
            await _documentRepository.SaveChangesAsync();

            _logger.LogInformation($"File uploaded for document {documentId}");
            return MapToDto(document);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error uploading file: {ex.Message}");
            throw;
        }
    }

    public async Task<DocumentDto> CreateAndUploadAsync(IFormFile file, int userId, string? title = null)
    {
        if (file == null || file.Length == 0) throw new ArgumentException("No file provided");

        var create = new CreateDocumentDto
        {
            OriginalName = title ?? file.FileName,
            TemplateId = null
        };
        var created = await CreateDocumentAsync(create, userId);
        return await UploadFileAsync(created.Id, file, userId);
    }

    public async Task<AnalysisResultDto> AnalyzeDocumentAsync(int documentId, int userId)
    {
        var doc = await _documentRepository.GetByIdAsync(documentId);
        if (doc == null) throw new ArgumentException($"Document with ID {documentId} not found");
        if (doc.UserId != userId) throw new UnauthorizedAccessException("You are not allowed to analyze this CV");

        return await _analyzerService.AnalyzeDocumentAsync(documentId);
    }

    private DocumentDto MapToDto(Document document)
    {
        return new DocumentDto
        {
            Id = document.Id,
            UserId = document.UserId,
            OriginalName = document.OriginalName,
            DocType = document.DocType,
            FileName = document.FileName,
            ContentType = document.ContentType,
            FileSize = document.FileSize,
            AiConfidence = document.AiConfidence,
            TotalScore = document.TotalScore,
            Status = document.Status,
            CreatedAt = document.CreatedAt,
            UpdatedAt = document.UpdatedAt,
            SkillsCount = document.DocumentSkills?.Count ?? 0,
            ExperiencesCount = document.Experiences?.Count ?? 0,
            EducationsCount = document.Educations?.Count ?? 0
        };
    }
}
