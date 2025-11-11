using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace matchCV_Project.Models;

[Table("Education")]
public partial class Education
{
    [Key]
    public int Id { get; set; }

    public int DocumentId { get; set; }

    [StringLength(150)]
    public string Degree { get; set; } = null!;

    [StringLength(150)]
    public string? FieldOfStudy { get; set; }

    [StringLength(200)]
    public string SchoolName { get; set; } = null!;

    public DateOnly? StartDate { get; set; }

    public DateOnly? EndDate { get; set; }

    public double? Score { get; set; }

    public string? Activities { get; set; }

    public string? Description { get; set; }

    [ForeignKey("DocumentId")]
    [InverseProperty("Educations")]
    public virtual Document Document { get; set; } = null!;
}
