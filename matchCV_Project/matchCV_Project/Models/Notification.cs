using System;
using System.Collections.Generic;

namespace matchCV_Project.Models;

public partial class Notification
{
    public int Id { get; set; }

    public string Role { get; set; } = null!;

    public int? UserId { get; set; }

    public string Title { get; set; } = null!;

    public string Message { get; set; } = null!;

    public string Category { get; set; } = null!;

    public bool IsRead { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual User? User { get; set; }
}
