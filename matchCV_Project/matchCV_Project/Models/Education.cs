namespace MatchCV_Project.Models;

public class Education
{
    public int Id { get; set; }
    public int DocumentId { get; set; }
    public string Degree { get; set; }
    public string? FieldOfStudy { get; set; }
    public string SchoolName { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public float? Score { get; set; }
    public string? Activities { get; set; }
    public string? Description { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation property
    public virtual Document Document { get; set; }
}
