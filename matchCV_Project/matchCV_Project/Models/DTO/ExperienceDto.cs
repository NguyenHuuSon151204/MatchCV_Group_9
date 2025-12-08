using System;

namespace ApiRestFul.DTOs
{
    public class ExperienceDto
    {
        public string Company { get; set; }
        public string Position { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Description { get; set; }
    }
}