using System;
using System.Collections.Generic;

namespace matchCV_Project.Models;

public partial class EmbeddingOwnership
{
    public int Id { get; set; }

    public int EmbeddingId { get; set; }

    public string OwnerType { get; set; } = null!;

    public int OwnerId { get; set; }

    public virtual Embedding Embedding { get; set; } = null!;
}
