-- ======================================
-- MATCHCV - MERGED VERSION (FULL)
-- ======================================

CREATE DATABASE MatchCV;
GO
USE MatchCV;
GO

/* 1. USERS - merged version */
IF OBJECT_ID('dbo.Users','U') IS NULL
CREATE TABLE dbo.Users (
    Id           INT IDENTITY(1,1) PRIMARY KEY,
    DisplayName  NVARCHAR(180) NOT NULL,
    Email        NVARCHAR(250) NOT NULL,  -- merge EmailAddress -> Email
    Role         NVARCHAR(100) NOT NULL,
    Password     NVARCHAR(100) NOT NULL,  -- kept from File 1
    Verified     BIT NOT NULL DEFAULT 0,  -- kept from File 1
    CreatedAt    DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt    DATETIME2 NULL,
    IsActive     BIT NOT NULL DEFAULT 1,
    IsDeleted    BIT NOT NULL DEFAULT 0
);
GO
CREATE UNIQUE INDEX UQ_Users_Email ON dbo.Users(Email);
GO

/* 2. JOBS */
IF OBJECT_ID('dbo.Jobs','U') IS NULL
CREATE TABLE dbo.Jobs (
    Id              INT IDENTITY(1,1) PRIMARY KEY,
    UserId          INT NOT NULL,
    Title           NVARCHAR(200) NOT NULL,
    Company         NVARCHAR(200) NULL,
    RawText         NVARCHAR(MAX) NULL,
    JobDescription  NVARCHAR(MAX) NULL,
    [Status]        NVARCHAR(30) NOT NULL DEFAULT 'Active',
    Deadline        DATETIME2 NULL,
    MaxApplicants   INT NULL,
    CreatedAt       DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt       DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Jobs_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(Id)
);
GO
CREATE INDEX IX_Jobs_UserId ON dbo.Jobs(UserId);
GO

/* 2. DOCUMENTS */
IF OBJECT_ID('dbo.Documents','U') IS NULL
CREATE TABLE dbo.Documents (
    Id            INT IDENTITY(1,1) PRIMARY KEY,
    UserId        INT NULL,
    CvTemplateId    INT NULL,
    DocType       NVARCHAR(30) NOT NULL,
    OriginalName  NVARCHAR(250) NOT NULL,
    FileName      NVARCHAR(255) NULL,
    Content       NVARCHAR(4000) NULL,
    ContentType   NVARCHAR(100) NULL,
    StoragePath   NVARCHAR(400) NULL,
    FileHash      NVARCHAR(128) NULL,
    FileSize      BIGINT NULL,
    PageCount     INT NULL,
    AiConfidence  FLOAT NULL,
    TotalScore    FLOAT NULL,
    Status        NVARCHAR(50) NOT NULL DEFAULT 'Draft',
    CreatedAt     DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt     DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CvData        NVARCHAR(MAX) NULL,
    IsDeleted     BIT NOT NULL DEFAULT 0,
    CONSTRAINT FK_Documents_Users 
        FOREIGN KEY (UserId) REFERENCES dbo.Users(Id)
);
GO

CREATE INDEX IX_Documents_DocType ON dbo.Documents(DocType);
CREATE INDEX IX_Documents_Uploaded ON dbo.Documents(CreatedAt);
CREATE INDEX IX_Documents_UserId ON dbo.Documents(UserId);
GO

/* 3. CVTemplates */
IF OBJECT_ID('dbo.CVTemplates','U') IS NULL
CREATE TABLE dbo.CVTemplates (
    Id              INT IDENTITY(1,1) PRIMARY KEY,
    [Key]           NVARCHAR(50) NOT NULL,
    [Name]          NVARCHAR(180) NOT NULL,
    [Description]   NVARCHAR(300) NULL,
    Engine          NVARCHAR(50) NULL DEFAULT ('razor'),
    TemplatePath    NVARCHAR(400) NULL DEFAULT (''),
    IsActive        BIT NOT NULL DEFAULT 1,
    ThumbnailUrl    NVARCHAR(500) NULL,
    PreviewImageUrl NVARCHAR(500) NULL,
    ProfileImageUrl NVARCHAR(500) NULL,
    FullName        NVARCHAR(100) NULL,
    Email           NVARCHAR(100) NULL,
    Phone           NVARCHAR(20) NULL,
    Address         NVARCHAR(500) NULL,
    CVData          NVARCHAR(MAX) NULL,
    CreatedAt       DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt       DATETIME2 NULL
);
GO
CREATE UNIQUE INDEX UQ_CVTemplates_Key ON dbo.CVTemplates([Key]);
GO

