-- ======================================
-- MIGRATION: Add Ban/Unban Features
-- Date: 2025-12-15
-- ======================================

USE MatchCV;
GO

-- 1. Add ban-related fields to Users table
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('dbo.Users') AND name = 'IsBanned')
BEGIN
    ALTER TABLE dbo.Users
    ADD IsBanned BIT NOT NULL DEFAULT 0;
    PRINT 'Added IsBanned column to Users table';
END
GO

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('dbo.Users') AND name = 'BanReason')
BEGIN
    ALTER TABLE dbo.Users
    ADD BanReason NVARCHAR(500) NULL;
    PRINT 'Added BanReason column to Users table';
END
GO

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('dbo.Users') AND name = 'BannedAt')
BEGIN
    ALTER TABLE dbo.Users
    ADD BannedAt DATETIME2 NULL;
    PRINT 'Added BannedAt column to Users table';
END
GO

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('dbo.Users') AND name = 'BannedUntil')
BEGIN
    ALTER TABLE dbo.Users
    ADD BannedUntil DATETIME2 NULL;
    PRINT 'Added BannedUntil column to Users table';
END
GO

-- 2. Add OriginalKey field to LicenseKeys table
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('dbo.LicenseKeys') AND name = 'OriginalKey')
BEGIN
    ALTER TABLE dbo.LicenseKeys
    ADD OriginalKey NVARCHAR(100) NULL;
    PRINT 'Added OriginalKey column to LicenseKeys table';
END
GO

-- 3. Create indexes for performance (optional but recommended)
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_Users_IsBanned' AND object_id = OBJECT_ID('dbo.Users'))
BEGIN
    CREATE INDEX IX_Users_IsBanned ON dbo.Users(IsBanned) WHERE IsBanned = 1;
    PRINT 'Created index IX_Users_IsBanned on Users table';
END
GO

IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_Users_BannedUntil' AND object_id = OBJECT_ID('dbo.Users'))
BEGIN
    CREATE INDEX IX_Users_BannedUntil ON dbo.Users(BannedUntil) WHERE BannedUntil IS NOT NULL;
    PRINT 'Created index IX_Users_BannedUntil on Users table';
END
GO

PRINT '========================================';
PRINT 'Migration completed successfully!';
PRINT 'Added:';
PRINT '  - Users.IsBanned (BIT)';
PRINT '  - Users.BanReason (NVARCHAR(500))';
PRINT '  - Users.BannedAt (DATETIME2)';
PRINT '  - Users.BannedUntil (DATETIME2)';
PRINT '  - LicenseKeys.OriginalKey (NVARCHAR(100))';
PRINT '========================================';
GO
