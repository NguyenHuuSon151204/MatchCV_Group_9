using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace matchCV_Project.Models;

[Index("RecruiterId", Name = "IX_RecruiterVerification_RecruiterId")]
[Index("Status", Name = "IX_RecruiterVerification_Status")]
[Index("CreatedAt", Name = "IX_RecruiterVerification_CreatedAt")]
public partial class RecruiterVerification
{
    [Key]
    public int Id { get; set; }

    public int RecruiterId { get; set; }

    [StringLength(200)]
    public string CompanyName { get; set; } = null!;

    [StringLength(250)]
    public string CompanyEmail { get; set; } = null!;

    [StringLength(50)]
    public string? CompanyPhone { get; set; }

    [StringLength(200)]
    public string? CompanyAddress { get; set; }

    [StringLength(50)]
    public string? TaxCode { get; set; }

    // Document IDs for uploaded files
    public int? BusinessLicenseDocumentId { get; set; }

    public int? CompanyProofDocumentId { get; set; }

    [StringLength(30)]
    public string Status { get; set; } = "Pending"; // Pending, Approved, Rejected

    [StringLength(500)]
    public string? AdminNotes { get; set; }

    public int? ReviewedByAdminId { get; set; }

    public DateTime? ReviewedAt { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    // Navigation properties
    [ForeignKey("RecruiterId")]
    [InverseProperty("RecruiterVerifications")]
    public virtual User Recruiter { get; set; } = null!;

    [ForeignKey("BusinessLicenseDocumentId")]
    [InverseProperty("RecruiterVerificationsAsBusinessLicense")]
    public virtual Document? BusinessLicenseDocument { get; set; }

    [ForeignKey("CompanyProofDocumentId")]
    [InverseProperty("RecruiterVerificationsAsCompanyProof")]
    public virtual Document? CompanyProofDocument { get; set; }

    [ForeignKey("ReviewedByAdminId")]
    [InverseProperty("RecruiterVerificationsReviewed")]
    public virtual User? ReviewedByAdmin { get; set; }
}

