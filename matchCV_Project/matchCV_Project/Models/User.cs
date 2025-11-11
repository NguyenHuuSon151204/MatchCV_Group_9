using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace matchCV_Project.Models;

[Index("Email", Name = "UQ__Users__A9D10534A0824C3B", IsUnique = true)]
public partial class User
{
    [Key]
    public int Id { get; set; }

    [StringLength(180)]
    public string DisplayName { get; set; } = null!;

    [StringLength(250)]
    public string Email { get; set; } = null!;

    [StringLength(100)]
    public string Role { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    [InverseProperty("Candidate")]
    public virtual ICollection<Application> Applications { get; set; } = new List<Application>();

    [InverseProperty("User")]
    public virtual ICollection<Document> Documents { get; set; } = new List<Document>();

    [InverseProperty("User")]
    public virtual ICollection<Job> Jobs { get; set; } = new List<Job>();

    [InverseProperty("AssignedUser")]
    public virtual ICollection<LicenseKey> LicenseKeys { get; set; } = new List<LicenseKey>();
}
