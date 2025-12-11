-- Migration: Add OriginalKey column to LicenseKeys table
-- Run this script if you have an existing database without the OriginalKey column

USE MatchCV;
GO

-- Check if column exists, if not, add it
IF NOT EXISTS (
    SELECT 1 
    FROM sys.columns 
    WHERE object_id = OBJECT_ID('dbo.LicenseKeys') 
    AND name = 'OriginalKey'
)
BEGIN
    ALTER TABLE dbo.LicenseKeys
    ADD OriginalKey NVARCHAR(100) NULL;
    
    PRINT 'Successfully added OriginalKey column to LicenseKeys table';
END
ELSE
BEGIN
    PRINT 'OriginalKey column already exists in LicenseKeys table';
END
GO

