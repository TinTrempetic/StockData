using MediatR;

namespace StockData.Command.Watchlist.RemoveAssetFromWatchlist
{
    public class RemoveAssetFromWatchlistCommand : IRequest<RemoveAssetFromWatchlistCommandResponse>
    {
        public int Id { get; set; }
    }
}
