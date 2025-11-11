using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace matchCV_Project.Models;

public partial class Experience
{
    [Key]
    public int Id { get; set; }

    public int DocumentId { get; set; }

    [StringLength(200)]
    public string JobTitle { get; set; } = null!;

    [StringLength(200)]
    public string CompanyName { get; set; } = null!;

    [StringLength(150)]
    public string? IndustryName { get; set; }

    public DateOnly? StartDate { get; set; }

    public DateOnly? EndDate { get; set; }

    public bool CurrentlyWorking { get; set; }

    public string? Description { get; set; }

    [ForeignKey("DocumentId")]
    [InverseProperty("Experiences")]
    public virtual Document Document { get; set; } = null!;
}
