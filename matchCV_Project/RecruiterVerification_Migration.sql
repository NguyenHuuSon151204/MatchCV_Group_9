-- Migration script for RecruiterVerification table
-- Run this script on your MatchCV database

USE MatchCV;
GO

-- Drop existing table if it exists (in case of previous failed migration)
IF OBJECT_ID('dbo.RecruiterVerifications','U') IS NOT NULL
BEGIN
    -- Drop foreign key constraints first
    IF OBJECT_ID('dbo.FK_RecruiterVerification_Users_Recruiter', 'F') IS NOT NULL
        ALTER TABLE dbo.RecruiterVerifications DROP CONSTRAINT FK_RecruiterVerification_Users_Recruiter;
    
    IF OBJECT_ID('dbo.FK_RecruiterVerification_Documents_BusinessLicense', 'F') IS NOT NULL
        ALTER TABLE dbo.RecruiterVerifications DROP CONSTRAINT FK_RecruiterVerification_Documents_BusinessLicense;
    
    IF OBJECT_ID('dbo.FK_RecruiterVerification_Documents_CompanyProof', 'F') IS NOT NULL
        ALTER TABLE dbo.RecruiterVerifications DROP CONSTRAINT FK_RecruiterVerification_Documents_CompanyProof;
    
    IF OBJECT_ID('dbo.FK_RecruiterVerification_Users_Admin', 'F') IS NOT NULL
        ALTER TABLE dbo.RecruiterVerifications DROP CONSTRAINT FK_RecruiterVerification_Users_Admin;
    
    -- Drop check constraint if exists
    IF OBJECT_ID('dbo.CK_RecruiterVerification_Status', 'C') IS NOT NULL
        ALTER TABLE dbo.RecruiterVerifications DROP CONSTRAINT CK_RecruiterVerification_Status;
    
    -- Drop indexes
    IF EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_RecruiterVerification_RecruiterId' AND object_id = OBJECT_ID('dbo.RecruiterVerifications'))
        DROP INDEX IX_RecruiterVerification_RecruiterId ON dbo.RecruiterVerifications;
    
    IF EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_RecruiterVerification_Status' AND object_id = OBJECT_ID('dbo.RecruiterVerifications'))
        DROP INDEX IX_RecruiterVerification_Status ON dbo.RecruiterVerifications;
    
    IF EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_RecruiterVerification_CreatedAt' AND object_id = OBJECT_ID('dbo.RecruiterVerifications'))
        DROP INDEX IX_RecruiterVerification_CreatedAt ON dbo.RecruiterVerifications;
    
    -- Drop table
    DROP TABLE dbo.RecruiterVerifications;
    
    PRINT 'Existing RecruiterVerifications table dropped.';
END
GO

-- Drop triggers if exist
IF OBJECT_ID('dbo.TR_RecruiterVerification_DocumentDelete', 'TR') IS NOT NULL
BEGIN
    DROP TRIGGER dbo.TR_RecruiterVerification_DocumentDelete;
    PRINT 'Existing document deletion trigger dropped.';
END

IF OBJECT_ID('dbo.TR_RecruiterVerification_AdminDelete', 'TR') IS NOT NULL
BEGIN
    DROP TRIGGER dbo.TR_RecruiterVerification_AdminDelete;
    PRINT 'Existing admin deletion trigger dropped.';
END
GO

-- Create RecruiterVerification table
IF OBJECT_ID('dbo.RecruiterVerifications','U') IS NULL
BEGIN
    CREATE TABLE dbo.RecruiterVerifications (
        Id                          INT IDENTITY(1,1) PRIMARY KEY,
        RecruiterId                 INT             NOT NULL,
        CompanyName                 NVARCHAR(200)    NOT NULL,
        CompanyEmail                NVARCHAR(250)    NOT NULL,
        CompanyPhone                NVARCHAR(50)     NULL,
        CompanyAddress              NVARCHAR(200)    NULL,
        TaxCode                     NVARCHAR(50)     NULL,
        BusinessLicenseDocumentId   INT              NULL,
        CompanyProofDocumentId      INT              NULL,
        Status                      NVARCHAR(30)     NOT NULL DEFAULT N'Pending',  -- Pending, Approved, Rejected
        AdminNotes                  NVARCHAR(500)    NULL,
        ReviewedByAdminId           INT              NULL,
        ReviewedAt                  DATETIME2        NULL,
        CreatedAt                   DATETIME2        NOT NULL DEFAULT SYSUTCDATETIME(),
        UpdatedAt                   DATETIME2        NULL,
        
        CONSTRAINT FK_RecruiterVerification_Users_Recruiter
            FOREIGN KEY (RecruiterId) REFERENCES dbo.Users(Id) ON DELETE CASCADE,
        
        CONSTRAINT FK_RecruiterVerification_Documents_BusinessLicense
            FOREIGN KEY (BusinessLicenseDocumentId) REFERENCES dbo.Documents(Id) ON DELETE NO ACTION,
        
        CONSTRAINT FK_RecruiterVerification_Documents_CompanyProof
            FOREIGN KEY (CompanyProofDocumentId) REFERENCES dbo.Documents(Id) ON DELETE NO ACTION,
        
        CONSTRAINT FK_RecruiterVerification_Users_Admin
            FOREIGN KEY (ReviewedByAdminId) REFERENCES dbo.Users(Id) ON DELETE NO ACTION
    );
    
    -- Create indexes for better query performance
    CREATE INDEX IX_RecruiterVerification_RecruiterId ON dbo.RecruiterVerifications(RecruiterId);
    CREATE INDEX IX_RecruiterVerification_Status ON dbo.RecruiterVerifications(Status);
    CREATE INDEX IX_RecruiterVerification_CreatedAt ON dbo.RecruiterVerifications(CreatedAt);
    
    PRINT 'RecruiterVerifications table created successfully.';
