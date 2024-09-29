
//using System;
//using System.Collections.Generic;
//using System.Data.Entity;
//using System.Linq;
//using System.Threading.Tasks;
//using TyrePark.Model;

//namespace TyreParkOrderSystem.Repository
//{
//    public class ItemHistoryManager : IDataRepository<ItemHistory>
//    {
//        readonly OrderContext orderContext;
//        public ItemHistoryManager(OrderContext context)
//        {
//            orderContext = context;
//        }

//        public IEnumerable<ItemHistory> GetAll()
//        {
//            return orderContext.ItemHistory.ToList();
//        }
//        public Item Get(long id)
//        {
//            throw new NotImplementedException();
//        }
//        public ItemHistory Get(string date)
//        {
//            return orderContext.ItemHistory
//                  .FirstOrDefault(e => e.Date== DateTime.Now);
//        }
//        public void Add(ItemHistory entity)
//        {
//            //orderContext.ItemHistory.Add(entity);
//            //orderContext.SaveChanges();
//        }

//        public void Add(List<Item> entity)
//        {
//            foreach (var item in entity)
//            {
//                if (item.ItemName!= null)
//                {
//                    ItemHistory itemHistory = new ItemHistory();
//                    itemHistory.Item = item;
//                    itemHistory.Date = DateTime.Now.Date;
//                    itemHistory.BalanceQty = item.BalanceQty;
                    
//                    orderContext.ItemHistory.Add(itemHistory);
//                    orderContext.SaveChanges();
//                }
//            }
//        }

//        public async Task<int> SaveChangesAsync()
//        {
//            return await orderContext.SaveChangesAsync();
//        }

//        public DbContextTransaction BeginTransaction()
//        {
//            return orderContext.Database.BeginTransaction();
//        }

//        ItemHistory IDataRepository<ItemHistory>.Get(long id)
//        {
//            throw new NotImplementedException();
//        }

//        public void Add(List<ItemHistory> entity)
//        {
//            var items = orderContext.Items.ToList();
//            var entryType = entity.First().EntryType;

//            using (var tran = BeginTransaction())
//            {
//                try
//                {
//                    foreach (var item in items)
//                    {
//                        ItemHistory itemHistory = new ItemHistory();
//                        itemHistory.Item = item;
//                        itemHistory.Date = TimeZoneInfo.ConvertTimeFromUtc(DateTime.Now.ToUniversalTime(), TimeZoneInfo.FindSystemTimeZoneById("India Standard Time")); //DateTime.Now.Date;
//                        itemHistory.BalanceQty = item.BalanceQty;
//                        itemHistory.OpeningBalance = item.OpeningBalance;
//                        itemHistory.EntryType = entryType;

//                        orderContext.ItemHistory.Add(itemHistory);
//                        orderContext.SaveChanges();

//                        if (entryType == 1)
//                        {
//                            item.OpeningBalance = item.BalanceQty;
//                            orderContext.SaveChanges();
//                        }
//                    }

//                    tran.Commit();
//                }
//                catch (Exception ex)
//                {
//                    tran.Rollback();
//                }
//            }
//        }

//        public void Update(ItemHistory entity)
//        {
//            throw new NotImplementedException();
//        }

//        public void Delete(long id)
//        {
//            throw new NotImplementedException();
//        }

//        public IEnumerable<ItemHistory> GetByDates(DateTime dateTime, DateTime date)
//        {
//            throw new NotImplementedException();
//        }
//    }
//}
