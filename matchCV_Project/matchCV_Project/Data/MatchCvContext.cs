using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using MatchCV_Project.Models;
using MatchCV_Project.Models;

namespace MatchCV_Project.Data;

public class MatchCvContext : DbContext
{
    public MatchCvContext(DbContextOptions<MatchCvContext> options) : base(options)
    {
    }

    // Core DbSets (Merged from MatchCvContext and AppDbContext)
    public virtual DbSet<User> Users { get; set; }
    public virtual DbSet<CvTemplate> CvTemplates { get; set; }
    public virtual DbSet<Document> Documents { get; set; }
    public virtual DbSet<MatchCV_Project.Models.Skill> Skills { get; set; }
    public virtual DbSet<DocumentSkill> DocumentSkills { get; set; }
    public virtual DbSet<Experience> Experiences { get; set; }
    public virtual DbSet<Education> Educations { get; set; }
    public virtual DbSet<Job> Jobs { get; set; }
    public virtual DbSet<MatchRun> MatchRuns { get; set; }

    // Additional DbSets from AppDbContext
    public virtual DbSet<AdminLog> AdminLogs { get; set; }
    public virtual DbSet<ApicallLog> ApicallLogs { get; set; }
    public virtual DbSet<Apisetting> Apisettings { get; set; }
    public virtual DbSet<Application> Applications { get; set; }
    public virtual DbSet<Bullet> Bullets { get; set; }
    public virtual DbSet<Embedding> Embeddings { get; set; }
    public virtual DbSet<EmbeddingCache> EmbeddingCaches { get; set; }
    public virtual DbSet<EmbeddingOwnership> EmbeddingOwnerships { get; set; }
    public virtual DbSet<Export> Exports { get; set; }
    public virtual DbSet<LicenseKey> LicenseKeys { get; set; }
    public virtual DbSet<MatchEvidence> MatchEvidences { get; set; }
    public virtual DbSet<MissingItem> MissingItems { get; set; }
    public virtual DbSet<Ocrresult> Ocrresults { get; set; } = null!;
    public virtual DbSet<RequiredSkill> RequiredSkills { get; set; } = null!;
    public virtual DbSet<RewriteSuggestion> RewriteSuggestions { get; set; } = null!;
    public virtual DbSet<Section> Sections { get; set; } = null!;
    public virtual DbSet<SavedCv> SavedCVs { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // --- Configurations from AppDbContext (Merged) ---

        modelBuilder.Entity<AdminLog>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__AdminLog__3214EC07B0972809");
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.MetaJson).HasDefaultValue("{}");
        });

        modelBuilder.Entity<ApicallLog>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__APICallL__3214EC074012ED0D");
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
        });

        modelBuilder.Entity<Apisetting>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__APISetti__3214EC0746343AF8");
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
        });

        modelBuilder.Entity<Application>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Applicat__3214EC0703E3C815");
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.Status).HasDefaultValue("Pending");

            entity.HasOne(d => d.Candidate).WithMany(p => p.Applications)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Applications_Users");

            entity.HasOne(d => d.Document).WithMany(p => p.Applications)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Applications_Documents");

            entity.HasOne(d => d.Job).WithMany(p => p.Applications).HasConstraintName("FK_Applications_Jobs");
        });

        modelBuilder.Entity<Bullet>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Bullets__3214EC0708DFBBAE");
            entity.HasOne(d => d.Section).WithMany(p => p.Bullets).HasConstraintName("FK_Bullets_Sections");
        });

        modelBuilder.Entity<CvTemplate>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__CVTempla__3214EC07AE0D3463");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
        });

        modelBuilder.Entity<Document>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Document__3214EC07A243EBEB");
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            
            // Merged Relationship logic
            entity.HasOne(d => d.User).WithMany(p => p.Documents)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(d => d.CvTemplate).WithMany(p => p.Documents)
                .HasForeignKey(d => d.TemplateId)
                .OnDelete(DeleteBehavior.SetNull);
        });

        modelBuilder.Entity<DocumentSkill>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Document__3214EC07917B4ED3");
            entity.HasOne(d => d.Document).WithMany(p => p.DocumentSkills).HasConstraintName("FK_DocumentSkills_Documents")
                .HasForeignKey(ds => ds.DocumentId).OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(d => d.Skill).WithMany(p => p.DocumentSkills).HasConstraintName("FK_DocumentSkills_Skills")
                .HasForeignKey(ds => ds.SkillId).OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<Education>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Educatio__3214EC0760A2F9E7");
            entity.HasOne(d => d.Document).WithMany(p => p.Educations).HasConstraintName("FK_Education_Documents")
                .HasForeignKey(e => e.DocumentId).OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Embedding>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Embeddin__3214EC07B62995DC");
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
        });

        modelBuilder.Entity<EmbeddingCache>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Embeddin__3214EC0768679E5F");
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
        });

        modelBuilder.Entity<EmbeddingOwnership>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Embeddin__3214EC07D748AE92");
            entity.HasOne(d => d.Embedding).WithMany(p => p.EmbeddingOwnerships).HasConstraintName("FK_EmbeddingOwnership_Embeddings");
        });

        modelBuilder.Entity<Experience>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Experien__3214EC0750FBB41B");
            entity.HasOne(d => d.Document).WithMany(p => p.Experiences).HasConstraintName("FK_Experiences_Documents")
                .HasForeignKey(e => e.DocumentId).OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Export>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Exports__3214EC07438E6B0D");
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.Status).HasDefaultValue("Success");
            entity.HasOne(d => d.Document).WithMany(p => p.Exports).HasConstraintName("FK_Exports_Documents");
            entity.HasOne(d => d.Template).WithMany(p => p.Exports)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK_Exports_CVTemplates");
        });

        modelBuilder.Entity<Job>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Jobs__3214EC0792F38E74");
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.HasOne(d => d.User).WithMany(p => p.Jobs).HasConstraintName("FK_Jobs_Users")
                .HasForeignKey(j => j.UserId).OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<LicenseKey>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__LicenseK__3214EC07FA02C88C");
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.Plan).HasDefaultValue("Free");
            entity.HasOne(d => d.AssignedUser).WithMany(p => p.LicenseKeys)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK_LicenseKeys_Users");
        });

        modelBuilder.Entity<MatchEvidence>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__MatchEvi__3214EC07BCE715AF");
            entity.HasOne(d => d.Match).WithMany(p => p.MatchEvidences).HasConstraintName("FK_MatchEvidences_MatchRuns");
            entity.HasOne(d => d.Skill).WithMany(p => p.MatchEvidences)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK_MatchEvidences_Skills");
        });

        modelBuilder.Entity<MatchRun>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__MatchRun__3214EC07F7B3FE7D");
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.HasOne(d => d.Document).WithMany(p => p.MatchRuns).HasConstraintName("FK_MatchRuns_Documents");
            entity.HasOne(d => d.Job).WithMany(p => p.MatchRuns).HasConstraintName("FK_MatchRuns_Jobs");
        });

        modelBuilder.Entity<MissingItem>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__MissingI__3214EC0777182C94");
            entity.HasOne(d => d.Match).WithMany(p => p.MissingItems).HasConstraintName("FK_MissingItems_MatchRuns");
            entity.HasOne(d => d.Skill).WithMany(p => p.MissingItems)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK_MissingItems_Skills");
        });

        modelBuilder.Entity<Ocrresult>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__OCRResul__3214EC078A15A5A6");
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.HasOne(d => d.Document).WithOne(p => p.Ocrresult).HasConstraintName("FK_OCRResults_Documents");
        });

        modelBuilder.Entity<RequiredSkill>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Required__3214EC0795B12711");
            entity.HasOne(d => d.Job).WithMany(p => p.RequiredSkills).HasConstraintName("FK_RequiredSkills_Jobs");
            entity.HasOne(d => d.Skill).WithMany(p => p.RequiredSkills).HasConstraintName("FK_RequiredSkills_Skills");
        });

        modelBuilder.Entity<RewriteSuggestion>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__RewriteS__3214EC07A8225248");
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.HasOne(d => d.Match).WithMany(p => p.RewriteSuggestions).HasConstraintName("FK_RewriteSuggestions_MatchRuns");
        });

        modelBuilder.Entity<Section>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Sections__3214EC077F0F64AF");
            entity.HasOne(d => d.Document).WithMany(p => p.Sections).HasConstraintName("FK_Sections_Documents");
        });

        modelBuilder.Entity<MatchCV_Project.Models.Skill>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Skills__3214EC0709FDFA23");
            entity.Property(e => e.NormName).IsFixedLength();
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Users__3214EC07AE321C34");
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.HasIndex(u => u.EmailAddress).IsUnique();
        });

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
        modelBuilder.Entity<MatchCV_Project.Models.Skill>().HasData(
            new MatchCV_Project.Models.Skill { Id = 1, Name = "C#", NormName = "csharp", Category = "Programming" },
            new MatchCV_Project.Models.Skill { Id = 2, Name = "ASP.NET Core", NormName = "aspnetcore", Category = "Framework" },
            new MatchCV_Project.Models.Skill { Id = 3, Name = "SQL Server", NormName = "sqlserver", Category = "Database" },
            new MatchCV_Project.Models.Skill { Id = 4, Name = "JavaScript", NormName = "javascript", Category = "Programming" }
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
