using System;
using System.Collections.Generic;

namespace matchCV_Project.Models;

public partial class Experience
{
    public int Id { get; set; }

    public int DocumentId { get; set; }

    public string JobTitle { get; set; } = null!;

    public string CompanyName { get; set; } = null!;

    public string? IndustryName { get; set; }

    public DateOnly? StartDate { get; set; }

    public DateOnly? EndDate { get; set; }

    public bool CurrentlyWorking { get; set; }

    public string? Description { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual Document Document { get; set; } = null!;
}
