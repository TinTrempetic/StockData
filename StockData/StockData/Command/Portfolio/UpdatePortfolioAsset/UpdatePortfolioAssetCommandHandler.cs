using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace StockData.Command.Portfolio.UpdatePortfolioAsset
{
    public class UpdatePortfolioAssetCommandHandler : IRequestHandler<UpdatePortfolioAssetCommand, UpdatePortfolioAssetCommandResponse>
    {
        // TODO: Replace with IdentityUser
        Guid userId = Guid.Empty;
        private readonly StockDataContext context;
        public UpdatePortfolioAssetCommandHandler(StockDataContext context)
        {
            this.context = context;
        }

        public Task<UpdatePortfolioAssetCommandResponse> Handle(UpdatePortfolioAssetCommand request, CancellationToken cancellationToken)
        {
            throw new System.NotImplementedException();
        }
    }
}
