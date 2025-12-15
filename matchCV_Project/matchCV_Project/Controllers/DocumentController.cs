using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using matchCV_Project.Data;
using System.IO;

namespace matchCV_Project.Controllers;

[ApiController]
[Route("api/documents")]
public class DocumentController : ControllerBase
{
    private readonly MatchCvContext _db;

    public DocumentController(MatchCvContext db) => _db = db;

    // GET: /api/documents/{id}/view - View document inline
    [HttpGet("{id:int}/view")]
    public async Task<IActionResult> ViewDocument(int id)
    {
        var document = await _db.Documents.FindAsync(id);
        if (document == null)
            return NotFound("Document not found.");

        if (string.IsNullOrEmpty(document.StoragePath) || !System.IO.File.Exists(document.StoragePath))
            return NotFound("Document file not found on storage.");

        var fileBytes = await System.IO.File.ReadAllBytesAsync(document.StoragePath);
        var contentType = document.ContentType ?? "application/octet-stream";

        return File(fileBytes, contentType, enableRangeProcessing: true);
    }

    // GET: /api/documents/{id}/download - Download document
    [HttpGet("{id:int}/download")]
    public async Task<IActionResult> DownloadDocument(int id)
    {
        var document = await _db.Documents.FindAsync(id);
        if (document == null)
            return NotFound("Document not found.");

        if (string.IsNullOrEmpty(document.StoragePath) || !System.IO.File.Exists(document.StoragePath))
            return NotFound("Document file not found on storage.");

        var fileBytes = await System.IO.File.ReadAllBytesAsync(document.StoragePath);
        var contentType = document.ContentType ?? "application/octet-stream";
        var fileName = document.OriginalName ?? $"document_{id}.pdf";

        return File(fileBytes, contentType, fileName);
    }
}
