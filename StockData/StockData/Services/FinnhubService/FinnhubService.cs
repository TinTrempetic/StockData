using Newtonsoft.Json;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace StockData.Services.FinnhubService
{
    public class FinnhubService : IFinnhubService
    {
        // TODO: Move this to db
        string token = "c7bfc4qad3ia366ft1k0";

        public FinnhubService() {}

        public async Task<T> SendRequestToFinnhub<T>(string route, HttpMethod httpMethod, CancellationToken cancellationToken)
        {
            using var client = new HttpClient();

            var routeWithToken = route.Replace("{token}", token);

            var message = new HttpRequestMessage(HttpMethod.Get, routeWithToken);

            var response = await client.SendAsync(message, cancellationToken);

            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync(cancellationToken);

            return JsonConvert.DeserializeObject<T>(content);
        }
    }
}
