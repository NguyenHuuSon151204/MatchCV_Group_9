using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace matchCV_Project.Models;

[Index("CandidateId", Name = "IX_Applications_CandidateId")]
[Index("JobId", Name = "IX_Applications_JobId")]
public partial class Application
{
    [Key]
    public int Id { get; set; }

    public int JobId { get; set; }

    public int DocumentId { get; set; }

    public int CandidateId { get; set; }

    [StringLength(30)]
    public string Status { get; set; } = null!;

    public double? ScoreSnapshot { get; set; }

    public string? Summary { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    [ForeignKey("CandidateId")]
    [InverseProperty("Applications")]
    public virtual User Candidate { get; set; } = null!;

    [ForeignKey("DocumentId")]
    [InverseProperty("Applications")]
    public virtual Document Document { get; set; } = null!;

    [ForeignKey("JobId")]
    [InverseProperty("Applications")]
    public virtual Job Job { get; set; } = null!;
}
