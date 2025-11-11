using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace matchCV_Project.Models;

public partial class Embedding
{
    [Key]
    public int Id { get; set; }

    public int Dim { get; set; }

    [StringLength(80)]
    public string Model { get; set; } = null!;

    public byte[] Vector { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    [InverseProperty("Embedding")]
    public virtual ICollection<EmbeddingOwnership> EmbeddingOwnerships { get; set; } = new List<EmbeddingOwnership>();
}
