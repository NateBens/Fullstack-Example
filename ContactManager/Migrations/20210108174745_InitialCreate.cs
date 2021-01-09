using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ContactManager.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Contacts",
                columns: table => new
                {
                    Id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Birthdate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ContactGroup = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Favorite = table.Column<bool>(type: "INTEGER", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contacts", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Contacts",
                columns: new[] { "Id", "Birthdate", "ContactGroup", "CreatedAt", "Description", "Favorite", "Name", "UpdatedAt" },
                values: new object[] { 1L, new DateTime(1997, 3, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), "Friends", new DateTime(2021, 1, 8, 10, 47, 44, 875, DateTimeKind.Local).AddTicks(1664), "Tallest, strongest, coolest, and most handsome developer I've ever seen", true, "Nathan Benson", new DateTime(2021, 1, 8, 10, 47, 44, 877, DateTimeKind.Local).AddTicks(3619) });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Contacts");
        }
    }
}
