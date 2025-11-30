using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using MatchCV_Project.Models;

namespace MatchCV_Project.Models;

[Index("DocumentId", Name = "IX_Sections_DocumentId")]
public partial class Section
{
    [Key]
    public int Id { get; set; }

    public int DocumentId { get; set; }

    [StringLength(50)]
    public string SectionType { get; set; } = null!;

    public int Ord { get; set; }

    public string? RawText { get; set; }

    [InverseProperty("Section")]
    public virtual ICollection<Bullet> Bullets { get; set; } = new List<Bullet>();

    [ForeignKey("DocumentId")]
    [InverseProperty("Sections")]
    public virtual Document Document { get; set; } = null!;
}
