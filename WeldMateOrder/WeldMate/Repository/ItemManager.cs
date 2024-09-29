
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using TyrePark.Model;

namespace TyreParkOrderSystem.Repository
{
    public class ItemManager : IDataRepository<Item>
    {
        readonly OrderContext orderContext;
        public ItemManager(OrderContext context)
        {
            orderContext = context;
        }
        public IEnumerable<Item> GetAll()
        {
            return orderContext.Items.Where(i=>i.IsDeleted==false).ToList();
        }
        public Item Get(long id)
        {
            return orderContext.Items
                  .FirstOrDefault(e => e.ItemId == id);
        }
        public Item Get(string name)
        {
            return orderContext.Items
                  .FirstOrDefault(e => e.ItemName == name);
        }
        public void Add(Item entity)
        {
            orderContext.Items.Add(entity);
            orderContext.SaveChanges();
        }

        public void Add(List<Item> entity)
        {
            foreach (var item in entity)
            {
                if (item.ItemName!= null)
                {
                    var item1 = orderContext.Items.Where(i => i.ItemName == item.ItemName).SingleOrDefault();
                    if (item1 != null)
                    {
                        item1.Brand = item.Brand;
                        item1.Price= item.Price;
                        var category = orderContext.ItemCategory.Where(i => i.CategoryName == item.Category.CategoryName).SingleOrDefault();
                        item1.Category = category;
                        item1.OpeningBalance = item.OpeningBalance;
                    }
                    else
                    {
                        var category = orderContext.ItemCategory.Where(i => i.CategoryName == item.Category.CategoryName).SingleOrDefault();
                        item.Category = category;
                        orderContext.Items.Add(item);
                    }
                    orderContext.SaveChanges();
                }
            }
        }

        public void Update(Item entity)
        {

            var item1 = orderContext.Items.Where(i => i.ItemId== entity.ItemId).SingleOrDefault();
            item1.BalanceQty = entity.BalanceQty;
            item1.Brand = entity.Brand;
            item1.Category = entity.Category;
            item1.Description = entity.Description;
            item1.ItemHref = entity.ItemHref;
            item1.ItemName = entity.ItemName;
            item1.OpeningBalance = entity.OpeningBalance;
            item1.OtherDescription = entity.OtherDescription;
            item1.Price = entity.Price;

            orderContext.SaveChanges();

        }
        public void Delete(long id)
        {
            var item = orderContext.Items.Where(x => x.ItemId == id).FirstOrDefault();
            item.IsDeleted = true;
            orderContext.SaveChanges();
        }

        public async Task<int> SaveChangesAsync()
        {
            return await orderContext.SaveChangesAsync();
        }

        public DbContextTransaction BeginTransaction()
        {
            return orderContext.Database.BeginTransaction();
        }

        public IEnumerable<Item> GetByDates(DateTime dateTime, DateTime date)
        {
            throw new NotImplementedException();
        }

    }
}
