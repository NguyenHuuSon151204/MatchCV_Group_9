using System;
using System.Collections.Generic;

namespace matchCV_Project.Models;

public partial class AdminLog
{
    public int Id { get; set; }

    public string Actor { get; set; } = null!;

    public string Action { get; set; } = null!;

    public string Entity { get; set; } = null!;

    public int? EntityId { get; set; }

    public string MetaJson { get; set; } = null!;

    public DateTime CreatedAt { get; set; }
}
