using FluentAssertions;
using MatchCV_Project.Data;
using MatchCV_Project.Interfaces;
using MatchCV_Project.Models;
using MatchCV_Project.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace MatchCV_Project.Tests.Services;

public class AnalyzerServiceTests
{
    private readonly MatchCvContext _context;
    private readonly Mock<ILogger<AnalyzerService>> _mockLogger;
    private readonly AnalyzerService _service;

    public AnalyzerServiceTests()
    {
        var options = new DbContextOptionsBuilder<MatchCvContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
        _context = new MatchCvContext(options);
        _mockLogger = new Mock<ILogger<AnalyzerService>>();
        _service = new AnalyzerService(_context, _mockLogger.Object);
    }

    [Fact]
    public async Task AnalyzeDocumentAsync_ShouldReturnAnalysisResult_WhenDocumentExists()
    {
        // Arrange
        var user = new User
        {
            Id = 1,
            DisplayName = "Test User",
            EmailAddress = "test@example.com",
            Role = "Candidate",
            CreatedAt = DateTime.UtcNow
        };

        var document = new Document
        {
            Id = 1,
            UserId = 1,
            OriginalName = "Test_CV.pdf",
            Status = "Active",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.Users.Add(user);
        _context.Documents.Add(document);
        await _context.SaveChangesAsync();

        // Act
        var result = await _service.AnalyzeDocumentAsync(1);

        // Assert
        result.Should().NotBeNull();
        result.DocumentId.Should().Be(1);
        result.Score.Should().BeGreaterThan(0);
        result.Confidence.Should().BeGreaterThan(0);
        result.Evidence.Should().NotBeNullOrEmpty();
    }

    [Fact]
    public async Task AnalyzeDocumentAsync_ShouldThrowException_WhenDocumentNotFound()
    {
        // Act & Assert
        await Assert.ThrowsAsync<ArgumentException>(() => _service.AnalyzeDocumentAsync(999));
    }
}

