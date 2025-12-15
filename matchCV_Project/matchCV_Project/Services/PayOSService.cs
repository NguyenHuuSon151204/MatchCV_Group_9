using Newtonsoft.Json;
using System.Security.Cryptography;
using System.Text;
using System.Net.Http;
using iTextSharp.text.pdf.qrcode;

namespace matchCV_Project.Services
{
    public class PayOSService
    {
        private readonly IConfiguration _config;

        private readonly string clientId;
        private readonly string apiKey;
        private readonly string checksumKey;

        private readonly HttpClient _http;

        public PayOSService(IHttpClientFactory factory, IConfiguration config)
        {
            _http = factory.CreateClient();
            _config = config;
            clientId = _config["PayOS:ClientId"] ?? "";
            apiKey = _config["PayOS:ApiKey"] ?? "";
            checksumKey = _config["PayOS:ChecksumKey"] ?? "";
        }

        public async Task<object> CreateOrder(int id)
        {
            string description = $"Upgrade plan for user {id}";

            int orderCode = int.Parse(DateTimeOffset.Now.ToString("ffffff"));

            long amount = 2000;

            string cancelUrl = "http://localhost:3000/app";
            string returnUrl = "http://localhost:3000/app/payos";

            string rawSignature =
                $"amount={amount}&cancelUrl={cancelUrl}&description={description}&orderCode={orderCode}&returnUrl={returnUrl}";

            string signature = GenerateSignature(rawSignature);

            var body = new
            {
                orderCode,
                amount,
                description,
                returnUrl,
                cancelUrl,
                signature
            };

            var request = new HttpRequestMessage(
                HttpMethod.Post,
                "https://api-merchant.payos.vn/v2/payment-requests"
            );

            request.Headers.Add("x-client-id", clientId);
            request.Headers.Add("x-api-key", apiKey);
            request.Content = new StringContent(
                JsonConvert.SerializeObject(body),
                Encoding.UTF8,
                "application/json"
            );

            var response = await _http.SendAsync(request);
            var content = await response.Content.ReadAsStringAsync();

            Console.WriteLine( "Payos return: " + content );

            if (!response.IsSuccessStatusCode)
                throw new Exception($"CreateOrder FAILED: {content}");

            return content;
        }

        public async Task<string> GetOrderStatus(long orderCode)
        {
            var request = new HttpRequestMessage(
                HttpMethod.Get,
                $"https://api-merchant.payos.vn/v2/payment-requests/{orderCode}"
            );

            request.Headers.Add("x-client-id", clientId);
            request.Headers.Add("x-api-key", apiKey);

            var response = await _http.SendAsync(request);
            var content = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
                throw new Exception($"GetOrderStatus FAILED: {content}");

            return content;
        }

        private string GenerateSignature(string data)
        {
            var keyBytes = Encoding.UTF8.GetBytes(checksumKey);
            using var hmac = new HMACSHA256(keyBytes);
            return Convert.ToHexString(hmac.ComputeHash(Encoding.UTF8.GetBytes(data))).ToLower();
        }
    }
}
