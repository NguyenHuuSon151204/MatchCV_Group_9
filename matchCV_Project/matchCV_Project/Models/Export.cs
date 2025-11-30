using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using MatchCV_Project.Models;

namespace MatchCV_Project.Models;

public partial class Export
{
    [Key]
    public int Id { get; set; }

    public int DocumentId { get; set; }

    public int? TemplateId { get; set; }

    [StringLength(30)]
    public string OutFormat { get; set; } = null!;

    [StringLength(400)]
    public string OutputPath { get; set; } = null!;

    [StringLength(50)]
    public string? Engine { get; set; }

    public DateTime CreatedAt { get; set; }

    [StringLength(30)]
    public string Status { get; set; } = null!;

    [StringLength(200)]
    public string? ErrorMsg { get; set; }

    [ForeignKey("DocumentId")]
    [InverseProperty("Exports")]
    public virtual Document Document { get; set; } = null!;

    [ForeignKey("TemplateId")]
    [InverseProperty("Exports")]
    public virtual CvTemplate? Template { get; set; }
}
