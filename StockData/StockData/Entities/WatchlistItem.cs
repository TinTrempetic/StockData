using StockData.Enums;
using System;
using System.ComponentModel.DataAnnotations;

namespace StockData.Entities
{
    public class WatchlistItem
    {
        [Key]
        public int Id { get; private set; }
        /// <summary>
        /// Id of the user
        /// </summary>
        public Guid UserId { get; private set; }
        /// <summary>
        /// Asset Symbol
        /// </summary>
        public string Symbol { get; private set; }
        /// <summary>
        /// Type of the asset (Stock/Crypto)
        /// </summary>
        public AssetType AssetType { get; private set; }

        public WatchlistItem(Guid userId, string symbol, AssetType assetType)
        {
            UserId = userId;
            Symbol = symbol;
            AssetType = assetType;
        }

        public void Update(int id, Guid userId, string symbol, AssetType assetType)
        {
            Id = id;
            UserId = userId;
            Symbol = symbol;
            AssetType = assetType;
        }
    }
}
