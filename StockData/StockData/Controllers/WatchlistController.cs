using MediatR;
using Microsoft.AspNetCore.Mvc;
using StockData.Command.Watchlist.AddAssetToWatchlist;
using StockData.Command.Watchlist.RemoveAssetFromWatchlist;
using StockData.Query.GetWatchlist;
using System.Threading.Tasks;

namespace StockData.Controllers
{
    [ApiController]
    [Route("watchlist")]
    public class WatchlistController : ControllerBase
    {
        private readonly IMediator mediator;

        public WatchlistController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetWatchlist()
        {
            return Ok(await mediator.Send(new GetWatchlistQuery()));
        }

        [HttpPost]
        public async Task<IActionResult> AddAssetToPortfolio([FromBody] AddAssetToWatchlistCommand command)
        {
            return Ok(await mediator.Send(command));
        }

        [HttpDelete]
        public async Task<IActionResult> RemoveAssetFromPortfolio([FromBody] RemoveAssetFromWatchlistCommand command)
        {
            return Ok(await mediator.Send(command));
        }
    }
}
