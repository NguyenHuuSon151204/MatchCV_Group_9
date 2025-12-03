using MatchCV_Project.Models;
using MatchCV_Project.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace MatchCV_Project.Data
{
    public static class TemplateSeedData
    {
        public static async Task InitializeAsync(IServiceProvider services)
        {
            var context = services.GetRequiredService<MatchCvContext>();

            if (await context.CvTemplates.AnyAsync())
            {
                return;
            }

            var templates = new List<CvTemplate>
            {
                new CvTemplate
                {
                    Key = "professional",
                    Name = "Chuyên nghiệp",
                    Description = "Mẫu CV chuyên nghiệp, phù hợp với môi trường doanh nghiệp",
                    ThumbnailUrl = "/images/templates/professional.png",
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow,
                    IsActive = true
                },
                new CvTemplate
                {
                    Key = "modern",
                    Name = "Hiện đại",
                    Description = "Thiết kế hiện đại, sáng tạo và nổi bật",
                    ThumbnailUrl = "/images/templates/modern.png",
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow,
                    IsActive = true
                },
                new CvTemplate
                {
                    Key = "formal",
                    Name = "Trang trọng",
                    Description = "Phong cách trang trọng, lịch sự",
                    ThumbnailUrl = "/images/templates/formal.png",
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow,
                    IsActive = true
                }
            };

            await context.CvTemplates.AddRangeAsync(templates);
            await context.SaveChangesAsync();
        }
    }
}