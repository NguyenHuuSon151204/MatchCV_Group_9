using matchCV_Project.Data;
using matchCV_Project.Interfaces;
using matchCV_Project.Models;
using matchCV_Project.Models.Dtos;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using System.Text.Json;

namespace matchCV_Project.Services;

public class DocumentService : IDocumentService
{
    private readonly IDocumentRepository _documentRepository;
    private readonly IFileService _fileService;
    private readonly IAnalyzerService _analyzerService;
    private readonly IPdfExtractionService _pdfExtractionService;
    private readonly MatchCvContext _context;
    private readonly ILogger<DocumentService> _logger;
    private readonly IWebHostEnvironment _environment;

    public DocumentService(
        IDocumentRepository documentRepository,
        IFileService fileService,
        IAnalyzerService analyzerService,
        IPdfExtractionService pdfExtractionService,
        MatchCvContext context,
        ILogger<DocumentService> logger,
        IWebHostEnvironment environment)
    {
        _documentRepository = documentRepository;
        _fileService = fileService;
        _analyzerService = analyzerService;
        _pdfExtractionService = pdfExtractionService;
        _context = context;
        _logger = logger;
        _environment = environment;
    }

    public async Task<DocumentDto> CreateDocumentAsync(CreateDocumentDto dto, int userId)
    {
        try
        {
            // Resolve TemplateId from TemplateType if provided
            int? templateId = dto.TemplateId;
            if (!templateId.HasValue && !string.IsNullOrEmpty(dto.TemplateType))
            {
                var template = await _context.CvTemplates
                    .FirstOrDefaultAsync(t => t.Key == dto.TemplateType);
                if (template != null)
                {
                    templateId = template.Id;
                }
            }

            var document = new Document
            {
                UserId = userId,
                OriginalName = dto.Title ?? dto.OriginalName ?? "Untitled CV",
                TemplateId = templateId,
                CvData = dto.CvData != null ? JsonSerializer.Serialize(dto.CvData) : null,
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
        // Use the summary query to avoid fetching heavy CvData
        var documents = await _documentRepository.GetUserDocumentsSummaryAsync(userId);
        return documents.Select(MapToDto).ToList();
    }

    // ... (rest of methods)

    private DocumentDto MapToDto(Document document)
    {
        return new DocumentDto
        {
            Id = document.Id,
            UserId = document.UserId ?? 0,
            OriginalName = document.OriginalName,
            Title = document.OriginalName, // Map Title from OriginalName
            TemplateType = document.CvTemplate?.Key ?? "professional", // Map TemplateType
            DocType = document.DocType,
            FileName = document.FileName ?? string.Empty,
            ContentType = document.ContentType ?? string.Empty,
            FileSize = document.FileSize,
            AiConfidence = document.AiConfidence,
            TotalScore = document.TotalScore,
            Status = document.Status ?? "Draft",
            CreatedAt = document.CreatedAt,
            UpdatedAt = document.UpdatedAt ?? document.CreatedAt,
            SkillsCount = document.DocumentSkills?.Count ?? 0,
            ExperiencesCount = document.Experiences?.Count ?? 0,
            EducationsCount = document.Educations?.Count ?? 0,
            CvData = !string.IsNullOrEmpty(document.CvData) 
                ? JsonSerializer.Deserialize<object>(document.CvData) 
                : null
        };
    }

    public async Task<DocumentDto> UpdateDocumentAsync(int id, UpdateDocumentDto dto, int userId)
    {
        var document = await _documentRepository.GetByIdAsync(id);
        if (document == null)
            throw new ArgumentException($"Document with ID {id} not found");

        if (document.UserId != userId)
            throw new UnauthorizedAccessException("You are not allowed to update this CV");

        document.OriginalName = dto.Title ?? dto.OriginalName ?? document.OriginalName;
        
        // Update TemplateId if TemplateType is provided
        if (!string.IsNullOrEmpty(dto.TemplateType))
        {
            var template = await _context.CvTemplates
                .FirstOrDefaultAsync(t => t.Key == dto.TemplateType);
            if (template != null)
            {
                document.TemplateId = template.Id;
            }
        }
        else if (dto.TemplateId.HasValue)
        {
            document.TemplateId = dto.TemplateId;
        }

        if (dto.CvData != null)
        {
            document.CvData = JsonSerializer.Serialize(dto.CvData);
        }

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
            document.FileSize = (int)file.Length;
            document.DocType = Path.GetExtension(file.FileName).ToUpper();
            document.Status = "Uploaded";
            document.UpdatedAt = DateTime.UtcNow;

            // Extract text from PDF if it's a PDF file
            if (file.ContentType == "application/pdf" || Path.GetExtension(file.FileName).ToLower() == ".pdf")
            {
                try
                {
                    var fullPath = Path.Combine(_environment.WebRootPath, storagePath);
                    if (File.Exists(fullPath))
                    {
                        var extractedText = await _pdfExtractionService.ExtractTextFromPdfAsync(fullPath);
                        var structuredData = await _pdfExtractionService.ExtractStructuredDataAsync(fullPath);
                        
                        // Store extracted text in a field if available, or log it
                        _logger.LogInformation($"Extracted {extractedText.Length} characters from PDF for document {documentId}");
                        
                        // You can store this in a separate table or add a RawText field to Document model
                        // For now, we'll use it during analysis
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogWarning($"Failed to extract PDF content for document {documentId}: {ex.Message}");
                    // Don't fail the upload if extraction fails
                }
            }

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


}
