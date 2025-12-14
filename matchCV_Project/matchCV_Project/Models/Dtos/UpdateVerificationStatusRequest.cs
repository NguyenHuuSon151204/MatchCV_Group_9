namespace matchCV_Project.Models.Dtos;

public class UpdateVerificationStatusRequest
{
    public string Status { get; set; } = string.Empty; // "Approved" or "Rejected"
    public string? AdminNotes { get; set; }
}
