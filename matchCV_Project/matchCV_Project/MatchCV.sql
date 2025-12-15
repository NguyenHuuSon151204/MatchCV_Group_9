CREATE DATABASE MatchCV;
GO
USE MatchCV;
GO

ALTER TABLE Users
ADD Headline NVARCHAR(MAX) NULL,
    Bio NVARCHAR(MAX) NULL;
GO

ALTER TABLE dbo.Documents
ADD CONSTRAINT FK_Documents_CVTemplates
    FOREIGN KEY (TemplateId)
    REFERENCES dbo.CVTemplates(Id)
    ON DELETE SET NULL;
GO

/* 1. USERS
   - Matches matchCV_Project.Models.User
*/
IF OBJECT_ID('dbo.Users','U') IS NULL
CREATE TABLE dbo.Users (
    Id           INT IDENTITY(1,1)        PRIMARY KEY,
    DisplayName  NVARCHAR(180)            NOT NULL,
    Email NVARCHAR(250)            NOT NULL,
    Role         NVARCHAR(100)            NOT NULL,      -- Candidate | Recruiter | Admin | System
    CreatedAt    DATETIME2                NOT NULL DEFAULT SYSUTCDATETIME(),
	[Password]   NVARCHAR(100)            NOT NULL,
	Verified     BIT                      NOT NULL DEFAULT 0,
    UpdatedAt    DATETIME2                NULL,
    IsActive     BIT                      NOT NULL DEFAULT 1,
    IsDeleted    BIT                      NOT NULL DEFAULT 0,
    IsBanned     BIT                      NOT NULL DEFAULT 0,
    BanReason    NVARCHAR(500)            NULL,
    BannedAt     DATETIME2                NULL,
    BannedUntil  DATETIME2                NULL
);
GO
CREATE UNIQUE INDEX UQ__Users__A9D10534A0824C3B ON dbo.Users(Email);
CREATE INDEX IX_Users_Role ON dbo.Users(Role) WHERE IsDeleted = 0;
CREATE INDEX IX_Users_IsActive_IsDeleted ON dbo.Users(IsActive, IsDeleted);
GO

/* 2. DOCUMENTS (CV)
   - Matches matchCV_Project.Models.Document
*/
IF OBJECT_ID('dbo.Documents','U') IS NULL
CREATE TABLE dbo.Documents (
    Id            INT IDENTITY(1,1) PRIMARY KEY,
    UserId        INT             NULL,
    TemplateId    INT             NULL,                  -- Added to match C#
    DocType       NVARCHAR(30)    NOT NULL,              -- 'CV','JD','CL','Other'
    OriginalName  NVARCHAR(250)   NOT NULL,
    FileName      NVARCHAR(255)   NULL,                  -- Added to match C#
    Content       NVARCHAR(4000)  NULL,                  -- Summary/Extracted text
    ContentType   NVARCHAR(100)   NULL,
    StoragePath   NVARCHAR(400)   NULL,
    FileHash      NVARCHAR(128)   NULL,
    FileSize      BIGINT          NULL,                  -- Renamed from SizeBytes, changed to BIGINT
    PageCount     INT             NULL,
    AiConfidence  FLOAT           NULL,                  -- Added to match C#
    TotalScore    FLOAT           NULL,                  -- Added to match C#
    Status        NVARCHAR(50)    NOT NULL DEFAULT 'Draft', -- Added to match C#
    CreatedAt     DATETIME2       NOT NULL DEFAULT SYSUTCDATETIME(), -- Renamed from UploadedAt
    UpdatedAt     DATETIME2       NOT NULL DEFAULT SYSUTCDATETIME(), -- Added to match C#
    CvData        NVARCHAR(MAX)   NULL,                  -- Added to store JSON data from Builder
    IsDeleted     BIT             NOT NULL DEFAULT 0,
    CONSTRAINT FK_Documents_Users_UserId
        FOREIGN KEY (UserId) REFERENCES dbo.Users(Id)
);
GO
CREATE INDEX IX_Documents_DocType   ON dbo.Documents(DocType);
CREATE INDEX IX_Documents_Uploaded  ON dbo.Documents(CreatedAt);
CREATE INDEX IX_Documents_UserId    ON dbo.Documents(UserId);
CREATE INDEX IX_Documents_Status_IsDeleted ON dbo.Documents(Status, IsDeleted) WHERE IsDeleted = 0;
CREATE INDEX IX_Documents_TemplateId ON dbo.Documents(TemplateId) WHERE TemplateId IS NOT NULL;
GO

/* 3. CVTemplates - mẫu CV 
   - Matches matchCV_Project.Models.Cvtemplate
*/
IF OBJECT_ID('dbo.CVTemplates','U') IS NULL
CREATE TABLE dbo.CVTemplates (
    Id              INT IDENTITY(1,1) PRIMARY KEY,
    [Key]           NVARCHAR(50)     NOT NULL,
    [Name]          NVARCHAR(180)    NOT NULL,
    [Description]   NVARCHAR(300)    NULL,
    Engine          NVARCHAR(50)     NULL DEFAULT ('razor'),
    TemplatePath    NVARCHAR(400)    NULL DEFAULT (''),
    IsActive        BIT              NOT NULL DEFAULT 1,
    ThumbnailUrl    NVARCHAR(500)    NULL,
    PreviewImageUrl NVARCHAR(500)    NULL,
    ProfileImageUrl NVARCHAR(500)    NULL,
    FullName        NVARCHAR(100)    NULL,
    Email           NVARCHAR(100)    NULL,
    Phone           NVARCHAR(20)     NULL,
    Address         NVARCHAR(500)    NULL,
    CVData          NVARCHAR(MAX)    NULL,
    CreatedAt       DATETIME2        NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt       DATETIME2        NULL
);
GO
CREATE UNIQUE INDEX UQ__CVTempla__C41E0289DE48762E ON dbo.CVTemplates([Key]);
GO

/* 4. Sections & Bullets (Cấu trúc CV) 
   - Matches matchCV_Project.Models.Section & Bullet
*/
IF OBJECT_ID('dbo.Sections','U') IS NULL
CREATE TABLE dbo.Sections (
    Id           INT IDENTITY(1,1) PRIMARY KEY,
    DocumentId   INT              NOT NULL,
    SectionType  NVARCHAR(50)     NOT NULL,
    Ord          INT              NOT NULL,
    RawText      NVARCHAR(MAX)    NULL,
    CONSTRAINT FK_Sections_Documents
        FOREIGN KEY (DocumentId) REFERENCES dbo.Documents(Id) ON DELETE CASCADE
);
GO
CREATE INDEX IX_Sections_DocumentId ON dbo.Sections(DocumentId);
CREATE INDEX IX_Sections_DocumentId_SectionType ON dbo.Sections(DocumentId, SectionType);
GO

IF OBJECT_ID('dbo.Bullets','U') IS NULL
CREATE TABLE dbo.Bullets (
    Id           INT IDENTITY(1,1) PRIMARY KEY,
    SectionId    INT              NOT NULL,
    Ord          INT              NOT NULL,
    [Text]       NVARCHAR(MAX)    NOT NULL,
    CONSTRAINT FK_Bullets_Sections
        FOREIGN KEY (SectionId) REFERENCES dbo.Sections(Id) ON DELETE CASCADE
);
GO
CREATE INDEX IX_Bullets_SectionId ON dbo.Bullets(SectionId);
GO

