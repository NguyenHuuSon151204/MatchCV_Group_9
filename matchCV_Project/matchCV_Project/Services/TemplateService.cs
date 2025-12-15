using ApiRestFul.DTOs;
using ApiRestFul.Services;
using matchCV_Project.Models;
using iText.Html2pdf;
using System.Text;
using matchCV_Project.Data;
using Microsoft.EntityFrameworkCore;

namespace matchCV_Project.Services
{
    public class TemplateService : ITemplateService
    {
        private readonly MatchCvContext _context;

        public TemplateService(MatchCvContext context)
        {
            _context = context;
        }

        public async Task<List<CVTemplateDto>> GetAvailableTemplatesAsync()
        {
            var templates = await _context.Cvtemplates
                .Where(t => t.IsActive)
                .OrderBy(t => t.CreatedAt)
                .ToListAsync();

            return templates.Select(t => new CVTemplateDto
            {
                Id = t.Id,
                Key = t.Key,
                Name = t.Name,
                Description = t.Description,
                ThumbnailUrl = t.ThumbnailUrl,
                TemplateType = t.Key
            }).ToList();
        }

        public async Task<byte[]> ExportToPdfAsync(CVDataDto cvData)
        {
            var htmlContent = GenerateHtmlContent(cvData);

            using (var memoryStream = new MemoryStream())
            {
                HtmlConverter.ConvertToPdf(htmlContent, memoryStream);
                return memoryStream.ToArray();
            }
        }

        public async Task<byte[]> GenerateCVPreviewAsync(CVDataDto cvData)
        {
            var htmlContent = GenerateHtmlContent(cvData);
            return Encoding.UTF8.GetBytes(htmlContent);
        }

        private string GenerateHtmlContent(CVDataDto cvData)
        {
            var sb = new StringBuilder();
            var templateType = cvData.TemplateType?.ToLower() ?? "professional";

            sb.AppendLine("<!DOCTYPE html>");
            sb.AppendLine("<html>");
            sb.AppendLine("<head>");
            sb.AppendLine("    <meta charset='UTF-8'>");
            sb.AppendLine("    <link href='https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Inter:wght@400;500;600;700&display=swap' rel='stylesheet'>");
            sb.AppendLine("    <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>");
            sb.AppendLine("    <style>");

            if (templateType == "modern")
                sb.AppendLine(GetModernStyles());
            else if (templateType == "formal")
                sb.AppendLine(GetFormalStyles());
            else
                sb.AppendLine(GetProfessionalStyles());

            sb.AppendLine("    </style>");
            sb.AppendLine("</head>");
            sb.AppendLine("<body>");

            if (templateType == "modern")
                sb.AppendLine(GenerateModernTemplate(cvData));
            else if (templateType == "formal")
               sb.AppendLine(GenerateFormalTemplate(cvData));
            else
                sb.AppendLine(GenerateProfessionalTemplate(cvData));

            sb.AppendLine("</body>");
            sb.AppendLine("</html>");

            return sb.ToString();
        }

