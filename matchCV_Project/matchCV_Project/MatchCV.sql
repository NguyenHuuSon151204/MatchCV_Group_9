CREATE DATABASE MatchCVs;
GO
USE MatchCVs;
GO

/* 1. USERS
   - Từ ERD: Users (DisplayName, EmailHash, Role, CreatedAt)
   - Từ DB cũ: Users (Email, Name, Role,...)
   -> Gộp: lưu Email (hoặc EmailHash tuỳ chiến lược), DisplayName; Role dùng cho Candidate/Recruiter/Admin
*/
IF OBJECT_ID('dbo.Users','U') IS NULL
CREATE TABLE dbo.Users (
    Id           INT IDENTITY(1,1)        PRIMARY KEY,
    DisplayName  NVARCHAR(180)            NOT NULL,
    Email        NVARCHAR(250)            NOT NULL UNIQUE,
    Role         NVARCHAR(100)            NOT NULL,      -- Candidate | Recruiter | Admin | System
    CreatedAt    DATETIME2                NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

/* 2. DOCUMENTS (CV, JD, bất kỳ file phân tích)
   - Từ ERD: Documents
   - Dùng làm bản ghi trung tâm cho CV (Candidate), Cover letter, JD text nếu muốn.
*/
IF OBJECT_ID('dbo.Documents','U') IS NULL
CREATE TABLE dbo.Documents (
    Id            INT IDENTITY(1,1) PRIMARY KEY,
    UserId        INT             NULL,                  -- owner (candidate / recruiter)
    DocType       NVARCHAR(30)    NOT NULL,              -- 'CV','JD','CL','Other'
    OriginalName  NVARCHAR(250)   NOT NULL,
    ContentType   NVARCHAR(100)   NULL,
    StoragePath   NVARCHAR(400)   NOT NULL,              -- physical/virtual path
    FileHash      NVARCHAR(128)   NULL,
    SizeBytes     INT             NULL,
    PageCount     INT             NULL,
    UploadedAt    DATETIME2       NOT NULL DEFAULT SYSUTCDATETIME(),
    IsDeleted     BIT             NOT NULL DEFAULT 0,
    CONSTRAINT FK_Documents_Users_UserId
        FOREIGN KEY (UserId) REFERENCES dbo.Users(Id) ON DELETE SET NULL
);
GO
CREATE INDEX IX_Documents_UserId    ON dbo.Documents(UserId);
CREATE INDEX IX_Documents_DocType   ON dbo.Documents(DocType);
CREATE INDEX IX_Documents_Uploaded  ON dbo.Documents(UploadedAt);
GO

/* 3. CVTemplates - mẫu CV để Make CV */
IF OBJECT_ID('dbo.CVTemplates','U') IS NULL
CREATE TABLE dbo.CVTemplates (
    Id           INT IDENTITY(1,1) PRIMARY KEY,
    [Key]        NVARCHAR(50)     NOT NULL UNIQUE,
    [Name]       NVARCHAR(180)    NOT NULL,
    [Description]NVARCHAR(300)    NULL,
    Engine       NVARCHAR(50)     NULL,            -- render engine
    TemplatePath NVARCHAR(400)    NULL,
    IsActive     BIT              NOT NULL DEFAULT 1
);
GO

/* 4. Sections & Bullets (phân tích CV/JD thành khối nhỏ) */
IF OBJECT_ID('dbo.Sections','U') IS NULL
CREATE TABLE dbo.Sections (
    Id           INT IDENTITY(1,1) PRIMARY KEY,
    DocumentId   INT              NOT NULL,
    SectionType  NVARCHAR(50)     NOT NULL,       -- Summary, Experience, Education,...
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

/* 6. Exports - lưu file xuất PDF/Doc */
IF OBJECT_ID('dbo.Exports','U') IS NULL
CREATE TABLE dbo.Exports (
    Id           INT IDENTITY(1,1) PRIMARY KEY,
    DocumentId   INT            NOT NULL,
    TemplateId   INT            NULL,
    OutFormat    NVARCHAR(30)   NOT NULL,          -- pdf/docx/...
    OutputPath   NVARCHAR(400)  NOT NULL,
    Engine       NVARCHAR(50)   NULL,
    CreatedAt    DATETIME2      NOT NULL DEFAULT SYSUTCDATETIME(),
    [Status]     NVARCHAR(30)   NOT NULL DEFAULT N'Success', -- Success/Failed
    ErrorMsg     NVARCHAR(200)  NULL,
    CONSTRAINT FK_Exports_Documents
        FOREIGN KEY (DocumentId) REFERENCES dbo.Documents(Id) ON DELETE CASCADE,
    CONSTRAINT FK_Exports_CVTemplates
        FOREIGN KEY (TemplateId) REFERENCES dbo.CVTemplates(Id) ON DELETE SET NULL
);
GO

/* 7. Skills & DocumentSkills */
IF OBJECT_ID('dbo.Skills','U') IS NULL
CREATE TABLE dbo.Skills (
    Id         INT IDENTITY(1,1) PRIMARY KEY,
    [Name]     NVARCHAR(180) NOT NULL,
    NormName   NVARCHAR(180) NOT NULL,
    Category   NVARCHAR(80)  NULL
);
GO
CREATE UNIQUE INDEX IX_Skills_NormName ON dbo.Skills(NormName);
GO

IF OBJECT_ID('dbo.DocumentSkills','U') IS NULL
CREATE TABLE dbo.DocumentSkills (
    Id          INT IDENTITY(1,1) PRIMARY KEY,
    DocumentId  INT           NOT NULL,
    SkillId     INT           NOT NULL,
    Source      NVARCHAR(30)  NOT NULL,           -- 'Section','Bullet','LLM'
    Years       FLOAT         NULL,
    Confidence  FLOAT         NULL,
    CONSTRAINT FK_DocumentSkills_Documents
        FOREIGN KEY (DocumentId) REFERENCES dbo.Documents(Id) ON DELETE CASCADE,
    CONSTRAINT FK_DocumentSkills_Skills
        FOREIGN KEY (SkillId) REFERENCES dbo.Skills(Id) ON DELETE CASCADE
);
GO
CREATE INDEX IX_DocumentSkills_DocumentId ON dbo.DocumentSkills(DocumentId);
CREATE INDEX IX_DocumentSkills_SkillId    ON dbo.DocumentSkills(SkillId);
GO

/* 8. Jobs (JD) - từ ERD và script JDs gốc -> gộp tại đây */
IF OBJECT_ID('dbo.Jobs','U') IS NULL
CREATE TABLE dbo.Jobs (
    Id            INT IDENTITY(1,1) PRIMARY KEY,
    UserId        INT            NOT NULL,               -- recruiter owner
    Title         NVARCHAR(200)  NOT NULL,
    Company       NVARCHAR(150)  NOT NULL,
    RawText       NVARCHAR(MAX)  NULL,                  -- JD content / mô tả
    CreatedAt     DATETIME2      NOT NULL DEFAULT SYSUTCDATETIME(),
    MustHaveCheck NVARCHAR(MAX)  NULL,
    CONSTRAINT FK_Jobs_Users
        FOREIGN KEY (UserId) REFERENCES dbo.Users(Id) ON DELETE CASCADE
);
GO
CREATE INDEX IX_Jobs_UserId ON dbo.Jobs(UserId);
GO

/* 9. RequiredSkills - yêu cầu kỹ năng cho JD/Job */
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

/* 10. Applications - Candidate apply CV (Document) vào Job
       (kế thừa bảng Applications cũ) */
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
        FOREIGN KEY (DocumentId) REFERENCES dbo.Documents(Id) ON DELETE NO ACTION,
    CONSTRAINT FK_Applications_Users
        FOREIGN KEY (CandidateId) REFERENCES dbo.Users(Id) ON DELETE NO ACTION
);
GO
CREATE INDEX IX_Applications_JobId       ON dbo.Applications(JobId);
CREATE INDEX IX_Applications_CandidateId ON dbo.Applications(CandidateId);
GO

/* 11. MatchRuns - kết quả chạy AI match CV ↔ JD */
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

/* 12. MatchEvidences - giải thích vì sao match (theo ERD) */
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

/* 13. MissingItems - skill bắt buộc nhưng thiếu */
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

/* 14. RewriteSuggestions - gợi ý chỉnh sửa bullet/câu */
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
        FOREIGN KEY (BulletId) REFERENCES dbo.Bullets(Id) ON DELETE SET NULL
);
GO

