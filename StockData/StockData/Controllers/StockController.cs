using MediatR;
using Microsoft.AspNetCore.Mvc;
using StockData.Query.GetStockQuote;
using System.Threading.Tasks;

namespace StockData.Controllers
{
    [ApiController]
    [Route("stock")]
    public class StockController : ControllerBase
    {
        private readonly IMediator mediator;

        public StockController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet("quote")]
        public async Task<IActionResult> GetStockQuote([FromQuery] string symbol)
        {
            return Ok(await mediator.Send(new GetStockQuoteQuery { Symbol = symbol }));
        }
    }
}
