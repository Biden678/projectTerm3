using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Signup.Migrations
{
    public partial class epro3p1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Type_Insurances",
                columns: table => new
                {
                    Id_Type_Insurance = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Type_Insurances", x => x.Id_Type_Insurance);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id_Product = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Contract_Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Id_Type_Insurance = table.Column<int>(type: "int", nullable: false),
                    Type_InsuranceId_Type_Insurance = table.Column<int>(type: "int", nullable: true),
                    VAT = table.Column<int>(type: "int", nullable: false),
                    Date_From = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Date_To = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Limited_Years = table.Column<int>(type: "int", nullable: false),
                    Level_Responsibility_For_People = table.Column<int>(type: "int", nullable: false),
                    Level_Responsibility_For_The_Property = table.Column<int>(type: "int", nullable: false),
                    Reason = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Damages = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id_Product);
                    table.ForeignKey(
                        name: "FK_Products_Type_Insurances_Type_InsuranceId_Type_Insurance",
                        column: x => x.Type_InsuranceId_Type_Insurance,
                        principalTable: "Type_Insurances",
                        principalColumn: "Id_Type_Insurance");
                });

            migrationBuilder.CreateTable(
                name: "Type_Services",
                columns: table => new
                {
                    Id_Type_Service = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Id_Type_Insurance = table.Column<int>(type: "int", nullable: false),
                    Type_InsuranceId_Type_Insurance = table.Column<int>(type: "int", nullable: true),
                    Name_Service = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Price = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Type_Services", x => x.Id_Type_Service);
                    table.ForeignKey(
                        name: "FK_Type_Services_Type_Insurances_Type_InsuranceId_Type_Insurance",
                        column: x => x.Type_InsuranceId_Type_Insurance,
                        principalTable: "Type_Insurances",
                        principalColumn: "Id_Type_Insurance");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Products_Type_InsuranceId_Type_Insurance",
                table: "Products",
                column: "Type_InsuranceId_Type_Insurance");

            migrationBuilder.CreateIndex(
                name: "IX_Type_Services_Type_InsuranceId_Type_Insurance",
                table: "Type_Services",
                column: "Type_InsuranceId_Type_Insurance");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Type_Services");

            migrationBuilder.DropTable(
                name: "Type_Insurances");
        }
    }
}
