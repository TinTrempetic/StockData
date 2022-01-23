﻿using StockData.Enums;
using System;
using System.ComponentModel.DataAnnotations;

namespace StockData.Entities
{
    public class PortfolioItem
    {
        [Key]
        public int Id {  get; private set; }
        /// <summary>
        /// Id of the user
        /// </summary>
        public Guid UserId { get; private set;  }
        /// <summary>
        /// Asset Symbol
        /// </summary>
        public string Symbol { get; private set; }
        /// <summary>
        /// Type of the asset (Stock/Crypto)
        /// </summary>
        public AssetType AssetType { get;private set; }
        /// <summary>
        /// Date when the asset has been bought
        /// </summary>
        public DateTime DateBought { get; private set; }
        /// <summary>
        /// Quantity of the asset bought
        /// </summary>
        public float Quantity { get; private set; }
        /// <summary>
        /// Buying price of the asset
        /// </summary>
        public float Price { get; private set; }

        public PortfolioItem(Guid userId, string symbol, AssetType assetType, DateTime dateBought, float quantity, float price)
        { 
            UserId = userId;
            Symbol = symbol;
            AssetType = assetType;
            DateBought = dateBought;
            Quantity = quantity;
            Price = price;
        }

        public void Update(int id, Guid userId, string symbol, AssetType assetType, DateTime dateBought, float quantity, float price)
        {
            Id = id;
            UserId = userId;
            Symbol = symbol;
            AssetType = assetType;
            DateBought = dateBought;
            Quantity = quantity;
            Price = price;
        }
    }
}