ALTER TABLE dbo.Documents
ADD CONSTRAINT FK_Documents_CVTemplates
    FOREIGN KEY (CvTemplateId) REFERENCES dbo.CVTemplates(Id);
GO

/* 4. SECTIONS */
IF OBJECT_ID('dbo.Sections','U') IS NULL
CREATE TABLE dbo.Sections (
    Id           INT IDENTITY(1,1) PRIMARY KEY,
    DocumentId   INT NOT NULL,
    SectionType  NVARCHAR(50) NOT NULL,
    Ord          INT NOT NULL,
    RawText      NVARCHAR(MAX) NULL,
    CONSTRAINT FK_Sections_Documents
        FOREIGN KEY (DocumentId) REFERENCES dbo.Documents(Id) ON DELETE CASCADE
);
GO

/* 5. BULLETS */
IF OBJECT_ID('dbo.Bullets','U') IS NULL
CREATE TABLE dbo.Bullets (
    Id           INT IDENTITY(1,1) PRIMARY KEY,
    SectionId    INT NOT NULL,
    Ord          INT NOT NULL,
    [Text]       NVARCHAR(MAX) NOT NULL,
    CONSTRAINT FK_Bullets_Sections
        FOREIGN KEY (SectionId) REFERENCES dbo.Sections(Id) ON DELETE CASCADE
);
GO

/* 6. OCRResults */
IF OBJECT_ID('dbo.OCRResults','U') IS NULL
CREATE TABLE dbo.OCRResults (
    Id           INT IDENTITY(1,1) PRIMARY KEY,
    DocumentId   INT NOT NULL,
    Engine       NVARCHAR(50) NOT NULL,
    AvgConfidence FLOAT NULL,
    TextBlob     NVARCHAR(MAX) NULL,
    CreatedAt    DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_OCRResults_Documents
        FOREIGN KEY (DocumentId) REFERENCES dbo.Documents(Id) ON DELETE CASCADE
);
GO

/* 7. Exports */
IF OBJECT_ID('dbo.Exports','U') IS NULL
CREATE TABLE dbo.Exports (
    Id           INT IDENTITY(1,1) PRIMARY KEY,
    DocumentId   INT NOT NULL,
    TemplateId   INT NULL,
    OutFormat    NVARCHAR(30) NOT NULL,
    OutputPath   NVARCHAR(400) NOT NULL,
    Engine       NVARCHAR(50) NULL,
    CreatedAt    DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    [Status]     NVARCHAR(30) NOT NULL,
    ErrorMsg     NVARCHAR(200) NULL,
    CONSTRAINT FK_Exports_Documents
        FOREIGN KEY (DocumentId) REFERENCES dbo.Documents(Id) ON DELETE CASCADE,
    CONSTRAINT FK_Exports_CVTemplates
        FOREIGN KEY (TemplateId) REFERENCES dbo.CVTemplates(Id)
);
GO

/* 8. Skills */
IF OBJECT_ID('dbo.Skills','U') IS NULL
CREATE TABLE dbo.Skills (
    Id            INT IDENTITY(1,1) PRIMARY KEY,
    [Name]        NVARCHAR(180) NOT NULL,
    NormName      NVARCHAR(180) NOT NULL,
    Category      NVARCHAR(80)  NULL,
    CreatedAt     DATETIME2     NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt     DATETIME2     NOT NULL DEFAULT SYSUTCDATETIME(),
    IsDeleted     BIT NOT NULL DEFAULT 0
);
GO

