// Services/ITemplateService.cs
using System.Collections.Generic;
using System.Threading.Tasks;
using ApiRestFul.DTOs;

namespace ApiRestFul.Services
{
    public interface ITemplateService
    {
        Task<List<CVTemplateDto>> GetAvailableTemplatesAsync();
        Task<byte[]> GenerateCVPreviewAsync(CVDataDto cvData);
        Task<byte[]> ExportToPdfAsync(CVDataDto cvData);
    }
}