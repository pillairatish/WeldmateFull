using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using TyrePark.Model;
using System.Data.Entity.Migrations;


namespace TyreParkOrderSystem.Repository
{
    public class ItemEntryManager : IDataRepository<ItemEntry>
    {
        readonly OrderContext orderContext;
        public ItemEntryManager(OrderContext context)
        {
            orderContext = context;
        }
        public IEnumerable<ItemEntry> GetAll()
        {
            return orderContext.ItemEntry.Include("ItemEntryDetail.Item");
        }
        public ItemEntry Get(long id)
        {
            throw new NotImplementedException();
        }
        public ItemEntry Get(string BillNumber)
        {

            throw new NotImplementedException();

        }
        public void Add(ItemEntry entity)
        {

            //var noError =orderContext.PurchaseInvoice.Where(x => x.BillNo == entity.BillNo).Where(x => x.Year == 202223).Count() > 0 ? throw new Exception("Bill No Already Present"):true;
            using (var tran = BeginTransaction())
            {
                try
                {

                    ItemEntry purchaseMaster = new ItemEntry();// orderContext.PurchaseInvoice.FirstOrDefault(u => u.Id == entity.Id);
                    purchaseMaster.Date = entity.Date.Date;

                    orderContext.ItemEntry.Add(purchaseMaster);
                    orderContext.SaveChanges();


                    var purchaseDetails = new List<ItemEntryDetail>();
                    foreach (var item in entity.ItemEntryDetail)
                    {
                        var detail = new ItemEntryDetail();
                        detail.Item = orderContext.Items.Where(x => x.ItemId == item.Item.ItemId).SingleOrDefault();
                        detail.Quantity = item.Quantity;
                        detail.ItemEntry= purchaseMaster;
                        orderContext.ItemEntryDetail.Add(detail);
                        purchaseDetails.Add(detail);
                    }
                    orderContext.SaveChanges();
                    
                    foreach (var detail in entity.ItemEntryDetail)
                    {
                        var item = orderContext.Items.Where(x => x.ItemId == detail.Item.ItemId).FirstOrDefault();
                        if (item != null)
                        {
                            item.BalanceQty = item.BalanceQty + detail.Quantity;
                            orderContext.Items.AddOrUpdate(item);
                            orderContext.SaveChanges();
                        }
                    }
                    tran.Commit();
                }
                catch(Exception ex)
                {
                    tran.Rollback();
                }
            }
        }

        public void Update(ItemEntry entity)
        {
            //var noError = orderContext.PurchaseInvoice.Where(x => x.BillNo == entity.BillNo).Where(x => x.Year == 202223).Count() == 0 ? throw new Exception("Bill No. Not Present") : true;
            using (var tran = BeginTransaction())
            {
                try
                {

                    ItemEntry purchaseMaster = orderContext.ItemEntry.Include("PurchaseInvoiceDetail.Item").FirstOrDefault();
                    purchaseMaster.Date = entity.Date.Date;
                    
                    purchaseMaster.UpdatedDate= TimeZoneInfo.ConvertTimeFromUtc(DateTime.Now.ToUniversalTime(), TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));

                    orderContext.ItemEntry.AddOrUpdate(purchaseMaster);
                    orderContext.SaveChanges();

                    foreach (var detail in purchaseMaster.ItemEntryDetail.ToList())
                    {
                        var item = orderContext.Items.Where(x => x.ItemId == detail.Item.ItemId).FirstOrDefault();
                        if (item != null)
                        {
                            item.BalanceQty = item.BalanceQty - detail.Quantity;
                            orderContext.Items.AddOrUpdate(item);
                            orderContext.SaveChanges();
                        }
                        purchaseMaster.ItemEntryDetail.Remove(detail);
                    }

                    var purchaseDetails = new List<ItemEntryDetail>();
                    foreach (var item in entity.ItemEntryDetail)
                    {
                        var detail = new ItemEntryDetail();
                        detail.Item = orderContext.Items.Where(x => x.ItemId == item.Item.ItemId).SingleOrDefault();
                        detail.Quantity = item.Quantity;
                        detail.ItemEntry= purchaseMaster;
                        detail.UpdatedDate = TimeZoneInfo.ConvertTimeFromUtc(DateTime.Now.ToUniversalTime(), TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));
                        orderContext.ItemEntryDetail.Add(detail);
                        purchaseDetails.Add(detail);
                    }
                    orderContext.SaveChanges();

                    foreach (var detail in entity.ItemEntryDetail)
                    {
                        var item = orderContext.Items.Where(x => x.ItemId == detail.Item.ItemId).FirstOrDefault();
                        if (item != null)
                        {
                            item.BalanceQty = item.BalanceQty + detail.Quantity;
                            orderContext.Items.AddOrUpdate(item);
                            orderContext.SaveChanges();
                        }
                    }
                    tran.Commit();
                }
                catch (Exception ex)
                {
                    tran.Rollback();
                }
            }
        }
        public void Delete(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<int> SaveChangesAsync()
        {
            return await orderContext.SaveChangesAsync();
        }

        public DbContextTransaction BeginTransaction()
        {
            return orderContext.Database.BeginTransaction();
        }

        public void Add(List<ItemEntry> entity)
        {
            throw new NotImplementedException();
        }

        public ItemEntry GetByDates(DateTime dateTime, DateTime date)
        {
            throw new NotImplementedException();
        }

        IEnumerable<ItemEntry> IDataRepository<ItemEntry>.GetByDates(DateTime dateTime, DateTime date)
        {
            throw new NotImplementedException();
        }

    }
}