/* 5. OCRResults - kết quả OCR nếu có */
IF OBJECT_ID('dbo.OCRResults','U') IS NULL
CREATE TABLE dbo.OCRResults (
    Id           INT IDENTITY(1,1) PRIMARY KEY,
    DocumentId   INT           NOT NULL,
    Engine       NVARCHAR(50)  NOT NULL,
    AvgConfidence FLOAT        NULL,
    TextBlob     NVARCHAR(MAX) NULL,
    CreatedAt    DATETIME2     NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_OCRResults_Documents
        FOREIGN KEY (DocumentId) REFERENCES dbo.Documents(Id) ON DELETE CASCADE
);
GO
CREATE INDEX IX_OCRResults_DocumentId ON dbo.OCRResults(DocumentId);
CREATE INDEX IX_OCRResults_CreatedAt ON dbo.OCRResults(CreatedAt);
GO

/* 6. Exports - Lịch sử xuất file 
   - Matches matchCV_Project.Models.Export
*/
IF OBJECT_ID('dbo.Exports','U') IS NULL
CREATE TABLE dbo.Exports (
    Id           INT IDENTITY(1,1) PRIMARY KEY,
    DocumentId   INT            NOT NULL,
    TemplateId   INT            NULL,
    OutFormat    NVARCHAR(30)   NOT NULL,
    OutputPath   NVARCHAR(400)  NOT NULL,
    Engine       NVARCHAR(50)   NULL,
    CreatedAt    DATETIME2      NOT NULL DEFAULT SYSUTCDATETIME(),
    [Status]     NVARCHAR(30)   NOT NULL,
    ErrorMsg     NVARCHAR(200)  NULL,
    CONSTRAINT FK_Exports_Documents
        FOREIGN KEY (DocumentId) REFERENCES dbo.Documents(Id) ON DELETE CASCADE,
    CONSTRAINT FK_Exports_CVTemplates
        FOREIGN KEY (TemplateId) REFERENCES dbo.CVTemplates(Id)
);
GO
CREATE INDEX IX_Exports_DocumentId ON dbo.Exports(DocumentId);
CREATE INDEX IX_Exports_Status_CreatedAt ON dbo.Exports([Status], CreatedAt);
GO

/* 7. Skills & DocumentSkills 
   - Matches matchCV_Project.Models.Skill & DocumentSkill
*/
IF OBJECT_ID('dbo.Skills','U') IS NULL
CREATE TABLE dbo.Skills (
    Id            INT IDENTITY(1,1) PRIMARY KEY,
    [Name]        NVARCHAR(180) NOT NULL,
    NormName      NVARCHAR(180) NOT NULL,
    Category      NVARCHAR(80)  NULL,
    CreatedAt     DATETIME2     NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt     DATETIME2     NOT NULL DEFAULT SYSUTCDATETIME(),
    IsDeleted     BIT           NOT NULL DEFAULT 0
);
GO
CREATE UNIQUE INDEX IX_Skills_NormName ON dbo.Skills(NormName);
GO

IF OBJECT_ID('dbo.DocumentSkills','U') IS NULL
CREATE TABLE dbo.DocumentSkills (
    Id              INT IDENTITY(1,1) PRIMARY KEY,
    DocumentId      INT           NOT NULL,
    SkillId         INT           NOT NULL,
    Source          NVARCHAR(30)  NOT NULL DEFAULT 'User', -- Added default
    Years           FLOAT         NULL, -- Kept for compatibility
    YearsExperience FLOAT         NULL, -- Added to match C#
    Proficiency     NVARCHAR(50)  NULL, -- Added to match C#
    Confidence      FLOAT         NULL,
    CreatedAt       DATETIME2     NOT NULL DEFAULT SYSUTCDATETIME(), -- Added to match C#
    CONSTRAINT FK_DocumentSkills_Documents
        FOREIGN KEY (DocumentId) REFERENCES dbo.Documents(Id) ON DELETE CASCADE,
    CONSTRAINT FK_DocumentSkills_Skills
        FOREIGN KEY (SkillId) REFERENCES dbo.Skills(Id) ON DELETE CASCADE
);
GO
CREATE INDEX IX_DocumentSkills_DocumentId ON dbo.DocumentSkills(DocumentId);
CREATE INDEX IX_DocumentSkills_SkillId    ON dbo.DocumentSkills(SkillId);
CREATE UNIQUE INDEX IX_DocumentSkills_Document_Skill ON dbo.DocumentSkills(DocumentId, SkillId);
GO

/* 8. Experiences & Education 
   - Matches matchCV_Project.Models.Experience & Education
*/
IF OBJECT_ID('dbo.Experiences','U') IS NULL
CREATE TABLE dbo.Experiences (
    Id               INT IDENTITY(1,1) PRIMARY KEY,
    DocumentId       INT           NOT NULL,
    JobTitle         NVARCHAR(200) NOT NULL,
    CompanyName      NVARCHAR(200) NOT NULL,
    IndustryName     NVARCHAR(150) NULL,
    StartDate        DATE          NULL,
    EndDate          DATE          NULL,
    CurrentlyWorking BIT           NOT NULL DEFAULT 0,
    [Description]    NVARCHAR(MAX) NULL,
    CreatedAt        DATETIME2     NOT NULL DEFAULT SYSUTCDATETIME(), -- Added match C#
    CONSTRAINT FK_Experiences_Documents
        FOREIGN KEY (DocumentId) REFERENCES dbo.Documents(Id) ON DELETE CASCADE
);
GO

IF OBJECT_ID('dbo.Educations','U') IS NULL
CREATE TABLE dbo.Educations (
    Id            INT IDENTITY(1,1) PRIMARY KEY,
    DocumentId    INT           NOT NULL,
    Degree        NVARCHAR(150) NOT NULL,
    FieldOfStudy  NVARCHAR(150) NULL,
    SchoolName    NVARCHAR(200) NOT NULL,
    StartDate     DATE          NULL,
    EndDate       DATE          NULL,
    Score         FLOAT         NULL,
    Activities    NVARCHAR(MAX) NULL,
    [Description] NVARCHAR(MAX) NULL,
    CreatedAt     DATETIME2     NOT NULL DEFAULT SYSUTCDATETIME(), -- Added match C#
    CONSTRAINT FK_Education_Documents
        FOREIGN KEY (DocumentId) REFERENCES dbo.Documents(Id) ON DELETE CASCADE
);
GO
CREATE INDEX IX_Experiences_DocumentId ON dbo.Experiences(DocumentId);
CREATE INDEX IX_Educations_DocumentId ON dbo.Educations(DocumentId);
GO

