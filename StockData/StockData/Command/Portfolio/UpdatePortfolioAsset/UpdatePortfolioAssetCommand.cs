using MediatR;
using StockData.Enums;
using System;

namespace StockData.Command.Portfolio.UpdatePortfolioAsset
{
    public class UpdatePortfolioAssetCommand : IRequest<UpdatePortfolioAssetCommandResponse>
    {
        public int Id {  get; set; }
        public string Symbol { get; set; }
        public DateTime DateBought { get; set; }
        public float Quantity { get; set; }
        public float Price { get; set; }
    }
}