        // =================== PROFESSIONAL TEMPLATE ===================
        private string GetProfessionalStyles()
        {
            return @"
                body { margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; background: #f5f5f5; }
                * { box-sizing: border-box; }
                .professional-cv-container {
                    max-width: 900px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    border-radius: 8px;
                    overflow: hidden;
                    display: flex;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .professional-sidebar {
                    width: 33%;
                    background-color: #f9fafb;
                    padding: 30px 20px;
                    color: #4b5563;
                    border-right: 1px solid #e5e7eb;
                }
                .avatar-container {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 30px;
                }
                .avatar {
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 4px solid #fff;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .section-title-sm {
                    font-size: 16px;
                    font-weight: 700;
                    color: #1f2937;
                    margin-bottom: 10px;
                    border-bottom: 2px solid #dc2626;
                    padding-bottom: 4px;
                    text-transform: uppercase;
                }
                .contact-list {
                    list-style: none;
                    margin-top: 15px;
                    padding: 0;
                }
                .contact-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 15px;
                    font-size: 13px;
                }
                .contact-icon {
                    color: #dc2626;
                    margin-right: 10px;
                    font-size: 18px;
                    min-width: 24px;
                }
                .skill-list {
                    list-style: none;
                    margin-top: 15px;
                    padding: 0;
                }
                .skill-item {
                    margin-bottom: 15px;
                }
                .skill-name {
                    font-weight: 600;
                    color: #1f2937;
                    display: block;
                }
                .skill-level {
                    font-size: 13px;
                    color: #6b7280;
                }
                .professional-main-content {
                    width: 67%;
                    padding: 30px;
                    background-color: #fff;
                }
                .header-section {
                    border-bottom: 1px solid #e5e7eb;
                    padding-bottom: 20px;
                    margin-bottom: 30px;
                }
                .name {
                    font-size: 32px;
                    font-weight: 700;
                    color: #dc2626;
                    line-height: 1.2;
                    margin-bottom: 5px;
                }
                .job-title-main {
                    font-size: 18px;
                    font-weight: 500;
                    color: #4b5563;
                }
                .section-title-lg {
                    font-size: 18px;
                    font-weight: 700;
                    color: #1f2937;
                    margin-bottom: 20px;
                    border-bottom: 2px solid #dc2626;
                    padding-bottom: 5px;
                    text-transform: uppercase;
                    margin-top: 30px;
                }
                .summary-text {
                    color: #4b5563;
                    text-align: justify;
                    font-size: 14px;
                }
                .timeline-item {
                    display: flex;
                    margin-bottom: 25px;
                    position: relative;
                }
                .timeline-left {
                    width: 25%;
                    font-size: 13px;
                    color: #6b7280;
                    padding-right: 10px;
                    font-weight: 500;
                }
                .timeline-right {
                    width: 75%;
                }
                .timeline-title {
                    font-size: 16px;
                    font-weight: 600;
                    color: #1f2937;
                    margin-bottom: 4px;
                }
                .timeline-subtitle {
                    font-size: 14px;
                    font-weight: 500;
                    color: #4b5563;
                    margin-bottom: 6px;
                    font-style: italic;
                }
                .timeline-desc {
                    font-size: 14px;
                    color: #4b5563;
                    text-align: justify;
                }
            ";
        }

        private string GenerateProfessionalTemplate(CVDataDto cvData)
        {
            var sb = new StringBuilder();
            var defaultName = "Họ và Tên";
            var defaultPosition = "Vị trí ứng tuyển";

            sb.AppendLine("<div class='professional-cv-container'>");
            
            // Sidebar
            sb.AppendLine("  <div class='professional-sidebar'>");
            
            // Avatar
            if (!string.IsNullOrEmpty(cvData.PersonalInfo?.AvatarBase64))
            {
                sb.AppendLine("    <div class='avatar-container'>");
                sb.AppendLine($"      <img src='data:image/png;base64,{cvData.PersonalInfo.AvatarBase64}' class='avatar' alt='Avatar' />");
                sb.AppendLine("    </div>");
            }
            
            // Contact
            sb.AppendLine("    <div class='section'>");
            sb.AppendLine("      <h2 class='section-title-sm'>Thông tin liên hệ</h2>");
            sb.AppendLine("      <ul class='contact-list'>");
            
            if (!string.IsNullOrEmpty(cvData.PersonalInfo?.Email))
            {
                sb.AppendLine("        <li class='contact-item'>");
                sb.AppendLine("          <span class='material-icons contact-icon'>email</span>");
                sb.AppendLine($"          <span>{System.Net.WebUtility.HtmlEncode(cvData.PersonalInfo.Email)}</span>");
                sb.AppendLine("        </li>");
            }
            
            if (!string.IsNullOrEmpty(cvData.PersonalInfo?.Phone))
            {
                sb.AppendLine("        <li class='contact-item'>");
                sb.AppendLine("          <span class='material-icons contact-icon'>phone</span>");
                sb.AppendLine($"          <span>{System.Net.WebUtility.HtmlEncode(cvData.PersonalInfo.Phone)}</span>");
                sb.AppendLine("        </li>");
            }
            
            if (!string.IsNullOrEmpty(cvData.PersonalInfo?.Address))
            {
                sb.AppendLine("        <li class='contact-item'>");
                sb.AppendLine("          <span class='material-icons contact-icon'>home</span>");
                sb.AppendLine($"          <span>{System.Net.WebUtility.HtmlEncode(cvData.PersonalInfo.Address)}</span>");
                sb.AppendLine("        </li>");
            }
            
            sb.AppendLine("      </ul>");
            sb.AppendLine("    </div>");
            
            // Skills
            if (cvData.Skills?.Count > 0)
            {
                sb.AppendLine("    <div class='section' style='margin-top: 30px;'>");
                sb.AppendLine("      <h2 class='section-title-sm'>Kỹ năng</h2>");
                sb.AppendLine("      <ul class='skill-list'>");
                
                foreach (var skill in cvData.Skills)
                {
                    sb.AppendLine("        <li class='skill-item'>");
                    sb.AppendLine($"          <span class='skill-name'>{System.Net.WebUtility.HtmlEncode(skill.Name)}</span>");
                    if (!string.IsNullOrEmpty(skill.Level))
                    {
                        sb.AppendLine($"          <span class='skill-level'>{System.Net.WebUtility.HtmlEncode(skill.Level)}</span>");
                    }
                    sb.AppendLine("        </li>");
                }
                
                sb.AppendLine("      </ul>");
                sb.AppendLine("    </div>");
            }
            
            sb.AppendLine("  </div>");
            
            // Main Content
            sb.AppendLine("  <div class='professional-main-content'>");
            
            // Header
            sb.AppendLine("    <div class='header-section'>");
            sb.AppendLine($"      <h1 class='name'>{System.Net.WebUtility.HtmlEncode(cvData.PersonalInfo?.FullName ?? defaultName)}</h1>");
            var jobTitle = cvData.Experiences?.FirstOrDefault()?.Position ?? defaultPosition;
            sb.AppendLine($"      <div class='job-title-main'>{System.Net.WebUtility.HtmlEncode(jobTitle)}</div>");
            sb.AppendLine("    </div>");
            
            // Summary
            if (!string.IsNullOrEmpty(cvData.PersonalInfo?.Summary))
            {
                sb.AppendLine("    <div class='section'>");
                sb.AppendLine("      <h2 class='section-title-lg'>Tóm tắt</h2>");
                sb.AppendLine($"      <p class='summary-text'>{System.Net.WebUtility.HtmlEncode(cvData.PersonalInfo.Summary)}</p>");
                sb.AppendLine("    </div>");
            }
            
            // Experience
            if (cvData.Experiences?.Count > 0)
            {
                sb.AppendLine("    <div class='section'>");
                sb.AppendLine("      <h2 class='section-title-lg'>Kinh nghiệm làm việc</h2>");
                
                foreach (var exp in cvData.Experiences)
                {
                    sb.AppendLine("      <div class='timeline-item'>");
                    sb.AppendLine("        <div class='timeline-left'>");
                    sb.AppendLine($"          {(exp.StartDate.HasValue ? exp.StartDate.Value.ToString("MM/yyyy") : "")} - {(exp.EndDate.HasValue ? exp.EndDate.Value.ToString("MM/yyyy") : "Hiện tại")}");
                    sb.AppendLine("        </div>");
                    sb.AppendLine("        <div class='timeline-right'>");
                    sb.AppendLine($"          <div class='timeline-title'>{System.Net.WebUtility.HtmlEncode(exp.Position)}</div>");
                    sb.AppendLine($"          <div class='timeline-subtitle'>{System.Net.WebUtility.HtmlEncode(exp.Company)}</div>");
                    if (!string.IsNullOrEmpty(exp.Description))
                    {
                        sb.AppendLine($"          <div class='timeline-desc'>{System.Net.WebUtility.HtmlEncode(exp.Description)}</div>");
                    }
                    sb.AppendLine("        </div>");
                    sb.AppendLine("      </div>");
                }
                
                sb.AppendLine("    </div>");
            }
            
            // Education
            if (cvData.Educations?.Count > 0)
            {
                sb.AppendLine("    <div class='section'>");
                sb.AppendLine("      <h2 class='section-title-lg'>Học vấn</h2>");
                
                foreach (var edu in cvData.Educations)
                {
                    sb.AppendLine("      <div class='timeline-item'>");
                    sb.AppendLine("        <div class='timeline-left'>");
                    sb.AppendLine($"          {edu.StartYear} - {edu.EndYear?.ToString() ?? "Nay"}");
                    sb.AppendLine("        </div>");
                    sb.AppendLine("        <div class='timeline-right'>");
                    sb.AppendLine($"          <div class='timeline-title'>{System.Net.WebUtility.HtmlEncode(edu.Degree)}</div>");
                    sb.AppendLine($"          <div class='timeline-subtitle'>{System.Net.WebUtility.HtmlEncode(edu.Institution)}</div>");
                    if (!string.IsNullOrEmpty(edu.FieldOfStudy))
                    {
                        sb.AppendLine($"          <div class='timeline-desc'>Chuyên ngành: {System.Net.WebUtility.HtmlEncode(edu.FieldOfStudy)}</div>");
                    }
                    sb.AppendLine("        </div>");
                    sb.AppendLine("      </div>");
                }
                
                sb.AppendLine("    </div>");
            }
            
            sb.AppendLine("  </div>");
            sb.AppendLine("</div>");
            
            return sb.ToString();
        }

        // =================== MODERN TEMPLATE ===================
        private string GetModernStyles()
        {
            return @"
                body { margin: 0; padding: 20px; font-family: 'Inter', Arial, sans-serif; background: #f5f5f5; }
                * { box-sizing: border-box; }
                .modern-cv-container {
                    max-width: 850px;
                    margin: 0 auto;
                    padding: 40px;
                    background: #ffffff;
                    color: #1f2937;
                    line-height: 1.6;
                }
                .modern-header {
                    text-align: center;
                    padding: 20px 40px;
                    background: linear-gradient(to bottom, #f9fafb, #ffffff);
                    margin-bottom: 40px;
                }
                .modern-header .profile-img {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    margin-bottom: 20px;
                    object-fit: cover;
                    border: 4px solid #4c1d95;
                }
                .modern-header h1 {
                    font-size: 40px;
                    color: #4c1d95;
                    margin: 0 0 8px 0;
                    font-weight: 700;
                }
                .modern-header h2 {
                    font-size: 20px;
                    color: #6d28d9;
                    margin: 0 0 24px 0;
                    font-weight: 500;
                }
                .contact-info {
                    display: flex;
                    justify-content: center;
                    gap: 24px;
                    flex-wrap: wrap;
                    margin-top: 16px;
                }
                .contact-item {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    color: #4b5563;
                    font-size: 14px;
                }
                .contact-item .material-icons {
                    font-size: 18px;
                    color: #7c3aed;
                }
                .modern-main { padding: 0 40px; }
                .section-title {
                    font-size: 20px;
                    color: #4c1d95;
                    border-bottom: 3px solid #7c3aed;
                    padding-bottom: 8px;
                    margin-bottom: 20px;
                    font-weight: 600;
                }
                .grid-layout {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 40px;
                    margin-top: 40px;
                }
                .timeline-item {
                    margin-bottom: 24px;
                    padding-left: 16px;
                    border-left: 2px solid #e5e7eb;
                    position: relative;
                }
                .timeline-item::before {
                    content: '';
                    position: absolute;
                    left: -6px;
                    top: 0;
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: #7c3aed;
                }
                .timeline-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 4px;
                }
                .timeline-title {
                    font-size: 16px;
                    color: #1f2937;
                    margin: 0;
                    font-weight: 600;
                }
                .timeline-date {
                    font-size: 13px;
                    color: #6b7280;
                    font-style: italic;
                    white-space: nowrap;
                }
                .timeline-subtitle {
                    color: #6d28d9;
                    font-weight: 500;
                    margin: 4px 0 8px 0;
                    font-size: 14px;
                }
                .job-details {
                    list-style: none;
                    padding: 0;
                    margin: 8px 0;
                }
                .job-details li {
                    color: #4b5563;
                    font-size: 14px;
                    margin-bottom: 4px;
                    padding-left: 16px;
                    position: relative;
                }
                .job-details li::before {
                    content: '▸';
                    position: absolute;
                    left: 0;
                    color: #7c3aed;
                }
                .skills-container {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                    margin-top: 16px;
                }
                .skill-tag {
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 14px;
                    font-weight: 500;
                }
                .skill-primary {
                    background: #7c3aed;
                    color: white;
                }
                .skill-secondary {
                    background: #e9d5ff;
                    color: #6d28d9;
                }
            ";
        }

        private string GenerateModernTemplate(CVDataDto cvData)
        {
            var sb = new StringBuilder();
            var defaultName = "Họ và Tên";
            var defaultPosition = "Vị trí ứng tuyển";

            sb.AppendLine("<div class='modern-cv-container'>");
            
            // Header - Centered
            sb.AppendLine("  <header class='modern-header'>");
            
            if (!string.IsNullOrEmpty(cvData.PersonalInfo?.AvatarBase64))
            {
                sb.AppendLine($"    <img src='data:image/png;base64,{cvData.PersonalInfo.AvatarBase64}' alt='Profile Picture' class='profile-img' />");
            }
            
            sb.AppendLine($"    <h1>{System.Net.WebUtility.HtmlEncode(cvData.PersonalInfo?.FullName ?? defaultName)}</h1>");
            var jobTitle = cvData.Experiences?.FirstOrDefault()?.Position ?? defaultPosition;
            sb.AppendLine($"    <h2>{System.Net.WebUtility.HtmlEncode(jobTitle)}</h2>");
            
            sb.AppendLine("    <div class='contact-info'>");
            if (!string.IsNullOrEmpty(cvData.PersonalInfo?.Email))
                sb.AppendLine($"      <div class='contact-item'><span class='material-icons'>email</span><span>{System.Net.WebUtility.HtmlEncode(cvData.PersonalInfo.Email)}</span></div>");
            if (!string.IsNullOrEmpty(cvData.PersonalInfo?.Phone))
                sb.AppendLine($"      <div class='contact-item'><span class='material-icons'>phone</span><span>{System.Net.WebUtility.HtmlEncode(cvData.PersonalInfo.Phone)}</span></div>");
            if (!string.IsNullOrEmpty(cvData.PersonalInfo?.Address))
                sb.AppendLine($"      <div class='contact-item'><span class='material-icons'>home</span><span>{System.Net.WebUtility.HtmlEncode(cvData.PersonalInfo.Address)}</span></div>");
            sb.AppendLine("    </div>");
            sb.AppendLine("  </header>");
            
            sb.AppendLine("  <main class='modern-main'>");
            
            // Summary
            if (!string.IsNullOrEmpty(cvData.PersonalInfo?.Summary))
            {
                sb.AppendLine("    <section>");
                sb.AppendLine("      <h3 class='section-title'>Tóm tắt chuyên môn</h3>");
                sb.AppendLine($"      <p>{System.Net.WebUtility.HtmlEncode(cvData.PersonalInfo.Summary)}</p>");
                sb.AppendLine("    </section>");
            }
            
            // Grid: Experience + Education
            sb.AppendLine("    <div class='grid-layout'>");
            
            // Experience
            if (cvData.Experiences?.Count > 0)
            {
                sb.AppendLine("      <section>");
                sb.AppendLine("        <h3 class='section-title'>Kinh nghiệm làm việc</h3>");
                foreach (var exp in cvData.Experiences)
                {
                    sb.AppendLine("        <div class='timeline-item'>");
                    sb.AppendLine("          <div class='timeline-header'>");
                    sb.AppendLine($"            <h4 class='timeline-title'>{System.Net.WebUtility.HtmlEncode(exp.Position)}</h4>");
                    sb.AppendLine($"            <span class='timeline-date'>{(exp.StartDate.HasValue ? exp.StartDate.Value.ToString("MM/yyyy") : "")} - {(exp.EndDate.HasValue ? exp.EndDate.Value.ToString("MM/yyyy") : "Hiện tại")}</span>");
                    sb.AppendLine("          </div>");
                    sb.AppendLine($"          <p class='timeline-subtitle'>{System.Net.WebUtility.HtmlEncode(exp.Company)}</p>");
                    if (!string.IsNullOrEmpty(exp.Description))
                    {
                        sb.AppendLine("          <ul class='job-details'>");
                        sb.AppendLine($"            <li>{System.Net.WebUtility.HtmlEncode(exp.Description)}</li>");
                        sb.AppendLine("          </ul>");
                    }
                    sb.AppendLine("        </div>");
                }
                sb.AppendLine("      </section>");
            }
            
            // Education
            if (cvData.Educations?.Count > 0)
            {
                sb.AppendLine("      <section>");
                sb.AppendLine("        <h3 class='section-title'>Học vấn</h3>");
                foreach (var edu in cvData.Educations)
                {
                    sb.AppendLine("        <div class='timeline-item'>");
                    sb.AppendLine("          <div class='timeline-header'>");
                    sb.AppendLine($"            <h4 class='timeline-title'>{System.Net.WebUtility.HtmlEncode(edu.Degree)}</h4>");
                    sb.AppendLine($"            <span class='timeline-date'>{edu.StartYear} - {edu.EndYear?.ToString() ?? "Nay"}</span>");
                    sb.AppendLine("          </div>");
                    sb.AppendLine($"          <p class='timeline-subtitle'>{System.Net.WebUtility.HtmlEncode(edu.Institution)}</p>");
                    sb.AppendLine("        </div>");
                }
                sb.AppendLine("      </section>");
            }
            
            sb.AppendLine("    </div>");
            
            // Skills
            if (cvData.Skills?.Count > 0)
            {
                sb.AppendLine("    <section style='margin-top: 40px;'>");
                sb.AppendLine("      <h3 class='section-title'>Kỹ năng</h3>");
                sb.AppendLine("      <div class='skills-container'>");
                int count = 0;
                foreach (var skill in cvData.Skills)
                {
                    string skillClass = count < 5 ? "skill-primary" : "skill-secondary";
                    sb.AppendLine($"        <span class='skill-tag {skillClass}'>{System.Net.WebUtility.HtmlEncode(skill.Name)}</span>");
                    count++;
                }
                sb.AppendLine("      </div>");
                sb.AppendLine("    </section>");
            }
            
            sb.AppendLine("  </main>");
            sb.AppendLine("</div>");
            
            return sb.ToString();
        }

        // =================== FORMAL TEMPLATE ===================
        private string GetFormalStyles()
        {
            return @"
                body { margin: 0; padding: 20px; font-family: 'Roboto', Arial, sans-serif; background: #f5f5f5; }
                * { box-sizing: border-box; }
                .formal-cv-container {
                    max-width: 850px;
                    margin: 0 auto;
                    padding: 32px;
                    background: #ffffff;
                    color: #1f2937;
                    line-height: 1.6;
                }
                .formal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-bottom: 20px;
                    border-bottom: 2px solid #333333;
                    margin-bottom: 20px;
                }
                .header-content h1 {
                    font-size: 32px;
                    color: #1f2937;
                    margin: 0 0 8px 0;
                    font-weight: 700;
                }
                .header-content h2 {
                    font-size: 18px;
                    color: #4b5563;
                    margin: 0;
                    font-weight: 400;
                }
                .formal-header .profile-img {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 3px solid #d1d5db;
                }
                .contact-bar {
                    display: flex;
                    gap: 24px;
                    flex-wrap: wrap;
                    padding: 16px 0;
                    border-bottom: 1px solid #e5e7eb;
                    margin-bottom: 28px;
                }
                .contact-bar .contact-item {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    color: #4b5563;
                    font-size: 14px;
                }
                .contact-bar .material-icons {
                    font-size: 18px;
                    color: #6b7280;
                }
                .section-title {
                    font-size: 16px;
                    color: #1f2937;
                    border-bottom: 2px solid #333333;
                    padding-bottom: 6px;
                    margin-bottom: 20px;
                    margin-top: 32px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                section:first-child .section-title { margin-top: 0; }
                .formal-item {
                    margin-bottom: 24px;
                    padding-bottom: 16px;
                    border-bottom: 1px solid #f3f4f6;
                }
                .formal-item:last-child { border-bottom: none; }
                .item-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 8px;
                }
                .item-title {
                    font-size: 16px;
                    color: #1f2937;
                    margin: 0 0 4px 0;
                    font-weight: 600;
                }
                .item-subtitle {
                    font-size: 14px;
                    color: #4b5563;
                    margin: 0 0 8px 0;
                    font-weight: 500;
                }
                .item-date {
                    font-size: 13px;
                    color: #6b7280;
                    font-style: italic;
                    white-space: nowrap;
                    margin-left: 16px;
                }
                .item-description {
                    color: #4b5563;
                    font-size: 14px;
                    line-height: 1.6;
                    margin-top: 8px;
                }
                .skills-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 8px 16px;
                }
                .skill-item {
                    color: #1f2937;
                    font-size: 14px;
                    padding: 6px 0;
                }
                .skill-item::before {
                    content: '•';
                    margin-right: 8px;
                    color: #333333;
                    font-size: 18px;
                }
                .skill-level {
                    color: #6b7280;
                    font-size: 13px;
                }
            ";
        }

        private string GenerateFormalTemplate(CVDataDto cvData)
        {
            var sb = new StringBuilder();
            var defaultName = "Họ và Tên";
            var defaultPosition = "Vị trí ứng tuyển";

            sb.AppendLine("<div class='formal-cv-container'>");
            
            // Header - Horizontal
            sb.AppendLine("  <div class='formal-header'>");
            sb.AppendLine("    <div class='header-content'>");
            sb.AppendLine($"      <h1>{System.Net.WebUtility.HtmlEncode(cvData.PersonalInfo?.FullName ?? defaultName)}</h1>");
            var jobTitle = cvData.Experiences?.FirstOrDefault()?.Position ?? defaultPosition;
            sb.AppendLine($"      <h2>{System.Net.WebUtility.HtmlEncode(jobTitle)}</h2>");
            sb.AppendLine("    </div>");
            
            if (!string.IsNullOrEmpty(cvData.PersonalInfo?.AvatarBase64))
            {
                sb.AppendLine($"    <img src='data:image/png;base64,{cvData.PersonalInfo.AvatarBase64}' alt='Profile' class='profile-img' />");
            }
            sb.AppendLine("  </div>");
            
            // Contact Bar
            sb.AppendLine("  <div class='contact-bar'>");
            if (!string.IsNullOrEmpty(cvData.PersonalInfo?.Email))
                sb.AppendLine($"    <div class='contact-item'><span class='material-icons'>email</span><span>{System.Net.WebUtility.HtmlEncode(cvData.PersonalInfo.Email)}</span></div>");
            if (!string.IsNullOrEmpty(cvData.PersonalInfo?.Phone))
                sb.AppendLine($"    <div class='contact-item'><span class='material-icons'>phone</span><span>{System.Net.WebUtility.HtmlEncode(cvData.PersonalInfo.Phone)}</span></div>");
            if (!string.IsNullOrEmpty(cvData.PersonalInfo?.Address))
                sb.AppendLine($"    <div class='contact-item'><span class='material-icons'>home</span><span>{System.Net.WebUtility.HtmlEncode(cvData.PersonalInfo.Address)}</span></div>");
            sb.AppendLine("  </div>");
            
            // Summary
            if (!string.IsNullOrEmpty(cvData.PersonalInfo?.Summary))
            {
                sb.AppendLine("  <section>");
                sb.AppendLine("    <h3 class='section-title'>TÓM TẮT</h3>");
                sb.AppendLine($"    <p>{System.Net.WebUtility.HtmlEncode(cvData.PersonalInfo.Summary)}</p>");
                sb.AppendLine("  </section>");
            }
            
            // Experience
            if (cvData.Experiences?.Count > 0)
            {
                sb.AppendLine("  <section>");
                sb.AppendLine("    <h3 class='section-title'>KINH NGHIỆM LÀM VIỆC</h3>");
                foreach (var exp in cvData.Experiences)
                {
                    sb.AppendLine("    <div class='formal-item'>");
                    sb.AppendLine("      <div class='item-header'>");
                    sb.AppendLine("        <div>");
                    sb.AppendLine($"          <h4 class='item-title'>{System.Net.WebUtility.HtmlEncode(exp.Position)}</h4>");
                    sb.AppendLine($"          <p class='item-subtitle'>{System.Net.WebUtility.HtmlEncode(exp.Company)}</p>");
                    sb.AppendLine("        </div>");
                    sb.AppendLine($"        <div class='item-date'>{(exp.StartDate.HasValue ? exp.StartDate.Value.ToString("MM/yyyy") : "")} - {(exp.EndDate.HasValue ? exp.EndDate.Value.ToString("MM/yyyy") : "Hiện tại")}</div>");
                    sb.AppendLine("      </div>");
                    if (!string.IsNullOrEmpty(exp.Description))
                        sb.AppendLine($"      <p class='item-description'>{System.Net.WebUtility.HtmlEncode(exp.Description)}</p>");
                    sb.AppendLine("    </div>");
                }
                sb.AppendLine("  </section>");
            }
            
            // Education
            if (cvData.Educations?.Count > 0)
            {
                sb.AppendLine("  <section>");
                sb.AppendLine("    <h3 class='section-title'>HỌC VẤN</h3>");
                foreach (var edu in cvData.Educations)
                {
                    sb.AppendLine("    <div class='formal-item'>");
                    sb.AppendLine("      <div class='item-header'>");
                    sb.AppendLine("        <div>");
                    sb.AppendLine($"          <h4 class='item-title'>{System.Net.WebUtility.HtmlEncode(edu.Degree)}</h4>");
                    sb.AppendLine($"          <p class='item-subtitle'>{System.Net.WebUtility.HtmlEncode(edu.Institution)}</p>");
                    sb.AppendLine("        </div>");
                    sb.AppendLine($"        <div class='item-date'>{edu.StartYear} - {edu.EndYear?.ToString() ?? "Nay"}</div>");
                    sb.AppendLine("      </div>");
                    if (!string.IsNullOrEmpty(edu.FieldOfStudy))
                        sb.AppendLine($"      <p class='item-description'>Chuyên ngành: {System.Net.WebUtility.HtmlEncode(edu.FieldOfStudy)}</p>");
                    sb.AppendLine("    </div>");
                }
                sb.AppendLine("  </section>");
            }
            
            // Skills
            if (cvData.Skills?.Count > 0)
            {
                sb.AppendLine("  <section>");
                sb.AppendLine("    <h3 class='section-title'>KỸ NĂNG</h3>");
                sb.AppendLine("    <ul class='skills-list'>");
                foreach (var skill in cvData.Skills)
                {
                    sb.Append($"      <li class='skill-item'>{System.Net.WebUtility.HtmlEncode(skill.Name)}");
                    if (!string.IsNullOrEmpty(skill.Level))
                        sb.Append($" <span class='skill-level'>- {System.Net.WebUtility.HtmlEncode(skill.Level)}</span>");
                    sb.AppendLine("</li>");
                }
                sb.AppendLine("    </ul>");
                sb.AppendLine("  </section>");
            }
            
            sb.AppendLine("</div>");
            
            return sb.ToString();
        }
    }
}