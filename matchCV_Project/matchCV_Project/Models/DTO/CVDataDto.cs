using System.Collections.Generic;

namespace ApiRestFul.DTOs
{
    public class CVDataDto
    {
        public int? TemplateId { get; set; }
        public string TemplateType { get; set; } // "modern" hoặc "formal"
        public PersonalInfoDto PersonalInfo { get; set; } = new PersonalInfoDto();
        public List<ExperienceDto> Experiences { get; set; } = new List<ExperienceDto>();
        public List<EducationDto> Educations { get; set; } = new List<EducationDto>();
        public List<SkillDto> Skills { get; set; } = new List<SkillDto>();
        public List<CustomSectionDto> CustomSections { get; set; } = new List<CustomSectionDto>();
        public List<CustomSectionDto> SidebarSections { get; set; } = new List<CustomSectionDto>();
        public List<string> SectionOrder { get; set; } = new List<string>(); // e.g. ["experiences", "educations", "custom-1", "skills"]
    }
}