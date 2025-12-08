using System;
using System.Collections.Generic;

namespace matchCV_Project.Models;

public partial class Section
{
    public int Id { get; set; }

    public int DocumentId { get; set; }

    public string SectionType { get; set; } = null!;

    public int Ord { get; set; }

    public string? RawText { get; set; }

    public virtual ICollection<Bullet> Bullets { get; set; } = new List<Bullet>();

    public virtual Document Document { get; set; } = null!;
}
