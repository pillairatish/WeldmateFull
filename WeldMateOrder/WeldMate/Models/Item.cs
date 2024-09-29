using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace TyrePark.Model
{
    
    public class Item
    {

        [DatabaseGenerated(DatabaseGeneratedOption.Identity), Key]
        public long ItemId { get; set; }
        public string ItemName { get; set; }
        public string Description { get; set; }
        public string Brand { get; set; } 
        public long BalanceQty { get; set; }
        public long OpeningBalance { get; set; }
        public string ItemHref { get; set; }
        public double Price { get; set; }
        public bool IsDeleted { get; set; } = false;
        public string OtherDescription { get; set; }
        public string SKU { get; set; }

        public int ItemCategoryId { get; set; }
        public ItemCategory Category {get;set; }
    }

    //public class ItemReport
    //{
    //    public Item Item { get; set; }
    //    public long OpeningBalance { get; set; }
    //    public IQueryable<PurchaseInvoice> PurchaseInvoice { get; set; }
    //    public long PurchaseCount { get; set; }

    //    public IQueryable<SalesInvoice> SalesInvoice { get; set; }
    //    public long SalesCount { get; set; }
    //    public long ClosingBalance { get; set; }
    //}

    //public class DailyItemReport
    //{
    //    public List<KeyValuePair<DateTime, List<KeyValuePair<Item, long>>>> PurchaseItem { get; set; }

    //    public long PurchaseCount { get; set; }
    //    public List<KeyValuePair<DateTime, List<KeyValuePair<Item, long>>>> SalesItem { get; set; }
    //    public long SalesCount { get; set; }

    //}

    //public class DailyItemReportItem
    //{
    //    public DateTime BillDate { get; set; }
    //    public Item Item { get; set; }
    //    public long Quantity { get; set; }

    //}

    public class ItemCategory
    {
        [Key]
        public int Id { get; set; }
        public string CategoryName { get; set; }

        public ICollection<Item> Items{ get; } = new List<Item>();
    }


    //public class ItemHistory
    //{
    //    [DatabaseGenerated(DatabaseGeneratedOption.Identity), Key]
    //    public long ItemId { get; set; }
    //    public DateTime Date { get; set; } = new DateTime().Date;
    //    public int BranchId { get; set; } = 0;
    //    public virtual Item Item { get; set; }
    //    public long OpeningBalance { get; set; }
    //    public long BalanceQty { get; set; }
    //    public int EntryType { get; set; } //0=Import 1=DayEnd

    //}




}