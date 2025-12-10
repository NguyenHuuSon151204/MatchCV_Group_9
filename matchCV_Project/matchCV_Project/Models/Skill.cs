using System;
using System.Collections.Generic;

namespace matchCV_Project.Models;

public partial class Skill
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string NormName { get; set; } = null!;

    public string? Category { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public bool IsDeleted { get; set; }

    public virtual ICollection<DocumentSkill> DocumentSkills { get; set; } = new List<DocumentSkill>();

    public virtual ICollection<MatchEvidence> MatchEvidences { get; set; } = new List<MatchEvidence>();

    public virtual ICollection<MissingItem> MissingItems { get; set; } = new List<MissingItem>();

    public virtual ICollection<RequiredSkill> RequiredSkills { get; set; } = new List<RequiredSkill>();
}
