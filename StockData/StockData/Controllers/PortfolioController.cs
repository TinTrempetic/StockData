using MediatR;
using Microsoft.AspNetCore.Mvc;
using StockData.Query.GetPortfolio;
using System.Threading.Tasks;

namespace StockData.Controllers
{
    [ApiController]
    [Route("portfolio")]
    public class PortfolioController : ControllerBase
    {
        private readonly IMediator mediator;

        public PortfolioController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetPortfolio()
        {
            return Ok(await mediator.Send(new GetPortfolioQuery()));
        }
    }
}
