namespace MatchCV_Project.Models;

public class Document
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int? TemplateId { get; set; }
    public string OriginalName { get; set; }
    public string DocType { get; set; }
    public string FileName { get; set; }
    public string ContentType { get; set; }
    public string StoragePath { get; set; }
    public long? FileSize { get; set; }
    public float? AiConfidence { get; set; }
    public float? TotalScore { get; set; }
    public string Status { get; set; } = "Active";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public virtual User User { get; set; }
    public virtual CvTemplate CvTemplate { get; set; }
    public virtual ICollection<DocumentSkill> DocumentSkills { get; set; } = new List<DocumentSkill>();
    public virtual ICollection<Experience> Experiences { get; set; } = new List<Experience>();
    public virtual ICollection<Education> Educations { get; set; } = new List<Education>();
    public virtual ICollection<MatchResult> MatchResults { get; set; } = new List<MatchResult>();
}
