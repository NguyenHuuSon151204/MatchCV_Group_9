using System;
using System.Collections.Generic;

namespace matchCV_Project.Models;

public partial class Ocrresult
{
    public int Id { get; set; }

    public int DocumentId { get; set; }

    public string Engine { get; set; } = null!;

    public double? AvgConfidence { get; set; }

    public string? TextBlob { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual Document Document { get; set; } = null!;
}
