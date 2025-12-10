using System;
using System.Collections.Generic;

namespace matchCV_Project.Models;

public partial class EmbeddingCache
{
    public int Id { get; set; }

    public string InputHash { get; set; } = null!;

    public string Model { get; set; } = null!;

    public int Dim { get; set; }

    public byte[] Vector { get; set; } = null!;

    public DateTime CreatedAt { get; set; }
}
