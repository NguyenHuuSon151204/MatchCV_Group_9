using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MatchCV_Project.Models;

namespace MatchCV_Project.Models;
    public partial class Ocrresult
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        // Other properties (e.g., CreatedAt, Content from scaffolded)
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        [Column(TypeName = "nvarchar(max)")]
        public string? Content { get; set; } // Example extracted text

        // FK
        public int? DocumentId { get; set; }

        // Fixed: One-to-one navigation (singular, no [InverseProperty] or change to "Ocrresult")
        [ForeignKey("DocumentId")]
        public virtual Document? Document { get; set; } // No [InverseProperty] or [InverseProperty("Ocrresult")]

        // If needed, add other navs
    }