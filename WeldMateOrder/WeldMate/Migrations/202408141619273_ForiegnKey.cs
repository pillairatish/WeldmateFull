namespace TyrePark.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ForiegnKey : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Items", "Category_Id", "dbo.ItemCategories");
            DropIndex("dbo.Items", new[] { "Category_Id" });
            RenameColumn(table: "dbo.Items", name: "Category_Id", newName: "ItemCategoryId");
            AlterColumn("dbo.Items", "ItemCategoryId", c => c.Int(nullable: false));
            CreateIndex("dbo.Items", "ItemCategoryId");
            AddForeignKey("dbo.Items", "ItemCategoryId", "dbo.ItemCategories", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Items", "ItemCategoryId", "dbo.ItemCategories");
            DropIndex("dbo.Items", new[] { "ItemCategoryId" });
            AlterColumn("dbo.Items", "ItemCategoryId", c => c.Int());
            RenameColumn(table: "dbo.Items", name: "ItemCategoryId", newName: "Category_Id");
            CreateIndex("dbo.Items", "Category_Id");
            AddForeignKey("dbo.Items", "Category_Id", "dbo.ItemCategories", "Id");
        }
    }
}
