-- Test Data for MatchCV Project
-- This script adds sample data for testing purposes

USE MatchCV;
GO
SELECT COUNT(*) FROM Users WHERE Role = 'Recruiter'

-- Insert Test Users (Recruiters and Candidates)
INSERT INTO Users (DisplayName, Email, Role, CreatedAt)
VALUES
    -- Recruiters
    ('John Smith', 'john.smith@techcorp.com', 'Recruiter', GETUTCDATE()),
    ('Sarah Johnson', 'sarah.j@startup.io', 'Recruiter', DATEADD(day, -30, GETUTCDATE())),
    ('Mike Chen', 'mike.chen@bigcompany.com', 'Recruiter', DATEADD(day, -60, GETUTCDATE())),
    ('Emily Davis', 'emily.d@recruiters.com', 'Recruiter', DATEADD(day, -15, GETUTCDATE())),
    
    -- Candidates
    ('Alice Brown', 'alice.brown@email.com', 'Candidate', DATEADD(day, -45, GETUTCDATE())),
    ('Bob Wilson', 'bob.wilson@email.com', 'Candidate', DATEADD(day, -20, GETUTCDATE())),
    ('Carol Martinez', 'carol.m@email.com', 'Candidate', DATEADD(day, -10, GETUTCDATE())),
    ('David Lee', 'david.lee@email.com', 'Candidate', DATEADD(day, -5, GETUTCDATE())),
    ('Eva Garcia', 'eva.garcia@email.com', 'Candidate', DATEADD(day, -35, GETUTCDATE())),
    ('Frank Taylor', 'frank.t@email.com', 'Candidate', DATEADD(day, -25, GETUTCDATE()));
GO

-- Insert Test License Keys
DECLARE @Recruiter1 INT = (SELECT Id FROM Users WHERE Email = 'john.smith@techcorp.com');
DECLARE @Recruiter2 INT = (SELECT Id FROM Users WHERE Email = 'sarah.j@startup.io');
DECLARE @Recruiter3 INT = (SELECT Id FROM Users WHERE Email = 'mike.chen@bigcompany.com');
DECLARE @Candidate1 INT = (SELECT Id FROM Users WHERE Email = 'alice.brown@email.com');
DECLARE @Candidate2 INT = (SELECT Id FROM Users WHERE Email = 'bob.wilson@email.com');

-- Generate license keys (these are example keys - in production they would be hashed)
INSERT INTO LicenseKeys (KeyHash, OriginalKey, [Plan], Expiry, IsActive, AssignedUserId, CreatedAt)
VALUES
    -- Pro licenses for recruiters
    (CONVERT(VARCHAR(200), HASHBYTES('SHA2_256', 'PRO-KEY-12345-ABCDE'), 2), 'PRO-KEY-12345-ABCDE', 'Pro', DATEADD(year, 1, GETUTCDATE()), 1, @Recruiter1, DATEADD(day, -30, GETUTCDATE())),
    (CONVERT(VARCHAR(200), HASHBYTES('SHA2_256', 'PRO-KEY-67890-FGHIJ'), 2), 'PRO-KEY-67890-FGHIJ', 'Pro', DATEADD(year, 1, GETUTCDATE()), 1, @Recruiter2, DATEADD(day, -25, GETUTCDATE())),
    (CONVERT(VARCHAR(200), HASHBYTES('SHA2_256', 'ENT-KEY-11111-KLMNO'), 2), 'ENT-KEY-11111-KLMNO', 'Enterprise', DATEADD(year, 2, GETUTCDATE()), 1, @Recruiter3, DATEADD(day, -20, GETUTCDATE())),
    
    -- Pro licenses for candidates
    (CONVERT(VARCHAR(200), HASHBYTES('SHA2_256', 'PRO-KEY-22222-PQRST'), 2), 'PRO-KEY-22222-PQRST', 'Pro', DATEADD(day, 180, GETUTCDATE()), 1, @Candidate1, DATEADD(day, -15, GETUTCDATE())),
    (CONVERT(VARCHAR(200), HASHBYTES('SHA2_256', 'PRO-KEY-33333-UVWXY'), 2), 'PRO-KEY-33333-UVWXY', 'Pro', DATEADD(day, 90, GETUTCDATE()), 1, @Candidate2, DATEADD(day, -10, GETUTCDATE()));
