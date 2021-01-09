using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ContactManager.Migrations
{
    public partial class v2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "UpdatedAt",
                table: "Contacts",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<string>(
                name: "CreatedAt",
                table: "Contacts",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<string>(
                name: "Birthdate",
                table: "Contacts",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "TEXT");

            migrationBuilder.UpdateData(
                table: "Contacts",
                keyColumn: "Id",
                keyValue: 1L,
                columns: new[] { "Birthdate", "CreatedAt", "UpdatedAt" },
                values: new object[] { "March 28, 1997", "1/8/2021 12:57:54 PM", "1/8/2021 12:57:54 PM" });

            migrationBuilder.InsertData(
                table: "Contacts",
                columns: new[] { "Id", "Birthdate", "ContactGroup", "CreatedAt", "Description", "Favorite", "Name", "UpdatedAt" },
                values: new object[] { 2L, "November 3, 1994", "Friends", "1/8/2021 12:57:54 PM", "Nate's beautiful wife", true, "Janessa Benson", "1/8/2021 12:57:54 PM" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Contacts",
                keyColumn: "Id",
                keyValue: 2L);

            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdatedAt",
                table: "Contacts",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Contacts",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "Birthdate",
                table: "Contacts",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Contacts",
                keyColumn: "Id",
                keyValue: 1L,
                columns: new[] { "Birthdate", "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(1997, 3, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2021, 1, 8, 10, 47, 44, 875, DateTimeKind.Local).AddTicks(1664), new DateTime(2021, 1, 8, 10, 47, 44, 877, DateTimeKind.Local).AddTicks(3619) });
        }
    }
}
