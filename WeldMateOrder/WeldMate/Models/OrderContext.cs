using MySql.Data.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace TyrePark.Model
{
    [DbConfigurationType(typeof(MySqlEFConfiguration))]
    public class OrderContext : DbContext
    {

        public OrderContext() : base("WeldMateDB")
        {
            Configuration.ProxyCreationEnabled = false;
        }

        public DbSet<Item> Items { get; set; }
        //public DbSet<ItemHistory> ItemHistory { get; set; }
        public DbSet<ItemEntry> ItemEntry { get; set; }
        public DbSet<ItemEntryDetail> ItemEntryDetail { get; set; }
        public DbSet<OrderEntry> OrderEntry { get; set; }
        public DbSet<OrderEntryDetail> OrderEntryDetail { get; set; }
        public DbSet<Customer> Customer { get; set; }

        //public DbSet<BranchItem> BranchItem { get; set; }
        //public DbSet<BranchTransfer> BranchTransfer { get; set; }
        //public DbSet<BranchTransferDetail> BranchTransferDetail { get; set; }
        public DbSet<ItemCategory> ItemCategory { get; set; }
        //public DbSet<CompositeItemDetail> CompositeItemDetail { get; set; }


        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Customer>()
        //    .HasIndex(p => new { p.DealerCode }).IsUnique();

        //    modelBuilder.Seed();
        //}

    }
}