GO

-- Insert Test Skills
IF NOT EXISTS (SELECT 1 FROM Skills WHERE NormName = 'JavaScript')
    INSERT INTO Skills (NormName, [Name]) VALUES ('JavaScript', 'JavaScript');
IF NOT EXISTS (SELECT 1 FROM Skills WHERE NormName = 'Python')
    INSERT INTO Skills (NormName, [Name]) VALUES ('Python', 'Python');
IF NOT EXISTS (SELECT 1 FROM Skills WHERE NormName = 'React')
    INSERT INTO Skills (NormName, [Name]) VALUES ('React', 'React');
IF NOT EXISTS (SELECT 1 FROM Skills WHERE NormName = 'Node.js')
    INSERT INTO Skills (NormName, [Name]) VALUES ('Node.js', 'Node.js');
IF NOT EXISTS (SELECT 1 FROM Skills WHERE NormName = 'SQL')
    INSERT INTO Skills (NormName, [Name]) VALUES ('SQL', 'SQL');
IF NOT EXISTS (SELECT 1 FROM Skills WHERE NormName = 'C#')
    INSERT INTO Skills (NormName, [Name]) VALUES ('C#', 'C#');
IF NOT EXISTS (SELECT 1 FROM Skills WHERE NormName = 'ASP.NET')
    INSERT INTO Skills (NormName, [Name]) VALUES ('ASP.NET', 'ASP.NET');
IF NOT EXISTS (SELECT 1 FROM Skills WHERE NormName = 'Docker')
    INSERT INTO Skills (NormName, [Name]) VALUES ('Docker', 'Docker');
IF NOT EXISTS (SELECT 1 FROM Skills WHERE NormName = 'AWS')
    INSERT INTO Skills (NormName, [Name]) VALUES ('AWS', 'AWS');
IF NOT EXISTS (SELECT 1 FROM Skills WHERE NormName = 'Git')
    INSERT INTO Skills (NormName, [Name]) VALUES ('Git', 'Git');
GO

-- Insert Test Jobs
DECLARE @Recruiter1 INT = (SELECT Id FROM Users WHERE Email = 'john.smith@techcorp.com');
DECLARE @Recruiter2 INT = (SELECT Id FROM Users WHERE Email = 'sarah.j@startup.io');
DECLARE @Recruiter3 INT = (SELECT Id FROM Users WHERE Email = 'mike.chen@bigcompany.com');

INSERT INTO Jobs (Title, Company, RawText, UserId, CreatedAt)
VALUES
    ('Senior Full Stack Developer', 'TechCorp', 'We are looking for an experienced Full Stack Developer with expertise in React, Node.js, and SQL. Must have 5+ years of experience.', @Recruiter1, DATEADD(day, -40, GETUTCDATE())),
    ('React Frontend Developer', 'Startup.io', 'Join our team as a React Frontend Developer. Experience with modern JavaScript and React hooks required.', @Recruiter2, DATEADD(day, -25, GETUTCDATE())),
    ('Backend Developer - C#/.NET', 'BigCompany', 'Looking for a Backend Developer with strong C# and ASP.NET Core experience. Knowledge of SQL Server and Docker preferred.', @Recruiter3, DATEADD(day, -20, GETUTCDATE())),
    ('Full Stack Engineer', 'TechCorp', 'Full Stack Engineer position. Must know JavaScript, Python, React, and have cloud experience (AWS preferred).', @Recruiter1, DATEADD(day, -15, GETUTCDATE())),
    ('DevOps Engineer', 'Startup.io', 'DevOps Engineer needed. Experience with Docker, AWS, and CI/CD pipelines required.', @Recruiter2, DATEADD(day, -10, GETUTCDATE()));
GO

