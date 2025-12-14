namespace matchCV_Project.Models.Dtos;

public class SubmitVerificationRequest
{
    public string CompanyName { get; set; } = string.Empty;
    public string CompanyEmail { get; set; } = string.Empty;
    public string? CompanyPhone { get; set; }
    public string? CompanyAddress { get; set; }
    public string? TaxCode { get; set; }
}
