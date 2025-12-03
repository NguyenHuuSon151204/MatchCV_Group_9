namespace matchCV_Project.Models.Dtos;

public class UpdateDocumentDto
{
    public string? OriginalName { get; set; }
    public int? TemplateId { get; set; }
    public string? Title { get; set; }
    public string? TemplateType { get; set; }
    public object? CvData { get; set; }
}
