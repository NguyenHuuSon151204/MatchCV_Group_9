<<<<<<< HEAD
﻿namespace MatchCV.Project.Services.Scoring;
=======
﻿namespace matchCV_Project.Services.Scoring;
>>>>>>> cc5f27092afd6cf6f701b8fbb0be3a8b618f8c93

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