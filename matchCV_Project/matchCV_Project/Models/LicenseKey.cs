using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace matchCV_Project.Models;

[Index("KeyHash", Name = "UQ__LicenseK__BA9770BB1A65B0E4", IsUnique = true)]
public partial class LicenseKey
{
    [Key]
    public int Id { get; set; }

    [StringLength(200)]
    public string KeyHash { get; set; } = null!;

    [StringLength(50)]
    public string? OriginalKey { get; set; }

    [StringLength(30)]
    public string Plan { get; set; } = null!;

    public DateTime? Expiry { get; set; }

    public bool IsActive { get; set; }

    public int? AssignedUserId { get; set; }

    public DateTime CreatedAt { get; set; }

    [ForeignKey("AssignedUserId")]
    [InverseProperty("LicenseKeys")]
    public virtual User? AssignedUser { get; set; }
}
