using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace task_management.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddTeamData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "UserMaster",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.InsertData(
                table: "TeamMaster",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1, "Software Development Team" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "TeamMaster",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.InsertData(
                table: "UserMaster",
                columns: new[] { "Id", "Email", "Name", "RoleId", "TeamId" },
                values: new object[] { 1, "ganpati.bappa@gmail.com", "Ganpati", 0, 0 });
        }
    }
}
