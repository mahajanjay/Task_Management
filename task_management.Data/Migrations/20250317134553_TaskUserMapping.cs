using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace task_management.Data.Migrations
{
    /// <inheritdoc />
    public partial class TaskUserMapping : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaskUser_TaskMaster_TasksId",
                table: "TaskUser");

            migrationBuilder.DropForeignKey(
                name: "FK_TaskUser_UserMaster_UsersId",
                table: "TaskUser");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TaskUser",
                table: "TaskUser");

            migrationBuilder.RenameTable(
                name: "TaskUser",
                newName: "Tasks");

            migrationBuilder.RenameIndex(
                name: "IX_TaskUser_UsersId",
                table: "Tasks",
                newName: "IX_Tasks_UsersId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tasks",
                table: "Tasks",
                columns: new[] { "TasksId", "UsersId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_TaskMaster_TasksId",
                table: "Tasks",
                column: "TasksId",
                principalTable: "TaskMaster",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_UserMaster_UsersId",
                table: "Tasks",
                column: "UsersId",
                principalTable: "UserMaster",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_TaskMaster_TasksId",
                table: "Tasks");

            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_UserMaster_UsersId",
                table: "Tasks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tasks",
                table: "Tasks");

            migrationBuilder.RenameTable(
                name: "Tasks",
                newName: "TaskUser");

            migrationBuilder.RenameIndex(
                name: "IX_Tasks_UsersId",
                table: "TaskUser",
                newName: "IX_TaskUser_UsersId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TaskUser",
                table: "TaskUser",
                columns: new[] { "TasksId", "UsersId" });

            migrationBuilder.AddForeignKey(
                name: "FK_TaskUser_TaskMaster_TasksId",
                table: "TaskUser",
                column: "TasksId",
                principalTable: "TaskMaster",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TaskUser_UserMaster_UsersId",
                table: "TaskUser",
                column: "UsersId",
                principalTable: "UserMaster",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
