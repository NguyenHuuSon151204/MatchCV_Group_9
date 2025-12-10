using System;
using System.Collections.Generic;

namespace matchCV_Project.Models;

public partial class SavedCv
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public string TemplateType { get; set; } = null!;

    public string CvdataJson { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public int? UserId { get; set; }

    public virtual User? User { get; set; }
}
