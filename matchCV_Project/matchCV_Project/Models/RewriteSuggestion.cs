using System;
using System.Collections.Generic;

namespace matchCV_Project.Models;

public partial class RewriteSuggestion
{
    public int Id { get; set; }

    public int MatchId { get; set; }

    public int? BulletId { get; set; }

    public string SuggestedText { get; set; } = null!;

    public string? Rationale { get; set; }

    public bool Accepted { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? AcceptedAt { get; set; }

    public virtual Bullet? Bullet { get; set; }

    public virtual MatchRun Match { get; set; } = null!;
}
