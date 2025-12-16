using matchCV_Project.Data;
using matchCV_Project.Models;
using matchCV_Project.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace matchCV_Project.Services
{
    public class LicenseService : ILicenseService
    {
        private readonly MatchCvContext _context;

        public LicenseService(MatchCvContext context)
        {
            _context = context;
        }

        public async Task<LicenseKey> CreateLicenseKeyAsync(int userId)
        {
            var key = GenerateRandomKey(12);

            var existingLicense = await _context.LicenseKeys
                .OrderByDescending(l => l.CreatedAt)
                .FirstOrDefaultAsync(l => l.AssignedUserId == userId);

            if (existingLicense != null)
            {
                // Update existing license
                existingLicense.Plan = "Pro";
                existingLicense.Expiry = DateTime.UtcNow.AddDays(30);

                await _context.SaveChangesAsync();
                return existingLicense;
            }

            // Create new license
            var license = new LicenseKey
            {
                KeyHash = key,
                Plan = "Pro",
                IsActive = true,
                AssignedUserId = userId,
                Expiry = DateTime.UtcNow.AddDays(30),
                CreatedAt = DateTime.UtcNow
            };

            _context.LicenseKeys.Add(license);
            await _context.SaveChangesAsync();

            return license;
        }

        public async Task<LicenseKey> GenerateLicenseAsync(string plan, int expiryDays, int? assignedUserId = null)
        {
            var key = GenerateRandomKey(16);
            var license = new LicenseKey
            {
                KeyHash = key,
                Plan = plan,
                IsActive = true,
                AssignedUserId = assignedUserId,
                Expiry = DateTime.UtcNow.AddDays(expiryDays),
                CreatedAt = DateTime.UtcNow
            };

            _context.LicenseKeys.Add(license);
            await _context.SaveChangesAsync();
            return license;
        }

        public async Task<bool> DeactivateAsync(int id)
        {
            var license = await _context.LicenseKeys.FindAsync(id);
            if (license == null) return false;
            license.IsActive = false;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<LicenseKey?> UpdateUserPlanAsync(int userId, string plan, int expiryDays)
        {
            var existing = await _context.LicenseKeys
                .OrderByDescending(l => l.CreatedAt)
                .FirstOrDefaultAsync(l => l.AssignedUserId == userId);

            if (existing == null)
            {
                return await GenerateLicenseAsync(plan, expiryDays, userId);
            }

            existing.Plan = plan;
            existing.IsActive = true;
            existing.Expiry = DateTime.UtcNow.AddDays(expiryDays);
            await _context.SaveChangesAsync();
            return existing;
        }

        public async Task<IEnumerable<LicenseKey>> GetAllAsync(string? search = null, string? status = null)
        {
            var query = _context.LicenseKeys.AsQueryable();
            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(l =>
                    l.Plan.Contains(search) ||
                    l.KeyHash.Contains(search));
            }

            if (!string.IsNullOrWhiteSpace(status))
            {
                if (status.Equals("active", StringComparison.OrdinalIgnoreCase))
                    query = query.Where(l => l.IsActive);
                else if (status.Equals("inactive", StringComparison.OrdinalIgnoreCase))
                    query = query.Where(l => !l.IsActive);
            }

            return await query
                .OrderByDescending(l => l.CreatedAt)
                .ToListAsync();
        }

        public async Task<LicenseKey?> GetLatestForUserAsync(int userId)
        {
            return await _context.LicenseKeys
                .Where(l => l.AssignedUserId == userId)
                .OrderByDescending(l => l.CreatedAt)
                .FirstOrDefaultAsync();
        }


        public async Task<string?> GetUserPlanAsync(int userId)
        {
            var licenses = await _context.LicenseKeys
                .Where(l => l.AssignedUserId == userId && l.IsActive)
                .OrderByDescending(l => l.CreatedAt)
                .ToListAsync();

            if (licenses.Count == 0)
                return "Free";

            var latest = licenses.First();

            // Expired → deactivate
            if (latest.Expiry <= DateTime.UtcNow)
            {
                latest.IsActive = false;
                await _context.SaveChangesAsync();
                return "Free";
            }

            return latest.Plan;
        }

        private static string GenerateRandomKey(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var bytes = RandomNumberGenerator.GetBytes(length);
            var result = new StringBuilder(length);

            foreach (var b in bytes)
            {
                result.Append(chars[b % chars.Length]);
            }

            return result.ToString();
        }
    }
}