/* 9. Jobs 
   - Matches matchCV_Project.Models.Job
*/
IF OBJECT_ID('dbo.Jobs','U') IS NULL
CREATE TABLE dbo.Jobs (
    Id              INT IDENTITY(1,1) PRIMARY KEY,
    UserId          INT           NOT NULL,
    Title           NVARCHAR(200) NOT NULL,
    Company         NVARCHAR(200) NOT NULL,
    RawText         NVARCHAR(MAX) NULL,
    JobDescription  NVARCHAR(MAX) NULL,
    [Status]        NVARCHAR(50)  NOT NULL DEFAULT 'Active',
    CreatedAt       DATETIME2     NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt       DATETIME2     NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Jobs_Users
        FOREIGN KEY (UserId) REFERENCES dbo.Users(Id) ON DELETE CASCADE
);
GO
CREATE INDEX IX_Jobs_UserId ON dbo.Jobs(UserId);
CREATE INDEX IX_Jobs_Status ON dbo.Jobs([Status]) WHERE [Status] = 'Active';
CREATE INDEX IX_Jobs_CreatedAt ON dbo.Jobs(CreatedAt);
GO

/* 10. RequiredSkills - yêu cầu kỹ năng cho JD/Job */
IF OBJECT_ID('dbo.RequiredSkills','U') IS NULL
CREATE TABLE dbo.RequiredSkills (
    Id           INT IDENTITY(1,1) PRIMARY KEY,
    JobId        INT           NOT NULL,
    SkillId      INT           NOT NULL,
    MustHave     BIT           NOT NULL DEFAULT 0,
    Weight       FLOAT         NULL,                 -- mức quan trọng
    Note         NVARCHAR(200) NULL,
    CONSTRAINT FK_RequiredSkills_Jobs
        FOREIGN KEY (JobId) REFERENCES dbo.Jobs(Id) ON DELETE CASCADE,
    CONSTRAINT FK_RequiredSkills_Skills
        FOREIGN KEY (SkillId) REFERENCES dbo.Skills(Id) ON DELETE CASCADE
);
GO
CREATE INDEX IX_RequiredSkills_JobId ON dbo.RequiredSkills(JobId);
CREATE INDEX IX_RequiredSkills_SkillId ON dbo.RequiredSkills(SkillId);
CREATE UNIQUE INDEX IX_RequiredSkills_Job_Skill ON dbo.RequiredSkills(JobId, SkillId);
GO

/* 11. Applications - Candidate apply CV (Document) vào Job */
IF OBJECT_ID('dbo.Applications','U') IS NULL
CREATE TABLE dbo.Applications (
    Id            INT IDENTITY(1,1) PRIMARY KEY,
    JobId         INT           NOT NULL,
    DocumentId    INT           NOT NULL,               -- CV Document
    CandidateId   INT           NOT NULL,
    [Status]      NVARCHAR(30)  NOT NULL DEFAULT N'Pending',
    ScoreSnapshot FLOAT         NULL,
    Summary       NVARCHAR(MAX) NULL,
    CreatedAt     DATETIME2     NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt     DATETIME2     NULL,
    CONSTRAINT FK_Applications_Jobs
        FOREIGN KEY (JobId) REFERENCES dbo.Jobs(Id) ON DELETE CASCADE,
    CONSTRAINT FK_Applications_Documents
        FOREIGN KEY (DocumentId) REFERENCES dbo.Documents(Id) ON DELETE CASCADE,
    CONSTRAINT FK_Applications_Users
        FOREIGN KEY (CandidateId) REFERENCES dbo.Users(Id) ON DELETE NO ACTION
);
GO
CREATE INDEX IX_Applications_JobId       ON dbo.Applications(JobId);
CREATE INDEX IX_Applications_CandidateId ON dbo.Applications(CandidateId);
CREATE INDEX IX_Applications_Status ON dbo.Applications([Status]);
CREATE INDEX IX_Applications_CreatedAt ON dbo.Applications(CreatedAt);
GO

/* 12. MatchRuns - kết quả chạy AI match CV ↔ JD */
IF OBJECT_ID('dbo.MatchRuns','U') IS NULL
CREATE TABLE dbo.MatchRuns (
    Id            INT IDENTITY(1,1) PRIMARY KEY,
    DocumentId    INT           NOT NULL,
    JobId         INT           NOT NULL,
    Score         FLOAT         NOT NULL,
    DurationMs    INT           NULL,
    Explanation   NVARCHAR(MAX) NULL,
    CreatedAt     DATETIME2     NOT NULL DEFAULT SYSUTCDATETIME(),
    TraceId       NVARCHAR(180) NULL,
    CONSTRAINT FK_MatchRuns_Documents
        FOREIGN KEY (DocumentId) REFERENCES dbo.Documents(Id) ON DELETE CASCADE,
    CONSTRAINT FK_MatchRuns_Jobs
        FOREIGN KEY (JobId) REFERENCES dbo.Jobs(Id) ON DELETE CASCADE
);
GO
CREATE INDEX IX_MatchRuns_Document_Job ON dbo.MatchRuns(DocumentId, JobId);
CREATE INDEX IX_MatchRuns_CreatedAt ON dbo.MatchRuns(CreatedAt);
CREATE INDEX IX_MatchRuns_Score ON dbo.MatchRuns(Score);
GO

/* 13. MatchEvidences - giải thích vì sao match */
IF OBJECT_ID('dbo.MatchEvidences','U') IS NULL
CREATE TABLE dbo.MatchEvidences (
    Id           INT IDENTITY(1,1) PRIMARY KEY,
    MatchId      INT           NOT NULL,
    SkillId      INT           NULL,
    Snippet      NVARCHAR(MAX) NULL,
    ComponentScore FLOAT       NULL,
    EvidenceType NVARCHAR(30)  NULL,            -- 'Skill','Experience','Edu',...
    CONSTRAINT FK_MatchEvidences_MatchRuns
        FOREIGN KEY (MatchId) REFERENCES dbo.MatchRuns(Id) ON DELETE CASCADE,
    CONSTRAINT FK_MatchEvidences_Skills
        FOREIGN KEY (SkillId) REFERENCES dbo.Skills(Id) ON DELETE SET NULL
);
GO
CREATE INDEX IX_MatchEvidences_MatchId ON dbo.MatchEvidences(MatchId);
CREATE INDEX IX_MatchEvidences_SkillId ON dbo.MatchEvidences(SkillId) WHERE SkillId IS NOT NULL;
GO

/* 14. MissingItems - skill bắt buộc nhưng thiếu */
IF OBJECT_ID('dbo.MissingItems','U') IS NULL
CREATE TABLE dbo.MissingItems (
    Id           INT IDENTITY(1,1) PRIMARY KEY,
    MatchId      INT           NOT NULL,
    SkillId      INT           NULL,
    MissingKeyword NVARCHAR(180) NULL,
    Reason       NVARCHAR(300) NULL,
    Suggestion   NVARCHAR(300) NULL,
    MustHave     BIT           NOT NULL DEFAULT 0,
    CONSTRAINT FK_MissingItems_MatchRuns
        FOREIGN KEY (MatchId) REFERENCES dbo.MatchRuns(Id) ON DELETE CASCADE,
    CONSTRAINT FK_MissingItems_Skills
        FOREIGN KEY (SkillId) REFERENCES dbo.Skills(Id) ON DELETE SET NULL
);
GO
CREATE INDEX IX_MissingItems_MatchId ON dbo.MissingItems(MatchId);
CREATE INDEX IX_MissingItems_MustHave ON dbo.MissingItems(MustHave) WHERE MustHave = 1;
GO

