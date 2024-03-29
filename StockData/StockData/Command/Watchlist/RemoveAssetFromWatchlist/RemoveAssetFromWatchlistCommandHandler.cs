﻿using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace StockData.Command.Watchlist.RemoveAssetFromWatchlist
{
    public class RemoveAssetFromWatchlistCommandHandler : IRequestHandler<RemoveAssetFromWatchlistCommand, int>
    {
        private readonly StockDataContext context;
        public RemoveAssetFromWatchlistCommandHandler(StockDataContext context)
        {
            this.context = context;
        }

        public async Task<int> Handle(RemoveAssetFromWatchlistCommand request, CancellationToken cancellationToken)
        {
            var portfolioItemToRemove = await context.WatchlistItems.FirstOrDefaultAsync(p => p.Id == request.Id);

            context.WatchlistItems.Remove(portfolioItemToRemove);

            await context.SaveChangesAsync(cancellationToken);

            return request.Id;
        }
    }
}