-- Insert Required Skills for Jobs
DECLARE @Job1 INT = (SELECT Id FROM Jobs WHERE Title = 'Senior Full Stack Developer');
DECLARE @Job2 INT = (SELECT Id FROM Jobs WHERE Title = 'React Frontend Developer');
DECLARE @Job3 INT = (SELECT Id FROM Jobs WHERE Title = 'Backend Developer - C#/.NET');
DECLARE @Job4 INT = (SELECT Id FROM Jobs WHERE Title = 'Full Stack Engineer');
DECLARE @Job5 INT = (SELECT Id FROM Jobs WHERE Title = 'DevOps Engineer');

DECLARE @JS INT = (SELECT Id FROM Skills WHERE NormName = 'JavaScript');
DECLARE @Python INT = (SELECT Id FROM Skills WHERE NormName = 'Python');
DECLARE @React INT = (SELECT Id FROM Skills WHERE NormName = 'React');
DECLARE @Node INT = (SELECT Id FROM Skills WHERE NormName = 'Node.js');
DECLARE @SQL INT = (SELECT Id FROM Skills WHERE NormName = 'SQL');
DECLARE @CSharp INT = (SELECT Id FROM Skills WHERE NormName = 'C#');
DECLARE @AspNet INT = (SELECT Id FROM Skills WHERE NormName = 'ASP.NET');
DECLARE @Docker INT = (SELECT Id FROM Skills WHERE NormName = 'Docker');
DECLARE @AWS INT = (SELECT Id FROM Skills WHERE NormName = 'AWS');
DECLARE @Git INT = (SELECT Id FROM Skills WHERE NormName = 'Git');

-- Job 1: Senior Full Stack Developer
INSERT INTO RequiredSkills (JobId, SkillId) VALUES (@Job1, @React), (@Job1, @Node), (@Job1, @SQL), (@Job1, @JS);

-- Job 2: React Frontend Developer
INSERT INTO RequiredSkills (JobId, SkillId) VALUES (@Job2, @React), (@Job2, @JS);

-- Job 3: Backend Developer - C#/.NET
INSERT INTO RequiredSkills (JobId, SkillId) VALUES (@Job3, @CSharp), (@Job3, @AspNet), (@Job3, @SQL), (@Job3, @Docker);

-- Job 4: Full Stack Engineer
INSERT INTO RequiredSkills (JobId, SkillId) VALUES (@Job4, @JS), (@Job4, @Python), (@Job4, @React), (@Job4, @AWS);

-- Job 5: DevOps Engineer
INSERT INTO RequiredSkills (JobId, SkillId) VALUES (@Job5, @Docker), (@Job5, @AWS), (@Job5, @Git);
GO

-- Insert Test Documents (CVs)
DECLARE @Candidate1 INT = (SELECT Id FROM Users WHERE Email = 'alice.brown@email.com');
DECLARE @Candidate2 INT = (SELECT Id FROM Users WHERE Email = 'bob.wilson@email.com');
DECLARE @Candidate3 INT = (SELECT Id FROM Users WHERE Email = 'carol.m@email.com');
DECLARE @Candidate4 INT = (SELECT Id FROM Users WHERE Email = 'david.lee@email.com');
DECLARE @Candidate5 INT = (SELECT Id FROM Users WHERE Email = 'eva.garcia@email.com');

INSERT INTO Documents (UserId, OriginalName, StoragePath, DocType, UploadedAt, IsDeleted)
VALUES
    (@Candidate1, 'Alice_Brown_CV.pdf', '/uploads/cvs/alice_brown_cv.pdf', 'CV', DATEADD(day, -30, GETUTCDATE()), 0),
    (@Candidate2, 'Bob_Wilson_Resume.pdf', '/uploads/cvs/bob_wilson_resume.pdf', 'CV', DATEADD(day, -20, GETUTCDATE()), 0),
    (@Candidate3, 'Carol_Martinez_CV.pdf', '/uploads/cvs/carol_martinez_cv.pdf', 'CV', DATEADD(day, -10, GETUTCDATE()), 0),
    (@Candidate4, 'David_Lee_Resume.pdf', '/uploads/cvs/david_lee_resume.pdf', 'CV', DATEADD(day, -5, GETUTCDATE()), 0),
    (@Candidate5, 'Eva_Garcia_CV.pdf', '/uploads/cvs/eva_garcia_cv.pdf', 'CV', DATEADD(day, -25, GETUTCDATE()), 0);
