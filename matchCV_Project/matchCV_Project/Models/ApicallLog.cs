using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace matchCV_Project.Models;

[Table("APICallLogs")]
public partial class ApicallLog
{
    [Key]
    public int Id { get; set; }

    [StringLength(50)]
    public string Provider { get; set; } = null!;

    [StringLength(80)]
    public string Model { get; set; } = null!;

    [StringLength(180)]
    public string Endpoint { get; set; } = null!;

    public int? TokensIn { get; set; }

    public int? TokensOut { get; set; }

    public double? CostEstimate { get; set; }

    public int? LatencyMs { get; set; }

    [StringLength(30)]
    public string Status { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    [StringLength(180)]
    public string? TraceId { get; set; }
}
