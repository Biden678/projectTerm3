using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Signup.Migrations
{
    public partial class epro3p4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ClaimDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ClaimNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PolicyNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PolicyStartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PolicyEndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CusName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PlaceOfAccident = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateOfAccident = table.Column<DateTime>(type: "datetime2", nullable: false),
                    InsuredAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ClaimableAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClaimDetails", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClaimDetails");
        }
    }
}