GO

-- Insert Document Skills (CV Skills)
DECLARE @Doc1 INT = (SELECT Id FROM Documents WHERE OriginalName = 'Alice_Brown_CV.pdf');
DECLARE @Doc2 INT = (SELECT Id FROM Documents WHERE OriginalName = 'Bob_Wilson_Resume.pdf');
DECLARE @Doc3 INT = (SELECT Id FROM Documents WHERE OriginalName = 'Carol_Martinez_CV.pdf');
DECLARE @Doc4 INT = (SELECT Id FROM Documents WHERE OriginalName = 'David_Lee_Resume.pdf');
DECLARE @Doc5 INT = (SELECT Id FROM Documents WHERE OriginalName = 'Eva_Garcia_CV.pdf');

DECLARE @JS INT = (SELECT Id FROM Skills WHERE NormName = 'JavaScript');
DECLARE @Python INT = (SELECT Id FROM Skills WHERE NormName = 'Python');
DECLARE @React INT = (SELECT Id FROM Skills WHERE NormName = 'React');
DECLARE @Node INT = (SELECT Id FROM Skills WHERE NormName = 'Node.js');
DECLARE @SQL INT = (SELECT Id FROM Skills WHERE NormName = 'SQL');
DECLARE @CSharp INT = (SELECT Id FROM Skills WHERE NormName = 'C#');
DECLARE @AspNet INT = (SELECT Id FROM Skills WHERE NormName = 'ASP.NET');
DECLARE @Docker INT = (SELECT Id FROM Skills WHERE NormName = 'Docker');
DECLARE @AWS INT = (SELECT Id FROM Skills WHERE NormName = 'AWS');
DECLARE @Git INT = (SELECT Id FROM Skills WHERE NormName = 'Git');

-- Alice Brown - Full Stack Developer
INSERT INTO DocumentSkills (DocumentId, SkillId, Source) VALUES (@Doc1, @JS, 'LLM'), (@Doc1, @React, 'LLM'), (@Doc1, @Node, 'LLM'), (@Doc1, @SQL, 'LLM'), (@Doc1, @Git, 'LLM');

-- Bob Wilson - React Developer
INSERT INTO DocumentSkills (DocumentId, SkillId, Source) VALUES (@Doc2, @JS, 'LLM'), (@Doc2, @React, 'LLM'), (@Doc2, @Git, 'LLM');

-- Carol Martinez - Backend Developer
INSERT INTO DocumentSkills (DocumentId, SkillId, Source) VALUES (@Doc3, @CSharp, 'LLM'), (@Doc3, @AspNet, 'LLM'), (@Doc3, @SQL, 'LLM'), (@Doc3, @Docker, 'LLM');

-- David Lee - Full Stack Engineer
INSERT INTO DocumentSkills (DocumentId, SkillId, Source) VALUES (@Doc4, @JS, 'LLM'), (@Doc4, @Python, 'LLM'), (@Doc4, @React, 'LLM'), (@Doc4, @AWS, 'LLM');

-- Eva Garcia - DevOps Engineer
INSERT INTO DocumentSkills (DocumentId, SkillId, Source) VALUES (@Doc5, @Docker, 'LLM'), (@Doc5, @AWS, 'LLM'), (@Doc5, @Git, 'LLM'), (@Doc5, @Python, 'LLM');
GO

-- Insert Test Applications
DECLARE @Job1 INT = (SELECT Id FROM Jobs WHERE Title = 'Senior Full Stack Developer');
DECLARE @Job2 INT = (SELECT Id FROM Jobs WHERE Title = 'React Frontend Developer');
DECLARE @Job3 INT = (SELECT Id FROM Jobs WHERE Title = 'Backend Developer - C#/.NET');
DECLARE @Job4 INT = (SELECT Id FROM Jobs WHERE Title = 'Full Stack Engineer');
DECLARE @Job5 INT = (SELECT Id FROM Jobs WHERE Title = 'DevOps Engineer');

