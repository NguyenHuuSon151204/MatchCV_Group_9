using System;
using System.Collections.Generic;

namespace matchCV_Project.Models;

public partial class Document
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public int? CvTemplateId { get; set; }

    public string DocType { get; set; } = null!;

    public string OriginalName { get; set; } = null!;

    public string? FileName { get; set; }

    public string? Content { get; set; }

    public string? ContentType { get; set; }

    public string? StoragePath { get; set; }

    public string? FileHash { get; set; }

    public long? FileSize { get; set; }

    public int? PageCount { get; set; }

    public double? AiConfidence { get; set; }

    public double? TotalScore { get; set; }

    public string Status { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public string? CvData { get; set; }

    public bool IsDeleted { get; set; }

    public virtual ICollection<Application> Applications { get; set; } = new List<Application>();

    public virtual Cvtemplate? CvTemplate { get; set; }

    public virtual ICollection<DocumentSkill> DocumentSkills { get; set; } = new List<DocumentSkill>();

    public virtual ICollection<Education> Educations { get; set; } = new List<Education>();

    public virtual ICollection<Experience> Experiences { get; set; } = new List<Experience>();

    public virtual ICollection<Export> Exports { get; set; } = new List<Export>();

    public virtual ICollection<MatchRun> MatchRuns { get; set; } = new List<MatchRun>();

    public virtual ICollection<Ocrresult> Ocrresults { get; set; } = new List<Ocrresult>();

    public virtual ICollection<Section> Sections { get; set; } = new List<Section>();

    public virtual User? User { get; set; }
}
