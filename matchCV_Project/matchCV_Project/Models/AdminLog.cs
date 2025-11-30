using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace MatchCV_Project.Models;

[Index("CreatedAt", Name = "IX_AdminLogs_CreatedAt")]
public partial class AdminLog
{
    [Key]
    public int Id { get; set; }

    [StringLength(200)]
    public string Actor { get; set; } = null!;

    [StringLength(100)]
    public string Action { get; set; } = null!;

    [StringLength(100)]
    public string Entity { get; set; } = null!;

    public int? EntityId { get; set; }

    public string MetaJson { get; set; } = null!;

    public DateTime CreatedAt { get; set; }
}
