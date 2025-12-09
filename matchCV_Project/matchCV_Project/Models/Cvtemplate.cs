using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace matchCV_Project.Models;

[Table("CVTemplates")]
[Index("Key", Name = "UQ__CVTempla__C41E0289DE48762E", IsUnique = true)]
public partial class Cvtemplate
{
    [Key]
    public int Id { get; set; }

    [StringLength(50)]
    public string Key { get; set; } = null!;

    [StringLength(180)]
    public string Name { get; set; } = null!;

    [StringLength(300)]
    public string? Description { get; set; }

    [StringLength(50)]
    public string? Engine { get; set; }

    [StringLength(400)]
    public string? TemplatePath { get; set; }

    public bool IsActive { get; set; }

    public DateTime? CreatedAt { get; set; }

    [InverseProperty("Template")]
    public virtual ICollection<Export> Exports { get; set; } = new List<Export>();

    [InverseProperty("CvTemplate")]
    public virtual ICollection<Document> Documents { get; set; } = new List<Document>();
}
