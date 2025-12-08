namespace ApiRestFul.DTOs
{
    public class EducationDto
    {
        public string Institution { get; set; }
        public string Degree { get; set; }
        public string FieldOfStudy { get; set; }
        public int? StartYear { get; set; }
        public int? EndYear { get; set; }
    }
}