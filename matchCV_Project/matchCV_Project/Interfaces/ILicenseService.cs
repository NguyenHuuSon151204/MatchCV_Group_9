using matchCV_Project.Models;

namespace matchCV_Project.Interfaces
{
    public interface ILicenseService
    {
        Task<LicenseKey> CreateLicenseKeyAsync(int userId);
        Task<string?> GetUserPlanAsync(int userId);
    }
}
