using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace MatchCV_Project.Models
{
    [Table("CVTemplates")]
    [Index("Key", Name = "UQ__CVTempla__C41E0289DE48762E", IsUnique = true)]
    public partial class CvTemplate
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Key { get; set; } = string.Empty;

        [Required]
        [StringLength(180)]
        public string Name { get; set; } = string.Empty;

        [StringLength(300)]
        public string? Description { get; set; }

        [StringLength(50)]
        public string? Engine { get; set; } = "razor";

        [StringLength(400)]
        public string TemplatePath { get; set; } = string.Empty;

        public bool IsActive { get; set; } = true;

        [StringLength(500)]
        public string? ThumbnailUrl { get; set; }

        [StringLength(500)]
        public string? PreviewImageUrl { get; set; }

        [NotMapped]
        public IFormFile? ThumbnailImage { get; set; }

        [NotMapped]
        public IFormFile? PreviewImage { get; set; }

        [StringLength(500)]
        public string? ProfileImageUrl { get; set; }

        [NotMapped]
        public IFormFile? ProfileImage { get; set; }

        [StringLength(100)]
        public string? FullName { get; set; }

        [StringLength(100)]
        public string? Email { get; set; }

        [StringLength(20)]
        public string? Phone { get; set; }

        [StringLength(500)]
        public string? Address { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string? CVData { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        [InverseProperty("Template")]
        public virtual ICollection<Export> Exports { get; set; } = new List<Export>();

        [InverseProperty("CvTemplate")]
        public virtual ICollection<Document> Documents { get; set; } = new List<Document>();

        public void UpdateTimestamps()
        {
            UpdatedAt = DateTime.UtcNow;
            if (CreatedAt == default)
            {
                CreatedAt = DateTime.UtcNow;
            }
        }

        public Dictionary<string, object> GetCVData()
        {
            if (string.IsNullOrEmpty(CVData))
                return new Dictionary<string, object>();
            try
            {
                return JsonSerializer.Deserialize<Dictionary<string, object>>(CVData)
                    ?? new Dictionary<string, object>();
            }
            catch
            {
                return new Dictionary<string, object>();
            }
        }

        public void SetCVData(Dictionary<string, object> data)
        {
            CVData = JsonSerializer.Serialize(data);
        }
    }
}