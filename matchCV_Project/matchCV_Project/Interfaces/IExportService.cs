using ApiRestFul.Models.DTOs;

namespace ApiRestFul.Services
{
    public interface IExportService
    {
        Task<(byte[] Data, string FileName, string ContentType)> ExportCvAsync(ExportRequest request);
    }
}