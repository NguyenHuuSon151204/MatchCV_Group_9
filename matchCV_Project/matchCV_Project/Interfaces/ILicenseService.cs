using matchCV_Project.Models;

namespace matchCV_Project.Interfaces
{
    public interface ILicenseService
    {
        Task<LicenseKey> CreateLicenseKeyAsync(int userId);
        Task<string?> GetUserPlanAsync(int userId);
        Task<LicenseKey> GenerateLicenseAsync(string plan, int expiryDays, int? assignedUserId = null);
        Task<bool> DeactivateAsync(int id);
        Task<LicenseKey?> UpdateUserPlanAsync(int userId, string plan, int expiryDays);
        Task<IEnumerable<LicenseKey>> GetAllAsync(string? search = null, string? status = null);
        Task<LicenseKey?> GetLatestForUserAsync(int userId);
    }
}
