using MediatR;

namespace StockData.Command.Portfolio.RemoveAssetFromPortfolio
{
    public class RemoveAssetFromPortfolioCommand : IRequest<int>
    {
        public int Id { get; set; }
    }
}
