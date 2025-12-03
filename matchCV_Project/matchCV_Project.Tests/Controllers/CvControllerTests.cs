using FluentAssertions;
using MatchCV_Project.Controllers;
using MatchCV_Project.Interfaces;
using MatchCV_Project.Models.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace MatchCV_Project.Tests.Controllers;

public class CvControllerTests
{
    private readonly Mock<IDocumentService> _mockDocumentService;
    private readonly Mock<ILogger<CvController>> _mockLogger;
    private readonly CvController _controller;

    public CvControllerTests()
    {
        _mockDocumentService = new Mock<IDocumentService>();
        _mockLogger = new Mock<ILogger<CvController>>();
        _controller = new CvController(_mockDocumentService.Object, _mockLogger.Object);
    }

    [Fact]
    public async Task CreateCv_ShouldReturnCreatedResult_WhenValidInput()
    {
        // Arrange
        var dto = new CreateDocumentDto
        {
            OriginalName = "Test_CV.pdf",
            TemplateId = 1
        };

        var documentDto = new DocumentDto
        {
            Id = 1,
            UserId = 1,
            OriginalName = dto.OriginalName,
            Status = "Active",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _mockDocumentService.Setup(s => s.CreateDocumentAsync(dto, It.IsAny<int>()))
            .ReturnsAsync(documentDto);

        // Act
        var result = await _controller.CreateCv(dto);

        // Assert
        result.Should().BeOfType<CreatedAtActionResult>();
        var createdAtResult = result as CreatedAtActionResult;
        createdAtResult.StatusCode.Should().Be(201);
        _mockDocumentService.Verify(s => s.CreateDocumentAsync(dto, It.IsAny<int>()), Times.Once);
    }

    [Fact]
    public async Task GetUserCvs_ShouldReturnOkResult_WhenDocumentsExist()
    {
        // Arrange
        var userId = 1;
        var documents = new List<DocumentDto>
        {
            new DocumentDto { Id = 1, UserId = userId, OriginalName = "CV1.pdf" },
            new DocumentDto { Id = 2, UserId = userId, OriginalName = "CV2.pdf" }
        };

        _mockDocumentService.Setup(s => s.GetUserDocumentsAsync(userId))
            .ReturnsAsync(documents);

        // Act
        var result = await _controller.GetUserCvs(userId);

        // Assert
        result.Should().BeOfType<OkObjectResult>();
        var okResult = result as OkObjectResult;
        okResult.StatusCode.Should().Be(200);
        _mockDocumentService.Verify(s => s.GetUserDocumentsAsync(userId), Times.Once);
    }

    [Fact]
    public async Task GetCv_ShouldReturnOkResult_WhenDocumentExists()
    {
        // Arrange
        var documentId = 1;
        var documentDto = new DocumentDto
        {
            Id = documentId,
            UserId = 1,
            OriginalName = "Test_CV.pdf"
        };

        _mockDocumentService.Setup(s => s.GetDocumentAsync(documentId))
            .ReturnsAsync(documentDto);

        // Act
        var result = await _controller.GetCv(documentId);

        // Assert
        result.Should().BeOfType<OkObjectResult>();
        var okResult = result as OkObjectResult;
        okResult.StatusCode.Should().Be(200);
        _mockDocumentService.Verify(s => s.GetDocumentAsync(documentId), Times.Once);
    }

    [Fact]
    public async Task DeleteCv_ShouldReturnNoContent_WhenDocumentExists()
    {
        // Arrange
        var documentId = 1;
        _mockDocumentService.Setup(s => s.DeleteDocumentAsync(documentId))
            .Returns(Task.CompletedTask);

        // Act
        var result = await _controller.DeleteCv(documentId);

        // Assert
        result.Should().BeOfType<NoContentResult>();
        var noContentResult = result as NoContentResult;
        noContentResult.StatusCode.Should().Be(204);
        _mockDocumentService.Verify(s => s.DeleteDocumentAsync(documentId), Times.Once);
    }

    [Fact]
    public async Task UploadFile_ShouldReturnBadRequest_WhenFileIsNull()
    {
        // Arrange
        var documentId = 1;
        IFormFile file = null;

        // Act
        var result = await _controller.UploadFile(documentId, file);

        // Assert
        result.Should().BeOfType<BadRequestObjectResult>();
        var badRequestResult = result as BadRequestObjectResult;
        badRequestResult.StatusCode.Should().Be(400);
    }

    [Fact]
    public async Task AnalyzeCv_ShouldReturnOkResult_WhenAnalysisSucceeds()
    {
        // Arrange
        var documentId = 1;
        var analysisResult = new AnalysisResultDto
        {
            DocumentId = documentId,
            Score = 85.5f,
            Confidence = 0.9f,
            Evidence = "Test evidence",
            AnalysisDate = DateTime.UtcNow
        };

        _mockDocumentService.Setup(s => s.AnalyzeDocumentAsync(documentId))
            .ReturnsAsync(analysisResult);

        // Act
        var result = await _controller.AnalyzeCv(documentId);

        // Assert
        result.Should().BeOfType<OkObjectResult>();
        var okResult = result as OkObjectResult;
        okResult.StatusCode.Should().Be(200);
        _mockDocumentService.Verify(s => s.AnalyzeDocumentAsync(documentId), Times.Once);
    }
}

