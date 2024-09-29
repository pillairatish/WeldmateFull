
//using System;
//using System.Collections.Generic;
//using System.Data.Entity;
//using System.Linq;
//using System.Threading.Tasks;
//using TyrePark.Model;

//namespace TyreParkOrderSystem.Repository
//{
//    public class ItemReportManager //: IDataRepository<ItemReport>
//    {
//        readonly OrderContext orderContext;
//        public ItemReportManager(OrderContext context)
//        {
//            orderContext = context;
//        }

//        public void Add(ItemReport entity)
//        {
//            throw new NotImplementedException();
//        }

//        public void Add(List<ItemReport> entity)
//        {
//            throw new NotImplementedException();
//        }

//        public DbContextTransaction BeginTransaction()
//        {
//            throw new NotImplementedException();
//        }

//        public void Delete(ItemReport entity)
//        {
//            throw new NotImplementedException();
//        }

//        public ItemReport Get(long id)
//        {
//            throw new NotImplementedException();
//        }

//        public ItemReport Get(string name)
//        {
//            throw new NotImplementedException();
//        }

//        public IEnumerable<ItemReport> GetAll()
//        {
//            throw new NotImplementedException();
//        }

//        public IEnumerable<ItemReport> GetByDates(DateTime fromDate, DateTime toDate)
//        {
//            //IQueryable<Ite> query = GetQuery();

//            fromDate = fromDate.Date;
//            toDate = toDate.Date;
//            toDate = toDate.Date.AddDays(1);

//            orderContext.Configuration.LazyLoadingEnabled = false;
//            IQueryable<PurchaseInvoice> purchaseInvoices = orderContext.PurchaseInvoice.Include("PurchaseInvoiceDetail.Item").Where(p=>p.BillDate>=fromDate && p.BillDate<toDate);
//            IQueryable<SalesInvoice> salesInvoices = orderContext.SalesInvoice.Include("SalesInvoiceDetail.Item").Where(p => p.BillDate >= fromDate && p.BillDate < toDate);

//            var purchaseItem = from inv in purchaseInvoices.Include("PurchaseInvoiceDetail.Item")
//                       join invd in orderContext.PurchaseInvoiceDetail on inv.Id equals invd.PurchaseInvoice.Id
//                       join items in orderContext.Items on invd.Item.ItemId equals items.ItemId
//                       select items;

       
//            var salesItem = from inv in salesInvoices
//                               join invd in orderContext.SalesInvoiceDetail on inv.Id equals invd.SalesInvoice.Id
//                               join items in orderContext.Items on invd.Item.ItemId equals items.ItemId
//                               select items;

            

//            var items1 = purchaseItem.Union(salesItem);

             
//            var report = from i in items1
//                         select new ItemReport()
//                         {
//                             Item = i,
//                             PurchaseInvoice = from inv in purchaseInvoices
//                                                join invd in orderContext.PurchaseInvoiceDetail on inv.Id equals invd.PurchaseInvoice.Id
//                                                join items in orderContext.Items on invd.Item.ItemId equals items.ItemId
//                                                where items.ItemId == i.ItemId 
//                                               select inv,
//                            SalesInvoice = from inv in salesInvoices
//                                           join invd in orderContext.SalesInvoiceDetail on inv.Id equals invd.SalesInvoice.Id
//                                           join items in orderContext.Items on invd.Item.ItemId equals items.ItemId
//                                           where items.ItemId == i.ItemId 
//                                           select inv
//                         };

            
//            var PurchaseCount = (from inv in purchaseInvoices
//                                join invd in orderContext.PurchaseInvoiceDetail on inv.Id equals invd.PurchaseInvoice.Id
//                                group invd by invd.Item into itemGroup
//                                select new
//                                {
//                                    Item = itemGroup.Key,
//                                    Count = itemGroup.Sum(x => x.Quantity),
//                                }).ToList();


//            var SalesCount = (from inv in salesInvoices
//                                 join invd in orderContext.SalesInvoiceDetail on inv.Id equals invd.SalesInvoice.Id
//                                 group invd by invd.Item into itemGroup
//                                 select new
//                                 {
//                                     Item = itemGroup.Key,
//                                     Count = itemGroup.Sum(x => x.Quantity),
//                                 }).ToList();

//            var r = report.ToList();
//            List<ItemReport> rpt1 = new List<ItemReport>();

