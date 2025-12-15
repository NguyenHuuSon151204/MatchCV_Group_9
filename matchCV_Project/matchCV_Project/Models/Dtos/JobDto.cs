namespace matchCV_Project.Models.Dtos;

public class JobDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Title { get; set; }
    public string Company { get; set; }
    public string? RawText { get; set; }
    public string? JobDescription { get; set; }
    public string Status { get; set; }
    public DateTime? Deadline { get; set; }
    public int? MaxApplicants { get; set; }
    public int Applications { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

public class CreateJobDto
{
    public string Title { get; set; }
    public string Company { get; set; }
    public string? JobDescription { get; set; }
    public string? RawText { get; set; }
    public DateTime? Deadline { get; set; }
    public int? MaxApplicants { get; set; }
}

public class UpdateJobDto
{
    public string? Title { get; set; }
    public string? Company { get; set; }
    public string? JobDescription { get; set; }
    public string? RawText { get; set; }
    public string? Status { get; set; }
    public DateTime? Deadline { get; set; }
    public int? MaxApplicants { get; set; }
}