/* 15. RewriteSuggestions - gợi ý chỉnh sửa bullet/câu */
IF OBJECT_ID('dbo.RewriteSuggestions','U') IS NULL
CREATE TABLE dbo.RewriteSuggestions (
    Id              INT IDENTITY(1,1) PRIMARY KEY,
    MatchId         INT           NOT NULL,
    BulletId        INT           NULL,
    SuggestedText   NVARCHAR(MAX) NOT NULL,
    Rationale       NVARCHAR(MAX) NULL,
    Accepted        BIT           NOT NULL DEFAULT 0,
    CreatedAt       DATETIME2     NOT NULL DEFAULT SYSUTCDATETIME(),
    AcceptedAt      DATETIME2     NULL,
    CONSTRAINT FK_RewriteSuggestions_MatchRuns
        FOREIGN KEY (MatchId) REFERENCES dbo.MatchRuns(Id) ON DELETE CASCADE,
    CONSTRAINT FK_RewriteSuggestions_Bullets
        FOREIGN KEY (BulletId) REFERENCES dbo.Bullets(Id) ON DELETE NO ACTION
);
GO
CREATE INDEX IX_RewriteSuggestions_MatchId ON dbo.RewriteSuggestions(MatchId);
CREATE INDEX IX_RewriteSuggestions_Accepted ON dbo.RewriteSuggestions(Accepted) WHERE Accepted = 0;
GO

