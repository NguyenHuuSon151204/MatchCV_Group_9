using System;
using System.Collections.Generic;

namespace matchCV_Project.Models;

public partial class Apisetting
{
    public int Id { get; set; }

    public string Provider { get; set; } = null!;

    public string Model { get; set; } = null!;

    public string Endpoint { get; set; } = null!;

    public string ApiKey { get; set; } = null!;

    public bool IsActive { get; set; }

    public DateTime CreatedAt { get; set; }
}
