using ApiRestFul.Services;
using matchCV_Project.Data;
using matchCV_Project.Interfaces;
using matchCV_Project.Models;
using matchCV_Project.Repositories;
using matchCV_Project.Services;
using matchCV_Project.Services.Scoring;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// =============================
// Controllers + JSON Settings
// =============================
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
    });

// =============================
// DbContext
// =============================
builder.Services.AddDbContext<MatchCvContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// =============================
// Authentication (Cookies + Google)
// =============================
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
})
.AddCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    options.Cookie.SameSite = SameSiteMode.None;

    // expiry
    options.ExpireTimeSpan = TimeSpan.FromHours(1);
    options.SlidingExpiration = false;  // no auto refresh
})
.AddGoogle(options =>
{
    options.ClientId = builder.Configuration["GoogleKeys:ClientId"];
    options.ClientSecret = builder.Configuration["GoogleKeys:ClientSecret"];
});

// =============================
// Session
// =============================
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(opts =>
{
    opts.IdleTimeout = TimeSpan.FromHours(6);
    opts.Cookie.HttpOnly = true;
});

// =============================
// Dependency Injection
// =============================
builder.Services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
builder.Services.AddScoped<IDocumentRepository, DocumentRepository>();
builder.Services.AddScoped<IJobRepository, JobRepository>();
builder.Services.AddScoped<IFileService, FileService>();
builder.Services.AddScoped<IAnalyzerService, AnalyzerService>();
builder.Services.AddScoped<IPdfExtractionService, PdfExtractionService>();
builder.Services.AddScoped<EmailService>();
builder.Services.AddScoped<IRecruiterVerificationService, RecruiterVerificationService>();
builder.Services.AddScoped<IAiService, AiService>();
builder.Services.AddScoped<IDocumentService, DocumentService>();
builder.Services.AddScoped<IJobService, JobService>();
builder.Services.AddScoped<ITemplateService, TemplateService>();
builder.Services.AddScoped<ICVService, CVService>();
builder.Services.AddScoped<IExportService, ExportService>();
builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<ILicenseService, LicenseService>();
builder.Services.AddScoped<EmailService>();
builder.Services.AddScoped<PayOSService>();
builder.Services.AddScoped<IGeminiService, GeminiService>();
builder.Services.AddScoped<DynamicWeightService>();
builder.Services.AddScoped<AchievementDetector>();
builder.Services.AddScoped<PortfolioScorer>();
builder.Services.AddScoped<RedFlagDetector>();
builder.Services.AddScoped<CertificationDatabase>();
builder.Services.AddScoped<ScoringEngine>();
builder.Services.AddScoped<NotificationService>();
builder.Services.AddSingleton<UsageLimitService>();
builder.Services.AddHttpClient();

// =============================
// Swagger
// =============================
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "MatchCV API",
        Version = "v1",
        Description = "CV Management System for Job Recruitment"
    });
});

// =============================
// CORS
// =============================
builder.Services.AddCors(options =>
{
    // Allow full access
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });

    // React-specific with credentials
    options.AddPolicy("AllowReact", policy =>
        policy.AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials()
              .WithOrigins("http://localhost:3000", "http://localhost:5185"));
});

builder.Services.AddLogging();

// =============================
// Build app
// =============================
var app = builder.Build();

// =============================
// Middleware
// =============================
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "MatchCV API v1");
    c.RoutePrefix = "swagger";
});

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseSession();

app.UseRouting();

app.UseCors("AllowReact"); // Use the stricter CORS for frontend login
// app.UseCors("AllowAll"); // You may enable this if needed for other endpoints

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// =============================
// Seed sample data (templates + demo CVs/JD) for local/dev usage
// =============================
try 
{
    using (var scope = app.Services.CreateScope())
    {
        var context = scope.ServiceProvider.GetRequiredService<MatchCvContext>();
        // await context.Database.EnsureDeletedAsync();
        await context.Database.EnsureCreatedAsync();

        await TemplateSeedData.InitializeAsync(scope.ServiceProvider);
        await SampleDataSeed.InitializeAsync(scope.ServiceProvider);
    }
}
catch (Exception ex)
{
    Console.WriteLine("--------------------------------------------------");
    Console.WriteLine("CRITICAL ERROR DURING STARTUP SEEDING:");
    Console.WriteLine(ex.Message);
    if (ex.InnerException != null)
    {
        Console.WriteLine("INNER EXCEPTION:");
        Console.WriteLine(ex.InnerException.Message);
        Console.WriteLine(ex.InnerException.StackTrace);
    }
    Console.WriteLine(ex.StackTrace);
    Console.WriteLine("--------------------------------------------------");
    throw; 
}

// =============================
// SPA fallback
// =============================
app.UseDefaultFiles();
app.UseStaticFiles();
app.MapFallbackToFile("index.html");

// =============================
// Create uploads folder
// =============================
var webRootPath = app.Environment.WebRootPath;
if (string.IsNullOrEmpty(webRootPath))
{
    webRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
}

var uploadsPath = Path.Combine(webRootPath, "uploads");
if (!Directory.Exists(uploadsPath))
{
    Directory.CreateDirectory(uploadsPath);
}

// =============================
app.Run();
