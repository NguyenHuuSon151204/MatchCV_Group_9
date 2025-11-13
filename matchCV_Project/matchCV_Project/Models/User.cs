namespace MatchCV_Project.Models;

public class User
{
    public int Id { get; set; }
    public string DisplayName { get; set; }
    public string EmailAddress { get; set; }
    public string Role { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public bool IsActive { get; set; } = true;

    // Navigation properties
    public virtual ICollection<Document> Documents { get; set; } = new List<Document>();
    public virtual ICollection<Job> Jobs { get; set; } = new List<Job>();
}
