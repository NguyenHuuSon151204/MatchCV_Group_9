using System;
using System.Linq;
using System.Threading.Tasks;
using matchCV_Project.Data;
using matchCV_Project.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace matchCV_Project.Controllers;

/// <summary>
/// Development-only endpoints for seeding sample data (CVs & Jobs) to test JD Analyzer.
/// </summary>
[ApiController]
[Route("api/dev")]
public class DevSampleDataController : ControllerBase
{
    private readonly MatchCvContext _db;

    public DevSampleDataController(MatchCvContext db)
    {
        _db = db;
    }

    /// <summary>
    /// Seed 5 sample CV documents and 2 sample jobs for a given user.
    /// WARNING: For development/testing only.
    /// </summary>
    /// <param name="userId">
    /// Existing user ID to own the CVs and jobs.
    /// If not provided or invalid, defaults to user 1.
    /// </param>
    [HttpPost("seed-samples")]
    public async Task<IActionResult> SeedSamples([FromQuery] int userId = 1)
    {
        if (userId <= 0)
        {
            userId = 1;
        }

        var userExists = await _db.Users.AnyAsync(u => u.Id == userId);
        if (!userExists)
        {
            return BadRequest(new { success = false, message = $"User with id {userId} does not exist." });
        }

        var now = DateTime.UtcNow;

        // Avoid duplicate seeding by checking one known title
        var hasSampleJob = await _db.Jobs.AnyAsync(j => j.Title == "Senior Frontend Engineer (Sample)");
        var hasSampleCv = await _db.Documents.AnyAsync(d => d.OriginalName == "CV #1 – Frontend Engineer (Sample)");

        if (hasSampleJob || hasSampleCv)
        {
            return Ok(new { success = true, message = "Sample data already exists. Nothing to do." });
        }

        // -------- Sample Jobs (JD) --------
        var jd1 = @"Senior Frontend Engineer (React/TypeScript)

Company: AWE Tech
Location: Remote / Ho Chi Minh

We are looking for a Senior Frontend Engineer to build delightful user experiences for our AI-powered career platform.

Responsibilities:
- Design and implement responsive web interfaces using React, TypeScript, and modern CSS (Tailwind or CSS-in-JS).
- Collaborate closely with product designers to translate Figma designs into pixel-perfect UI.
- Integrate RESTful and GraphQL APIs, handle authentication, and manage client-side state (React Query, Redux, or similar).
- Write clean, testable code with unit tests (Jest, React Testing Library) and participate in code reviews.
- Optimize performance and Web Vitals (bundle size, lazy loading, code splitting).
- Work in an Agile/Scrum team, participate in sprint planning, estimations, and retros.

Requirements:
- 3+ years of experience with modern JavaScript and React.
- Strong experience with TypeScript, hooks, and component composition.
- Solid understanding of HTML5, CSS3, and responsive design.
- Experience with API integration, async data fetching, and error handling.
- Familiarity with Git, CI/CD, and modern frontend tooling (Vite, Webpack, or similar).
- Good communication in English and ability to work with cross-functional teams.";

        var jd2 = @"Backend Engineer (.NET / SQL)

Company: MatchCV
Location: Hybrid – Ho Chi Minh

We are hiring a Backend Engineer to build scalable APIs and services for our AI matching engine.

Responsibilities:
- Design and implement RESTful APIs using ASP.NET Core.
- Work with relational databases (SQL Server or PostgreSQL), design schemas, and write optimized queries.
- Implement authentication, authorization, and role-based access control.
- Integrate with external services (payment gateway, email providers, AI services).
- Write unit and integration tests, monitor performance, and optimize bottlenecks.
- Participate in design reviews and provide technical feedback to the team.

Requirements:
- 2+ years of experience with C# and ASP.NET Core.
- Strong knowledge of SQL, database indexing, and query optimization.
- Experience building and consuming REST APIs.
- Understanding of clean architecture, SOLID principles, and design patterns.
- Familiarity with Docker, Git, and CI/CD pipelines.
- Good problem-solving skills and ability to debug production issues.";

        var job1 = new Job
        {
            UserId = userId,
            Title = "Senior Frontend Engineer (Sample)",
            Company = "AWE Tech",
            JobDescription = jd1,
            RawText = jd1,
            Status = "Active",
            CreatedAt = now,
            UpdatedAt = now
        };

        var job2 = new Job
        {
            UserId = userId,
            Title = "Backend Engineer (.NET / SQL) (Sample)",
            Company = "MatchCV",
            JobDescription = jd2,
            RawText = jd2,
            Status = "Active",
            CreatedAt = now,
            UpdatedAt = now
        };

        _db.Jobs.AddRange(job1, job2);

        // -------- Sample CVs --------
        var cvTexts = new[]
        {
            // CV #1 – strong match Frontend JD
            @"CV #1 – Frontend Engineer (strong match JD #1)

Name: Sample Candidate 1
Title: Senior Frontend Engineer

Professional Summary:
Senior Frontend Engineer with 5+ years of experience building responsive web applications using React, TypeScript, and modern tooling. Passionate about performance, clean code, and delivering delightful user experiences.

Skills:
- Languages: JavaScript (ES6+), TypeScript, HTML5, CSS3
- Frameworks: React, Next.js
- Styling: Tailwind CSS, Styled-Components
- State Management: Redux Toolkit, React Query
- Testing: Jest, React Testing Library
- Tooling: Webpack, Vite, Git, CI/CD (GitHub Actions)
- Others: REST APIs, GraphQL, Agile/Scrum, UX & accessibility basics

Experience:
Senior Frontend Engineer – AWE Tech (2022 – Present)
- Built and maintained a React + TypeScript design system with reusable components.
- Integrated RESTful and GraphQL APIs, implemented client-side caching with React Query.
- Collaborated with designers to translate Figma designs into pixel-perfect UI.
- Wrote unit tests with Jest and React Testing Library, increasing coverage to 80%.
- Optimized bundle size and implemented code splitting to reduce initial load time by 35%.",

            // CV #2 – junior frontend
            @"CV #2 – Junior Frontend (partial match JD #1)

Name: Sample Candidate 2
Title: Frontend Developer

Professional Summary:
Frontend Developer with 1.5 years of experience building SPA using React. Interested in TypeScript and modern UI/UX.

Skills:
- JavaScript, React, basic TypeScript
- HTML5, CSS3, SASS
- REST API integration, Axios
- Git, basic CI
- Basic unit testing knowledge with Jest.",

            // CV #3 – backend .NET
            @"CV #3 – Backend .NET Engineer (strong match JD #2)

Name: Sample Candidate 3
Title: Backend Engineer (.NET)

Professional Summary:
Backend Engineer with 4+ years of experience building scalable APIs using ASP.NET Core and SQL Server. Focused on clean architecture and performance optimization.

Skills:
- Languages: C#, SQL
- Frameworks: ASP.NET Core Web API, Entity Framework Core
- Databases: SQL Server, PostgreSQL
- Concepts: RESTful API design, authentication/authorization, role-based access control
- Tools: Docker, Git, Azure DevOps, CI/CD
- Testing: xUnit, integration tests.",

            // CV #4 – data analyst (low match)
            @"CV #4 – Data Analyst (low match both JDs)

Name: Sample Candidate 4
Title: Data Analyst

Professional Summary:
Data Analyst with 3 years of experience analyzing business data and building dashboards.

Skills:
- SQL, Excel, Power BI, Tableau
- Python (Pandas, NumPy)
- Statistical analysis, A/B testing
- Data visualization and reporting.",

            // CV #5 – fullstack
            @"CV #5 – Fullstack Engineer (medium match both JDs)

Name: Sample Candidate 5
Title: Fullstack Developer (React / .NET)

Professional Summary:
Fullstack Developer with 4 years of experience building web applications using React on the frontend and ASP.NET Core on the backend.

Skills:
- Frontend: React, JavaScript, basic TypeScript, HTML, CSS, Tailwind
- Backend: C#, ASP.NET Core Web API, Entity Framework Core
- Databases: SQL Server, PostgreSQL
- Tools: Git, Docker, CI/CD
- Concepts: RESTful APIs, authentication, role-based access, basic testing."
        };

        for (var i = 0; i < cvTexts.Length; i++)
        {
            var doc = new Document
            {
                UserId = userId,
                DocType = "CV",
                OriginalName = $"CV #{i + 1} – {(i == 0 ? "Frontend Engineer" : i == 1 ? "Junior Frontend" : i == 2 ? "Backend .NET" : i == 3 ? "Data Analyst" : "Fullstack Engineer")} (Sample)",
                Content = cvTexts[i],
                Status = "Draft",
                CreatedAt = now,
                UpdatedAt = now,
                IsDeleted = false
            };

            _db.Documents.Add(doc);
        }

        await _db.SaveChangesAsync();

        return Ok(new
        {
            success = true,
            message = "Seeded 2 sample jobs and 5 sample CVs.",
            jobs = new[] { job1.Title, job2.Title }
        });
    }
}