DECLARE @Candidate1 INT = (SELECT Id FROM Users WHERE Email = 'alice.brown@email.com');
DECLARE @Candidate2 INT = (SELECT Id FROM Users WHERE Email = 'bob.wilson@email.com');
DECLARE @Candidate3 INT = (SELECT Id FROM Users WHERE Email = 'carol.m@email.com');
DECLARE @Candidate4 INT = (SELECT Id FROM Users WHERE Email = 'david.lee@email.com');
DECLARE @Candidate5 INT = (SELECT Id FROM Users WHERE Email = 'eva.garcia@email.com');

DECLARE @Doc1 INT = (SELECT Id FROM Documents WHERE OriginalName = 'Alice_Brown_CV.pdf');
DECLARE @Doc2 INT = (SELECT Id FROM Documents WHERE OriginalName = 'Bob_Wilson_Resume.pdf');
DECLARE @Doc3 INT = (SELECT Id FROM Documents WHERE OriginalName = 'Carol_Martinez_CV.pdf');
DECLARE @Doc4 INT = (SELECT Id FROM Documents WHERE OriginalName = 'David_Lee_Resume.pdf');
DECLARE @Doc5 INT = (SELECT Id FROM Documents WHERE OriginalName = 'Eva_Garcia_CV.pdf');

