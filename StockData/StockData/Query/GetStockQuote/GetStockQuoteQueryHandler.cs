using MediatR;
using Newtonsoft.Json;
using StockData.Enums;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace StockData.Query.GetStockQuote
{
    public class GetStockQuoteQueryHandler : IRequestHandler<GetStockQuoteQuery, GetStockQuoteQueryResponse>
    {
        //private IFinnhubService service;
        string token = "c7bfc4qad3ia366ft1k0";

        public GetStockQuoteQueryHandler()  {}

        public async Task<GetStockQuoteQueryResponse> Handle(GetStockQuoteQuery query, CancellationToken cancellationToken)
        {
            // TODO: Move this to Finnhub service
            using var client = new HttpClient();

            var route = FinnhubEndpoints.StockQuote.Replace("{0}", query.Symbol);

            var routeWithToken = route.Replace("{token}", token);

            var message = new HttpRequestMessage(HttpMethod.Get, routeWithToken);

            var response = await client.SendAsync(message, cancellationToken);

            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync();

            var contentDeserialized = JsonConvert.DeserializeObject<GetStockQuoteQueryResponse>(content);

            return contentDeserialized;
        }
    }
}
