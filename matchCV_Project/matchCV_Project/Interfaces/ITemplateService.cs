// Services/ITemplateService.cs
using System.Collections.Generic;
using System.Threading.Tasks;
using ApiRestFul.DTOs;

namespace matchCV_Project.Interfaces
{
    public interface ITemplateService
    {
        Task<List<CVTemplateDto>> GetAvailableTemplatesAsync();
        Task<byte[]> GenerateCVPreviewAsync(CVDataDto cvData);
        Task<byte[]> ExportToPdfAsync(CVDataDto cvData);
    }
}