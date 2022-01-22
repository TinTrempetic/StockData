using StockData.Enums;
using System;
using System.ComponentModel.DataAnnotations;

namespace StockData.Domain
{
    public class Portfolio
    {
        [Key]
        public int Id {  get; private set; }
        public Guid UserId { get; private set;  }
        public string Symbol { get; private set; }
        public AssetType AssetType { get;private set; }
        public float Quantity { get; private set; }
        public float Price { get; private set; }
    }
}
