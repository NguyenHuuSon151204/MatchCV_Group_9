using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace matchCV_Project.Models;

[Table("EmbeddingOwnership")]
public partial class EmbeddingOwnership
{
    [Key]
    public int Id { get; set; }

    public int EmbeddingId { get; set; }

    [StringLength(30)]
    public string OwnerType { get; set; } = null!;

    public int OwnerId { get; set; }

    [ForeignKey("EmbeddingId")]
    [InverseProperty("EmbeddingOwnerships")]
    public virtual Embedding Embedding { get; set; } = null!;
}
