namespace MatchCV_Project.Models;

public class Experience
{
    public int Id { get; set; }
    public int DocumentId { get; set; }
    public string JobTitle { get; set; }
    public string CompanyName { get; set; }
    public string? IndustryName { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public bool CurrentlyWorking { get; set; }
    public string? Description { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation property
    public virtual Document Document { get; set; }
}
