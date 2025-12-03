namespace matchCV_Project.Services;

public interface ITextExtractor
{
    bool CanExtract(string fileName);
    Task<string> ExtractAsync(Stream stream);
}