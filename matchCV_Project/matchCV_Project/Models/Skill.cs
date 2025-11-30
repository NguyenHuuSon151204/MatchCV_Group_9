using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using MatchCV_Project.Models;

namespace MatchCV_Project.Models;

[Index("NormName", Name = "IX_Skills_NormName", IsUnique = true)]
public partial class Skill
{
    [Key]
    public int Id { get; set; }

    [StringLength(180)]
    public string Name { get; set; } = null!;

    [StringLength(180)]
    public string NormName { get; set; } = null!;

    [StringLength(80)]
    public string? Category { get; set; }

    [InverseProperty("Skill")]
    public virtual ICollection<DocumentSkill> DocumentSkills { get; set; } = new List<DocumentSkill>();

    [InverseProperty("Skill")]
    public virtual ICollection<MatchEvidence> MatchEvidences { get; set; } = new List<MatchEvidence>();

    [InverseProperty("Skill")]
    public virtual ICollection<MissingItem> MissingItems { get; set; } = new List<MissingItem>();

    [InverseProperty("Skill")]
    public virtual ICollection<RequiredSkill> RequiredSkills { get; set; } = new List<RequiredSkill>();
}