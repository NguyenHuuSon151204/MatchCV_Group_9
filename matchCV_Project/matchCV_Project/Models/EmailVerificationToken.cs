using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace matchCV_Project.Models;

[Table("EmailVerificationTokens")]
public partial class EmailVerificationToken
{
    [Key]
    public int Id { get; set; }

    public int UserId { get; set; }

    [Required]
    [StringLength(500)]
    public string Token { get; set; } = null!;

    [Required]
    public DateTime ExpiresAt { get; set; }

    [ForeignKey("UserId")]
    [InverseProperty("EmailVerificationTokens")]
    public virtual User User { get; set; } = null!;
}
