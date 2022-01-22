using MediatR;
using StockData.Enums;
using StockData.Services.FinnhubService;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace StockData.Query.GetStockQuote
{
    public class GetStockQuoteQueryHandler : IRequestHandler<GetStockQuoteQuery, GetStockQuoteQueryResponse>
    {
        private readonly IFinnhubService service;

        public GetStockQuoteQueryHandler(IFinnhubService service)
        {
            this.service = service;
        }

        public async Task<GetStockQuoteQueryResponse> Handle(GetStockQuoteQuery query, CancellationToken cancellationToken)
        {
            var route = FinnhubEndpoints.StockQuote.Replace("{0}", query.Symbol);

            return await service.SendRequestToFinnhub<GetStockQuoteQueryResponse>(route, HttpMethod.Get, cancellationToken);
        }
    }
}
