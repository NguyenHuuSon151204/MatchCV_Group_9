namespace MatchCV_Project.Models.Dtos;

public class SaveCvDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string TemplateType { get; set; }
    public object CvData { get; set; }
}
