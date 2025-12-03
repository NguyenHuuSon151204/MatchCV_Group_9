namespace matchCV_Project.Services;

public interface IGeminiService
{
    Task<string?> GenerateContentAsync(string prompt);
}