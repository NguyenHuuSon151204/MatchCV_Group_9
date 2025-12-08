namespace ApiRestFul.DTOs
{
    public class SavedCVDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string TemplateType { get; set; } = string.Empty;
        public CVDataDto? CVData { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class SaveCVRequestDto
    {
        public int Id { get; set; }  // 0 for new CV, >0 for update
        public string Title { get; set; } = string.Empty;
        public string TemplateType { get; set; } = string.Empty;
        public CVDataDto CVData { get; set; } = new CVDataDto();
    }

    public class CVHistoryItemDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string TemplateType { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
