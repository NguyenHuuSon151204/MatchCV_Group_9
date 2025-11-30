using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using MatchCV_Project.Models;

namespace MatchCV_Project.Models;

[Index("DocumentId", "JobId", Name = "IX_MatchRuns_Document_Job")]
public partial class MatchRun
{
    [Key]
    public int Id { get; set; }

    public int DocumentId { get; set; }

    public int JobId { get; set; }

    public double Score { get; set; }

    public int? DurationMs { get; set; }

    public string? Explanation { get; set; }

    public DateTime CreatedAt { get; set; }

    [StringLength(180)]
    public string? TraceId { get; set; }

    [ForeignKey("DocumentId")]
    [InverseProperty("MatchRuns")]
    public virtual Document Document { get; set; } = null!;

    [ForeignKey("JobId")]
    [InverseProperty("MatchRuns")]
    public virtual Job Job { get; set; } = null!;

    [InverseProperty("Match")]
    public virtual ICollection<MatchEvidence> MatchEvidences { get; set; } = new List<MatchEvidence>();

    [InverseProperty("Match")]
    public virtual ICollection<MissingItem> MissingItems { get; set; } = new List<MissingItem>();

    [InverseProperty("Match")]
    public virtual ICollection<RewriteSuggestion> RewriteSuggestions { get; set; } = new List<RewriteSuggestion>();
}
