using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace StockData.Command.Watchlist.RemoveAssetFromWatchlist
{
    public class RemoveAssetFromWatchlistCommandHandler : IRequestHandler<RemoveAssetFromWatchlistCommand, RemoveAssetFromWatchlistCommandResponse>
    {
        // TODO: Replace with IdentityUser
        Guid userId = Guid.Empty;
        private readonly StockDataContext context;
        public RemoveAssetFromWatchlistCommandHandler(StockDataContext context)
        {
            this.context = context;
        }

        public Task<RemoveAssetFromWatchlistCommandResponse> Handle(RemoveAssetFromWatchlistCommand request, CancellationToken cancellationToken)
        {
            throw new System.NotImplementedException();
        }
    }
}
