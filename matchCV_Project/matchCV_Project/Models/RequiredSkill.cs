using System;
using System.Collections.Generic;

namespace matchCV_Project.Models;

public partial class RequiredSkill
{
    public int Id { get; set; }

    public int JobId { get; set; }

    public int SkillId { get; set; }

    public bool MustHave { get; set; }

    public double? Weight { get; set; }

    public string? Note { get; set; }

    public virtual Job Job { get; set; } = null!;

    public virtual Skill Skill { get; set; } = null!;
}
