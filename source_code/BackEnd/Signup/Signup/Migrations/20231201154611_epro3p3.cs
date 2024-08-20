using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Signup.Migrations
{
    public partial class epro3p3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Type_Insurances_Type_InsuranceId_Type_Insurance",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_Type_Services_Type_Insurances_Type_InsuranceId_Type_Insurance",
                table: "Type_Services");

            migrationBuilder.DropIndex(
                name: "IX_Type_Services_Type_InsuranceId_Type_Insurance",
                table: "Type_Services");

            migrationBuilder.DropIndex(
                name: "IX_Products_Type_InsuranceId_Type_Insurance",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Type_InsuranceId_Type_Insurance",
                table: "Type_Services");

            migrationBuilder.DropColumn(
                name: "Type_InsuranceId_Type_Insurance",
                table: "Products");

            migrationBuilder.AlterColumn<string>(
                name: "Reason",
                table: "Products",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldMaxLength: 200);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Type_InsuranceId_Type_Insurance",
                table: "Type_Services",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Reason",
                table: "Products",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(1000)",
                oldMaxLength: 1000);

            migrationBuilder.AddColumn<int>(
                name: "Type_InsuranceId_Type_Insurance",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Type_Services_Type_InsuranceId_Type_Insurance",
                table: "Type_Services",
                column: "Type_InsuranceId_Type_Insurance");

            migrationBuilder.CreateIndex(
                name: "IX_Products_Type_InsuranceId_Type_Insurance",
                table: "Products",
                column: "Type_InsuranceId_Type_Insurance");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Type_Insurances_Type_InsuranceId_Type_Insurance",
                table: "Products",
                column: "Type_InsuranceId_Type_Insurance",
                principalTable: "Type_Insurances",
                principalColumn: "Id_Type_Insurance");

            migrationBuilder.AddForeignKey(
                name: "FK_Type_Services_Type_Insurances_Type_InsuranceId_Type_Insurance",
                table: "Type_Services",
                column: "Type_InsuranceId_Type_Insurance",
                principalTable: "Type_Insurances",
                principalColumn: "Id_Type_Insurance");
        }
    }
}