/* 15. Experiences & Education (từ script team 2) */
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
    CONSTRAINT FK_Experiences_Documents
        FOREIGN KEY (DocumentId) REFERENCES dbo.Documents(Id) ON DELETE CASCADE
);
GO

IF OBJECT_ID('dbo.Education','U') IS NULL
CREATE TABLE dbo.Education (
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
    CONSTRAINT FK_Education_Documents
        FOREIGN KEY (DocumentId) REFERENCES dbo.Documents(Id) ON DELETE CASCADE
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

------------------------------------------------------------
-- SEED DEMO (có thể chỉnh lại tuỳ môi trường)
------------------------------------------------------------
IF NOT EXISTS (SELECT 1 FROM dbo.Users)
BEGIN
    INSERT dbo.Users (DisplayName, Email, Role) VALUES
      (N'System Admin', N'admin@matchcv.local', N'Admin'),
      (N'Acme HR',      N'hr@acme.local',       N'Recruiter'),
      (N'Jane Candidate',N'candidate@demo.local',N'Candidate');

    DECLARE @candId INT = (SELECT Id FROM dbo.Users WHERE Email=N'candidate@demo.local');
    DECLARE @recId  INT = (SELECT Id FROM dbo.Users WHERE Email=N'hr@acme.local');

    -- CV Document
    INSERT dbo.Documents (UserId, DocType, OriginalName, ContentType, StoragePath, SizeBytes, PageCount)
    VALUES (@candId, 'CV', N'JaneCV.pdf', N'application/pdf', N'uploads/cv/jane.pdf', 123456, 2);

    DECLARE @cvDocId INT = SCOPE_IDENTITY();

    -- Simple Skills
    INSERT dbo.Skills ([Name], NormName, Category) VALUES
      (N'.NET', N'.net', N'Backend'),
      (N'SQL',  N'sql',  N'Database'),
      (N'Azure',N'azure',N'Cloud');

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
