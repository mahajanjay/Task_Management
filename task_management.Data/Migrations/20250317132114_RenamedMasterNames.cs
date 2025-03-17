using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace task_management.Data.Migrations
{
    /// <inheritdoc />
    public partial class RenamedMasterNames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Roles_RoleId",
                table: "Users");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Teams_TeamId",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Teams",
                table: "Teams");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tasks",
                table: "Tasks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Roles",
                table: "Roles");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "UserMaster");

            migrationBuilder.RenameTable(
                name: "Teams",
                newName: "TeamMaster");

            migrationBuilder.RenameTable(
                name: "Tasks",
                newName: "TaskMaster");

            migrationBuilder.RenameTable(
                name: "Roles",
                newName: "RoleMaster");

            migrationBuilder.RenameIndex(
                name: "IX_Users_TeamId",
                table: "UserMaster",
                newName: "IX_UserMaster_TeamId");

            migrationBuilder.RenameIndex(
                name: "IX_Users_RoleId",
                table: "UserMaster",
                newName: "IX_UserMaster_RoleId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserMaster",
                table: "UserMaster",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TeamMaster",
                table: "TeamMaster",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TaskMaster",
                table: "TaskMaster",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RoleMaster",
                table: "RoleMaster",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserMaster_RoleMaster_RoleId",
                table: "UserMaster",
                column: "RoleId",
                principalTable: "RoleMaster",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserMaster_TeamMaster_TeamId",
                table: "UserMaster",
                column: "TeamId",
                principalTable: "TeamMaster",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserMaster_RoleMaster_RoleId",
                table: "UserMaster");

            migrationBuilder.DropForeignKey(
                name: "FK_UserMaster_TeamMaster_TeamId",
                table: "UserMaster");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserMaster",
                table: "UserMaster");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TeamMaster",
                table: "TeamMaster");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TaskMaster",
                table: "TaskMaster");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RoleMaster",
                table: "RoleMaster");

            migrationBuilder.RenameTable(
                name: "UserMaster",
                newName: "Users");

            migrationBuilder.RenameTable(
                name: "TeamMaster",
                newName: "Teams");

            migrationBuilder.RenameTable(
                name: "TaskMaster",
                newName: "Tasks");

            migrationBuilder.RenameTable(
                name: "RoleMaster",
                newName: "Roles");

            migrationBuilder.RenameIndex(
                name: "IX_UserMaster_TeamId",
                table: "Users",
                newName: "IX_Users_TeamId");

            migrationBuilder.RenameIndex(
                name: "IX_UserMaster_RoleId",
                table: "Users",
                newName: "IX_Users_RoleId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Teams",
                table: "Teams",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tasks",
                table: "Tasks",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Roles",
                table: "Roles",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Roles_RoleId",
                table: "Users",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Teams_TeamId",
                table: "Users",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
