using StockData.Enums;
using System;
using System.ComponentModel.DataAnnotations;

namespace StockData.Entities
{
    public class Watchlist
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
    }
}
