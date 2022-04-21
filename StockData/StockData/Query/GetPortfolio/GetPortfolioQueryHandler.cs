using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace StockData.Query.GetPortfolio
{
    public class GetPortfolioQueryHandler : IRequestHandler<GetPortfolioQuery, List<GetPortfolioQueryResponse>>
    {
        private readonly StockDataContext context;

        public GetPortfolioQueryHandler(StockDataContext context)
        {
            this.context = context;
        }

        public async Task<List<GetPortfolioQueryResponse>> Handle(GetPortfolioQuery request, CancellationToken cancellationToken)
        {
            var portfolio = await context.PortfolioItems
                .AsNoTracking()
                .Where(x => x.UserId == request.UserId)
                .Select(x => new GetPortfolioQueryResponse
                {
                    Id = x.Id,
                    Symbol = x.Symbol,
                    DateBought = x.DateBought,
                    Quantity = x.Quantity,
                    CurrentPrice = x.Price
                })
                .ToListAsync(cancellationToken);

            // TODO: Get current asset information from the finhub API

            return portfolio;
        }
    }
}
