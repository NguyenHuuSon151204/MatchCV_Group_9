using System;
using System.Collections.Generic;

namespace matchCV_Project.Models;

public partial class MatchRun
{
    public int Id { get; set; }

    public int DocumentId { get; set; }

    public int JobId { get; set; }

    public double Score { get; set; }

    public int? DurationMs { get; set; }

    public string? Explanation { get; set; }

    public DateTime CreatedAt { get; set; }

    public string? TraceId { get; set; }

    public virtual Document Document { get; set; } = null!;

    public virtual Job Job { get; set; } = null!;

    public virtual ICollection<MatchEvidence> MatchEvidences { get; set; } = new List<MatchEvidence>();

    public virtual ICollection<MissingItem> MissingItems { get; set; } = new List<MissingItem>();

    public virtual ICollection<RewriteSuggestion> RewriteSuggestions { get; set; } = new List<RewriteSuggestion>();
}
