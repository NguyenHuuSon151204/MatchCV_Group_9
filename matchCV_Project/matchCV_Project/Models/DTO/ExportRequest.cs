namespace ApiRestFul.Models.DTOs
{
    public class ExportRequest
    {
        public int CvId { get; set; }
        public string Format { get; set; } = "pdf";  // Mặc định là pdf
        public string? Template { get; set; }
    }
}