using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using matchCV_Project.Data;
using matchCV_Project.Interfaces;
using matchCV_Project.Services;
using matchCV_Project.Repositories;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// DbContext - Using AppDbContext (more complete)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

// Core services from HEAD
builder.Services.AddScoped<IAiService, AiService>();
builder.Services.AddScoped<IEmailService, EmailService>();

// Additional services from main branch
builder.Services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
builder.Services.AddScoped<IDocumentRepository, DocumentRepository>();
builder.Services.AddScoped<IJobRepository, JobRepository>();
builder.Services.AddScoped<IFileService, FileService>();
builder.Services.AddScoped<IAnalyzerService, AnalyzerService>();
builder.Services.AddScoped<IPdfExtractionService, PdfExtractionService>();
builder.Services.AddScoped<IDocumentService, DocumentService>();
builder.Services.AddScoped<IJobService, JobService>();
builder.Services.AddScoped<ITemplateService, TemplateService>();
builder.Services.AddScoped<ICVService, CVService>();

// Controllers + FluentValidation + JSON camelCase
builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
        options.JsonSerializerOptions.WriteIndented = true;
    })
    .AddFluentValidation(fv =>
        fv.RegisterValidatorsFromAssemblyContaining<Program>());

// API explorer + Swagger
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

// Lowercase URLs (optional)
builder.Services.AddRouting(o => o.LowercaseUrls = true);

// CORS - Allow frontend to connect (more secure than AllowAll)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:5173", "https://localhost:3000")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

// Add logging
builder.Services.AddLogging();

var app = builder.Build();

// Configure the HTTP request pipeline
// Swagger only in Development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "MatchCV API v1");
        c.RoutePrefix = "swagger";
    });
}

app.UseHttpsRedirection();

// Static files for frontend (wwwroot)
app.UseStaticFiles();

app.UseRouting();

// Enable CORS
app.UseCors("AllowReactApp");

app.UseAuthorization();

// Map API controllers
app.MapControllers();

// Create wwwroot/uploads folder if not exists
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

// SPA fallback - serve React app for all non-API routes
app.MapFallbackToFile("index.html");

app.Run();
