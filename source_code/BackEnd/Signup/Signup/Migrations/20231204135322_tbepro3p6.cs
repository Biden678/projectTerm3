using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Signup.Migrations
{
    public partial class tbepro3p6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Type_Services");

            migrationBuilder.DropColumn(
                name: "Date_From",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Date_To",
                table: "Products");

            migrationBuilder.AddColumn<int>(
                name: "Price",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "Products");

            migrationBuilder.AddColumn<DateTime>(
                name: "Date_From",
                table: "Products",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Date_To",
                table: "Products",
                type: "datetime2",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Type_Services",
                columns: table => new
                {
                    Id_Type_Service = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Id_Type_Insurance = table.Column<int>(type: "int", nullable: false),
                    Name_Service = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Price = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Type_Services", x => x.Id_Type_Service);
                });
        }
    }
}
