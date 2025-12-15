using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace matchCV_Project.Models;

[Index("UserId", Name = "IX_Notifications_UserId")]
[Index("Role", Name = "IX_Notifications_Role")]
[Index("CreatedAt", Name = "IX_Notifications_CreatedAt")]
public class Notification
{
    [Key]
    public int Id { get; set; }

    [StringLength(50)]
    public string Role { get; set; } = "Candidate"; // Candidate | Recruiter | Admin

    public int? UserId { get; set; }

    [StringLength(200)]
    public string Title { get; set; } = string.Empty;

    [StringLength(500)]
    public string Message { get; set; } = string.Empty;

    [StringLength(20)]
    public string Category { get; set; } = "info"; // info, success, warning, error

    public bool IsRead { get; set; } = false;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [ForeignKey("UserId")]
    [InverseProperty("Notifications")]
    public virtual User? User { get; set; }
}

