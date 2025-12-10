using System;
using System.Collections.Generic;

namespace matchCV_Project.Models;

public partial class Education
{
    public int Id { get; set; }

    public int DocumentId { get; set; }

    public string Degree { get; set; } = null!;

    public string? FieldOfStudy { get; set; }

    public string SchoolName { get; set; } = null!;

    public DateOnly? StartDate { get; set; }

    public DateOnly? EndDate { get; set; }

    public double? Score { get; set; }

    public string? Activities { get; set; }

    public string? Description { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual Document Document { get; set; } = null!;
}
