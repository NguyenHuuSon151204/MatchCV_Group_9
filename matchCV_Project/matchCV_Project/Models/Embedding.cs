using System;
using System.Collections.Generic;

namespace matchCV_Project.Models;

public partial class Embedding
{
    public int Id { get; set; }

    public int Dim { get; set; }

    public string Model { get; set; } = null!;

    public byte[] Vector { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public virtual ICollection<EmbeddingOwnership> EmbeddingOwnerships { get; set; } = new List<EmbeddingOwnership>();
}
