CREATE DATABASE MatchCV1;
GO
USE MatchCV1;
GO

/* 1. USERS
   - Matches matchCV_Project.Models.User
*/
IF OBJECT_ID('dbo.Users','U') IS NULL
CREATE TABLE dbo.Users (
    Id           INT IDENTITY(1,1)        PRIMARY KEY,
    DisplayName  NVARCHAR(180)            NOT NULL,
    EmailAddress NVARCHAR(250)            NOT NULL,
    Role         NVARCHAR(100)            NOT NULL,      -- Candidate | Recruiter | Admin | System
    CreatedAt    DATETIME2                NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt    DATETIME2                NULL,
    IsActive     BIT                      NOT NULL DEFAULT 1,
    IsDeleted    BIT                      NOT NULL DEFAULT 0
);
GO
CREATE UNIQUE INDEX UQ__Users__A9D10534A0824C3B ON dbo.Users(EmailAddress);
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

------------------------------------------------------------
-- SEED DATA
------------------------------------------------------------
IF NOT EXISTS (SELECT 1 FROM dbo.Users)
BEGIN
    INSERT dbo.Users (DisplayName, EmailAddress, Role) VALUES
      (N'System Admin', N'admin@matchcv.local', N'Admin'),
      (N'Acme HR',      N'hr@acme.local',       N'Recruiter'),
      (N'Jane Candidate',N'candidate@demo.local',N'Candidate');

    DECLARE @candId INT = (SELECT Id FROM dbo.Users WHERE EmailAddress=N'candidate@demo.local');
    DECLARE @recId  INT = (SELECT Id FROM dbo.Users WHERE EmailAddress=N'hr@acme.local');
    DECLARE @adminId INT = (SELECT Id FROM dbo.Users WHERE EmailAddress=N'admin@matchcv.local');

    -- CV Document (Assign to Admin for testing)
    INSERT dbo.Documents (UserId, DocType, OriginalName, FileName, ContentType, StoragePath, FileSize, PageCount, Status, CreatedAt, UpdatedAt)
    VALUES (@adminId, 'CV', N'JaneCV.pdf', N'JaneCV.pdf', N'application/pdf', N'uploads/cv/jane.pdf', 123456, 2, 'Active', SYSUTCDATETIME(), SYSUTCDATETIME());
    DECLARE @cvDocId INT = SCOPE_IDENTITY();

    -- Simple Skills
    INSERT dbo.Skills ([Name], NormName, Category, CreatedAt, UpdatedAt, IsDeleted) VALUES
      (N'.NET', N'.net', N'Backend', SYSUTCDATETIME(), SYSUTCDATETIME(), 0),
      (N'SQL',  N'sql',  N'Database', SYSUTCDATETIME(), SYSUTCDATETIME(), 0),
      (N'Azure',N'azure',N'Cloud', SYSUTCDATETIME(), SYSUTCDATETIME(), 0);
      
    -- Templates
    INSERT INTO dbo.CVTemplates ([Key], [Name], [Description], [ThumbnailUrl], [IsActive], [CreatedAt])
    VALUES 
    ('professional', N'Mẫu Chuyên Nghiệp', N'Thiết kế chuyên nghiệp với tông màu đỏ nổi bật, bố cục sidebar hiện đại.', '/images/templates/professional-thumbnail.jpg', 1, SYSUTCDATETIME()),
    ('modern', N'Mẫu Hiện Đại', N'Thiết kế hiện đại với tông màu tím sang trọng, header tập trung và bố cục lưới.', '/images/templates/modern-thumbnail.jpg', 1, SYSUTCDATETIME()),
    ('formal', N'Mẫu Truyền Thống', N'Thiết kế truyền thống, đơn giản, tối giản màu sắc, phù hợp môi trường trang trọng.', '/images/templates/formal-thumbnail.jpg', 1, SYSUTCDATETIME());

    -- Job
    INSERT dbo.Jobs (UserId, Title, Company, RawText)
    VALUES (@recId, N'Backend .NET Developer', N'Acme',
            N'Tìm dev .NET, SQL, Azure, làm việc tại Đà Nẵng.');
    DECLARE @jobId INT = SCOPE_IDENTITY();

    -- Required skills
    INSERT dbo.RequiredSkills (JobId, SkillId, MustHave, Weight)
    SELECT @jobId, Id, 1, 1.0 FROM dbo.Skills;

    -- Application
    INSERT dbo.Applications (JobId, DocumentId, CandidateId, [Status], ScoreSnapshot, Summary)
    VALUES (@jobId, @cvDocId, @candId, N'Pending', 75,
            N'Phù hợp .NET/SQL, kinh nghiệm trung cấp.');

    -- License demo
    INSERT dbo.LicenseKeys (KeyHash, [Plan], IsActive)
    VALUES (N'HASH_DEMO_PRO', N'Pro', 0);

    -- Admin log demo
    INSERT dbo.AdminLogs (Actor, [Action], [Entity], MetaJson)
    VALUES (N'admin@matchcv.local', N'Seed', N'All', N'{"note":"initial seed"}');
END
GO
