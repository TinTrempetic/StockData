//using System.Net.Http;
//using System.Threading;
//using System.Threading.Tasks;

//namespace StockData.Services.FinnhubService
//{
//    public class FinnhubService : IFinnhubService
//    {
//        public HttpClient client;
//        string token = "c7bfc4qad3ia366ft1k0";

//        public FinnhubService(HttpClient client)
//        {
//            this.client = client;
//        }

//        public async Task<object> SendRequestToFinnhub(string route, HttpMethod httpMethod, CancellationToken cancellationToken)
//        {
//            var routeWithToken = route.Replace("{token}", token);

//            var message = new HttpRequestMessage(httpMethod, routeWithToken);

//            var response = await client.SendAsync(message, cancellationToken);

//            return response.Content;
//        }
//    }
//}
