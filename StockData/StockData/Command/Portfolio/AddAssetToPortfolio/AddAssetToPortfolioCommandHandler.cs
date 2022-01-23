using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace StockData.Command.Portfolio.AddAssetToPortfolio
{
    public class AddAssetToPortfolioCommandHandler : IRequestHandler<AddAssetToPortfolioCommand, int>
    {
        // TODO: Replace with IdentityUser
        Guid userId = Guid.Empty;
        private readonly StockDataContext context;
        public AddAssetToPortfolioCommandHandler(StockDataContext context)
        {
            this.context = context;
        }

        public async Task<int> Handle(AddAssetToPortfolioCommand request, CancellationToken cancellationToken)
        {
            var newPortfolioItem = new Entities.PortfolioItem(userId, request.Symbol, request.AssetType, request.DateBought, request.Quantity, request.Price);

            context.Add(newPortfolioItem);

            await context.SaveChangesAsync(cancellationToken);

            return newPortfolioItem.Id;
        } 
    }
}
