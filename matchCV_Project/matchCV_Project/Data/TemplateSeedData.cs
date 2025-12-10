using matchCV_Project.Models;
using matchCV_Project.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace matchCV_Project.Data
{
    public static class TemplateSeedData
    {
        public static async Task InitializeAsync(IServiceProvider services)
        {
            var context = services.GetRequiredService<MatchCvContext>();

            if (await context.Cvtemplates.AnyAsync())
            {
                return;
            }

            var templates = new List<Cvtemplate>
            {
                new Cvtemplate
                {
                    Key = "professional",
                    Name = "Chuyên nghiệp",
                    Description = "Mẫu CV chuyên nghiệp, phù hợp với môi trường doanh nghiệp",
                    ThumbnailUrl = "/images/templates/professional.png",
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow,
                    IsActive = true
                },
                new Cvtemplate
                {
                    Key = "modern",
                    Name = "Hiện đại",
                    Description = "Thiết kế hiện đại, sáng tạo và nổi bật",
                    ThumbnailUrl = "/images/templates/modern.png",
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow,
                    IsActive = true
                },
                new Cvtemplate
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

            await context.Cvtemplates.AddRangeAsync(templates);
            await context.SaveChangesAsync();
        }
    }
}