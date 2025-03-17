using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace task_management.Data.Migrations
{
    /// <inheritdoc />
    public partial class TableRelations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TaskUser",
                columns: table => new
                {
                    TasksId = table.Column<int>(type: "int", nullable: false),
                    UsersId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskUser", x => new { x.TasksId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_TaskUser_TaskMaster_TasksId",
                        column: x => x.TasksId,
                        principalTable: "TaskMaster",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TaskUser_UserMaster_UsersId",
                        column: x => x.UsersId,
                        principalTable: "UserMaster",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TaskUser_UsersId",
                table: "TaskUser",
                column: "UsersId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TaskUser");
        }
    }
}
