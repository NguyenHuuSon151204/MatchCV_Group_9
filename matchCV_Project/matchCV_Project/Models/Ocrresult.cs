using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace matchCV_Project.Models;

[Table("OCRResults")]
public partial class Ocrresult
{
    [Key]
    public int Id { get; set; }

    public int DocumentId { get; set; }

    [StringLength(50)]
    public string Engine { get; set; } = null!;

    public double? AvgConfidence { get; set; }

    public string? TextBlob { get; set; }

    public DateTime CreatedAt { get; set; }

    [ForeignKey("DocumentId")]
    [InverseProperty("Ocrresults")]
    public virtual Document Document { get; set; } = null!;
}