//            foreach (var item in r)
//            {
//                foreach (var item1 in item.PurchaseInvoice)
//                {
//                    var dt = from det in orderContext.PurchaseInvoiceDetail.Include(x => x.Item)
//                             where det.PurchaseInvoice.Id == item1.Id && det.Item.ItemId == item.Item.ItemId
//                             select det;
//                    item1.PurchaseInvoiceDetail.Add(dt.SingleOrDefault());
//                }


//                foreach (var item1 in item.SalesInvoice)
//                {
//                    var sdt = from det in orderContext.SalesInvoiceDetail.Include(x => x.Item)
//                              where det.SalesInvoice.Id == item1.Id && det.Item.ItemId == item.Item.ItemId
//                              select det;
//                    item1.SalesInvoiceDetail.Add(sdt.SingleOrDefault());
//                }

//                var obal = (from hist in orderContext.ItemHistory
//                            where hist.Item.ItemId == item.Item.ItemId && hist.Date >= fromDate && hist.Date < toDate && hist.EntryType == 1
//                            orderby hist.Date
//                            select new
//                            {
//                                hist.OpeningBalance
//                            }).FirstOrDefault();

//                if (obal != null)
//                    item.OpeningBalance = obal.OpeningBalance;


//                var cbal = (from hist in orderContext.ItemHistory
//                            where hist.Item.ItemId == item.Item.ItemId && hist.Date >= fromDate && hist.Date < toDate && hist.EntryType == 1
//                            orderby hist.Date descending
//                            select new
//                            {
//                                hist.BalanceQty
//                            }).FirstOrDefault();

//                if (cbal != null)
//                    item.ClosingBalance = cbal.BalanceQty;

//            }

//            foreach (var item in r)
//            {
//                var ss = SalesCount.Where(i => i.Item.ItemId == item.Item.ItemId).SingleOrDefault();
//                var pp = PurchaseCount.Where(i => i.Item.ItemId == item.Item.ItemId).SingleOrDefault();
//                if (pp != null)
//                {
//                    item.PurchaseCount = PurchaseCount.Where(i => i.Item.ItemId == item.Item.ItemId).SingleOrDefault().Count;
//                }

//                if (ss != null)
//                {
//                    item.SalesCount = SalesCount.Where(i => i.Item.ItemId == item.Item.ItemId).SingleOrDefault().Count;
//                }
//            }



//            return r;
//        }

//        public DailyItemReport GetByDate(DateTime fromDate, DateTime toDate, int tyreType=0)
//        {
//            var type = new int[] { 5 };
//            if (tyreType == 0)
//                type = new int[] { 1, 2, 3, 4 };

//            fromDate = fromDate.Date;
//            toDate = toDate.Date.AddDays(1);
//            orderContext.Configuration.LazyLoadingEnabled = false;
//            IQueryable<PurchaseInvoice> purchaseInvoices = orderContext.PurchaseInvoice.Include("PurchaseInvoiceDetail.Item").Where(p => p.BillDate >= fromDate && p.BillDate < toDate);
//            IQueryable<SalesInvoice> salesInvoices = orderContext.SalesInvoice.Include("SalesInvoiceDetail.Item").Where(p => p.BillDate >= fromDate && p.BillDate < toDate);

//            var purchaseItem = (from inv in purchaseInvoices.Include("PurchaseInvoiceDetail.Item")
//                               join invd in orderContext.PurchaseInvoiceDetail on inv.Id equals invd.PurchaseInvoice.Id
//                               join item in orderContext.Items on invd.Item.ItemId equals item.ItemId
//                               where type.Contains((int)item.TyreType)
//                               select new DailyItemReportItem()
//                               {
//                                   Item = invd.Item,
//                                   BillDate = inv.BillDate,
//                                   Quantity = invd.Quantity
//                               }).ToList();



//            var pbilldates = purchaseItem.Select(p => p.BillDate).Distinct();
//            var listPurchases = new Dictionary<DateTime, List<KeyValuePair<Item, long>>>(); 
//            foreach(var dt in pbilldates)
//            {
//                var items1 = purchaseItem.Where(i => i.BillDate == dt).GroupBy(p => p.Item).ToDictionary(g => g.Key, g => g.Sum(i => i.Quantity)).ToList();
//                listPurchases.Add(dt, items1);

//            }

//            List<KeyValuePair<DateTime, List<KeyValuePair<Item, long>>>> listPurchases1 = listPurchases.ToList();


