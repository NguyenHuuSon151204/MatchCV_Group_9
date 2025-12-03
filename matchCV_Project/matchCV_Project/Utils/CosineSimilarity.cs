namespace matchCV_Project.Utils;

public static class CosineSimilarity
{
    public static double Calculate(string s1, string s2)
    {
        var v1 = ToVector(s1);
        var v2 = ToVector(s2);
        double dot = 0, mag1 = 0, mag2 = 0;
        foreach (var k in v1.Keys.Union(v2.Keys))
        {
            double a = v1.GetValueOrDefault(k, 0);
            double b = v2.GetValueOrDefault(k, 0);
            dot += a * b; mag1 += a * a; mag2 += b * b;
        }
        return mag1 == 0 || mag2 == 0 ? 0 : dot / (Math.Sqrt(mag1) * Math.Sqrt(mag2));
    }

    private static Dictionary<string, int> ToVector(string text)
    {
        var words = System.Text.RegularExpressions.Regex.Split(text.ToLower(), @"\W+")
            .Where(w => w.Length > 2);
        var vec = new Dictionary<string, int>();
        foreach (var w in words) vec[w] = vec.GetValueOrDefault(w, 0) + 1;
        return vec;
    }
}