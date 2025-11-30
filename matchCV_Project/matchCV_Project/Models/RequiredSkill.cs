using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using MatchCV_Project.Models;

namespace MatchCV_Project.Models;

[Index("JobId", Name = "IX_RequiredSkills_JobId")]
public partial class RequiredSkill
{
    [Key]
    public int Id { get; set; }

    public int JobId { get; set; }

    public int SkillId { get; set; }

    public bool MustHave { get; set; }

    public double? Weight { get; set; }

    [StringLength(200)]
    public string? Note { get; set; }

    [ForeignKey("JobId")]
    [InverseProperty("RequiredSkills")]
    public virtual Job Job { get; set; } = null!;

    [ForeignKey("SkillId")]
    [InverseProperty("RequiredSkills")]
    public virtual Skill Skill { get; set; } = null!;
}
