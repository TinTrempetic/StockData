using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace StockData.Query.GetWatchlist
{
    public class GetWatchlistQueryHandler : IRequestHandler<GetWatchlistQuery, List<GetWatchlistQueryResponse>>
    {
        // TODO: Replace with IdentityUser
        Guid userId = Guid.Empty;
        private readonly StockDataContext context;

        public GetWatchlistQueryHandler(StockDataContext context)
        {
            this.context = context;
        }

        public StockDataContext Context { get; }

        public async Task<List<GetWatchlistQueryResponse>> Handle(GetWatchlistQuery request, CancellationToken cancellationToken)
        {
            var watchlist = await context.Watchlists
                .AsNoTracking()
                .Where(x => x.UserId == userId)
                .Select(x => new GetWatchlistQueryResponse
                {
                    Id = x.Id,
                    Symbol = x.Symbol,
                    AssetType = x.AssetType
                })
                .ToListAsync(cancellationToken);

            // TODO: Get current asset information from the finhub API

            return watchlist;
        }
    }
}
