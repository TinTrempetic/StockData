using MediatR;

namespace StockData.Query.GetStockQuote
{
    public class GetStockQuoteQuery : IRequest<GetStockQuoteQueryResponse>
    {
        /// <summary>
        /// Symbol of the stock
        /// </summary>
        public string Symbol { get; set; }
    }
}
