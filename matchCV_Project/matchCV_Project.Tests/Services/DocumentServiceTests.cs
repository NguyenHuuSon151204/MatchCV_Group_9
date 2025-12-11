using FluentAssertions;
using MatchCV_Project.Data;
using MatchCV_Project.Interfaces;
using MatchCV_Project.Models;
using MatchCV_Project.Models.Dtos;
using MatchCV_Project.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace MatchCV_Project.Tests.Services;

public class DocumentServiceTests
{
    private readonly Mock<IDocumentRepository> _mockRepository;
    private readonly Mock<IFileService> _mockFileService;
    private readonly Mock<IAnalyzerService> _mockAnalyzerService;
    private readonly Mock<ILogger<DocumentService>> _mockLogger;
    private readonly MatchCvContext _context;
    private readonly DocumentService _service;

    public DocumentServiceTests()
    {
        _mockRepository = new Mock<IDocumentRepository>();
        _mockFileService = new Mock<IFileService>();
        _mockAnalyzerService = new Mock<IAnalyzerService>();
        _mockLogger = new Mock<ILogger<DocumentService>>();

        var options = new DbContextOptionsBuilder<MatchCvContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
        _context = new MatchCvContext(options);

        _service = new DocumentService(
            _mockRepository.Object,
            _mockFileService.Object,
            _mockAnalyzerService.Object,
            _context,
            _mockLogger.Object);
    }

    [Fact]
    public async Task CreateDocumentAsync_ShouldReturnDocumentDto_WhenValidInput()
    {
        // Arrange
        var dto = new CreateDocumentDto
        {
            OriginalName = "Test_CV.pdf",
            TemplateId = 1
        };
        var userId = 1;

        var document = new Document
        {
            Id = 1,
            UserId = userId,
            OriginalName = dto.OriginalName,
            TemplateId = dto.TemplateId,
            DocType = "Pending",
            Status = "Active",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _mockRepository.Setup(r => r.AddAsync(It.IsAny<Document>()))
            .ReturnsAsync(document);
        _mockRepository.Setup(r => r.SaveChangesAsync())
            .Returns(Task.CompletedTask);

        // Act
        var result = await _service.CreateDocumentAsync(dto, userId);

        // Assert
        result.Should().NotBeNull();
        result.OriginalName.Should().Be(dto.OriginalName);
        result.UserId.Should().Be(userId);
        _mockRepository.Verify(r => r.AddAsync(It.IsAny<Document>()), Times.Once);
        _mockRepository.Verify(r => r.SaveChangesAsync(), Times.Once);
    }

    [Fact]
    public async Task GetDocumentAsync_ShouldReturnDocumentDto_WhenDocumentExists()
    {
        // Arrange
        var documentId = 1;
        var document = new Document
        {
            Id = documentId,
            UserId = 1,
            OriginalName = "Test_CV.pdf",
            Status = "Active",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _mockRepository.Setup(r => r.GetWithDetailsAsync(documentId))
            .ReturnsAsync(document);

        // Act
        var result = await _service.GetDocumentAsync(documentId);

        // Assert
        result.Should().NotBeNull();
        result.Id.Should().Be(documentId);
        _mockRepository.Verify(r => r.GetWithDetailsAsync(documentId), Times.Once);
    }

    [Fact]
    public async Task GetDocumentAsync_ShouldThrowException_WhenDocumentNotFound()
    {
        // Arrange
        var documentId = 999;
        _mockRepository.Setup(r => r.GetWithDetailsAsync(documentId))
            .ReturnsAsync((Document)null);

        // Act & Assert
        await Assert.ThrowsAsync<ArgumentException>(() => _service.GetDocumentAsync(documentId));
    }

    [Fact]
    public async Task GetUserDocumentsAsync_ShouldReturnListOfDocuments()
    {
        // Arrange
        var userId = 1;
        var documents = new List<Document>
        {
            new Document { Id = 1, UserId = userId, OriginalName = "CV1.pdf", CreatedAt = DateTime.UtcNow },
            new Document { Id = 2, UserId = userId, OriginalName = "CV2.pdf", CreatedAt = DateTime.UtcNow }
        };

        _mockRepository.Setup(r => r.GetUserDocumentsWithSkillsAsync(userId))
            .ReturnsAsync(documents);

        // Act
        var result = await _service.GetUserDocumentsAsync(userId);

        // Assert
        result.Should().NotBeNull();
        result.Should().HaveCount(2);
        _mockRepository.Verify(r => r.GetUserDocumentsWithSkillsAsync(userId), Times.Once);
    }

    [Fact]
    public async Task DeleteDocumentAsync_ShouldDeleteDocument_WhenDocumentExists()
    {
        // Arrange
        var documentId = 1;
        var document = new Document
        {
            Id = documentId,
            UserId = 1,
            OriginalName = "Test_CV.pdf",
            StoragePath = "uploads/test.pdf"
        };

        _mockRepository.Setup(r => r.GetByIdAsync(documentId))
            .ReturnsAsync(document);
        _mockFileService.Setup(f => f.DeleteFileAsync(It.IsAny<string>()))
            .ReturnsAsync(true);
        _mockRepository.Setup(r => r.DeleteAsync(documentId))
            .Returns(Task.CompletedTask);

        // Act
        await _service.DeleteDocumentAsync(documentId);

        // Assert
        _mockRepository.Verify(r => r.GetByIdAsync(documentId), Times.Once);
        _mockFileService.Verify(f => f.DeleteFileAsync(document.StoragePath), Times.Once);
        _mockRepository.Verify(r => r.DeleteAsync(documentId), Times.Once);
    }
}

