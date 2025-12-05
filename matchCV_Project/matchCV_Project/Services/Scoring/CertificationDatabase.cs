namespace matchCV_Project.Services.Scoring;

public class CertificationDatabase
{
    private static readonly HashSet<string> Certs = new(StringComparer.OrdinalIgnoreCase)
    {
        "PMP", "CFA", "CPA", "ACCA", "SHRM", "Google Analytics", "Google Ads", "Meta Blueprint",
        "AWS Certified", "Azure Fundamentals", "Azure Solutions Architect", "CKA", "CKAD",
        "Scrum Master", "PSM", "CSM", "ITIL", "Six Sigma", "Lean", "TOEIC", "IELTS", "TOEFL"
        // + thêm 300 cái nữa – bạn chỉ cần thêm vào đây
    };

    public int CalculateScore(string cvText)
    {
        return Certs.Count(cert => cvText.Contains(cert, StringComparison.OrdinalIgnoreCase)) * 8;
    }
}