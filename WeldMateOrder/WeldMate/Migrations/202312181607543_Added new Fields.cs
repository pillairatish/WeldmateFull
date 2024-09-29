namespace TyrePark.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddednewFields : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.OrderEntries", "EmailAddress", c => c.String(unicode: false));
            AddColumn("dbo.OrderEntries", "Comments", c => c.String(unicode: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.OrderEntries", "Comments");
            DropColumn("dbo.OrderEntries", "EmailAddress");
        }
    }
}
