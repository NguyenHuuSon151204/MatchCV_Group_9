using ApiRestFul.Models.DTOs;

namespace ApiRestFul.Services
{
    public interface IExportService
    {
        Task<byte[]> ExportCvAsync(ExportRequest request);
    }
}