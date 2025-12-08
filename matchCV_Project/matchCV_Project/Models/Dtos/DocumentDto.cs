namespace matchCV_Project.Models.Dtos;

public class DocumentDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string OriginalName { get; set; }
    public string Title { get; set; }
    public string TemplateType { get; set; } // Added TemplateType
    public string DocType { get; set; }
    public string FileName { get; set; }
    public string ContentType { get; set; }
    public long? FileSize { get; set; }
    public float? AiConfidence { get; set; }
    public float? TotalScore { get; set; }
    public string Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public int SkillsCount { get; set; }
    public int ExperiencesCount { get; set; }
    public int EducationsCount { get; set; }
    public object? CvData { get; set; }
}
