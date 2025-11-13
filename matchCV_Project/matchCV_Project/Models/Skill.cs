namespace MatchCV_Project.Models;

public class Skill
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string NormalizeName { get; set; }
    public string Category { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public virtual ICollection<DocumentSkill> DocumentSkills { get; set; } = new List<DocumentSkill>();
}
