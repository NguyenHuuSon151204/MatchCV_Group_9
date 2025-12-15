using System;
using System.Collections.Generic;

namespace matchCV_Project.Models;

public partial class User
{
    public int Id { get; set; }

    public string DisplayName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Role { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public string Password { get; set; } = null!;

    public bool Verified { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public string? Headline { get; set; }

    public string? Bio { get; set; }

    public virtual ICollection<Application> Applications { get; set; } = new List<Application>();

    public virtual ICollection<Document> Documents { get; set; } = new List<Document>();

    public virtual ICollection<Job> Jobs { get; set; } = new List<Job>();

    public virtual ICollection<LicenseKey> LicenseKeys { get; set; } = new List<LicenseKey>();

    public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();

    public virtual ICollection<RecruiterVerification> RecruiterVerificationRecruiters { get; set; } = new List<RecruiterVerification>();

    public virtual ICollection<RecruiterVerification> RecruiterVerificationReviewedByAdmins { get; set; } = new List<RecruiterVerification>();

    public virtual ICollection<SavedCv> SavedCvs { get; set; } = new List<SavedCv>();
}
