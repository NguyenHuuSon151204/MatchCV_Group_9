using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using matchCV_Project.Data;
using matchCV_Project.Interfaces;
using matchCV_Project.Services;

var builder = WebApplication.CreateBuilder(args);

// DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

// AI Service
builder.Services.AddScoped<IAiService, AiService>();

// Controllers + FluentValidation
builder.Services
    .AddControllers()
    .AddFluentValidation(fv =>
        fv.RegisterValidatorsFromAssemblyContaining<Program>());

// API explorer + Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Lowercase URLs (optional)
builder.Services.AddRouting(o => o.LowercaseUrls = true);

var app = builder.Build();

// Swagger only in Development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Static files for frontend (wwwroot)
app.UseStaticFiles();

app.UseRouting();
app.UseAuthorization();

// Map API controllers
app.MapControllers();

// Default route → Recruiter Dashboard page
app.MapGet("/", () => Results.Redirect("/pages/recruiter.html"));

app.Run();
