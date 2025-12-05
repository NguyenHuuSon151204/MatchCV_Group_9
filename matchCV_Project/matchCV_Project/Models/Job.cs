using System;
using System.Collections.Generic;

namespace matchCV_Project.Models;

public partial class Job
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public string Title { get; set; } = null!;

    public string Company { get; set; } = null!;

    public string? RawText { get; set; }

    public string? JobDescription { get; set; }

    public string Status { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public virtual ICollection<Application> Applications { get; set; } = new List<Application>();

    public virtual ICollection<MatchRun> MatchRuns { get; set; } = new List<MatchRun>();

    public virtual ICollection<RequiredSkill> RequiredSkills { get; set; } = new List<RequiredSkill>();

    public virtual User User { get; set; } = null!;
}
