using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace matchCV_Project.Models;

public partial class MissingItem
{
    [Key]
    public int Id { get; set; }

    public int MatchId { get; set; }

    public int? SkillId { get; set; }

    [StringLength(180)]
    public string? MissingKeyword { get; set; }

    [StringLength(300)]
    public string? Reason { get; set; }

    [StringLength(300)]
    public string? Suggestion { get; set; }

    public bool MustHave { get; set; }

    [ForeignKey("MatchId")]
    [InverseProperty("MissingItems")]
    public virtual MatchRun Match { get; set; } = null!;

    [ForeignKey("SkillId")]
    [InverseProperty("MissingItems")]
    public virtual Skill? Skill { get; set; }
}
