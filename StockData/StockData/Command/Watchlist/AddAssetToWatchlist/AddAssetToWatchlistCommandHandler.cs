using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace StockData.Command.Watchlist.AddAssetToWatchlist
{
    public class AddAssetToWatchlistCommandHandler : IRequestHandler<AddAssetToWatchlistCommand, int>
    {
        // TODO: Replace with IdentityUser
        string userId = "google-oauth2|110051772755192088405";
        private readonly StockDataContext context;
        public AddAssetToWatchlistCommandHandler(StockDataContext context)
        {
            this.context = context;
        }

        public async Task<int> Handle(AddAssetToWatchlistCommand request, CancellationToken cancellationToken)
        {
            var newWatchlistItem = new Entities.WatchlistItem(userId, request.Symbol);

            context.Add(newWatchlistItem);

            await context.SaveChangesAsync(cancellationToken);

            return newWatchlistItem.Id;
        }
    }
}
