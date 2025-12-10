using System;
using System.Collections.Generic;

namespace matchCV_Project.Models;

public partial class Application
{
    public int Id { get; set; }

    public int JobId { get; set; }

    public int DocumentId { get; set; }

    public int CandidateId { get; set; }

    public string Status { get; set; } = null!;

    public double? ScoreSnapshot { get; set; }

    public string? Summary { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual User Candidate { get; set; } = null!;

    public virtual Document Document { get; set; } = null!;

    public virtual Job Job { get; set; } = null!;
}
