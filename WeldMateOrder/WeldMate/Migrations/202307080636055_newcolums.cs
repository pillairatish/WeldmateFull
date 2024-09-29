namespace TyrePark.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class newcolums : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.OrderEntries", "OrderStatus", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.OrderEntries", "OrderStatus");
        }
    }
}