INSERT INTO Applications (JobId, CandidateId, DocumentId, Status, ScoreSnapshot, Summary, CreatedAt)
VALUES
    -- Applications for Job 1 (Senior Full Stack Developer)
    (@Job1, @Candidate1, @Doc1, 'Reviewed', 85.5, 'Experienced full stack developer with strong React and Node.js skills', DATEADD(day, -25, GETUTCDATE())),
    (@Job1, @Candidate4, @Doc4, 'Pending', 78.0, 'Full stack engineer with JavaScript, Python, and React experience', DATEADD(day, -20, GETUTCDATE())),
    
    -- Applications for Job 2 (React Frontend Developer)
    (@Job2, @Candidate2, @Doc2, 'Hired', 92.0, 'Expert React developer with modern JavaScript skills', DATEADD(day, -15, GETUTCDATE())),
    (@Job2, @Candidate1, @Doc1, 'Rejected', 75.0, 'Full stack developer, but less frontend-focused', DATEADD(day, -12, GETUTCDATE())),
    
    -- Applications for Job 3 (Backend Developer - C#/.NET)
    (@Job3, @Candidate3, @Doc3, 'Reviewed', 88.5, 'Strong backend developer with C# and ASP.NET Core expertise', DATEADD(day, -18, GETUTCDATE())),
    
    -- Applications for Job 4 (Full Stack Engineer)
    (@Job4, @Candidate1, @Doc1, 'Pending', 82.0, 'Full stack developer with JavaScript and React experience', DATEADD(day, -10, GETUTCDATE())),
    (@Job4, @Candidate4, @Doc4, 'Reviewed', 90.0, 'Full stack engineer with Python, JavaScript, and AWS experience', DATEADD(day, -8, GETUTCDATE())),
    
    -- Applications for Job 5 (DevOps Engineer)
    (@Job5, @Candidate5, @Doc5, 'Hired', 95.0, 'Expert DevOps engineer with Docker, AWS, and Git expertise', DATEADD(day, -5, GETUTCDATE()));
GO

-- Insert Test Experiences
DECLARE @Doc1 INT = (SELECT Id FROM Documents WHERE OriginalName = 'Alice_Brown_CV.pdf');
DECLARE @Doc2 INT = (SELECT Id FROM Documents WHERE OriginalName = 'Bob_Wilson_Resume.pdf');
DECLARE @Doc3 INT = (SELECT Id FROM Documents WHERE OriginalName = 'Carol_Martinez_CV.pdf');
DECLARE @Doc4 INT = (SELECT Id FROM Documents WHERE OriginalName = 'David_Lee_Resume.pdf');
DECLARE @Doc5 INT = (SELECT Id FROM Documents WHERE OriginalName = 'Eva_Garcia_CV.pdf');

INSERT INTO Experiences (DocumentId, JobTitle, CompanyName, StartDate, EndDate)
VALUES
    (@Doc1, 'Senior Full Stack Developer', 'Previous Tech Company', DATEADD(year, -3, GETUTCDATE()), DATEADD(month, -6, GETUTCDATE())),
    (@Doc1, 'Full Stack Developer', 'Startup Inc', DATEADD(year, -5, GETUTCDATE()), DATEADD(year, -3, GETUTCDATE())),
    
    (@Doc2, 'React Developer', 'Web Agency', DATEADD(year, -2, GETUTCDATE()), NULL),
    (@Doc2, 'Frontend Developer', 'Small Startup', DATEADD(year, -4, GETUTCDATE()), DATEADD(year, -2, GETUTCDATE())),
    
    (@Doc3, 'Backend Developer', 'Enterprise Corp', DATEADD(year, -4, GETUTCDATE()), NULL),
    (@Doc3, 'Junior Developer', 'Tech Firm', DATEADD(year, -6, GETUTCDATE()), DATEADD(year, -4, GETUTCDATE())),
    
    (@Doc4, 'Full Stack Engineer', 'Cloud Company', DATEADD(year, -2, GETUTCDATE()), NULL),
    (@Doc4, 'Software Engineer', 'Software House', DATEADD(year, -4, GETUTCDATE()), DATEADD(year, -2, GETUTCDATE())),
    
    (@Doc5, 'DevOps Engineer', 'Infrastructure Corp', DATEADD(year, -3, GETUTCDATE()), NULL),
    (@Doc5, 'System Administrator', 'IT Company', DATEADD(year, -5, GETUTCDATE()), DATEADD(year, -3, GETUTCDATE()));
GO

-- Insert Test Education
DECLARE @Doc1 INT = (SELECT Id FROM Documents WHERE OriginalName = 'Alice_Brown_CV.pdf');
DECLARE @Doc2 INT = (SELECT Id FROM Documents WHERE OriginalName = 'Bob_Wilson_Resume.pdf');
DECLARE @Doc3 INT = (SELECT Id FROM Documents WHERE OriginalName = 'Carol_Martinez_CV.pdf');
DECLARE @Doc4 INT = (SELECT Id FROM Documents WHERE OriginalName = 'David_Lee_Resume.pdf');
DECLARE @Doc5 INT = (SELECT Id FROM Documents WHERE OriginalName = 'Eva_Garcia_CV.pdf');

INSERT INTO Education (DocumentId, Degree, SchoolName, StartDate, EndDate)
VALUES
    (@Doc1, 'Bachelor of Computer Science', 'State University', DATEADD(year, -8, GETUTCDATE()), DATEADD(year, -4, GETUTCDATE())),
    (@Doc2, 'Bachelor of Software Engineering', 'Tech University', DATEADD(year, -6, GETUTCDATE()), DATEADD(year, -2, GETUTCDATE())),
    (@Doc3, 'Master of Computer Science', 'University of Technology', DATEADD(year, -7, GETUTCDATE()), DATEADD(year, -5, GETUTCDATE())),
    (@Doc4, 'Bachelor of Information Technology', 'IT College', DATEADD(year, -6, GETUTCDATE()), DATEADD(year, -2, GETUTCDATE())),
    (@Doc5, 'Bachelor of Computer Engineering', 'Engineering University', DATEADD(year, -7, GETUTCDATE()), DATEADD(year, -3, GETUTCDATE()));
GO

PRINT 'Test data inserted successfully!';
PRINT 'Summary:';
PRINT '- 4 Recruiters';
PRINT '- 6 Candidates';
PRINT '- 5 License Keys (3 Pro, 1 Enterprise, 1 Free)';
PRINT '- 5 Jobs';
PRINT '- 10 Required Skills';
PRINT '- 5 CVs';
PRINT '- 20 Document Skills';
PRINT '- 7 Applications';
PRINT '- 10 Work Experiences';
PRINT '- 5 Education Records';
GO
