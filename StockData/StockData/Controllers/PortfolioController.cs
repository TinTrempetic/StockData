using MediatR;
using Microsoft.AspNetCore.Mvc;
using StockData.Command.Portfolio.AddAssetToPortfolio;
using StockData.Command.Portfolio.RemoveAssetFromPortfolio;
using StockData.Command.Portfolio.UpdatePortfolioAsset;
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

        [HttpPost]
        public async Task<IActionResult> AddAssetToPortfolio([FromBody] AddAssetToPortfolioCommand command)
        {
            return Ok(await mediator.Send(command));
        }

        [HttpPut]
        public async Task<IActionResult> UpdatePortfolioAsset([FromBody] UpdatePortfolioAssetCommand command)
        {
            return Ok(await mediator.Send(command));
        }

        [HttpDelete]
        public async Task<IActionResult> RemoveAssetFromPortfolio([FromBody] RemoveAssetFromPortfolioCommand command)
        {
            return Ok(await mediator.Send(command));
        }
    }
}
