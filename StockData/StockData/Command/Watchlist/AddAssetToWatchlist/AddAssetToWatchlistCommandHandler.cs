using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace StockData.Command.Watchlist.AddAssetToWatchlist
{
    public class AddAssetToWatchlistCommandHandler : IRequestHandler<AddAssetToWatchlistCommand, bool>
    {
        private readonly StockDataContext context;
        public AddAssetToWatchlistCommandHandler(StockDataContext context)
        {
            this.context = context;
        }

        public async Task<bool> Handle(AddAssetToWatchlistCommand request, CancellationToken cancellationToken)
        {
            var itemExists = await context.WatchlistItems
                .AsNoTracking()
                .Where(x => x.Symbol.Equals(request.Symbol) && x.UserId.Equals(request.UserId))
                .FirstOrDefaultAsync(cancellationToken);

            if (itemExists is not null)
                return false;

            var newWatchlistItem = new Entities.WatchlistItem(request.UserId, request.Symbol);

            context.Add(newWatchlistItem);

            await context.SaveChangesAsync(cancellationToken);

            return true;
        }
    }
}
