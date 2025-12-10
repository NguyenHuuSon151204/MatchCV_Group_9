using System.IO;
using DocumentFormat.OpenXml.Packaging;

namespace matchCV_Project.Services;

public class DocxTextExtractor : ITextExtractor
{
    public bool CanExtract(string fileName)
    {
        var ext = Path.GetExtension(fileName);
        return string.Equals(ext, ".docx", StringComparison.OrdinalIgnoreCase);
    }

    public async Task<string> ExtractAsync(Stream stream)
    {
        using var doc = WordprocessingDocument.Open(stream, false);
        return doc?.MainDocumentPart?.Document?.Body?.InnerText ?? string.Empty;
    }
}