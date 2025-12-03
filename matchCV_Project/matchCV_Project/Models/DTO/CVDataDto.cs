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
    }
}