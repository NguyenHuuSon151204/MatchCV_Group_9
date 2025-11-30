namespace MatchCV_Project.Models;   

public class Job
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Title { get; set; }
    public string Company { get; set; }
    public string? RawText { get; set; }
    public string? JobDescription { get; set; }
    public string Status { get; set; } = "Active";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public virtual User User { get; set; }
    public virtual ICollection<MatchCV_Project.Models.MatchRun> MatchRuns { get; set; } = new List<MatchCV_Project.Models.MatchRun>();
    public virtual ICollection<Application> Applications { get; set; } = new List<Application>();
    public virtual ICollection<RequiredSkill> RequiredSkills { get; set; } = new List<RequiredSkill>();
}

