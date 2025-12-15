using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using matchCV_Project.Models;

namespace matchCV_Project.Data;

public partial class MatchCvContext : DbContext
{
    public MatchCvContext()
    {
    }

    public MatchCvContext(DbContextOptions<MatchCvContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AdminLog> AdminLogs { get; set; }

    public virtual DbSet<ApicallLog> ApicallLogs { get; set; }

    public virtual DbSet<Apisetting> Apisettings { get; set; }

    public virtual DbSet<Application> Applications { get; set; }

    public virtual DbSet<Bullet> Bullets { get; set; }

    public virtual DbSet<Cvtemplate> Cvtemplates { get; set; }

    public virtual DbSet<Document> Documents { get; set; }

    public virtual DbSet<DocumentSkill> DocumentSkills { get; set; }

    public virtual DbSet<Education> Educations { get; set; }

    public virtual DbSet<EmailVerificationToken> EmailVerificationTokens { get; set; }

    public virtual DbSet<Embedding> Embeddings { get; set; }

    public virtual DbSet<EmbeddingCache> EmbeddingCaches { get; set; }

    public virtual DbSet<EmbeddingOwnership> EmbeddingOwnerships { get; set; }

    public virtual DbSet<Experience> Experiences { get; set; }

    public virtual DbSet<Export> Exports { get; set; }

    public virtual DbSet<Job> Jobs { get; set; }

    public virtual DbSet<LicenseKey> LicenseKeys { get; set; }

    public virtual DbSet<MatchEvidence> MatchEvidences { get; set; }

    public virtual DbSet<MatchRun> MatchRuns { get; set; }

    public virtual DbSet<MissingItem> MissingItems { get; set; }

    public virtual DbSet<Ocrresult> Ocrresults { get; set; }
    public virtual DbSet<Notification> Notifications { get; set; }
    public virtual DbSet<RecruiterVerification> RecruiterVerifications { get; set; }

    public virtual DbSet<RequiredSkill> RequiredSkills { get; set; }

    public virtual DbSet<RewriteSuggestion> RewriteSuggestions { get; set; }

    public virtual DbSet<SavedCv> SavedCvs { get; set; }

    public virtual DbSet<Section> Sections { get; set; }

    public virtual DbSet<Skill> Skills { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=(local);Database=MatchCV;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AdminLog>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__AdminLog__3214EC0702CA0BAF");

            entity.Property(e => e.Action).HasMaxLength(100);
            entity.Property(e => e.Actor).HasMaxLength(200);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.Entity).HasMaxLength(100);
            entity.Property(e => e.MetaJson).HasDefaultValue("{}");
        });

        modelBuilder.Entity<ApicallLog>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__APICallL__3214EC07E4A21A02");

            entity.ToTable("APICallLogs");

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.Endpoint).HasMaxLength(180);
            entity.Property(e => e.Model).HasMaxLength(80);
            entity.Property(e => e.Provider).HasMaxLength(50);
            entity.Property(e => e.Status).HasMaxLength(30);
            entity.Property(e => e.TraceId).HasMaxLength(180);
        });

        modelBuilder.Entity<Apisetting>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__APISetti__3214EC0726CA6C3A");

            entity.ToTable("APISettings");

            entity.Property(e => e.ApiKey).HasMaxLength(256);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.Endpoint).HasMaxLength(180);
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.Model).HasMaxLength(80);
            entity.Property(e => e.Provider).HasMaxLength(50);
        });

        modelBuilder.Entity<Application>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Applicat__3214EC075A978F19");

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.Status)
                .HasMaxLength(30)
                .HasDefaultValue("Pending");

            entity.HasOne(d => d.Candidate).WithMany(p => p.Applications)
                .HasForeignKey(d => d.CandidateId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Applications_Users");

            entity.HasOne(d => d.Document).WithMany(p => p.Applications)
                .HasForeignKey(d => d.DocumentId)
                .HasConstraintName("FK_Applications_Documents");

            entity.HasOne(d => d.Job).WithMany(p => p.Applications)
                .HasForeignKey(d => d.JobId)
                .HasConstraintName("FK_Applications_Jobs");
        });

        modelBuilder.Entity<Bullet>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Bullets__3214EC073D19D9B3");

            entity.HasOne(d => d.Section).WithMany(p => p.Bullets)
                .HasForeignKey(d => d.SectionId)
                .HasConstraintName("FK_Bullets_Sections");
        });

        modelBuilder.Entity<Cvtemplate>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__CVTempla__3214EC078FBAD6DE");

            entity.ToTable("CVTemplates");

            entity.HasIndex(e => e.Key, "UQ_CVTemplates_Key").IsUnique();

            entity.Property(e => e.Address).HasMaxLength(500);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.Cvdata).HasColumnName("CVData");
            entity.Property(e => e.Description).HasMaxLength(300);
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.Engine)
                .HasMaxLength(50)
                .HasDefaultValue("razor");
            entity.Property(e => e.FullName).HasMaxLength(100);
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.Key).HasMaxLength(50);
            entity.Property(e => e.Name).HasMaxLength(180);
            entity.Property(e => e.Phone).HasMaxLength(20);
            entity.Property(e => e.PreviewImageUrl).HasMaxLength(500);
            entity.Property(e => e.ProfileImageUrl).HasMaxLength(500);
            entity.Property(e => e.TemplatePath)
                .HasMaxLength(400)
                .HasDefaultValue("");
            entity.Property(e => e.ThumbnailUrl).HasMaxLength(500);
        });

        modelBuilder.Entity<Document>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Document__3214EC07ADBDF128");

            entity.HasIndex(e => e.DocType, "IX_Documents_DocType");

            entity.HasIndex(e => e.CreatedAt, "IX_Documents_Uploaded");

            entity.HasIndex(e => e.UserId, "IX_Documents_UserId");

            entity.Property(e => e.Content).HasMaxLength(4000);
            entity.Property(e => e.ContentType).HasMaxLength(100);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.DocType).HasMaxLength(30);
            entity.Property(e => e.FileHash).HasMaxLength(128);
            entity.Property(e => e.FileName).HasMaxLength(255);
            entity.Property(e => e.OriginalName).HasMaxLength(250);
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .HasDefaultValue("Draft");
            entity.Property(e => e.StoragePath).HasMaxLength(400);
            entity.Property(e => e.UpdatedAt).HasDefaultValueSql("(sysutcdatetime())");

            entity.Property(e => e.TemplateId).HasColumnName("TemplateId");

            entity.HasOne(d => d.Template).WithMany(p => p.Documents)
                .HasForeignKey(d => d.TemplateId)
                .HasConstraintName("FK_Documents_CVTemplates");

            entity.HasOne(d => d.User).WithMany(p => p.Documents)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_Documents_Users");
        });

        modelBuilder.Entity<DocumentSkill>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Document__3214EC078C11A511");

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.Proficiency).HasMaxLength(50);
            entity.Property(e => e.Source)
                .HasMaxLength(30)
                .HasDefaultValue("User");

            entity.HasOne(d => d.Document).WithMany(p => p.DocumentSkills)
                .HasForeignKey(d => d.DocumentId)
                .HasConstraintName("FK_DocumentSkills_Documents");

            entity.HasOne(d => d.Skill).WithMany(p => p.DocumentSkills)
                .HasForeignKey(d => d.SkillId)
                .HasConstraintName("FK_DocumentSkills_Skills");
        });

        modelBuilder.Entity<Education>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Educatio__3214EC0704AFBFF6");

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.Degree).HasMaxLength(150);
            entity.Property(e => e.FieldOfStudy).HasMaxLength(150);
            entity.Property(e => e.SchoolName).HasMaxLength(200);

            entity.HasOne(d => d.Document).WithMany(p => p.Educations)
                .HasForeignKey(d => d.DocumentId)
                .HasConstraintName("FK_Education_Documents");
        });

        modelBuilder.Entity<EmailVerificationToken>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__EmailVer__3214EC079303E37D");

            entity.Property(e => e.Token).HasMaxLength(500);

            entity.HasOne(d => d.User).WithMany(p => p.EmailVerificationTokens)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_EmailVerificationTokens_Users");
        });

        modelBuilder.Entity<Embedding>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Embeddin__3214EC0703CA2B9A");

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.Model).HasMaxLength(80);
        });

        modelBuilder.Entity<EmbeddingCache>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Embeddin__3214EC0752E6CCB2");

            entity.ToTable("EmbeddingCache");

            entity.HasIndex(e => e.InputHash, "UQ__Embeddin__FA280148E20B25A3").IsUnique();

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.InputHash).HasMaxLength(128);
            entity.Property(e => e.Model).HasMaxLength(80);
        });

        modelBuilder.Entity<EmbeddingOwnership>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Embeddin__3214EC0719EF8940");

            entity.ToTable("EmbeddingOwnership");

            entity.Property(e => e.OwnerType).HasMaxLength(30);

            entity.HasOne(d => d.Embedding).WithMany(p => p.EmbeddingOwnerships)
                .HasForeignKey(d => d.EmbeddingId)
                .HasConstraintName("FK_EmbeddingOwnership_Embeddings");
        });

        modelBuilder.Entity<Experience>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Experien__3214EC07568063B1");

            entity.Property(e => e.CompanyName).HasMaxLength(200);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.IndustryName).HasMaxLength(150);
            entity.Property(e => e.JobTitle).HasMaxLength(200);

            entity.HasOne(d => d.Document).WithMany(p => p.Experiences)
                .HasForeignKey(d => d.DocumentId)
                .HasConstraintName("FK_Experiences_Documents");
        });

        modelBuilder.Entity<Export>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Exports__3214EC07DE3A327F");

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.Engine).HasMaxLength(50);
            entity.Property(e => e.ErrorMsg).HasMaxLength(200);
            entity.Property(e => e.OutFormat).HasMaxLength(30);
            entity.Property(e => e.OutputPath).HasMaxLength(400);
            entity.Property(e => e.Status).HasMaxLength(30);

            entity.HasOne(d => d.Document).WithMany(p => p.Exports)
                .HasForeignKey(d => d.DocumentId)
                .HasConstraintName("FK_Exports_Documents");

            entity.HasOne(d => d.Template).WithMany(p => p.Exports)
                .HasForeignKey(d => d.TemplateId)
                .HasConstraintName("FK_Exports_CVTemplates");
        });

        modelBuilder.Entity<Job>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Jobs__3214EC070AA99336");

            entity.Property(e => e.Company).HasMaxLength(200);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .HasDefaultValue("Active");
            entity.Property(e => e.Title).HasMaxLength(200);
            entity.Property(e => e.UpdatedAt).HasDefaultValueSql("(sysutcdatetime())");

            entity.HasOne(d => d.User).WithMany(p => p.Jobs)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_Jobs_Users");
        });

        modelBuilder.Entity<LicenseKey>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__LicenseK__3214EC0790DE2819");

            entity.HasIndex(e => e.KeyHash, "UQ__LicenseK__BA9770BB950E9179").IsUnique();

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.KeyHash).HasMaxLength(200);
            entity.Property(e => e.Plan)
                .HasMaxLength(30)
                .HasDefaultValue("Free");

            entity.HasOne(d => d.AssignedUser).WithMany(p => p.LicenseKeys)
                .HasForeignKey(d => d.AssignedUserId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK_LicenseKeys_Users");
        });

        modelBuilder.Entity<MatchEvidence>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__MatchEvi__3214EC07DD74CDFE");

            entity.Property(e => e.EvidenceType).HasMaxLength(30);

            entity.HasOne(d => d.Match).WithMany(p => p.MatchEvidences)
                .HasForeignKey(d => d.MatchId)
                .HasConstraintName("FK_MatchEvidences_MatchRuns");

            entity.HasOne(d => d.Skill).WithMany(p => p.MatchEvidences)
                .HasForeignKey(d => d.SkillId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK_MatchEvidences_Skills");
        });

        modelBuilder.Entity<MatchRun>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__MatchRun__3214EC07B68B2605");

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.TraceId).HasMaxLength(180);

            entity.HasOne(d => d.Document).WithMany(p => p.MatchRuns)
                .HasForeignKey(d => d.DocumentId)
                .HasConstraintName("FK_MatchRuns_Documents");

            entity.HasOne(d => d.Job).WithMany(p => p.MatchRuns)
                .HasForeignKey(d => d.JobId)
                .HasConstraintName("FK_MatchRuns_Jobs");
        });

        modelBuilder.Entity<MissingItem>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__MissingI__3214EC0740D2FEBD");

            entity.Property(e => e.MissingKeyword).HasMaxLength(180);
            entity.Property(e => e.Reason).HasMaxLength(300);
            entity.Property(e => e.Suggestion).HasMaxLength(300);

            entity.HasOne(d => d.Match).WithMany(p => p.MissingItems)
                .HasForeignKey(d => d.MatchId)
                .HasConstraintName("FK_MissingItems_MatchRuns");

            entity.HasOne(d => d.Skill).WithMany(p => p.MissingItems)
                .HasForeignKey(d => d.SkillId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK_MissingItems_Skills");
        });

        modelBuilder.Entity<Ocrresult>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__OCRResul__3214EC07D21DD5F9");

            entity.ToTable("OCRResults");

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.Engine).HasMaxLength(50);

            entity.HasOne(d => d.Document).WithMany(p => p.Ocrresults)
                .HasForeignKey(d => d.DocumentId)
                .HasConstraintName("FK_OCRResults_Documents");
        });

        modelBuilder.Entity<RequiredSkill>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Required__3214EC07DAEFB9A4");

            entity.Property(e => e.Note).HasMaxLength(200);

            entity.HasOne(d => d.Job).WithMany(p => p.RequiredSkills)
                .HasForeignKey(d => d.JobId)
                .HasConstraintName("FK_RequiredSkills_Jobs");

            entity.HasOne(d => d.Skill).WithMany(p => p.RequiredSkills)
                .HasForeignKey(d => d.SkillId)
                .HasConstraintName("FK_RequiredSkills_Skills");
        });

        modelBuilder.Entity<RewriteSuggestion>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__RewriteS__3214EC07C487AC03");

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");

            entity.HasOne(d => d.Bullet).WithMany(p => p.RewriteSuggestions)
                .HasForeignKey(d => d.BulletId)
                .HasConstraintName("FK_RewriteSuggestions_Bullets");

            entity.HasOne(d => d.Match).WithMany(p => p.RewriteSuggestions)
                .HasForeignKey(d => d.MatchId)
                .HasConstraintName("FK_RewriteSuggestions_MatchRuns");
        });

        modelBuilder.Entity<SavedCv>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__SavedCVs__3214EC07FAF68A96");

            entity.ToTable("SavedCVs");

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.CvdataJson).HasColumnName("CVDataJson");
            entity.Property(e => e.TemplateType).HasMaxLength(50);
            entity.Property(e => e.Title).HasMaxLength(200);
            entity.Property(e => e.UpdatedAt).HasDefaultValueSql("(sysutcdatetime())");

            entity.HasOne(d => d.User).WithMany(p => p.SavedCvs)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_SavedCVs_Users");
        });

        modelBuilder.Entity<Section>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Sections__3214EC07A855A635");

            entity.Property(e => e.SectionType).HasMaxLength(50);

            entity.HasOne(d => d.Document).WithMany(p => p.Sections)
                .HasForeignKey(d => d.DocumentId)
                .HasConstraintName("FK_Sections_Documents");
        });

        modelBuilder.Entity<Skill>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Skills__3214EC07478DECA0");

            entity.Property(e => e.Category).HasMaxLength(80);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.Name).HasMaxLength(180);
            entity.Property(e => e.NormName).HasMaxLength(180);
            entity.Property(e => e.UpdatedAt).HasDefaultValueSql("(sysutcdatetime())");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Users__3214EC07F96EE3D8");

            entity.HasIndex(e => e.Email, "UQ_Users_Email").IsUnique();

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.DisplayName).HasMaxLength(180);
            entity.Property(e => e.Email).HasMaxLength(250);
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.Password).HasMaxLength(100);
            entity.Property(e => e.Role).HasMaxLength(100);
        });

        modelBuilder.Entity<RecruiterVerification>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.HasOne(d => d.Recruiter)
                .WithMany(p => p.RecruiterVerificationRecruiters)
                .HasForeignKey(d => d.RecruiterId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            entity.HasOne(d => d.ReviewedByAdmin)
                .WithMany(p => p.RecruiterVerificationReviewedByAdmins)
                .HasForeignKey(d => d.ReviewedByAdminId);

            entity.HasOne(d => d.BusinessLicenseDocument)
                .WithMany(p => p.RecruiterVerificationBusinessLicenseDocuments)
                .HasForeignKey(d => d.BusinessLicenseDocumentId);

            entity.HasOne(d => d.CompanyProofDocument)
                .WithMany(p => p.RecruiterVerificationCompanyProofDocuments)
                .HasForeignKey(d => d.CompanyProofDocumentId);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
