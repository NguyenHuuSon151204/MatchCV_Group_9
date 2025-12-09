namespace matchCV_Project.Models;

public class MatchResult
{
    public int Id { get; set; }
    public int DocumentId { get; set; }
    public int JobId { get; set; }
    public float? Score { get; set; }
    public string Evidence { get; set; }
    public string MatchStrength { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public virtual Document Document { get; set; }
    public virtual Job Job { get; set; }
}
