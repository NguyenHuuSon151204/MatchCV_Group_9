using System;
using System.Collections.Generic;

namespace matchCV_Project.Models;

public partial class MissingItem
{
    public int Id { get; set; }

    public int MatchId { get; set; }

    public int? SkillId { get; set; }

    public string? MissingKeyword { get; set; }

    public string? Reason { get; set; }

    public string? Suggestion { get; set; }

    public bool MustHave { get; set; }

    public virtual MatchRun Match { get; set; } = null!;

    public virtual Skill? Skill { get; set; }
}
