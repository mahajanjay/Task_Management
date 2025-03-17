using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using task_management.Data.Entities;
using Task = task_management.Data.Entities.Task;

namespace task_management.Data.DataContext
{

    /*
     EF Commands - directory should be Data project
        1. Add-Migration MigrationName -StartupProject task_management.Server
        2. Update-Database -StartupProject task_management.Server
    */

    public class TaskManagerContext : DbContext
    {
        public TaskManagerContext(DbContextOptions<TaskManagerContext> options) : base(options) { }

        DbSet<Role> RoleMaster { get; set; }
        DbSet<User> UserMaster { get; set; }
        DbSet<Team> TeamMaster { get; set; }
        DbSet<Task> TaskMaster { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .HasOne(u => u.Role)
                .WithMany(r => r.Users)
                .HasForeignKey(u => u.RoleId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Role>().HasData(
                new Role { Id = 1, Name = "Admin" },
                new Role { Id = 2, Name = "Member" },
                new Role { Id = 3, Name = "User" }
                );

            modelBuilder.Entity<User>()
                .HasOne(u => u.Team)
                .WithMany(t => t.Users)
                .HasForeignKey(u => u.TeamId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Task>()
                .HasMany(u => u.Users)
                .WithMany(t => t.Tasks)
                .UsingEntity(j => j.ToTable("Tasks"));
        }
    }
}
