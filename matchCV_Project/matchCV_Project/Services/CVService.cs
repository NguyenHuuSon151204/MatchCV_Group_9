using ApiRestFul.DTOs;
using ApiRestFul.Services;
using matchCV_Project.Data;
using matchCV_Project.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace matchCV_Project.Services
{
    public class CVService : ICVService
    {
        private readonly MatchCvContext _context;

        public CVService(MatchCvContext context)
        {
            _context = context;
        }

        public async Task<SavedCVDto> SaveCVAsync(SaveCVRequestDto request)
        {
            SavedCv savedCv;

            if (request.Id > 0)
            {
                // Update existing CV
                savedCv = await _context.SavedCvs.FindAsync(request.Id);
                if (savedCv == null)
                {
                    throw new KeyNotFoundException($"CV with ID {request.Id} not found");
                }

                savedCv.Title = request.Title;
                savedCv.TemplateType = request.TemplateType;
                savedCv.CvdataJson = JsonSerializer.Serialize(request.CVData);
                savedCv.UpdatedAt = DateTime.Now;
            }
            else
            {
                // Create new CV
                savedCv = new SavedCv
                {
                    Title = request.Title,
                    TemplateType = request.TemplateType,
                    CvdataJson = JsonSerializer.Serialize(request.CVData),
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                };

                _context.SavedCvs.Add(savedCv);
            }

            await _context.SaveChangesAsync();

            return new SavedCVDto
            {
                Id = savedCv.Id,
                Title = savedCv.Title,
                TemplateType = savedCv.TemplateType,
                CVData = JsonSerializer.Deserialize<CVDataDto>(savedCv.CvdataJson),
                CreatedAt = savedCv.CreatedAt,
                UpdatedAt = savedCv.UpdatedAt
            };
        }

        public async Task<List<CVHistoryItemDto>> GetCVHistoryAsync()
        {
            var cvs = await _context.SavedCvs
                .OrderByDescending(cv => cv.UpdatedAt)
                .Select(cv => new CVHistoryItemDto
                {
                    Id = cv.Id,
                    Title = cv.Title,
                    TemplateType = cv.TemplateType,
                    CreatedAt = cv.CreatedAt,
                    UpdatedAt = cv.UpdatedAt
                })
                .ToListAsync();

            return cvs;
        }

        public async Task<SavedCVDto?> GetCVByIdAsync(int id)
        {
            var savedCv = await _context.SavedCvs.FindAsync(id);
            
            if (savedCv == null)
            {
                return null;
            }

            return new SavedCVDto
            {
                Id = savedCv.Id,
                Title = savedCv.Title,
                TemplateType = savedCv.TemplateType,
                CVData = JsonSerializer.Deserialize<CVDataDto>(savedCv.CvdataJson),
                CreatedAt = savedCv.CreatedAt,
                UpdatedAt = savedCv.UpdatedAt
            };
        }

        public async Task<bool> DeleteCVAsync(int id)
        {
            var savedCv = await _context.SavedCvs.FindAsync(id);
            
            if (savedCv == null)
            {
                return false;
            }

            _context.SavedCvs.Remove(savedCv);
            await _context.SaveChangesAsync();
            
            return true;
        }

        public async Task<SavedCVDto> UpdateCVAsync(int id, SaveCVRequestDto request)
        {
            request.Id = id;
            return await SaveCVAsync(request);
        }
    }
}