//            var salestem = (from inv in salesInvoices.Include("SalesInvoiceDetail.Item")
//                                join invd in orderContext.SalesInvoiceDetail on inv.Id equals invd.SalesInvoice.Id
//                                join item in orderContext.Items on invd.Item.ItemId equals item.ItemId
//                                where type.Contains((int)item.TyreType)
//                            select new DailyItemReportItem()
//                                {
//                                    Item = invd.Item,
//                                    BillDate = inv.BillDate,
//                                    Quantity = invd.Quantity
//                                }).ToList();



//            var sbilldates = salestem.Select(p => p.BillDate).Distinct();
//            var listSales= new Dictionary<DateTime, List<KeyValuePair<Item, long>>>();
//            foreach (var dt in sbilldates)
//            {
//                var items1 = salestem.Where(i => i.BillDate == dt).GroupBy(p => p.Item).ToDictionary(g => g.Key, g => g.Sum(i => i.Quantity)).ToList();
//                listSales.Add(dt, items1);

//            }

//            List<KeyValuePair<DateTime, List<KeyValuePair<Item, long>>>> listSales1 = listSales.ToList();


//            var purchaseCount = listPurchases1.Sum(i => i.Value.Sum(j=>j.Value));
//            var salesCount = listSales1.Sum(i => i.Value.Sum(j => j.Value));

//            return new DailyItemReport() { PurchaseItem = listPurchases1, SalesItem = listSales1, PurchaseCount=purchaseCount, SalesCount=salesCount};

            
//        }

//        public DailyItemReport GetByDate_Copy(DateTime fromDate, DateTime toDate)
//        {

//            fromDate = fromDate.Date;
//            toDate = toDate.Date.AddDays(1);
//            orderContext.Configuration.LazyLoadingEnabled = false;
//            IQueryable<PurchaseInvoice> purchaseInvoices = orderContext.PurchaseInvoice.Include("PurchaseInvoiceDetail.Item").Where(p => p.BillDate >= fromDate && p.BillDate < toDate);
//            IQueryable<SalesInvoice> salesInvoices = orderContext.SalesInvoice.Include("SalesInvoiceDetail.Item").Where(p => p.BillDate >= fromDate && p.BillDate < toDate);

//            var purchaseItem = from inv in purchaseInvoices.Include("PurchaseInvoiceDetail.Item")
//                               join invd in orderContext.PurchaseInvoiceDetail on inv.Id equals invd.PurchaseInvoice.Id
//                               select invd;

//            var items1 = purchaseItem.GroupBy(p => p.Item).ToDictionary(g => g.Key, g => g.Sum(i => i.Quantity)).ToList();


//            var salesItem = from inv in salesInvoices
//                            join invd in orderContext.SalesInvoiceDetail on inv.Id equals invd.SalesInvoice.Id
//                            select invd;

//            var items2 = salesItem.GroupBy(p => p.Item).ToDictionary(g => g.Key, g => g.Sum(i => i.Quantity)).ToList();

//            var purchaseCount = items1.Sum(i => i.Value);
//            var salesCount = items2.Sum(i => i.Value);

//            return new DailyItemReport();// { PurchaseItem = items1, SalesItem = items2, PurchaseCount = purchaseCount, SalesCount = salesCount };
//        }


//        public List<ItemHistory> GetItemHistory(DateTime fromDate, DateTime toDate)
//        {

//            var day = 16;
//            toDate = new DateTime(2021, 10, day);
//            toDate = toDate.Date;

//            var fday = 02;
//            fromDate = new DateTime(2021, 10, fday);

//            var ffromDate = fromDate.AddDays(1);

//            var ftoDate = toDate.AddDays(1);
//            orderContext.Configuration.LazyLoadingEnabled = false;

//            var item = (from t1 in orderContext.ItemHistory
//                       where t1.Date>=toDate && t1.Date < ftoDate
//                        select t1).ToList();


//            var item1 = (from t1 in orderContext.ItemHistory
//                        where t1.Date >= fromDate && t1.Date < ffromDate
//                         select t1).ToList();

//            foreach (var i in item)
//            {
//                i.OpeningBalance = item1.Where(x => x.Item == i.Item).FirstOrDefault().OpeningBalance; 
//            }

//            var t = item.ToList();
//            return new List<ItemHistory>();

//        }

//        public Task<int> SaveChangesAsync()
//        {
//            throw new NotImplementedException();
//        }

//        public void Update(ItemReport entity)
//        {
//            throw new NotImplementedException();
//        }
//    }
//}
