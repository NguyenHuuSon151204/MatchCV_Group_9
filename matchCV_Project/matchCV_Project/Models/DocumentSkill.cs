using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace matchCV_Project.Models;

[Index("DocumentId", Name = "IX_DocumentSkills_DocumentId")]
[Index("SkillId", Name = "IX_DocumentSkills_SkillId")]
public partial class DocumentSkill
{
    [Key]
    public int Id { get; set; }

    public int DocumentId { get; set; }

    public int SkillId { get; set; }

    [StringLength(30)]
    public string Source { get; set; } = null!;

    public double? Years { get; set; }

    public double? Confidence { get; set; }

    [ForeignKey("DocumentId")]
    [InverseProperty("DocumentSkills")]
    public virtual Document Document { get; set; } = null!;

    [ForeignKey("SkillId")]
    [InverseProperty("DocumentSkills")]
    public virtual Skill Skill { get; set; } = null!;
}
