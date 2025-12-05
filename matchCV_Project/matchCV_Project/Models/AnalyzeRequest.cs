using System.ComponentModel.DataAnnotations;

namespace matchCV_Project.Models;

public class AnalyzeRequest
{
    [Required(ErrorMessage = "CV file is required.")]
    public IFormFile CvFile { get; set; } = null!;

    [Required(ErrorMessage = "Job description is required.")]
    [MinLength(10, ErrorMessage = "Job description must be at least 10 characters.")]
    public string JobDescription { get; set; } = string.Empty;
}