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

        [HttpPost]
        public async Task<IActionResult> GetWatchlist([FromBody] GetWatchlistQuery query)
        {
            return Ok(await mediator.Send(query));
        }

        [HttpPost("Add")]
        public async Task<IActionResult> AddAssetToWatchlist([FromBody] AddAssetToWatchlistCommand command)
        {
            return Ok(await mediator.Send(command));
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> RemoveAssetFromWatchlist([FromRoute] int Id)
        {
            return Ok(await mediator.Send(new RemoveAssetFromWatchlistCommand { Id = Id}));
        }
    }
}