/* 16. Embeddings + Cache + Ownership (cho semantic search) */
IF OBJECT_ID('dbo.Embeddings','U') IS NULL
CREATE TABLE dbo.Embeddings (
    Id        INT IDENTITY(1,1) PRIMARY KEY,
    Dim       INT           NOT NULL,
    Model     NVARCHAR(80)  NOT NULL,
    Vector    VARBINARY(MAX)NOT NULL,
    CreatedAt DATETIME2     NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

IF OBJECT_ID('dbo.EmbeddingOwnership','U') IS NULL
CREATE TABLE dbo.EmbeddingOwnership (
    Id           INT IDENTITY(1,1) PRIMARY KEY,
    EmbeddingId  INT           NOT NULL,
    OwnerType    NVARCHAR(30)  NOT NULL,      -- 'Document','Job','Skill',...
    OwnerId      INT           NOT NULL,
    CONSTRAINT FK_EmbeddingOwnership_Embeddings
        FOREIGN KEY (EmbeddingId) REFERENCES dbo.Embeddings(Id) ON DELETE CASCADE
);
GO

IF OBJECT_ID('dbo.EmbeddingCache','U') IS NULL
CREATE TABLE dbo.EmbeddingCache (
    Id        INT IDENTITY(1,1) PRIMARY KEY,
    InputHash NVARCHAR(128) NOT NULL UNIQUE,
    Model     NVARCHAR(80)  NOT NULL,
    Dim       INT           NOT NULL,
    Vector    VARBINARY(MAX)NOT NULL,
    CreatedAt DATETIME2     NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

/* 17. APICallLogs - log gọi AI (phục vụ Admin thống kê) */
IF OBJECT_ID('dbo.APICallLogs','U') IS NULL
CREATE TABLE dbo.APICallLogs (
    Id          INT IDENTITY(1,1) PRIMARY KEY,
    Provider    NVARCHAR(50)  NOT NULL,
    Model       NVARCHAR(80)  NOT NULL,
    Endpoint    NVARCHAR(180) NOT NULL,
    TokensIn    INT           NULL,
    TokensOut   INT           NULL,
    CostEstimate FLOAT        NULL,
    LatencyMs   INT           NULL,
    [Status]    NVARCHAR(30)  NOT NULL,
    CreatedAt   DATETIME2     NOT NULL DEFAULT SYSUTCDATETIME(),
    TraceId     NVARCHAR(180) NULL
);
GO

/* 18. APISettings - cấu hình khóa AI */
IF OBJECT_ID('dbo.APISettings','U') IS NULL
CREATE TABLE dbo.APISettings (
    Id        INT IDENTITY(1,1) PRIMARY KEY,
    Provider  NVARCHAR(50)  NOT NULL,
    Model     NVARCHAR(80)  NOT NULL,
    Endpoint  NVARCHAR(180) NOT NULL,
    ApiKey    NVARCHAR(256) NOT NULL,
    IsActive  BIT           NOT NULL DEFAULT 1,
    CreatedAt DATETIME2     NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

/* 19. LicenseKeys - cho License Page & Pro/Free */
IF OBJECT_ID('dbo.LicenseKeys','U') IS NULL
CREATE TABLE dbo.LicenseKeys (
    Id             INT IDENTITY(1,1) PRIMARY KEY,
    KeyHash        NVARCHAR(200) NOT NULL UNIQUE,
    [Plan]         NVARCHAR(30)  NOT NULL DEFAULT N'Free',   -- Free | Pro
    Expiry         DATETIME2     NULL,
    IsActive       BIT           NOT NULL DEFAULT 0,
    AssignedUserId INT           NULL,
    CreatedAt      DATETIME2     NOT NULL DEFAULT SYSUTCDATETIME(),
    OriginalKey    NVARCHAR(100) NULL,
    CONSTRAINT FK_LicenseKeys_Users
        FOREIGN KEY (AssignedUserId) REFERENCES dbo.Users(Id) ON DELETE SET NULL
);
GO

/* 20. AdminLogs - cho Admin Dashboard xem hoạt động */
IF OBJECT_ID('dbo.AdminLogs','U') IS NULL
CREATE TABLE dbo.AdminLogs (
    Id        INT IDENTITY(1,1) PRIMARY KEY,
    Actor     NVARCHAR(200) NOT NULL,
    [Action]  NVARCHAR(100) NOT NULL,
    [Entity]  NVARCHAR(100) NOT NULL,
    EntityId  INT           NULL,
    MetaJson  NVARCHAR(MAX) NOT NULL DEFAULT N'{}',
    CreatedAt DATETIME2     NOT NULL DEFAULT SYSUTCDATETIME()
);
GO
CREATE INDEX IX_AdminLogs_CreatedAt ON dbo.AdminLogs(CreatedAt);
CREATE INDEX IX_AdminLogs_Entity_EntityId ON dbo.AdminLogs([Entity], EntityId);
GO

/* 21. SavedCVs - CV đã lưu */
IF OBJECT_ID('dbo.SavedCVs','U') IS NULL
CREATE TABLE dbo.SavedCVs (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(200) NOT NULL,
    TemplateType NVARCHAR(50) NOT NULL,
    CVDataJson NVARCHAR(MAX) NOT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UserId INT NULL,  -- For future user authentication
    CONSTRAINT FK_SavedCVs_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(Id)
);
GO
CREATE INDEX IX_SavedCVs_UserId ON dbo.SavedCVs(UserId) WHERE UserId IS NOT NULL;
CREATE INDEX IX_SavedCVs_CreatedAt ON dbo.SavedCVs(CreatedAt);
GO

/* 22. EmailVerificationTokens - Token xác thực email */
IF OBJECT_ID('dbo.EmailVerificationTokens', 'U') IS NULL
CREATE TABLE dbo.EmailVerificationTokens(
	Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    Token NVARCHAR(500) NOT NULL,
    ExpiresAt DATETIME2 NOT NULL,

    CONSTRAINT FK_EmailVerificationTokens_Users
        FOREIGN KEY (UserId) REFERENCES dbo.Users(Id)
            ON DELETE CASCADE
);
GO
CREATE INDEX IX_EmailVerificationTokens_UserId ON dbo.EmailVerificationTokens(UserId);
CREATE INDEX IX_EmailVerificationTokens_Token ON dbo.EmailVerificationTokens(Token);
CREATE INDEX IX_EmailVerificationTokens_ExpiresAt ON dbo.EmailVerificationTokens(ExpiresAt);
GO

/* 23. RecruiterVerifications - Xác thực nhà tuyển dụng */
IF OBJECT_ID('dbo.RecruiterVerifications','U') IS NULL
CREATE TABLE dbo.RecruiterVerifications (
    Id                          INT IDENTITY(1,1) PRIMARY KEY,
    RecruiterId                 INT             NOT NULL,
    CompanyName                 NVARCHAR(200)   NOT NULL,
    CompanyEmail                NVARCHAR(250)   NOT NULL,
    CompanyPhone                NVARCHAR(50)    NULL,
    CompanyAddress              NVARCHAR(200)   NULL,
    TaxCode                     NVARCHAR(50)    NULL,
    BusinessLicenseDocumentId   INT             NULL,
    CompanyProofDocumentId      INT             NULL,
    Status                      NVARCHAR(30)   NOT NULL DEFAULT N'Pending',
    AdminNotes                  NVARCHAR(500)   NULL,
    ReviewedByAdminId           INT             NULL,
    ReviewedAt                  DATETIME2       NULL,
    CreatedAt                   DATETIME2       NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt                   DATETIME2       NULL,
    CONSTRAINT FK_RecruiterVerification_Users_Recruiter
        FOREIGN KEY (RecruiterId) REFERENCES dbo.Users(Id) ON DELETE CASCADE,
    CONSTRAINT FK_RecruiterVerification_Documents_BusinessLicense
        FOREIGN KEY (BusinessLicenseDocumentId) REFERENCES dbo.Documents(Id) ON DELETE NO ACTION,
    CONSTRAINT FK_RecruiterVerification_Documents_CompanyProof
        FOREIGN KEY (CompanyProofDocumentId) REFERENCES dbo.Documents(Id) ON DELETE NO ACTION,
    CONSTRAINT FK_RecruiterVerification_Users_Admin
        FOREIGN KEY (ReviewedByAdminId) REFERENCES dbo.Users(Id) ON DELETE NO ACTION,
    CONSTRAINT CK_RecruiterVerification_Status
        CHECK (Status IN ('Pending', 'Approved', 'Rejected'))
);
GO
CREATE INDEX IX_RecruiterVerification_RecruiterId ON dbo.RecruiterVerifications(RecruiterId);
CREATE INDEX IX_RecruiterVerification_Status ON dbo.RecruiterVerifications(Status);
CREATE INDEX IX_RecruiterVerification_CreatedAt ON dbo.RecruiterVerifications(CreatedAt);
GO

------------------------------------------------------------
-- SEED DATA
------------------------------------------------------------
IF NOT EXISTS (SELECT 1 FROM dbo.Users)
BEGIN
    INSERT dbo.Users (DisplayName, Email, Role, Password) VALUES
      (N'System Admin', N'admin@matchcv.local', N'Admin', N'admin'),
      (N'Acme HR',      N'hr@acme.local',       N'Recruiter', N'123'),
      (N'Jane Candidate',N'candidate@demo.local',N'Candidate', N'456');

    DECLARE @candId INT = (SELECT Id FROM dbo.Users WHERE Email=N'candidate@demo.local');
    DECLARE @recId  INT = (SELECT Id FROM dbo.Users WHERE Email=N'hr@acme.local');
    DECLARE @adminId INT = (SELECT Id FROM dbo.Users WHERE Email=N'admin@matchcv.local');

    -- CV Document (Assign to Admin for testing)
    INSERT dbo.Documents (UserId, DocType, OriginalName, FileName, ContentType, StoragePath, FileSize, PageCount, Status, CreatedAt, UpdatedAt)
    VALUES (@adminId, 'CV', N'JaneCV.pdf', N'JaneCV.pdf', N'application/pdf', N'uploads/cv/jane.pdf', 123456, 2, 'Active', SYSUTCDATETIME(), SYSUTCDATETIME());
    DECLARE @cvDocId INT = SCOPE_IDENTITY();

    -- Comprehensive Skills
    INSERT dbo.Skills ([Name], NormName, Category, CreatedAt, UpdatedAt, IsDeleted) VALUES
      -- Backend
      (N'.NET', N'.net', N'Backend', SYSUTCDATETIME(), SYSUTCDATETIME(), 0),
      (N'C#', N'c#', N'Backend', SYSUTCDATETIME(), SYSUTCDATETIME(), 0),
      (N'ASP.NET Core', N'asp.net core', N'Backend', SYSUTCDATETIME(), SYSUTCDATETIME(), 0),
      (N'Node.js', N'node.js', N'Backend', SYSUTCDATETIME(), SYSUTCDATETIME(), 0),
      (N'Python', N'python', N'Backend', SYSUTCDATETIME(), SYSUTCDATETIME(), 0),
      (N'Java', N'java', N'Backend', SYSUTCDATETIME(), SYSUTCDATETIME(), 0),
      (N'Spring Boot', N'spring boot', N'Backend', SYSUTCDATETIME(), SYSUTCDATETIME(), 0),
      -- Database
      (N'SQL', N'sql', N'Database', SYSUTCDATETIME(), SYSUTCDATETIME(), 0),
      (N'SQL Server', N'sql server', N'Database', SYSUTCDATETIME(), SYSUTCDATETIME(), 0),
      (N'MySQL', N'mysql', N'Database', SYSUTCDATETIME(), SYSUTCDATETIME(), 0),
      (N'PostgreSQL', N'postgresql', N'Database', SYSUTCDATETIME(), SYSUTCDATETIME(), 0),
      (N'MongoDB', N'mongodb', N'Database', SYSUTCDATETIME(), SYSUTCDATETIME(), 0),
      -- Frontend
      (N'React', N'react', N'Frontend', SYSUTCDATETIME(), SYSUTCDATETIME(), 0),
      (N'ReactJS', N'reactjs', N'Frontend', SYSUTCDATETIME(), SYSUTCDATETIME(), 0),
      (N'Vue.js', N'vue.js', N'Frontend', SYSUTCDATETIME(), SYSUTCDATETIME(), 0),
      (N'Angular', N'angular', N'Frontend', SYSUTCDATETIME(), SYSUTCDATETIME(), 0),
      (N'JavaScript', N'javascript', N'Frontend', SYSUTCDATETIME(), SYSUTCDATETIME(), 0),
      (N'TypeScript', N'typescript', N'Frontend', SYSUTCDATETIME(), SYSUTCDATETIME(), 0),
      (N'HTML', N'html', N'Frontend', SYSUTCDATETIME(), SYSUTCDATETIME(), 0),
      (N'CSS', N'css', N'Frontend', SYSUTCDATETIME(), SYSUTCDATETIME(), 0),
      (N'Next.js', N'next.js', N'Frontend', SYSUTCDATETIME(), SYSUTCDATETIME(), 0),
      -- Cloud
      (N'Azure', N'azure', N'Cloud', SYSUTCDATETIME(), SYSUTCDATETIME(), 0),
      (N'AWS', N'aws', N'Cloud', SYSUTCDATETIME(), SYSUTCDATETIME(), 0),
      (N'Docker', N'docker', N'Cloud', SYSUTCDATETIME(), SYSUTCDATETIME(), 0),
      (N'Kubernetes', N'kubernetes', N'Cloud', SYSUTCDATETIME(), SYSUTCDATETIME(), 0),
      -- Tools
      (N'Git', N'git', N'Tools', SYSUTCDATETIME(), SYSUTCDATETIME(), 0),
      (N'GitHub', N'github', N'Tools', SYSUTCDATETIME(), SYSUTCDATETIME(), 0),
      (N'JIRA', N'jira', N'Tools', SYSUTCDATETIME(), SYSUTCDATETIME(), 0),
      (N'REST API', N'rest api', N'Backend', SYSUTCDATETIME(), SYSUTCDATETIME(), 0),
      (N'GraphQL', N'graphql', N'Backend', SYSUTCDATETIME(), SYSUTCDATETIME(), 0);
      
    -- Templates
    INSERT INTO dbo.CVTemplates ([Key], [Name], [Description], [ThumbnailUrl], [IsActive], [CreatedAt])
    VALUES 
    ('professional', N'Mẫu Chuyên Nghiệp', N'Thiết kế chuyên nghiệp với tông màu đỏ nổi bật, bố cục sidebar hiện đại.', '/images/templates/professional-thumbnail.jpg', 1, SYSUTCDATETIME()),
    ('modern', N'Mẫu Hiện Đại', N'Thiết kế hiện đại với tông màu tím sang trọng, header tập trung và bố cục lưới.', '/images/templates/modern-thumbnail.jpg', 1, SYSUTCDATETIME()),
    ('formal', N'Mẫu Truyền Thống', N'Thiết kế truyền thống, đơn giản, tối giản màu sắc, phù hợp môi trường trang trọng.', '/images/templates/formal-thumbnail.jpg', 1, SYSUTCDATETIME()),
    ('creative', N'Mẫu Sáng Tạo', N'Thiết kế sáng tạo, màu sắc tươi sáng, phù hợp ngành thiết kế và marketing.', '/images/templates/creative-thumbnail.jpg', 1, SYSUTCDATETIME()),
    ('minimalist', N'Mẫu Tối Giản', N'Thiết kế tối giản, tập trung vào nội dung, phù hợp mọi ngành nghề.', '/images/templates/minimalist-thumbnail.jpg', 1, SYSUTCDATETIME());

    -- More Users
    INSERT dbo.Users (DisplayName, Email, Role, Password, Verified) VALUES
      (N'Nguyễn Văn A', N'nguyenvana@example.com', N'Candidate', N'123456', 1),
      (N'Trần Thị B', N'tranthib@example.com', N'Candidate', N'123456', 1),
      (N'Lê Văn C', N'levanc@example.com', N'Candidate', N'123456', 1),
      (N'FPT Software HR', N'hr@fptsoftware.com', N'Recruiter', N'123456', 1),
      (N'Viettel HR', N'hr@viettel.com', N'Recruiter', N'123456', 1);
    
    DECLARE @cand2Id INT = (SELECT Id FROM dbo.Users WHERE Email=N'nguyenvana@example.com');
    DECLARE @cand3Id INT = (SELECT Id FROM dbo.Users WHERE Email=N'tranthib@example.com');
    DECLARE @cand4Id INT = (SELECT Id FROM dbo.Users WHERE Email=N'levanc@example.com');
    DECLARE @rec2Id INT = (SELECT Id FROM dbo.Users WHERE Email=N'hr@fptsoftware.com');
    DECLARE @rec3Id INT = (SELECT Id FROM dbo.Users WHERE Email=N'hr@viettel.com');

    -- More CV Documents
    INSERT dbo.Documents (UserId, DocType, OriginalName, FileName, ContentType, StoragePath, FileSize, PageCount, Status, CreatedAt, UpdatedAt, TemplateId)
    VALUES 
      (@cand2Id, 'CV', N'NguyenVanA_CV.pdf', N'nguyenvana_cv.pdf', N'application/pdf', N'uploads/cv/nguyenvana.pdf', 234567, 2, 'Active', SYSUTCDATETIME(), SYSUTCDATETIME(), (SELECT TOP 1 Id FROM dbo.CVTemplates WHERE [Key] = 'modern')),
      (@cand3Id, 'CV', N'TranThiB_CV.pdf', N'tranthib_cv.pdf', N'application/pdf', N'uploads/cv/tranthib.pdf', 198765, 1, 'Active', SYSUTCDATETIME(), SYSUTCDATETIME(), (SELECT TOP 1 Id FROM dbo.CVTemplates WHERE [Key] = 'formal')),
      (@cand4Id, 'CV', N'LeVanC_CV.pdf', N'levanc_cv.pdf', N'application/pdf', N'uploads/cv/levanc.pdf', 156789, 2, 'Active', SYSUTCDATETIME(), SYSUTCDATETIME(), (SELECT TOP 1 Id FROM dbo.CVTemplates WHERE [Key] = 'professional'));
    
    DECLARE @cvDoc2Id INT = (SELECT Id FROM dbo.Documents WHERE UserId = @cand2Id);
    DECLARE @cvDoc3Id INT = (SELECT Id FROM dbo.Documents WHERE UserId = @cand3Id);
    DECLARE @cvDoc4Id INT = (SELECT Id FROM dbo.Documents WHERE UserId = @cand4Id);

    -- Experiences for candidates
    INSERT dbo.Experiences (DocumentId, JobTitle, CompanyName, IndustryName, StartDate, EndDate, CurrentlyWorking, [Description], CreatedAt)
    VALUES
      (@cvDocId, N'Junior Developer', N'Tech Corp', N'IT', '2022-01-01', '2023-06-30', 0, N'Phát triển ứng dụng web với .NET và React', SYSUTCDATETIME()),
      (@cvDocId, N'Fullstack Developer', N'StartupXYZ', N'IT', '2023-07-01', NULL, 1, N'Xây dựng hệ thống quản lý với ASP.NET Core và Vue.js', SYSUTCDATETIME()),
      (@cvDoc2Id, N'Frontend Developer', N'Web Agency', N'IT', '2021-06-01', '2023-12-31', 0, N'Thiết kế và phát triển giao diện người dùng với React và TypeScript', SYSUTCDATETIME()),
      (@cvDoc3Id, N'Backend Developer', N'Software Company', N'IT', '2020-03-01', NULL, 1, N'Phát triển API và microservices với Node.js và MongoDB', SYSUTCDATETIME());

    -- Educations for candidates
    INSERT dbo.Educations (DocumentId, Degree, FieldOfStudy, SchoolName, StartDate, EndDate, Score, [Description], CreatedAt)
    VALUES
      (@cvDocId, N'Cử nhân', N'Công nghệ thông tin', N'Đại học FPT', '2020-09-01', '2024-06-30', 3.5, N'Chuyên ngành Phát triển phần mềm', SYSUTCDATETIME()),
      (@cvDoc2Id, N'Cử nhân', N'Khoa học máy tính', N'Đại học Bách Khoa', '2019-09-01', '2023-06-30', 3.7, N'Chuyên ngành Hệ thống thông tin', SYSUTCDATETIME()),
      (@cvDoc3Id, N'Kỹ sư', N'Công nghệ phần mềm', N'Đại học Công nghệ', '2018-09-01', '2022-06-30', 3.6, N'Chuyên ngành Phát triển ứng dụng', SYSUTCDATETIME());

    -- Document Skills
    DECLARE @dotnetSkillId INT = (SELECT Id FROM dbo.Skills WHERE NormName = N'.net');
    DECLARE @sqlSkillId INT = (SELECT Id FROM dbo.Skills WHERE NormName = N'sql');
    DECLARE @reactSkillId INT = (SELECT Id FROM dbo.Skills WHERE NormName = N'react');
    DECLARE @nodejsSkillId INT = (SELECT Id FROM dbo.Skills WHERE NormName = N'node.js');
    DECLARE @pythonSkillId INT = (SELECT Id FROM dbo.Skills WHERE NormName = N'python');
    
    INSERT dbo.DocumentSkills (DocumentId, SkillId, Source, YearsExperience, Proficiency, Confidence, CreatedAt)
    VALUES
      (@cvDocId, @dotnetSkillId, N'User', 2.5, N'Thành thạo', 0.9, SYSUTCDATETIME()),
      (@cvDocId, @sqlSkillId, N'User', 2.0, N'Thành thạo', 0.85, SYSUTCDATETIME()),
      (@cvDocId, @reactSkillId, N'User', 1.5, N'Trung bình', 0.7, SYSUTCDATETIME()),
      (@cvDoc2Id, @reactSkillId, N'User', 3.0, N'Thành thạo', 0.95, SYSUTCDATETIME()),
      (@cvDoc2Id, (SELECT Id FROM dbo.Skills WHERE NormName = N'typescript'), N'User', 2.5, N'Thành thạo', 0.9, SYSUTCDATETIME()),
      (@cvDoc3Id, @nodejsSkillId, N'User', 3.5, N'Thành thạo', 0.95, SYSUTCDATETIME()),
      (@cvDoc3Id, (SELECT Id FROM dbo.Skills WHERE NormName = N'mongodb'), N'User', 2.0, N'Thành thạo', 0.85, SYSUTCDATETIME());

    -- Jobs
    INSERT dbo.Jobs (UserId, Title, Company, RawText, JobDescription, [Status], CreatedAt, UpdatedAt)
    VALUES 
      (@recId, N'Backend .NET Developer', N'Acme', N'Tìm dev .NET, SQL, Azure, làm việc tại Đà Nẵng.', 
       N'Tuyển dụng Backend Developer với kinh nghiệm .NET, SQL Server, Azure. Làm việc tại Đà Nẵng, môi trường chuyên nghiệp.', 'Active', SYSUTCDATETIME(), SYSUTCDATETIME()),
      (@rec2Id, N'Fullstack Developer', N'FPT Software', N'Tuyển Fullstack Developer React + Node.js', 
       N'Tuyển dụng Fullstack Developer với React và Node.js. Kinh nghiệm 2+ năm, làm việc tại Hà Nội hoặc TP.HCM.', 'Active', SYSUTCDATETIME(), SYSUTCDATETIME()),
      (@rec2Id, N'Frontend Developer', N'FPT Software', N'Tuyển Frontend Developer React/TypeScript', 
       N'Tuyển dụng Frontend Developer chuyên về React và TypeScript. Kinh nghiệm 1-3 năm.', 'Active', SYSUTCDATETIME(), SYSUTCDATETIME()),
      (@rec3Id, N'Backend Developer Python', N'Viettel', N'Tuyển Backend Developer Python/Django', 
       N'Tuyển dụng Backend Developer với Python và Django. Kinh nghiệm 2+ năm, làm việc tại Hà Nội.', 'Active', SYSUTCDATETIME(), SYSUTCDATETIME());
    
    DECLARE @jobId INT = (SELECT Id FROM dbo.Jobs WHERE Title = N'Backend .NET Developer');
    DECLARE @job2Id INT = (SELECT Id FROM dbo.Jobs WHERE Title = N'Fullstack Developer');
    DECLARE @job3Id INT = (SELECT Id FROM dbo.Jobs WHERE Title = N'Frontend Developer');
    DECLARE @job4Id INT = (SELECT Id FROM dbo.Jobs WHERE Title = N'Backend Developer Python');

    -- Required Skills for Jobs
    INSERT dbo.RequiredSkills (JobId, SkillId, MustHave, Weight, Note)
    VALUES
      (@jobId, @dotnetSkillId, 1, 1.0, N'Bắt buộc'),
      (@jobId, @sqlSkillId, 1, 0.9, N'Bắt buộc'),
      (@jobId, (SELECT Id FROM dbo.Skills WHERE NormName = N'azure'), 0, 0.7, N'Ưu tiên'),
      (@job2Id, @reactSkillId, 1, 1.0, N'Bắt buộc'),
      (@job2Id, @nodejsSkillId, 1, 1.0, N'Bắt buộc'),
      (@job2Id, (SELECT Id FROM dbo.Skills WHERE NormName = N'typescript'), 0, 0.8, N'Ưu tiên'),
      (@job3Id, @reactSkillId, 1, 1.0, N'Bắt buộc'),
      (@job3Id, (SELECT Id FROM dbo.Skills WHERE NormName = N'typescript'), 1, 0.9, N'Bắt buộc'),
      (@job4Id, @pythonSkillId, 1, 1.0, N'Bắt buộc'),
      (@job4Id, (SELECT Id FROM dbo.Skills WHERE NormName = N'docker'), 0, 0.6, N'Ưu tiên');

    -- Applications
    INSERT dbo.Applications (JobId, DocumentId, CandidateId, [Status], ScoreSnapshot, Summary, CreatedAt, UpdatedAt)
    VALUES 
      (@jobId, @cvDocId, @candId, N'Pending', 85.5, N'Phù hợp .NET/SQL, kinh nghiệm trung cấp, có Azure.', SYSUTCDATETIME(), SYSUTCDATETIME()),
      (@job2Id, @cvDoc2Id, @cand2Id, N'Reviewing', 90.0, N'Rất phù hợp, kinh nghiệm React và Node.js tốt.', SYSUTCDATETIME(), SYSUTCDATETIME()),
      (@job3Id, @cvDoc2Id, @cand2Id, N'Approved', 92.5, N'Xuất sắc, chuyên về React và TypeScript.', SYSUTCDATETIME(), SYSUTCDATETIME()),
      (@job2Id, @cvDoc3Id, @cand3Id, N'Pending', 88.0, N'Phù hợp Node.js, có kinh nghiệm MongoDB.', SYSUTCDATETIME(), SYSUTCDATETIME()),
      (@job4Id, @cvDoc3Id, @cand3Id, N'Rejected', 45.0, N'Thiếu kinh nghiệm Python.', SYSUTCDATETIME(), SYSUTCDATETIME());

    -- Match Runs
    INSERT dbo.MatchRuns (DocumentId, JobId, Score, DurationMs, Explanation, CreatedAt, TraceId)
    VALUES
      (@cvDocId, @jobId, 85.5, 1250, N'CV phù hợp tốt với yêu cầu .NET và SQL. Có kinh nghiệm Azure.', SYSUTCDATETIME(), N'TRACE_' + CAST(NEWID() AS NVARCHAR(36))),
      (@cvDoc2Id, @job2Id, 90.0, 980, N'Rất phù hợp với yêu cầu Fullstack React + Node.js.', SYSUTCDATETIME(), N'TRACE_' + CAST(NEWID() AS NVARCHAR(36))),
      (@cvDoc2Id, @job3Id, 92.5, 1100, N'Xuất sắc, chuyên sâu React và TypeScript.', SYSUTCDATETIME(), N'TRACE_' + CAST(NEWID() AS NVARCHAR(36))),
      (@cvDoc3Id, @job2Id, 88.0, 1350, N'Phù hợp Node.js, có MongoDB nhưng thiếu React.', SYSUTCDATETIME(), N'TRACE_' + CAST(NEWID() AS NVARCHAR(36)));

    DECLARE @matchId1 INT = (SELECT TOP 1 Id FROM dbo.MatchRuns ORDER BY Id DESC);
    
    -- Match Evidences
    INSERT dbo.MatchEvidences (MatchId, SkillId, Snippet, ComponentScore, EvidenceType)
    VALUES
      (@matchId1, @dotnetSkillId, N'Có 2.5 năm kinh nghiệm .NET', 25.0, N'Skill'),
      (@matchId1, @sqlSkillId, N'Thành thạo SQL Server', 20.0, N'Skill'),
      (@matchId1, NULL, N'Có kinh nghiệm làm việc tại Tech Corp và StartupXYZ', 15.0, N'Experience');

    -- Recruiter Verifications
    INSERT dbo.RecruiterVerifications (RecruiterId, CompanyName, CompanyEmail, CompanyPhone, CompanyAddress, TaxCode, Status, CreatedAt)
    VALUES
      (@recId, N'Acme Corporation', N'hr@acme.local', N'0236-123-456', N'123 Đường ABC, Đà Nẵng', N'123456789', N'Approved', SYSUTCDATETIME()),
      (@rec2Id, N'FPT Software', N'hr@fptsoftware.com', N'024-7300-0000', N'17 Duy Tân, Cầu Giấy, Hà Nội', N'0100109106', N'Approved', SYSUTCDATETIME()),
      (@rec3Id, N'Viettel Group', N'hr@viettel.com', N'024-6266-6666', N'1 Giang Văn Minh, Ba Đình, Hà Nội', N'0100109107', N'Pending', SYSUTCDATETIME());

    -- License demo
    INSERT dbo.LicenseKeys (KeyHash, [Plan], IsActive, AssignedUserId, Expiry)
    VALUES 
      (N'HASH_DEMO_PRO', N'Pro', 0, NULL, NULL),
      (N'HASH_FREE_001', N'Free', 1, @candId, DATEADD(MONTH, 1, SYSUTCDATETIME())),
      (N'HASH_PRO_001', N'Pro', 1, @cand2Id, DATEADD(YEAR, 1, SYSUTCDATETIME()));

    -- Admin log demo
    INSERT dbo.AdminLogs (Actor, [Action], [Entity], EntityId, MetaJson, CreatedAt)
    VALUES 
      (N'admin@matchcv.local', N'Seed', N'All', NULL, N'{"note":"initial seed"}', SYSUTCDATETIME()),
      (N'admin@matchcv.local', N'Approve', N'RecruiterVerification', (SELECT TOP 1 Id FROM dbo.RecruiterVerifications), N'{"status":"approved"}', SYSUTCDATETIME()),
      (N'admin@matchcv.local', N'Create', N'User', @cand2Id, N'{"role":"Candidate"}', SYSUTCDATETIME());

    -- Saved CVs
    INSERT dbo.SavedCVs (Title, TemplateType, CVDataJson, UserId, CreatedAt, UpdatedAt)
    VALUES
      (N'CV Fullstack Developer', N'professional', N'{"templateType":"professional","personalInfo":{"fullName":"Jane Candidate"}}', @candId, SYSUTCDATETIME(), SYSUTCDATETIME()),
      (N'CV Frontend Developer', N'modern', N'{"templateType":"modern","personalInfo":{"fullName":"Nguyễn Văn A"}}', @cand2Id, SYSUTCDATETIME(), SYSUTCDATETIME());
END
GO

/* Update specific user CV data if missing */
DECLARE @targetEmail NVARCHAR(250) = N'de180088phannguyengiahuy@gmail.com';
DECLARE @targetUseId INT = (SELECT Id FROM dbo.Users WHERE Email = @targetEmail);

IF @targetUseId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM dbo.Documents WHERE UserId = @targetUseId)
    BEGIN
        INSERT INTO dbo.Documents (UserId, DocType, OriginalName, FileName, Status, CreatedAt, UpdatedAt, CvData, TemplateId)
        VALUES (
            @targetUseId, 
            'CV', 
            N'CV Fullstack Developer', 
            N'cv_huy.pdf', 
            'Active', 
            SYSUTCDATETIME(), 
            SYSUTCDATETIME(),
            N'{"templateType":"professional","personalInfo":{"fullName":"Phan Nguyễn Gia Huy","position":"Fullstack Developer","email":"de180088phannguyengiahuy@gmail.com","phone":"0909 123 456","address":"Da Nang, Vietnam","summary":"Lập trình viên Fullstack với kinh nghiệm làm việc với .NET và React. Đam mê công nghệ và xây dựng các sản phẩm chất lượng cao.","avatarBase64":"","website":"github.com/huyphan"},"experiences":[{"id":1,"company":"Tech Company A","position":"Intern","startDate":"01/2023","endDate":"06/2023","description":"Hỗ trợ phát triển backend với .NET Core."}],"educations":[{"id":1,"institution":"Đại học FPT","degree":"Kỹ sư phần mềm","fieldOfStudy":"CNTT","startYear":"2020","endYear":"2024"}],"skills":[{"id":1,"name":"C#","level":"Thành thạo"},{"id":2,"name":"ReactJS","level":"Thành thạo"},{"id":3,"name":"SQL Server","level":"Thành thạo"}]}',
             (SELECT TOP 1 Id FROM dbo.CVTemplates WHERE [Key] = 'professional')
        );
    END
END
GO