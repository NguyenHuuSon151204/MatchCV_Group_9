using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace matchCV_Project.Models;

public partial class MatchEvidence
{
    [Key]
    public int Id { get; set; }

    public int MatchId { get; set; }

    public int? SkillId { get; set; }

    public string? Snippet { get; set; }

    public double? ComponentScore { get; set; }

    [StringLength(30)]
    public string? EvidenceType { get; set; }

    [ForeignKey("MatchId")]
    [InverseProperty("MatchEvidences")]
    public virtual MatchRun Match { get; set; } = null!;

    [ForeignKey("SkillId")]
    [InverseProperty("MatchEvidences")]
    public virtual Skill? Skill { get; set; }
}
