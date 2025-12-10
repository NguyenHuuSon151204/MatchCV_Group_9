using System;
using System.Collections.Generic;

namespace matchCV_Project.Models;

public partial class User
{
    public int Id { get; set; }

    public string DisplayName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Role { get; set; } = null!;

    public string Password { get; set; } = null!;

    public bool Verified { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public virtual ICollection<Application> Applications { get; set; } = new List<Application>();

    public virtual ICollection<Document> Documents { get; set; } = new List<Document>();

    public virtual ICollection<EmailVerificationToken> EmailVerificationTokens { get; set; } = new List<EmailVerificationToken>();

    public virtual ICollection<Job> Jobs { get; set; } = new List<Job>();

    public virtual ICollection<LicenseKey> LicenseKeys { get; set; } = new List<LicenseKey>();

    public virtual ICollection<SavedCv> SavedCvs { get; set; } = new List<SavedCv>();

    public virtual ICollection<RecruiterVerification> RecruiterVerifications { get; set; } = new List<RecruiterVerification>();

    public virtual ICollection<RecruiterVerification> RecruiterVerificationsReviewed { get; set; } = new List<RecruiterVerification>();
}
