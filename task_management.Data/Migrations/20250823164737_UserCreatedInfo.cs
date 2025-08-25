using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace task_management.Data.Migrations
{
    /// <inheritdoc />
    public partial class UserCreatedInfo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "UserMaster",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "UserMaster",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "UserMaster",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdatedBy",
                table: "UserMaster",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "UserMaster");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "UserMaster");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "UserMaster");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "UserMaster");
        }
    }
}
