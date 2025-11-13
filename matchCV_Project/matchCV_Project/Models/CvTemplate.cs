namespace MatchCV_Project.Models;

public class CvTemplate
{
    public int Id { get; set; }
    public string Key { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string TemplatePath { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public virtual ICollection<Document> Documents { get; set; } = new List<Document>();
}
