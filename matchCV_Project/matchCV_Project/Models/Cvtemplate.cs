using System;
using System.Collections.Generic;

namespace matchCV_Project.Models;

public partial class Cvtemplate
{
    public int Id { get; set; }

    public string Key { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public string? Engine { get; set; }

    public string? TemplatePath { get; set; }

    public bool IsActive { get; set; }

    public string? ThumbnailUrl { get; set; }

    public string? PreviewImageUrl { get; set; }

    public string? ProfileImageUrl { get; set; }

    public string? FullName { get; set; }

    public string? Email { get; set; }

    public string? Phone { get; set; }

    public string? Address { get; set; }

    public string? Cvdata { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual ICollection<Document> Documents { get; set; } = new List<Document>();

    public virtual ICollection<Export> Exports { get; set; } = new List<Export>();
}
