using System;
using System.Collections.Generic;

namespace matchCV_Project.Models;

public partial class Bullet
{
    public int Id { get; set; }

    public int SectionId { get; set; }

    public int Ord { get; set; }

    public string Text { get; set; } = null!;

    public virtual ICollection<RewriteSuggestion> RewriteSuggestions { get; set; } = new List<RewriteSuggestion>();

    public virtual Section Section { get; set; } = null!;
}
