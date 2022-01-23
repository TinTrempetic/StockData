using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace StockData.Command.Portfolio.AddAssetToPortfolio
{
    public class AddAssetToPortfolioCommandHandler : IRequestHandler<AddAssetToPortfolioCommand, AddAssetToPortfolioCommandResponse>
    {
        // TODO: Replace with IdentityUser
        Guid userId = Guid.Empty;
        private readonly StockDataContext context;
        public AddAssetToPortfolioCommandHandler(StockDataContext context)
        {
            this.context = context;
        }

        public Task<AddAssetToPortfolioCommandResponse> Handle(AddAssetToPortfolioCommand request, CancellationToken cancellationToken)
        {
            throw new System.NotImplementedException();
        } 
    }
}
