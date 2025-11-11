using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace matchCV_Project.Models;

[Index("DocType", Name = "IX_Documents_DocType")]
[Index("UploadedAt", Name = "IX_Documents_Uploaded")]
[Index("UserId", Name = "IX_Documents_UserId")]
public partial class Document
{
    [Key]
    public int Id { get; set; }

    public int? UserId { get; set; }

    [StringLength(30)]
    public string DocType { get; set; } = null!;

    [StringLength(250)]
    public string OriginalName { get; set; } = null!;

    [StringLength(100)]
    public string? ContentType { get; set; }

    [StringLength(400)]
    public string StoragePath { get; set; } = null!;

    [StringLength(128)]
    public string? FileHash { get; set; }

    public int? SizeBytes { get; set; }

    public int? PageCount { get; set; }

    public DateTime UploadedAt { get; set; }

    public bool IsDeleted { get; set; }

    [InverseProperty("Document")]
    public virtual ICollection<Application> Applications { get; set; } = new List<Application>();

    [InverseProperty("Document")]
    public virtual ICollection<DocumentSkill> DocumentSkills { get; set; } = new List<DocumentSkill>();

    [InverseProperty("Document")]
    public virtual ICollection<Education> Educations { get; set; } = new List<Education>();

    [InverseProperty("Document")]
    public virtual ICollection<Experience> Experiences { get; set; } = new List<Experience>();

    [InverseProperty("Document")]
    public virtual ICollection<Export> Exports { get; set; } = new List<Export>();

    [InverseProperty("Document")]
    public virtual ICollection<MatchRun> MatchRuns { get; set; } = new List<MatchRun>();

    [InverseProperty("Document")]
    public virtual ICollection<Ocrresult> Ocrresults { get; set; } = new List<Ocrresult>();

    [InverseProperty("Document")]
    public virtual ICollection<Section> Sections { get; set; } = new List<Section>();

    [ForeignKey("UserId")]
    [InverseProperty("Documents")]
    public virtual User? User { get; set; }
}
