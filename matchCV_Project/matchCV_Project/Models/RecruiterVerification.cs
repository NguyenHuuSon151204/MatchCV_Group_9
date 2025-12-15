using System;
using System.Collections.Generic;

namespace matchCV_Project.Models;

public partial class RecruiterVerification
{
    public int Id { get; set; }

    public int RecruiterId { get; set; }

    public string CompanyName { get; set; } = null!;

    public string CompanyEmail { get; set; } = null!;

    public string? CompanyPhone { get; set; }

    public string? CompanyAddress { get; set; }

    public string? TaxCode { get; set; }

    public int? BusinessLicenseDocumentId { get; set; }

    public int? CompanyProofDocumentId { get; set; }

    public string Status { get; set; } = null!;

    public string? AdminNotes { get; set; }

    public int? ReviewedByAdminId { get; set; }

    public DateTime? ReviewedAt { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual Document? BusinessLicenseDocument { get; set; }

    public virtual Document? CompanyProofDocument { get; set; }

    public virtual User Recruiter { get; set; } = null!;

    public virtual User? ReviewedByAdmin { get; set; }
}
