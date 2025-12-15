using System.Text.Json;
using matchCV_Project.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace matchCV_Project.Data
{
    /// <summary>
    /// Seed a few sample CVs and one JD so analyzer/tests always have data to work with.
    /// </summary>
    public static class SampleDataSeed
    {
        public static async Task InitializeAsync(IServiceProvider services)
        {
            var context = services.GetRequiredService<MatchCvContext>();
            var logger = services.GetService<ILoggerFactory>()?.CreateLogger("SampleDataSeed");

            // Seed CV templates first (in case not present)
            if (!await context.Cvtemplates.AnyAsync())
            {
                await TemplateSeedData.InitializeAsync(services);
            }

            var templateId = await context.Cvtemplates.Select(t => t.Id).FirstOrDefaultAsync();
            var userId = 10; // default candidate user we used elsewhere

            // Seed sample CVs if none exist for this user
            var existingSamples = await context.Documents
                .Where(d => d.UserId == userId && d.OriginalName.StartsWith("Sample CV"))
                .ToListAsync();

            if (existingSamples.Count == 0 && templateId != 0)
            {
                var now = DateTime.UtcNow;
                var cvPayloads = new[]
                {
                    new
                    {
                        Name = "Sample CV - Junior",
                        Position = "Frontend Developer",
                        Summary = "Entry-level frontend engineer with solid React fundamentals and a focus on clean UI.",
                        Skills = new [] { "React", "TypeScript", "HTML", "CSS", "Git" }
                    },
                    new
                    {
                        Name = "Sample CV - Mid",
                        Position = "Fullstack Developer",
                        Summary = "3+ years building fullstack apps with Node.js, React, SQL and cloud deployments.",
                        Skills = new [] { "Node.js", "Express", "React", "PostgreSQL", "Docker" }
                    },
                    new
                    {
                        Name = "Sample CV - Senior",
                        Position = "Backend Lead",
                        Summary = "7+ years designing distributed systems, mentoring teams, and optimizing performance.",
                        Skills = new [] { "C#", ".NET", "SQL Server", "Azure", "Microservices" }
                    }
                };

                var documents = cvPayloads.Select((cv, idx) => new Document
                {
                    UserId = userId,
                    CvTemplateId = templateId,
                    DocType = "cv",
                    OriginalName = cv.Name,
                    Status = "draft",
                    CreatedAt = now.AddMinutes(-idx * 5),
                    UpdatedAt = now.AddMinutes(-idx * 5),
                    CvData = JsonSerializer.Serialize(new
                    {
                        personalInfo = new
                        {
                            fullName = cv.Name,
                            email = $"sample{idx + 1}@example.com",
                            phone = "0900000000",
                            summary = cv.Summary,
                            position = cv.Position
                        },
                        experiences = new[]
                        {
                            new
                            {
                                company = "Sample Company",
                                position = cv.Position,
                                startDate = new DateTime(2022 - idx, 1, 1),
                                endDate = (DateTime?)null,
                                description = "Worked on key features and collaborated with cross-functional teams."
                            }
                        },
                        skills = cv.Skills.Select(s => new { name = s, level = "Intermediate" }).ToArray(),
                        templateType = "professional"
                    })
                }).ToList();

                await context.Documents.AddRangeAsync(documents);
                await context.SaveChangesAsync();
                logger?.LogInformation("Seeded {Count} sample CVs for user {UserId}", documents.Count, userId);
            }

            // Seed one JD for analyzer tests if missing
            var hasSampleJob = await context.Jobs.AnyAsync(j => j.Title == "Sample JD - Fullstack Web");
            if (!hasSampleJob)
            {
                var jd = new Job
                {
                    UserId = userId,
                    Title = "Sample JD - Fullstack Web",
                    Company = "Sample Corp",
                    RawText = "We need a fullstack engineer with React/Node/SQL experience. Bonus for cloud and CI/CD.",
                    JobDescription = "Build and maintain web apps with React, Node.js, SQL. Experience with cloud (Azure/AWS) is a plus.",
                    Status = "Active",
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };
                await context.Jobs.AddAsync(jd);
                await context.SaveChangesAsync();
                logger?.LogInformation("Seeded sample JD for analyzer.");
            }
        }
    }
}
