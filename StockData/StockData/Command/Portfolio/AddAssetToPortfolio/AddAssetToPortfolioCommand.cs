using StockData.Enums;
using System;

namespace StockData.Command.Portfolio.AddAssetToPortfolio
{
    public class AddAssetToPortfolioCommand
    {
        public string Symbol { get; set; }
        public AssetType AssetType { get; set; }
        public DateTime DateBought { get; set; }
        public float Quantity { get; set; }
        public float Price { get; set; }
    }
}
