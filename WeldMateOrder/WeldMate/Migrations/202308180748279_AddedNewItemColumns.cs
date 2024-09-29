namespace TyrePark.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedNewItemColumns : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Items", "OtherDescription", c => c.String(unicode: false));
            AddColumn("dbo.Items", "SKU", c => c.String(unicode: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Items", "SKU");
            DropColumn("dbo.Items", "OtherDescription");
        }
    }
}
