using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace matchCV_Project.Models;

public partial class Bullet
{
    [Key]
    public int Id { get; set; }

    public int SectionId { get; set; }

    public int Ord { get; set; }

    public string Text { get; set; } = null!;

    [ForeignKey("SectionId")]
    [InverseProperty("Bullets")]
    public virtual Section Section { get; set; } = null!;
}
