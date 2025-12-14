using System;
using System.Collections.Generic;

namespace matchCV_Project.Models;

public partial class LicenseKey
{
    public int Id { get; set; }

    public string KeyHash { get; set; } = null!;

    public string Plan { get; set; } = null!;

    public DateTime? Expiry { get; set; }

    public bool IsActive { get; set; }

    public int? AssignedUserId { get; set; }

    public DateTime CreatedAt { get; set; }

    public string? OriginalKey { get; set; }

    public virtual User? AssignedUser { get; set; }
}
