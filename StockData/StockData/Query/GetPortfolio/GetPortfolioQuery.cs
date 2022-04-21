using MediatR;
using System.Collections.Generic;

namespace StockData.Query.GetPortfolio
{
    public class GetPortfolioQuery : IRequest<List<GetPortfolioQueryResponse>>
    {
        public string UserId { get;set; }
    }
}