/* 9. DocumentSkills */
IF OBJECT_ID('dbo.DocumentSkills','U') IS NULL
CREATE TABLE dbo.DocumentSkills (
    Id              INT IDENTITY(1,1) PRIMARY KEY,
    DocumentId      INT NOT NULL,
    SkillId         INT NOT NULL,
    Source          NVARCHAR(30) NOT NULL DEFAULT 'User',
    Years           FLOAT NULL,
    YearsExperience FLOAT NULL,
    Proficiency     NVARCHAR(50) NULL,
    Confidence      FLOAT NULL,
    CreatedAt       DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_DocumentSkills_Documents
        FOREIGN KEY (DocumentId) REFERENCES dbo.Documents(Id) ON DELETE CASCADE,
    CONSTRAINT FK_DocumentSkills_Skills
        FOREIGN KEY (SkillId) REFERENCES dbo.Skills(Id) ON DELETE CASCADE
);
GO

/* 10. Experiences */
IF OBJECT_ID('dbo.Experiences','U') IS NULL
CREATE TABLE dbo.Experiences (
    Id               INT IDENTITY(1,1) PRIMARY KEY,
    DocumentId       INT NOT NULL,
    JobTitle         NVARCHAR(200) NOT NULL,
    CompanyName      NVARCHAR(200) NOT NULL,
    IndustryName     NVARCHAR(150) NULL,
    StartDate        DATE NULL,
    EndDate          DATE NULL,
    CurrentlyWorking BIT NOT NULL DEFAULT 0,
    [Description]    NVARCHAR(MAX) NULL,
    CreatedAt        DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Experiences_Documents
        FOREIGN KEY (DocumentId) REFERENCES dbo.Documents(Id) ON DELETE CASCADE
);
GO

/* 11. Educations */
IF OBJECT_ID('dbo.Educations','U') IS NULL
CREATE TABLE dbo.Educations (
    Id            INT IDENTITY(1,1) PRIMARY KEY,
    DocumentId    INT NOT NULL,
    Degree        NVARCHAR(150) NOT NULL,
    FieldOfStudy  NVARCHAR(150) NULL,
    SchoolName    NVARCHAR(200) NOT NULL,
    StartDate     DATE NULL,
    EndDate       DATE NULL,
    Score         FLOAT NULL,
    Activities    NVARCHAR(MAX) NULL,
    [Description] NVARCHAR(MAX) NULL,
    CreatedAt     DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Education_Documents
        FOREIGN KEY (DocumentId) REFERENCES dbo.Documents(Id) ON DELETE CASCADE
);
GO

/* 12. Jobs */
IF OBJECT_ID('dbo.Jobs','U') IS NULL
CREATE TABLE dbo.Jobs (
    Id              INT IDENTITY(1,1) PRIMARY KEY,
    UserId          INT NOT NULL,
    Title           NVARCHAR(200) NOT NULL,
    Company         NVARCHAR(200) NOT NULL,
    RawText         NVARCHAR(MAX) NULL,
    JobDescription  NVARCHAR(MAX) NULL,
    [Status]        NVARCHAR(50) NOT NULL DEFAULT 'Active',
    CreatedAt       DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt       DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Jobs_Users
        FOREIGN KEY (UserId) REFERENCES dbo.Users(Id) ON DELETE CASCADE
);
GO

/* 13. RequiredSkills */
IF OBJECT_ID('dbo.RequiredSkills','U') IS NULL
CREATE TABLE dbo.RequiredSkills (
    Id           INT IDENTITY(1,1) PRIMARY KEY,
    JobId        INT NOT NULL,
    SkillId      INT NOT NULL,
    MustHave     BIT NOT NULL DEFAULT 0,
    Weight       FLOAT NULL,
    Note         NVARCHAR(200) NULL,
    CONSTRAINT FK_RequiredSkills_Jobs
        FOREIGN KEY (JobId) REFERENCES dbo.Jobs(Id) ON DELETE CASCADE,
    CONSTRAINT FK_RequiredSkills_Skills
        FOREIGN KEY (SkillId) REFERENCES dbo.Skills(Id) ON DELETE CASCADE
);
GO

