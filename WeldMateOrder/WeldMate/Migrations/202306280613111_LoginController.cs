namespace TyrePark.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class LoginController : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Customers",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        PhoneNumber = c.String(unicode: false),
                        CustomerName = c.String(unicode: false),
                        CustomerAddress = c.String(unicode: false),
                        CompanyName = c.String(unicode: false),
                        GSTNumber = c.String(unicode: false),
                        EmailAddress = c.String(unicode: false),
                        Password = c.String(unicode: false),
                        LastLoginTime = c.DateTime(nullable: false, precision: 0),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Customers");
        }
    }
}
