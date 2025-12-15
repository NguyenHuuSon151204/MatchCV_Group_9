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

    public virtual DbSet<Notification> Notifications { get; set; }

    public virtual DbSet<Ocrresult> Ocrresults { get; set; }

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
            entity.HasKey(e => e.Id).HasName("PK__AdminLog__3214EC071038136F");

            entity.HasIndex(e => e.CreatedAt, "IX_AdminLogs_CreatedAt");

            entity.HasIndex(e => new { e.Entity, e.EntityId }, "IX_AdminLogs_Entity_EntityId");

            entity.Property(e => e.Action).HasMaxLength(100);
            entity.Property(e => e.Actor).HasMaxLength(200);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.Entity).HasMaxLength(100);
            entity.Property(e => e.MetaJson).HasDefaultValue("{}");
        });

        modelBuilder.Entity<ApicallLog>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__APICallL__3214EC0725C840F4");

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
            entity.HasKey(e => e.Id).HasName("PK__APISetti__3214EC07FFE8A37C");

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
            entity.HasKey(e => e.Id).HasName("PK__Applicat__3214EC070847CDC4");

            entity.HasIndex(e => e.CandidateId, "IX_Applications_CandidateId");

            entity.HasIndex(e => e.CreatedAt, "IX_Applications_CreatedAt");

            entity.HasIndex(e => e.JobId, "IX_Applications_JobId");

            entity.HasIndex(e => e.Status, "IX_Applications_Status");

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
            entity.HasKey(e => e.Id).HasName("PK__Bullets__3214EC07F631F642");

            entity.HasIndex(e => e.SectionId, "IX_Bullets_SectionId");

            entity.HasOne(d => d.Section).WithMany(p => p.Bullets)
                .HasForeignKey(d => d.SectionId)
                .HasConstraintName("FK_Bullets_Sections");
        });

        modelBuilder.Entity<Cvtemplate>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__CVTempla__3214EC0752D52AD1");

            entity.ToTable("CVTemplates");

            entity.HasIndex(e => e.Key, "UQ__CVTempla__C41E0289DE48762E").IsUnique();

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
            entity.HasKey(e => e.Id).HasName("PK__Document__3214EC07BA44AC6A");

            entity.HasIndex(e => e.DocType, "IX_Documents_DocType");

            entity.HasIndex(e => new { e.Status, e.IsDeleted }, "IX_Documents_Status_IsDeleted").HasFilter("([IsDeleted]=(0))");

            entity.HasIndex(e => e.TemplateId, "IX_Documents_TemplateId").HasFilter("([TemplateId] IS NOT NULL)");

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

            entity.HasOne(d => d.Template).WithMany(p => p.Documents)
                .HasForeignKey(d => d.TemplateId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK_Documents_CVTemplates");

            entity.HasOne(d => d.User).WithMany(p => p.Documents).HasForeignKey(d => d.UserId);
        });

        modelBuilder.Entity<DocumentSkill>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Document__3214EC07F14E9437");

            entity.HasIndex(e => e.DocumentId, "IX_DocumentSkills_DocumentId");

            entity.HasIndex(e => new { e.DocumentId, e.SkillId }, "IX_DocumentSkills_Document_Skill").IsUnique();

            entity.HasIndex(e => e.SkillId, "IX_DocumentSkills_SkillId");

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
            entity.HasKey(e => e.Id).HasName("PK__Educatio__3214EC0730C1362F");

            entity.HasIndex(e => e.DocumentId, "IX_Educations_DocumentId");

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.Degree).HasMaxLength(150);
            entity.Property(e => e.FieldOfStudy).HasMaxLength(150);
            entity.Property(e => e.SchoolName).HasMaxLength(200);

            entity.HasOne(d => d.Document).WithMany(p => p.Educations)
                .HasForeignKey(d => d.DocumentId)
                .HasConstraintName("FK_Education_Documents");
        });

        modelBuilder.Entity<Embedding>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Embeddin__3214EC07487933E3");

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.Model).HasMaxLength(80);
        });

        modelBuilder.Entity<EmbeddingCache>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Embeddin__3214EC073BFAA201");

            entity.ToTable("EmbeddingCache");

            entity.HasIndex(e => e.InputHash, "UQ__Embeddin__FA28014814145847").IsUnique();

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.InputHash).HasMaxLength(128);
            entity.Property(e => e.Model).HasMaxLength(80);
        });

        modelBuilder.Entity<EmbeddingOwnership>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Embeddin__3214EC07B738B40C");

            entity.ToTable("EmbeddingOwnership");

            entity.Property(e => e.OwnerType).HasMaxLength(30);

            entity.HasOne(d => d.Embedding).WithMany(p => p.EmbeddingOwnerships)
                .HasForeignKey(d => d.EmbeddingId)
                .HasConstraintName("FK_EmbeddingOwnership_Embeddings");
        });

        modelBuilder.Entity<Experience>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Experien__3214EC070FB2A8EB");

            entity.HasIndex(e => e.DocumentId, "IX_Experiences_DocumentId");

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
            entity.HasKey(e => e.Id).HasName("PK__Exports__3214EC074636AC9F");

            entity.HasIndex(e => e.DocumentId, "IX_Exports_DocumentId");

            entity.HasIndex(e => new { e.Status, e.CreatedAt }, "IX_Exports_Status_CreatedAt");

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
            entity.HasIndex(e => e.CreatedAt, "IX_Jobs_CreatedAt");

            entity.HasIndex(e => e.Status, "IX_Jobs_Status");

            entity.HasIndex(e => e.UserId, "IX_Jobs_UserId");

            entity.Property(e => e.Company).HasMaxLength(200);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.RawText).HasMaxLength(4000);
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
            entity.HasKey(e => e.Id).HasName("PK__LicenseK__3214EC0757496BA6");

            entity.HasIndex(e => e.KeyHash, "UQ__LicenseK__BA9770BB73EC4E59").IsUnique();

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
            entity.HasKey(e => e.Id).HasName("PK__MatchEvi__3214EC0778707171");

            entity.HasIndex(e => e.MatchId, "IX_MatchEvidences_MatchId");

            entity.HasIndex(e => e.SkillId, "IX_MatchEvidences_SkillId").HasFilter("([SkillId] IS NOT NULL)");

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
            entity.HasKey(e => e.Id).HasName("PK__MatchRun__3214EC07E64642FE");

            entity.HasIndex(e => e.CreatedAt, "IX_MatchRuns_CreatedAt");

            entity.HasIndex(e => new { e.DocumentId, e.JobId }, "IX_MatchRuns_Document_Job");

            entity.HasIndex(e => e.Score, "IX_MatchRuns_Score");

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
            entity.HasKey(e => e.Id).HasName("PK__MissingI__3214EC0774FAE7A1");

            entity.HasIndex(e => e.MatchId, "IX_MissingItems_MatchId");

            entity.HasIndex(e => e.MustHave, "IX_MissingItems_MustHave").HasFilter("([MustHave]=(1))");

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

        modelBuilder.Entity<Notification>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Notifica__3214EC07D1E611B2");

            entity.HasIndex(e => e.CreatedAt, "IX_Notifications_CreatedAt");

            entity.HasIndex(e => e.Role, "IX_Notifications_Role");

            entity.HasIndex(e => e.UserId, "IX_Notifications_UserId");

            entity.Property(e => e.Category)
                .HasMaxLength(20)
                .HasDefaultValue("info");
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.Message).HasMaxLength(500);
            entity.Property(e => e.Role)
                .HasMaxLength(50)
                .HasDefaultValue("Candidate");
            entity.Property(e => e.Title).HasMaxLength(200);

            entity.HasOne(d => d.User).WithMany(p => p.Notifications)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_Notifications_Users");
        });

        modelBuilder.Entity<Ocrresult>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__OCRResul__3214EC0771EEE90C");

            entity.ToTable("OCRResults");

            entity.HasIndex(e => e.CreatedAt, "IX_OCRResults_CreatedAt");

            entity.HasIndex(e => e.DocumentId, "IX_OCRResults_DocumentId");

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.Engine).HasMaxLength(50);

            entity.HasOne(d => d.Document).WithMany(p => p.Ocrresults)
                .HasForeignKey(d => d.DocumentId)
                .HasConstraintName("FK_OCRResults_Documents");
        });

        modelBuilder.Entity<RecruiterVerification>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Recruite__3214EC07486F644C");

            entity.HasIndex(e => e.CreatedAt, "IX_RecruiterVerification_CreatedAt");

            entity.HasIndex(e => e.RecruiterId, "IX_RecruiterVerification_RecruiterId");

            entity.HasIndex(e => e.Status, "IX_RecruiterVerification_Status");

            entity.Property(e => e.AdminNotes).HasMaxLength(500);
            entity.Property(e => e.CompanyAddress).HasMaxLength(200);
            entity.Property(e => e.CompanyEmail).HasMaxLength(250);
            entity.Property(e => e.CompanyName).HasMaxLength(200);
            entity.Property(e => e.CompanyPhone).HasMaxLength(50);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.Status)
                .HasMaxLength(30)
                .HasDefaultValue("Pending");
            entity.Property(e => e.TaxCode).HasMaxLength(50);

            entity.HasOne(d => d.BusinessLicenseDocument).WithMany(p => p.RecruiterVerificationBusinessLicenseDocuments)
                .HasForeignKey(d => d.BusinessLicenseDocumentId)
                .HasConstraintName("FK_RecruiterVerification_Documents_BusinessLicense");

            entity.HasOne(d => d.CompanyProofDocument).WithMany(p => p.RecruiterVerificationCompanyProofDocuments)
                .HasForeignKey(d => d.CompanyProofDocumentId)
                .HasConstraintName("FK_RecruiterVerification_Documents_CompanyProof");

            entity.HasOne(d => d.Recruiter).WithMany(p => p.RecruiterVerificationRecruiters)
                .HasForeignKey(d => d.RecruiterId)
                .HasConstraintName("FK_RecruiterVerification_Users_Recruiter");

            entity.HasOne(d => d.ReviewedByAdmin).WithMany(p => p.RecruiterVerificationReviewedByAdmins)
                .HasForeignKey(d => d.ReviewedByAdminId)
                .HasConstraintName("FK_RecruiterVerification_Users_Admin");
        });

        modelBuilder.Entity<RequiredSkill>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Required__3214EC073A8C24F4");

            entity.HasIndex(e => e.JobId, "IX_RequiredSkills_JobId");

            entity.HasIndex(e => new { e.JobId, e.SkillId }, "IX_RequiredSkills_Job_Skill").IsUnique();

            entity.HasIndex(e => e.SkillId, "IX_RequiredSkills_SkillId");

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
            entity.HasKey(e => e.Id).HasName("PK__RewriteS__3214EC07D89822B3");

            entity.HasIndex(e => e.Accepted, "IX_RewriteSuggestions_Accepted").HasFilter("([Accepted]=(0))");

            entity.HasIndex(e => e.MatchId, "IX_RewriteSuggestions_MatchId");

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
            entity.HasKey(e => e.Id).HasName("PK__SavedCVs__3214EC079DED8F3D");

            entity.ToTable("SavedCVs");

            entity.HasIndex(e => e.CreatedAt, "IX_SavedCVs_CreatedAt");

            entity.HasIndex(e => e.UserId, "IX_SavedCVs_UserId").HasFilter("([UserId] IS NOT NULL)");

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
            entity.HasKey(e => e.Id).HasName("PK__Sections__3214EC0705669E15");

            entity.HasIndex(e => e.DocumentId, "IX_Sections_DocumentId");

            entity.HasIndex(e => new { e.DocumentId, e.SectionType }, "IX_Sections_DocumentId_SectionType");

            entity.Property(e => e.SectionType).HasMaxLength(50);

            entity.HasOne(d => d.Document).WithMany(p => p.Sections)
                .HasForeignKey(d => d.DocumentId)
                .HasConstraintName("FK_Sections_Documents");
        });

        modelBuilder.Entity<Skill>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Skills__3214EC07843EDAA5");

            entity.HasIndex(e => e.NormName, "IX_Skills_NormName").IsUnique();

            entity.Property(e => e.Category).HasMaxLength(80);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.Name).HasMaxLength(180);
            entity.Property(e => e.NormName).HasMaxLength(180);
            entity.Property(e => e.UpdatedAt).HasDefaultValueSql("(sysutcdatetime())");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Users__3214EC07B9C7B866");

            entity.HasIndex(e => new { e.IsActive, e.IsDeleted }, "IX_Users_IsActive_IsDeleted");

            entity.HasIndex(e => e.Role, "IX_Users_Role").HasFilter("([IsDeleted]=(0))");

            entity.HasIndex(e => e.Email, "UQ__Users__A9D10534A0824C3B").IsUnique();

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.DisplayName).HasMaxLength(180);
            entity.Property(e => e.Email).HasMaxLength(250);
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.Password).HasMaxLength(100);
            entity.Property(e => e.Role).HasMaxLength(100);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
