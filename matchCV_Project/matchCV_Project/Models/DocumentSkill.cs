using System;
using System.Collections.Generic;

namespace matchCV_Project.Models;

public partial class DocumentSkill
{
    public int Id { get; set; }

    public int DocumentId { get; set; }

    public int SkillId { get; set; }

    public string Source { get; set; } = null!;

    public double? Years { get; set; }

    public double? YearsExperience { get; set; }

    public string? Proficiency { get; set; }

    public double? Confidence { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual Document Document { get; set; } = null!;

    public virtual Skill Skill { get; set; } = null!;
}
