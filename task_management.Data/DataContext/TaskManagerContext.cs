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
    public class TaskManagerContext : DbContext
    {
        public TaskManagerContext(DbContextOptions<TaskManagerContext> options) : base(options)
        {
        }

        DbSet<Role> Roles { get; set; }
    }
}
