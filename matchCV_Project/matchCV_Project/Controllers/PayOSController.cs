using matchCV_Project.Services;
using Microsoft.AspNetCore.Mvc;

namespace matchCV_Project.Controllers
{
    [ApiController]
    [Route("api/payos")]
    public class PayOSController : ControllerBase
    {
        private readonly PayOSService _payos;

        public PayOSController(PayOSService service)
        {
            _payos = service;
        }

        [HttpPost("create/{id}")]
        public async Task<IActionResult> CreateOrder(int id)
        {
            var json = await _payos.CreateOrder(id);
            return Ok(json);
        }

        [HttpGet("status/{orderCode}")]
        public async Task<IActionResult> CheckStatus(long orderCode)
        {
            var json = await _payos.GetOrderStatus(orderCode);
            return Ok(json);
        }
    }
}
