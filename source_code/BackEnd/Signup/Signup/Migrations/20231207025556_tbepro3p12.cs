using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Signup.Migrations
{
    public partial class tbepro3p12 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Id_Order",
                table: "OrderDTOs");

            migrationBuilder.AddColumn<string>(
                name: "Code_Order",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Code_Order",
                table: "OrderDTOs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Code_Order",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Code_Order",
                table: "OrderDTOs");

            migrationBuilder.AddColumn<int>(
                name: "Id_Order",
                table: "OrderDTOs",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