END
ELSE
BEGIN
    PRINT 'RecruiterVerifications table already exists.';
END
GO

-- Add check constraint for Status values
IF NOT EXISTS (SELECT * FROM sys.check_constraints WHERE name = 'CK_RecruiterVerification_Status')
BEGIN
    ALTER TABLE dbo.RecruiterVerifications
    ADD CONSTRAINT CK_RecruiterVerification_Status
        CHECK (Status IN ('Pending', 'Approved', 'Rejected'));
    
    PRINT 'Status check constraint added.';
END
GO

-- Create trigger to set NULL when document is deleted
IF OBJECT_ID('dbo.TR_RecruiterVerification_DocumentDelete', 'TR') IS NULL
BEGIN
    EXEC('
    CREATE TRIGGER dbo.TR_RecruiterVerification_DocumentDelete
    ON dbo.Documents
    AFTER DELETE
    AS
    BEGIN
        SET NOCOUNT ON;
        
        -- Set BusinessLicenseDocumentId to NULL if deleted document was a business license
        UPDATE dbo.RecruiterVerifications
        SET BusinessLicenseDocumentId = NULL
        WHERE BusinessLicenseDocumentId IN (SELECT Id FROM deleted);
        
        -- Set CompanyProofDocumentId to NULL if deleted document was a company proof
        UPDATE dbo.RecruiterVerifications
        SET CompanyProofDocumentId = NULL
        WHERE CompanyProofDocumentId IN (SELECT Id FROM deleted);
    END
    ');
    
    PRINT 'Trigger for document deletion created.';
END
ELSE
BEGIN
    PRINT 'Trigger for document deletion already exists.';
END
GO

-- Create trigger to set NULL when admin user is deleted
IF OBJECT_ID('dbo.TR_RecruiterVerification_AdminDelete', 'TR') IS NULL
BEGIN
    EXEC('
    CREATE TRIGGER dbo.TR_RecruiterVerification_AdminDelete
    ON dbo.Users
    AFTER DELETE
    AS
    BEGIN
        SET NOCOUNT ON;
        
        -- Set ReviewedByAdminId to NULL if deleted user was an admin reviewer
        UPDATE dbo.RecruiterVerifications
        SET ReviewedByAdminId = NULL
        WHERE ReviewedByAdminId IN (SELECT Id FROM deleted);
    END
    ');
    
    PRINT 'Trigger for admin deletion created.';
END
ELSE
BEGIN
    PRINT 'Trigger for admin deletion already exists.';
END
GO

-- Optional: Add sample data for testing (uncomment if needed)
/*
DECLARE @RecruiterId INT = (SELECT TOP 1 Id FROM dbo.Users WHERE Role = 'Recruiter');
DECLARE @AdminId INT = (SELECT TOP 1 Id FROM dbo.Users WHERE Role = 'Admin');

IF @RecruiterId IS NOT NULL
BEGIN
    INSERT INTO dbo.RecruiterVerifications (
        RecruiterId, CompanyName, CompanyEmail, CompanyPhone, Status, CreatedAt
    )
    VALUES (
        @RecruiterId,
        N'Sample Company',
        N'hr@samplecompany.com',
        N'+84123456789',
        N'Pending',
        GETUTCDATE()
    );
    
    PRINT 'Sample verification data inserted.';
END
*/
GO

PRINT 'Migration completed successfully!';
GO

