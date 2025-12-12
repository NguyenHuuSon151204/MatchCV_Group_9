using matchCV_Project.Models;
using matchCV_Project.Models.Dtos;

namespace matchCV_Project.Interfaces
{
    public interface IAccountService
    {
        Task<(bool success, string? error)> RegisterAsync(RegisterRequestDto req, string baseUrl);
        Task<(bool success, string? error)> VerifyEmailAsync(int userId, string token);
        Task<(User? user, string? error)> LoginAsync(LoginRequestDto req);
        Task<User?> GetUserByIdAsync(int id);

        Task<User?> GetUserByEmailAsync(string email);

        Task<User> CreateGoogleUserAsync(string email, string name, string role);

        Task<bool> UserExistsAsync(string email);

        Task<(bool success, string? error)> ForgotPasswordAsync(string email, string baseUrl);

        Task<(bool success, string? error)> ResetPasswordAsync(string token, string newPassword);

        Task<(User? user, string? error)> UpdateProfileAsync(int userId, UpdateProfileRequestDto dto);

    }

}
