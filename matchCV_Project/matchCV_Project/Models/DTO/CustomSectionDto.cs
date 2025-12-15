
using System.Collections.Generic;

namespace ApiRestFul.DTOs
{
    public class CustomSectionItemDto
    {
        public object Id { get; set; }
        public string Title { get; set; }
        public string Subtitle { get; set; } // Company or Institution or key detail
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string Description { get; set; }
    }

    public class CustomSectionDto
    {
        public object Id { get; set; }
        public string Title { get; set; } // Section Header
        public List<CustomSectionItemDto> Items { get; set; } = new List<CustomSectionItemDto>();
    }
}
