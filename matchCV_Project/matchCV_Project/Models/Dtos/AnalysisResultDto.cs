namespace MatchCV_Project.Models.Dtos;

public class AnalysisResultDto
{
    public int DocumentId { get; set; }
    public float Score { get; set; }
    public float Confidence { get; set; }
    public string Evidence { get; set; }
    public DateTime AnalysisDate { get; set; }
    public List<SkillAnalysisDto> Skills { get; set; } = new();
    public int Experiences { get; set; }
    public int Educations { get; set; }
}

public class SkillAnalysisDto
{
    public string Name { get; set; }
    public string Proficiency { get; set; }
    public float Confidence { get; set; }
}
