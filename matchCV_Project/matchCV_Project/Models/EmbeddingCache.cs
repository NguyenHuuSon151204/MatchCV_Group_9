using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace MatchCV_Project.Models;

[Table("EmbeddingCache")]
[Index("InputHash", Name = "UQ__Embeddin__FA2801486D3246D8", IsUnique = true)]
public partial class EmbeddingCache
{
    [Key]
    public int Id { get; set; }

    [StringLength(128)]
    public string InputHash { get; set; } = null!;

    [StringLength(80)]
    public string Model { get; set; } = null!;

    public int Dim { get; set; }

    public byte[] Vector { get; set; } = null!;

    public DateTime CreatedAt { get; set; }
}
