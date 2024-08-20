using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Signup.Migrations
{
    public partial class Usertbproject : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Cus_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Cus_Name = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Cus_Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Cus_Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Cus_ADD = table.Column<string>(type: "nvarchar(70)", maxLength: 70, nullable: false),
                    Cus_Phone = table.Column<int>(type: "int", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Cus_Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
