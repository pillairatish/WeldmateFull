namespace TyrePark.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ItemCategories",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CategoryName = c.String(unicode: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.ItemEntries",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Date = c.DateTime(nullable: false, precision: 0),
                        CreatedBy = c.String(unicode: false),
                        CreatedDate = c.DateTime(nullable: false, precision: 0),
                        UpdatedBy = c.String(unicode: false),
                        UpdatedDate = c.DateTime(nullable: false, precision: 0),
                        OrderStatus = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.ItemEntryDetails",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        CreatedBy = c.String(unicode: false),
                        CreatedDate = c.DateTime(nullable: false, precision: 0),
                        UpdatedBy = c.String(unicode: false),
                        UpdatedDate = c.DateTime(nullable: false, precision: 0),
                        Quantity = c.Long(nullable: false),
                        OrderStatus = c.Int(nullable: false),
                        Item_ItemId = c.Long(),
                        ItemEntry_Id = c.Long(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Items", t => t.Item_ItemId)
                .ForeignKey("dbo.ItemEntries", t => t.ItemEntry_Id)
                .Index(t => t.Item_ItemId)
                .Index(t => t.ItemEntry_Id);
            
            CreateTable(
                "dbo.Items",
                c => new
                    {
                        ItemId = c.Long(nullable: false, identity: true),
                        ItemName = c.String(unicode: false),
                        Description = c.String(unicode: false),
                        Brand = c.String(unicode: false),
                        BalanceQty = c.Long(nullable: false),
                        OpeningBalance = c.Long(nullable: false),
                        ItemHref = c.String(unicode: false),
                        Price = c.Double(nullable: false),
                        IsDeleted = c.Boolean(nullable: false),
                        Category_Id = c.Int(),
                    })
                .PrimaryKey(t => t.ItemId)
                .ForeignKey("dbo.ItemCategories", t => t.Category_Id)
                .Index(t => t.Category_Id);
            
            CreateTable(
                "dbo.OrderEntries",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        BillNo = c.Long(nullable: false),
                        BillDate = c.DateTime(nullable: false, precision: 0),
                        BillAmount = c.Double(nullable: false),
                        Customer = c.String(unicode: false),
                        CreatedDate = c.DateTime(nullable: false, precision: 0),
                        UpdatedBy = c.String(unicode: false),
                        UpdatedDate = c.DateTime(nullable: false, precision: 0),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.OrderEntryDetails",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Quantity = c.Long(nullable: false),
                        Item_ItemId = c.Long(),
                        OrderEntry_Id = c.Long(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Items", t => t.Item_ItemId)
                .ForeignKey("dbo.OrderEntries", t => t.OrderEntry_Id)
                .Index(t => t.Item_ItemId)
                .Index(t => t.OrderEntry_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.OrderEntryDetails", "OrderEntry_Id", "dbo.OrderEntries");
            DropForeignKey("dbo.OrderEntryDetails", "Item_ItemId", "dbo.Items");
            DropForeignKey("dbo.ItemEntryDetails", "ItemEntry_Id", "dbo.ItemEntries");
            DropForeignKey("dbo.ItemEntryDetails", "Item_ItemId", "dbo.Items");
            DropForeignKey("dbo.Items", "Category_Id", "dbo.ItemCategories");
            DropIndex("dbo.OrderEntryDetails", new[] { "OrderEntry_Id" });
            DropIndex("dbo.OrderEntryDetails", new[] { "Item_ItemId" });
            DropIndex("dbo.Items", new[] { "Category_Id" });
            DropIndex("dbo.ItemEntryDetails", new[] { "ItemEntry_Id" });
            DropIndex("dbo.ItemEntryDetails", new[] { "Item_ItemId" });
            DropTable("dbo.OrderEntryDetails");
            DropTable("dbo.OrderEntries");
            DropTable("dbo.Items");
            DropTable("dbo.ItemEntryDetails");
            DropTable("dbo.ItemEntries");
            DropTable("dbo.ItemCategories");
        }
    }
}
