namespace matchCV_Project.Interfaces;

public interface IFileService
{
    Task<string> SaveFileAsync(IFormFile file, string userId);
    Task<bool> DeleteFileAsync(string filePath);
    Task<byte[]> GetFileAsync(string filePath);
    string GenerateFileName(string originalName, int documentId);
    bool IsValidFileType(string fileName);
}
