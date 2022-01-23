using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace StockData.Command.Watchlist.AddAssetToWatchlist
{
    public class AddAssetToWatchlistCommandHandler : IRequestHandler<AddAssetToWatchlistCommand, AddAssetToWatchlistCommandResponse>
    {
        // TODO: Replace with IdentityUser
        Guid userId = Guid.Empty;
        private readonly StockDataContext context;
        public AddAssetToWatchlistCommandHandler(StockDataContext context)
        {
            this.context = context;
        }

        public Task<AddAssetToWatchlistCommandResponse> Handle(AddAssetToWatchlistCommand request, CancellationToken cancellationToken)
        {
            throw new System.NotImplementedException();
        }
    }
}
