using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace matchCV_Project.Models;

[Index("UserId", Name = "IX_Jobs_UserId")]
public partial class Job
{
    [Key]
    public int Id { get; set; }

    public int UserId { get; set; }

    [StringLength(200)]
    public string Title { get; set; } = null!;

    [StringLength(150)]
    public string Company { get; set; } = null!;

    public string? RawText { get; set; }

    public DateTime CreatedAt { get; set; }

    public string? MustHaveCheck { get; set; }

    [InverseProperty("Job")]
    public virtual ICollection<Application> Applications { get; set; } = new List<Application>();

    [InverseProperty("Job")]
    public virtual ICollection<MatchRun> MatchRuns { get; set; } = new List<MatchRun>();

    [InverseProperty("Job")]
    public virtual ICollection<RequiredSkill> RequiredSkills { get; set; } = new List<RequiredSkill>();

    [ForeignKey("UserId")]
    [InverseProperty("Jobs")]
    public virtual User User { get; set; } = null!;
}
