using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace MatchCV_Project.Models;

public partial class RewriteSuggestion
{
    [Key]
    public int Id { get; set; }

    public int MatchId { get; set; }

    public int? BulletId { get; set; }

    public string SuggestedText { get; set; } = null!;

    public string? Rationale { get; set; }

    public bool Accepted { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? AcceptedAt { get; set; }

    [ForeignKey("MatchId")]
    [InverseProperty("RewriteSuggestions")]
    public virtual MatchRun Match { get; set; } = null!;
}
