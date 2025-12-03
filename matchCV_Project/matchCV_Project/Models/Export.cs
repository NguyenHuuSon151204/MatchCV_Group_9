using System;
using System.Collections.Generic;

namespace matchCV_Project.Models;

public partial class Export
{
    public int Id { get; set; }

    public int DocumentId { get; set; }

    public int? TemplateId { get; set; }

    public string OutFormat { get; set; } = null!;

    public string OutputPath { get; set; } = null!;

    public string? Engine { get; set; }

    public DateTime CreatedAt { get; set; }

    public string Status { get; set; } = null!;

    public string? ErrorMsg { get; set; }

    public virtual Document Document { get; set; } = null!;

    public virtual Cvtemplate? Template { get; set; }
}
