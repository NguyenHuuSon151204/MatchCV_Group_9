using MatchCV_Project.Models;
using Microsoft.EntityFrameworkCore;

namespace MatchCV_Project.Data;

public class MatchCvContext : DbContext
{
    public MatchCvContext(DbContextOptions<MatchCvContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<CvTemplate> CvTemplates { get; set; }
    public DbSet<Document> Documents { get; set; }
    public DbSet<Skill> Skills { get; set; }
    public DbSet<DocumentSkill> DocumentSkills { get; set; }
    public DbSet<Experience> Experiences { get; set; }
    public DbSet<Education> Educations { get; set; }
    public DbSet<Job> Jobs { get; set; }
    public DbSet<MatchResult> MatchResults { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // User Configuration
        modelBuilder.Entity<User>()
            .HasKey(u => u.Id);
        modelBuilder.Entity<User>()
            .HasIndex(u => u.EmailAddress)
            .IsUnique();

        // Document Configuration
        modelBuilder.Entity<Document>()
            .HasOne(d => d.User)
            .WithMany(u => u.Documents)
            .HasForeignKey(d => d.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Document>()
            .HasOne(d => d.CvTemplate)
            .WithMany(t => t.Documents)
            .HasForeignKey(d => d.TemplateId)
            .OnDelete(DeleteBehavior.SetNull);

        // DocumentSkill Configuration
        modelBuilder.Entity<DocumentSkill>()
            .HasOne(ds => ds.Document)
            .WithMany(d => d.DocumentSkills)
            .HasForeignKey(ds => ds.DocumentId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<DocumentSkill>()
            .HasOne(ds => ds.Skill)
            .WithMany(s => s.DocumentSkills)
            .HasForeignKey(ds => ds.SkillId)
            .OnDelete(DeleteBehavior.Restrict);

        // Experience Configuration
        modelBuilder.Entity<Experience>()
            .HasOne(e => e.Document)
            .WithMany(d => d.Experiences)
            .HasForeignKey(e => e.DocumentId)
            .OnDelete(DeleteBehavior.Cascade);

        // Education Configuration
        modelBuilder.Entity<Education>()
            .HasOne(e => e.Document)
            .WithMany(d => d.Educations)
            .HasForeignKey(e => e.DocumentId)
            .OnDelete(DeleteBehavior.Cascade);

        // Job Configuration
        modelBuilder.Entity<Job>()
            .HasOne(j => j.User)
            .WithMany(u => u.Jobs)
            .HasForeignKey(j => j.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // MatchResult Configuration
        modelBuilder.Entity<MatchResult>()
            .HasOne(mr => mr.Document)
            .WithMany(d => d.MatchResults)
            .HasForeignKey(mr => mr.DocumentId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<MatchResult>()
            .HasOne(mr => mr.Job)
            .WithMany(j => j.MatchResults)
            .HasForeignKey(mr => mr.JobId)
            .OnDelete(DeleteBehavior.Cascade);

        // Seed Sample Data
        SeedData(modelBuilder);
    }

    private void SeedData(ModelBuilder modelBuilder)
    {
        // Sample Users
        modelBuilder.Entity<User>().HasData(
            new User { Id = 1, DisplayName = "John Doe", EmailAddress = "john@example.com", Role = "Candidate", CreatedAt = DateTime.UtcNow },
            new User { Id = 2, DisplayName = "Jane Smith", EmailAddress = "jane@example.com", Role = "Candidate", CreatedAt = DateTime.UtcNow }
        );

        // Sample CV Templates
        modelBuilder.Entity<CvTemplate>().HasData(
            new CvTemplate { Id = 1, Key = "modern", Name = "Modern CV", Description = "Modern professional CV template", TemplatePath = "/templates/modern.html", IsActive = true, CreatedAt = DateTime.UtcNow },
            new CvTemplate { Id = 2, Key = "classic", Name = "Classic CV", Description = "Classic professional CV template", TemplatePath = "/templates/classic.html", IsActive = true, CreatedAt = DateTime.UtcNow }
        );

        // Sample Skills
        modelBuilder.Entity<Skill>().HasData(
            new Skill { Id = 1, Name = "C#", NormalizeName = "csharp", Category = "Programming" },
            new Skill { Id = 2, Name = "ASP.NET Core", NormalizeName = "aspnetcore", Category = "Framework" },
            new Skill { Id = 3, Name = "SQL Server", NormalizeName = "sqlserver", Category = "Database" },
            new Skill { Id = 4, Name = "JavaScript", NormalizeName = "javascript", Category = "Programming" }
        );

        // Sample Documents
        modelBuilder.Entity<Document>().HasData(
            new Document
            {
                Id = 1,
                UserId = 1,
                TemplateId = 1,
                OriginalName = "John_Resume_2024.pdf",
                DocType = "PDF",
                FileName = "john_resume_2024.pdf",
                ContentType = "application/pdf",
                StoragePath = "/uploads/john_resume_2024.pdf",
                FileSize = 102400,
                Status = "Active",
                CreatedAt = DateTime.UtcNow
            }
        );

        // Sample DocumentSkills
        modelBuilder.Entity<DocumentSkill>().HasData(
            new DocumentSkill { Id = 1, DocumentId = 1, SkillId = 1, YearsExperience = 5, Proficiency = "Advanced", Confidence = 0.95f },
            new DocumentSkill { Id = 2, DocumentId = 1, SkillId = 2, YearsExperience = 3, Proficiency = "Intermediate", Confidence = 0.85f }
        );
    }
}
