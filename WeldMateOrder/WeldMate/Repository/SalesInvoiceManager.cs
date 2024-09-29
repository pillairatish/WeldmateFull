using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Threading.Tasks;
using TyrePark.Model;



namespace TyreParkOrderSystem.Repository
{
    public class OrderEntryManager : IDataRepository<OrderEntry>
    {
        readonly OrderContext orderContext;
        public OrderEntryManager(OrderContext context)
        {
            orderContext = context;
        }
        public IEnumerable<OrderEntry> GetAll()
        {
            return orderContext.OrderEntry.Include("OrderEntryDetail.Item");
        }
        public OrderEntry Get(long BillNumber)
        {

            var order = orderContext.OrderEntry.Include(x => x.OrderEntryDetail);
            return order.Where(e => e.BillNo == BillNumber).FirstOrDefault();

        }


        public void Add(OrderEntry entity)
        {
            using (var tran = BeginTransaction())
            {
                try
                {

                    long billNumber = GetBillNumber();
                    OrderEntry salesMaster = new OrderEntry();// orderContext.PurchaseInvoice.FirstOrDefault(u => u.Id == entity.Id);
                    salesMaster.BillNo = billNumber;
                    salesMaster.BillDate = DateTime.Now.Date;
                    salesMaster.BillAmount = 0;
                    salesMaster.Customer = entity.Customer;
                    salesMaster.EmailAddress = entity.EmailAddress;
                    salesMaster.Comments = entity.Comments;


                    entity.BillNo = billNumber;
                    entity.BillDate = salesMaster.BillDate;
                    entity.BillAmount = 0;

                    orderContext.OrderEntry.Add(salesMaster);
                    orderContext.SaveChanges();


                    var salesDetails = new List<OrderEntryDetail>();
                    foreach (var item in entity.OrderEntryDetail)
                    {
                        var detail = new OrderEntryDetail();
                        detail.Item = orderContext.Items.Where(x => x.ItemId == item.Item.ItemId).SingleOrDefault();
                        detail.Quantity = item.Quantity;
                        detail.OrderEntry = salesMaster;
                        orderContext.OrderEntryDetail.Add(detail);
                        salesDetails.Add(detail);
                    }
                    orderContext.SaveChanges();

                    foreach (var detail in entity.OrderEntryDetail)
                    {
                        var item = orderContext.Items.Where(x => x.ItemId == detail.Item.ItemId).FirstOrDefault();
                        if (item != null)
                        {
                            item.BalanceQty = item.BalanceQty - detail.Quantity;
                            orderContext.Items.AddOrUpdate(item);
                            orderContext.SaveChanges();
                        }
                        else
                        {
                            throw new Exception("Invalid Item");
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

        private long GetBillNumber()
        {
            var dt = Convert.ToInt64((DateTime.Now.ToString("yyyyMMdd") + "00000"));
            var billNos = orderContext.OrderEntry.Where(x => x.BillNo > dt).Select(y => y.BillNo - dt).ToList();
            return billNos.Count > 0 ? dt + billNos.Max() + 1 : dt + 1;

        }

        public void Update(OrderEntry entity)
        {
            //var noError = orderContext.OrderEntry.Where(x => x.BillNo == entity.BillNo).Count() == 0 ? throw new Exception("Bill No. Not Present") : true;
            using (var tran = BeginTransaction())
            {
                try
                {

                    var salesMaster = orderContext.OrderEntry.Where(u => u.Id == entity.Id).FirstOrDefault();
                    salesMaster.OrderStatus = entity.OrderStatus;
                    //salesMaster.BillAmount = entity.BillAmount;

                    salesMaster.UpdatedDate = TimeZoneInfo.ConvertTimeFromUtc(DateTime.Now.ToUniversalTime(), TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));

                    orderContext.OrderEntry.AddOrUpdate(salesMaster);
                    orderContext.SaveChanges();

                    //foreach (var detail in salesMaster.OrderEntryDetail.ToList())
                    //{
                    //    var item = orderContext.Items.Where(x => x.ItemId == detail.Item.ItemId).FirstOrDefault();
                    //    if (item != null)
                    //    {
                    //        item.BalanceQty = item.BalanceQty + detail.Quantity;
                    //        orderContext.Items.AddOrUpdate(item);
                    //        orderContext.SaveChanges();
                    //    }
                    //    salesMaster.OrderEntryDetail.Remove(detail);
                    //}

                    //var salesDetails = new List<OrderEntryDetail>();
                    //foreach (var item in entity.OrderEntryDetail)
                    //{
                    //    var detail = new OrderEntryDetail();
                    //    detail.Item = orderContext.Items.Where(x => x.ItemId == item.Item.ItemId).SingleOrDefault();
                    //    detail.Quantity = item.Quantity;
                    //    detail.OrderEntry = salesMaster;
                    //    orderContext.OrderEntryDetail.Add(detail);
                    //    salesDetails.Add(detail);
                    //}
                    //orderContext.SaveChanges();

                    //foreach (var detail in entity.OrderEntryDetail)
                    //{
                    //    var item = orderContext.Items.Where(x => x.ItemId == detail.Item.ItemId).FirstOrDefault();
                    //    if (item != null)
                    //    {
                    //        item.BalanceQty = item.BalanceQty - detail.Quantity;
                    //        orderContext.Items.AddOrUpdate(item);
                    //        orderContext.SaveChanges();
                    //    }
                    //}

                    //foreach (var detail in entity.OrderEntryDetail)
                    //{
                    //    var item = orderContext.Items.Where(x => x.ItemId == detail.Item.ItemId).FirstOrDefault();
                    //    if (item != null)
                    //    {
                    //        item.BalanceQty = item.BalanceQty - detail.Quantity;
                    //        orderContext.Items.AddOrUpdate(item);
                    //        orderContext.SaveChanges();
                    //    }
                    //}
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

        public OrderEntry Get(string name)
        {
            throw new NotImplementedException();
        }

        public void Add(List<OrderEntry> entity)
        {
            throw new NotImplementedException();
        }

        public OrderEntry GetByDates(DateTime dateTime, DateTime date)
        {
            throw new NotImplementedException();
        }

        IEnumerable<OrderEntry> IDataRepository<OrderEntry>.GetByDates(DateTime dateTime, DateTime date)
        {
            throw new NotImplementedException();
        }
    }
}
