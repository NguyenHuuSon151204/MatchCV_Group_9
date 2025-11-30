using MatchCV_Project.Models;

namespace MatchCV_Project.Models;

public class DocumentSkill
{
    public int Id { get; set; }
    public int DocumentId { get; set; }
    public int SkillId { get; set; }
    public float? YearsExperience { get; set; }
    public string? Proficiency { get; set; }
    public float? Confidence { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public virtual Document Document { get; set; }
    public virtual Skill Skill { get; set; }
}
