// ICVExportService.cs
using System.Threading.Tasks;
using ApiRestFul.DTOs;

namespace ApiRestFul.Services
{
    public interface ICVExportService
    {
        Task<byte[]> ExportToPdfAsync(CVDataDto cvData);
        Task<byte[]> ExportToPdfAsync(string htmlContent);
    }
}