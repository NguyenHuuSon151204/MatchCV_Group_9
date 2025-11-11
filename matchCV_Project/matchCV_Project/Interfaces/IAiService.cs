using matchCV_Project.Models;

namespace matchCV_Project.Interfaces;

public interface IAiService
{
    int ScoreMatch(Job job, Document cv);
    string SummarizeCv(Document cv);
}
