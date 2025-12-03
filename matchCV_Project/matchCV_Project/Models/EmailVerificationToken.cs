using System;
using System.Collections.Generic;

namespace matchCV_Project.Models;

public partial class EmailVerificationToken
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public string Token { get; set; } = null!;

    public DateTime ExpiresAt { get; set; }

    public virtual User User { get; set; } = null!;
}