/* 14. Applications */
IF OBJECT_ID('dbo.Applications','U') IS NULL
CREATE TABLE dbo.Applications (
    Id            INT IDENTITY(1,1) PRIMARY KEY,
    JobId         INT NOT NULL,
    DocumentId    INT NOT NULL,
    CandidateId   INT NOT NULL,
    [Status]      NVARCHAR(30) NOT NULL DEFAULT N'Pending',
    ScoreSnapshot FLOAT NULL,
    Summary       NVARCHAR(MAX) NULL,
    CreatedAt     DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt     DATETIME2 NULL,
    CONSTRAINT FK_Applications_Jobs
        FOREIGN KEY (JobId) REFERENCES dbo.Jobs(Id) ON DELETE CASCADE,
    CONSTRAINT FK_Applications_Documents
        FOREIGN KEY (DocumentId) REFERENCES dbo.Documents(Id) ON DELETE CASCADE,
    CONSTRAINT FK_Applications_Users
        FOREIGN KEY (CandidateId) REFERENCES dbo.Users(Id)
);
GO

/* 15. MatchRuns */
IF OBJECT_ID('dbo.MatchRuns','U') IS NULL
CREATE TABLE dbo.MatchRuns (
    Id            INT IDENTITY(1,1) PRIMARY KEY,
    DocumentId    INT NOT NULL,
    JobId         INT NOT NULL,
    Score         FLOAT NOT NULL,
    DurationMs    INT NULL,
    Explanation   NVARCHAR(MAX) NULL,
    CreatedAt     DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    TraceId       NVARCHAR(180) NULL,
    CONSTRAINT FK_MatchRuns_Documents
        FOREIGN KEY (DocumentId) REFERENCES dbo.Documents(Id) ON DELETE CASCADE,
    CONSTRAINT FK_MatchRuns_Jobs
        FOREIGN KEY (JobId) REFERENCES dbo.Jobs(Id) ON DELETE CASCADE
);
GO

/* 16. MatchEvidences */
IF OBJECT_ID('dbo.MatchEvidences','U') IS NULL
CREATE TABLE dbo.MatchEvidences (
    Id           INT IDENTITY(1,1) PRIMARY KEY,
    MatchId      INT NOT NULL,
    SkillId      INT NULL,
    Snippet      NVARCHAR(MAX) NULL,
    ComponentScore FLOAT NULL,
    EvidenceType NVARCHAR(30) NULL,
    CONSTRAINT FK_MatchEvidences_MatchRuns
        FOREIGN KEY (MatchId) REFERENCES dbo.MatchRuns(Id) ON DELETE CASCADE,
    CONSTRAINT FK_MatchEvidences_Skills
        FOREIGN KEY (SkillId) REFERENCES dbo.Skills(Id) ON DELETE SET NULL
);
GO

/* 17. MissingItems */
IF OBJECT_ID('dbo.MissingItems','U') IS NULL
CREATE TABLE dbo.MissingItems (
    Id           INT IDENTITY(1,1) PRIMARY KEY,
    MatchId      INT NOT NULL,
    SkillId      INT NULL,
    MissingKeyword NVARCHAR(180) NULL,
    Reason       NVARCHAR(300) NULL,
    Suggestion   NVARCHAR(300) NULL,
    MustHave     BIT NOT NULL DEFAULT 0,
    CONSTRAINT FK_MissingItems_MatchRuns
        FOREIGN KEY (MatchId) REFERENCES dbo.MatchRuns(Id) ON DELETE CASCADE,
    CONSTRAINT FK_MissingItems_Skills
        FOREIGN KEY (SkillId) REFERENCES dbo.Skills(Id) ON DELETE SET NULL
);
GO

/* 18. RewriteSuggestions */
IF OBJECT_ID('dbo.RewriteSuggestions','U') IS NULL
CREATE TABLE dbo.RewriteSuggestions (
    Id              INT IDENTITY(1,1) PRIMARY KEY,
    MatchId         INT NOT NULL,
    BulletId        INT NULL,
    SuggestedText   NVARCHAR(MAX) NOT NULL,
    Rationale       NVARCHAR(MAX) NULL,
    Accepted        BIT NOT NULL DEFAULT 0,
    CreatedAt       DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    AcceptedAt      DATETIME2 NULL,
    CONSTRAINT FK_RewriteSuggestions_MatchRuns
        FOREIGN KEY (MatchId) REFERENCES dbo.MatchRuns(Id) ON DELETE CASCADE,
    CONSTRAINT FK_RewriteSuggestions_Bullets
        FOREIGN KEY (BulletId) REFERENCES dbo.Bullets(Id)
);
GO

