using System;
using System.Collections.Generic;

namespace matchCV_Project.Models;

public partial class MatchEvidence
{
    public int Id { get; set; }

    public int MatchId { get; set; }

    public int? SkillId { get; set; }

    public string? Snippet { get; set; }

    public double? ComponentScore { get; set; }

    public string? EvidenceType { get; set; }

    public virtual MatchRun Match { get; set; } = null!;

    public virtual Skill? Skill { get; set; }
}
