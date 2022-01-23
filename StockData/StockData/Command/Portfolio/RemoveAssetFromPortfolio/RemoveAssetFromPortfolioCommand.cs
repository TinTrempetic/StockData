using MediatR;

namespace StockData.Command.Portfolio.RemoveAssetFromPortfolio
{
    public class RemoveAssetFromPortfolioCommand : IRequest<RemoveAssetFromPortfolioCommandResponse>
    {
        public int Id { get; set; }
    }
}
