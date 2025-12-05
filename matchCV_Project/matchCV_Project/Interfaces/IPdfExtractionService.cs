namespace matchCV_Project.Interfaces;

public interface IPdfExtractionService
{
    Task<string> ExtractTextFromPdfAsync(string filePath);
    Task<string> ExtractTextFromPdfAsync(byte[] pdfBytes);
    Task<Dictionary<string, object>> ExtractStructuredDataAsync(string filePath);
    Task<Dictionary<string, object>> ExtractStructuredDataAsync(byte[] pdfBytes);
}

