using System.IO;
using UglyToad.PdfPig;

namespace matchCV_Project.Services;

public class PdfTextExtractor : ITextExtractor
{
    public bool CanExtract(string fileName)
    {
        var ext = Path.GetExtension(fileName);
        return string.Equals(ext, ".pdf", StringComparison.OrdinalIgnoreCase);
    }

    public async Task<string> ExtractAsync(Stream stream)
    {
        var text = new System.Text.StringBuilder();
        using var pdf = PdfDocument.Open(stream);
        foreach (var page in pdf.GetPages())
            text.AppendLine(page.Text);
        return text.ToString();
    }
}