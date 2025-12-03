using MatchCV_Project.Interfaces;

namespace MatchCV_Project.Services;

public class FileService : IFileService
{
    private readonly IWebHostEnvironment _environment;
    private readonly ILogger<FileService> _logger;
    private readonly string[] _allowedExtensions = { ".pdf", ".docx", ".doc" };
    private const long MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

    public FileService(IWebHostEnvironment environment, ILogger<FileService> logger)
    {
        _environment = environment;
        _logger = logger;
    }

    public async Task<string> SaveFileAsync(IFormFile file, string userId)
    {
        try
        {
            if (file == null || file.Length == 0)
                throw new ArgumentException("File is empty");

            if (file.Length > MAX_FILE_SIZE)
                throw new ArgumentException("File size exceeds maximum limit of 10MB");

            if (!IsValidFileType(file.FileName))
                throw new ArgumentException("File type not allowed. Only PDF and DOCX allowed");

            var uploadsFolder = Path.Combine(_environment.WebRootPath, "uploads", userId);
            Directory.CreateDirectory(uploadsFolder);

            var fileName = Path.GetFileNameWithoutExtension(file.FileName);
            var extension = Path.GetExtension(file.FileName);
            var uniqueFileName = $"{fileName}_{Guid.NewGuid()}{extension}";
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            var relativePath = Path.Combine("uploads", userId, uniqueFileName);
            _logger.LogInformation($"File saved: {relativePath}");

            return relativePath;
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error saving file: {ex.Message}");
            throw;
        }
    }

    public Task<bool> DeleteFileAsync(string filePath)
    {
        try
        {
            var fullPath = Path.Combine(_environment.WebRootPath, filePath);
            if (File.Exists(fullPath))
            {
                File.Delete(fullPath);
                _logger.LogInformation($"File deleted: {filePath}");
                return Task.FromResult(true);
            }
            return Task.FromResult(false);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error deleting file: {ex.Message}");
            throw;
        }
    }

    public async Task<byte[]> GetFileAsync(string filePath)
    {
        try
        {
            var fullPath = Path.Combine(_environment.WebRootPath, filePath);
            if (File.Exists(fullPath))
            {
                return await File.ReadAllBytesAsync(fullPath);
            }
            return Array.Empty<byte>();
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error reading file: {ex.Message}");
            throw;
        }
    }

    public string GenerateFileName(string originalName, int documentId)
    {
        var extension = Path.GetExtension(originalName);
        return $"cv_{documentId}_{Guid.NewGuid()}{extension}";
    }

    public bool IsValidFileType(string fileName)
    {
        var extension = Path.GetExtension(fileName).ToLower();
        return _allowedExtensions.Contains(extension);
    }
}
