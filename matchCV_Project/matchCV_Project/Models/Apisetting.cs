using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace matchCV_Project.Models;

[Table("APISettings")]
public partial class Apisetting
{
    [Key]
    public int Id { get; set; }

    [StringLength(50)]
    public string Provider { get; set; } = null!;

    [StringLength(80)]
    public string Model { get; set; } = null!;

    [StringLength(180)]
    public string Endpoint { get; set; } = null!;

    [StringLength(256)]
    public string ApiKey { get; set; } = null!;

    public bool IsActive { get; set; }

    public DateTime CreatedAt { get; set; }
}