/* 19. Embeddings */
IF OBJECT_ID('dbo.Embeddings','U') IS NULL
CREATE TABLE dbo.Embeddings (
    Id        INT IDENTITY(1,1) PRIMARY KEY,
    Dim       INT NOT NULL,
    Model     NVARCHAR(80) NOT NULL,
    Vector    VARBINARY(MAX) NOT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

/* 20. EmbeddingOwnership */
IF OBJECT_ID('dbo.EmbeddingOwnership','U') IS NULL
CREATE TABLE dbo.EmbeddingOwnership (
    Id           INT IDENTITY(1,1) PRIMARY KEY,
    EmbeddingId  INT NOT NULL,
    OwnerType    NVARCHAR(30) NOT NULL,
    OwnerId      INT NOT NULL,
    CONSTRAINT FK_EmbeddingOwnership_Embeddings
        FOREIGN KEY (EmbeddingId) REFERENCES dbo.Embeddings(Id) ON DELETE CASCADE
);
GO

/* 21. EmbeddingCache */
IF OBJECT_ID('dbo.EmbeddingCache','U') IS NULL
CREATE TABLE dbo.EmbeddingCache (
    Id        INT IDENTITY(1,1) PRIMARY KEY,
    InputHash NVARCHAR(128) NOT NULL UNIQUE,
    Model     NVARCHAR(80) NOT NULL,
    Dim       INT NOT NULL,
    Vector    VARBINARY(MAX) NOT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

/* 22. APICallLogs */
IF OBJECT_ID('dbo.APICallLogs','U') IS NULL
CREATE TABLE dbo.APICallLogs (
    Id          INT IDENTITY(1,1) PRIMARY KEY,
    Provider    NVARCHAR(50) NOT NULL,
    Model       NVARCHAR(80) NOT NULL,
    Endpoint    NVARCHAR(180) NOT NULL,
    TokensIn    INT NULL,
    TokensOut   INT NULL,
    CostEstimate FLOAT NULL,
    LatencyMs   INT NULL,
    [Status]    NVARCHAR(30) NOT NULL,
    CreatedAt   DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    TraceId     NVARCHAR(180) NULL
);
GO

/* 23. APISettings */
IF OBJECT_ID('dbo.APISettings','U') IS NULL
CREATE TABLE dbo.APISettings (
    Id        INT IDENTITY(1,1) PRIMARY KEY,
    Provider  NVARCHAR(50) NOT NULL,
    Model     NVARCHAR(80) NOT NULL,
    Endpoint  NVARCHAR(180) NOT NULL,
    ApiKey    NVARCHAR(256) NOT NULL,
    IsActive  BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

/* 24. LicenseKeys */
IF OBJECT_ID('dbo.LicenseKeys','U') IS NULL
CREATE TABLE dbo.LicenseKeys (
    Id             INT IDENTITY(1,1) PRIMARY KEY,
    KeyHash        NVARCHAR(200) NOT NULL UNIQUE,
    [Plan]         NVARCHAR(30) NOT NULL DEFAULT N'Free',
    Expiry         DATETIME2 NULL,
    IsActive       BIT NOT NULL DEFAULT 0,
    AssignedUserId INT NULL,
    CreatedAt      DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_LicenseKeys_Users
        FOREIGN KEY (AssignedUserId) REFERENCES dbo.Users(Id) ON DELETE SET NULL
);
GO

/* 25. AdminLogs */
IF OBJECT_ID('dbo.AdminLogs','U') IS NULL
CREATE TABLE dbo.AdminLogs (
    Id        INT IDENTITY(1,1) PRIMARY KEY,
    Actor     NVARCHAR(200) NOT NULL,
    [Action]  NVARCHAR(100) NOT NULL,
    [Entity]  NVARCHAR(100) NOT NULL,
    EntityId  INT NULL,
    MetaJson  NVARCHAR(MAX) NOT NULL DEFAULT N'{}',
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

/* 26. SavedCVs */
IF OBJECT_ID('dbo.SavedCVs','U') IS NULL
CREATE TABLE dbo.SavedCVs (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(200) NOT NULL,
    TemplateType NVARCHAR(50) NOT NULL,
    CVDataJson NVARCHAR(MAX) NOT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UserId INT NULL,
    CONSTRAINT FK_SavedCVs_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(Id)
);
GO

/* 27. EmailVerificationTokens - from File 1 */
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
