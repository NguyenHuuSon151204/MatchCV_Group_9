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

            if (await context.CvTemplates.AnyAsync())
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
                    CreatedAt = DateTime.UtcNow,
                    IsActive = true
                },
                new Cvtemplate
                {
                    Key = "modern",
                    Name = "Hiện đại",
                    Description = "Thiết kế hiện đại, sáng tạo và nổi bật",
                    CreatedAt = DateTime.UtcNow,
                    IsActive = true
                },
                new Cvtemplate
                {
                    Key = "formal",
                    Name = "Trang trọng",
                    Description = "Phong cách trang trọng, lịch sự",
                    CreatedAt = DateTime.UtcNow,
                    IsActive = true
                }
            };

            await context.CvTemplates.AddRangeAsync(templates);
            await context.SaveChangesAsync();
        }
    }
}