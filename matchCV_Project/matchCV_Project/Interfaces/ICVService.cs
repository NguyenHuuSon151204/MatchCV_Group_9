using ApiRestFul.DTOs;

namespace ApiRestFul.Services
{
    public interface ICVService
    {
        Task<SavedCVDto> SaveCVAsync(SaveCVRequestDto request);
        Task<List<CVHistoryItemDto>> GetCVHistoryAsync();
        Task<SavedCVDto?> GetCVByIdAsync(int id);
        Task<bool> DeleteCVAsync(int id);
        Task<SavedCVDto> UpdateCVAsync(int id, SaveCVRequestDto request);
    }
}
