using matchCV_Project.Data;
using matchCV_Project.Interfaces;
using matchCV_Project.Models;
using matchCV_Project.Models.Dtos;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using System.Text.Json;
using ApiRestFul.DTOs;

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
            // Normalize name: prefer Title, then OriginalName, fallback to generated
            var name = !string.IsNullOrWhiteSpace(dto.Title) ? dto.Title.Trim()
                      : !string.IsNullOrWhiteSpace(dto.OriginalName) ? dto.OriginalName.Trim()
                      : $"CV_{DateTime.UtcNow:yyyyMMdd_HHmmss}";

            // Resolve TemplateId from TemplateType if provided
            int? templateId = dto.TemplateId;
            if (!templateId.HasValue && !string.IsNullOrEmpty(dto.TemplateType))
            {
                var template = await _context.Cvtemplates
                    .FirstOrDefaultAsync(t => t.Key == dto.TemplateType);
                if (template != null)
                {
                    templateId = template.Id;
                }
            }

            var document = new Document
            {
                UserId = userId,
                OriginalName = name,
                CvTemplateId = templateId,
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
        string ResolveName()
        {
            if (!string.IsNullOrWhiteSpace(document.OriginalName)) return document.OriginalName;
            if (!string.IsNullOrWhiteSpace(document.FileName)) return document.FileName;
            return $"CV_{document.Id}";
        }

        return new DocumentDto
        {
            Id = document.Id,
            UserId = document.UserId ?? 0,
            OriginalName = ResolveName(),
            Title = ResolveName(), // Map Title from OriginalName
            TemplateType = document.CvTemplate?.Key ?? "professional", // Map TemplateType
            DocType = document.DocType,
            FileName = document.FileName,
            ContentType = document.ContentType,
            FileSize = document.FileSize,
            AiConfidence = (float)(document.AiConfidence ?? 0),
            TotalScore = (float?)document.TotalScore,
            Status = document.Status,
            CreatedAt = document.CreatedAt,
            UpdatedAt = document.UpdatedAt,
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
            var template = await _context.Cvtemplates
                .FirstOrDefaultAsync(t => t.Key == dto.TemplateType);
            if (template != null)
            {
                document.CvTemplateId = template.Id;
            }
        }
        else if (dto.TemplateId.HasValue)
        {
            document.CvTemplateId = dto.TemplateId;
        }

        if (dto.CvData != null)
        {
            document.CvData = JsonSerializer.Serialize(dto.CvData);
        }

        // document.Status = "Uploaded"; // Don't force Uploaded on metadata update
        if (string.IsNullOrEmpty(document.Status)) document.Status = "Draft";
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
            
            // Do NOT wipe CvData blindly. We might have just created it with user inputs.
            CVDataDto existingData = null;
            if (!string.IsNullOrEmpty(document.CvData))
            {
                try 
                {
                    existingData = JsonSerializer.Deserialize<CVDataDto>(document.CvData);
                }
                catch {}
            }

            // Extract text from PDF if it's a PDF file
            if (file.ContentType == "application/pdf" || Path.GetExtension(file.FileName).ToLower() == ".pdf")
            {
                try
                {
                    var webRoot = _environment.WebRootPath ?? "wwwroot";
                    var fullPath = Path.Combine(webRoot, storagePath);
                    if (File.Exists(fullPath))
                    {
                        var extractedText = await _pdfExtractionService.ExtractTextFromPdfAsync(fullPath);
                        var structuredData = await _pdfExtractionService.ExtractStructuredDataAsync(fullPath);
                        
                        _logger.LogInformation($"Extracted {extractedText.Length} characters from PDF for document {documentId}");

                        // Use existing data or create new
                        var parsedData = existingData ?? new CVDataDto();
                        if (parsedData.PersonalInfo == null) parsedData.PersonalInfo = new PersonalInfoDto();

                        // Helper to safely get string from dict
                        string GetVal(string key) => structuredData.ContainsKey(key) ? structuredData[key]?.ToString() : "";

                        // Only overwrite if currently empty
                        if (string.IsNullOrEmpty(parsedData.PersonalInfo.FullName)) 
                            parsedData.PersonalInfo.FullName = GetVal("fullName");
                        
                        if (string.IsNullOrEmpty(parsedData.PersonalInfo.Email)) 
                            parsedData.PersonalInfo.Email = GetVal("email");

                        if (string.IsNullOrEmpty(parsedData.PersonalInfo.Phone)) 
                            parsedData.PersonalInfo.Phone = GetVal("phone");

                        if (string.IsNullOrEmpty(parsedData.PersonalInfo.Summary))
                            parsedData.PersonalInfo.Summary = "Extracted from uploaded PDF";

                        // Ensure lists are init
                        if (parsedData.Experiences == null) parsedData.Experiences = new List<ExperienceDto>();
                        if (parsedData.Educations == null) parsedData.Educations = new List<EducationDto>();
                        if (parsedData.Skills == null) parsedData.Skills = new List<SkillDto>();

                         // Update Document Name ONLY if it's currently generic
                        bool isGenericName = string.IsNullOrWhiteSpace(document.OriginalName) || 
                                           document.OriginalName.Contains("Untitled CV", StringComparison.OrdinalIgnoreCase);

                        if (isGenericName)
                        {
                            var newName = !string.IsNullOrEmpty(parsedData.PersonalInfo.FullName) 
                                ? parsedData.PersonalInfo.FullName 
                                : Path.GetFileNameWithoutExtension(file.FileName);
                                
                             document.OriginalName = newName;
                        }

                        document.CvData = JsonSerializer.Serialize(parsedData);
                        document.Content = extractedText; // cache raw text for analyzer/scoring
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogWarning($"Failed to extract PDF content for document {documentId}: {ex.Message}");
                }
            }
            else 
            {
                 // Not a PDF, but we still shouldn't wipe CvData if we have it?
                 // But ExportService checks: if Status=Uploaded, use File. 
                 // If we leave CvData, does Export prioritize File?
                 // Yes, ExportService checks: if (Status == "Uploaded") return File.
                 // So keeping CvData is safe.
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


    public async Task<(byte[] FileContents, string ContentType, string FileName)> GetDocumentFileAsync(int id, int userId)
    {
        var document = await _documentRepository.GetByIdAsync(id);
        if (document == null)
            throw new ArgumentException($"Document with ID {id} not found");

        if (document.UserId != userId)
            throw new UnauthorizedAccessException("You are not allowed to access this CV");

        if (string.IsNullOrEmpty(document.StoragePath))
            throw new FileNotFoundException("This CV does not have an uploaded file.");

        var fileBytes = await _fileService.GetFileAsync(document.StoragePath);
        if (fileBytes == null || fileBytes.Length == 0)
             throw new FileNotFoundException("File not found on server.");

        // Fallback for filename if null
        var fileName = !string.IsNullOrEmpty(document.FileName) 
            ? document.FileName 
            : $"cv_{id}{Path.GetExtension(document.StoragePath) ?? ".pdf"}";

        return (fileBytes, document.ContentType ?? "application/octet-stream", fileName);
    }

}
