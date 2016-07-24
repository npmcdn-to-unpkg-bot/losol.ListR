using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace losol.ListR.Migrations
{
    public partial class AddedListitemsModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ListItem",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    AddedDate = table.Column<DateTime>(nullable: false),
                    Category = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: false),
                    IsDone = table.Column<bool>(nullable: false),
                    IsImportant = table.Column<bool>(nullable: false),
                    ListGuid = table.Column<Guid>(nullable: false),
                    No = table.Column<float>(nullable: false),
                    Unit = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ListItem", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ListItem");
        }
    }
}
