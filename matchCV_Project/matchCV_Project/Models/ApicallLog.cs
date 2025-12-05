using System;
using System.Collections.Generic;

namespace matchCV_Project.Models;

public partial class ApicallLog
{
    public int Id { get; set; }

    public string Provider { get; set; } = null!;

    public string Model { get; set; } = null!;

    public string Endpoint { get; set; } = null!;

    public int? TokensIn { get; set; }

    public int? TokensOut { get; set; }

    public double? CostEstimate { get; set; }

    public int? LatencyMs { get; set; }

    public string Status { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public string? TraceId { get; set; }
}
