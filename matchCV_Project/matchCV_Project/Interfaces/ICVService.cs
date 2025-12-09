using ApiRestFul.DTOs;

namespace matchCV_Project.Interfaces
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
