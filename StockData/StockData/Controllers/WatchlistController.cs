using MediatR;
using Microsoft.AspNetCore.Mvc;
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
    }
}
