using System;
using System.Collections.Generic;
using matchCV_Project.Models;
using Microsoft.EntityFrameworkCore;

namespace matchCV_Project.Data;

public partial class AppDbContext : DbContext
{
    public AppDbContext()
    {
    }

    public AppDbContext(DbContextOptions<DbContext> options)
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

    public virtual DbSet<Ocrresult> Ocrresults { get; set; }

    public virtual DbSet<RequiredSkill> RequiredSkills { get; set; }

    public virtual DbSet<RewriteSuggestion> RewriteSuggestions { get; set; }

    public virtual DbSet<Section> Sections { get; set; }

    public virtual DbSet<Skill> Skills { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=LAPTOP-JCPG0NBH;Database=MatchCV;User Id=sa;Password=123;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
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

        modelBuilder.Entity<Cvtemplate>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__CVTempla__3214EC07AE0D3463");

            entity.Property(e => e.IsActive).HasDefaultValue(true);
        });

        modelBuilder.Entity<Document>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Document__3214EC07A243EBEB");

            entity.Property(e => e.UploadedAt).HasDefaultValueSql("(sysutcdatetime())");

            entity.HasOne(d => d.User).WithMany(p => p.Documents).OnDelete(DeleteBehavior.SetNull);
        });

        modelBuilder.Entity<DocumentSkill>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Document__3214EC07917B4ED3");

            entity.HasOne(d => d.Document).WithMany(p => p.DocumentSkills).HasConstraintName("FK_DocumentSkills_Documents");

            entity.HasOne(d => d.Skill).WithMany(p => p.DocumentSkills).HasConstraintName("FK_DocumentSkills_Skills");
        });

        modelBuilder.Entity<Education>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Educatio__3214EC0760A2F9E7");

            entity.HasOne(d => d.Document).WithMany(p => p.Educations).HasConstraintName("FK_Education_Documents");
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

            entity.HasOne(d => d.Document).WithMany(p => p.Experiences).HasConstraintName("FK_Experiences_Documents");
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

            entity.HasOne(d => d.User).WithMany(p => p.Jobs).HasConstraintName("FK_Jobs_Users");
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

            entity.HasOne(d => d.Document).WithMany(p => p.Ocrresults).HasConstraintName("FK_OCRResults_Documents");
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

        modelBuilder.Entity<Skill>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Skills__3214EC0709FDFA23");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Users__3214EC07AE321C34");

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
