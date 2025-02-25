using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace task_management.Data.DataContext
{
    class TaskManagerContextFactory : IDesignTimeDbContextFactory<TaskManagerContext>
    {
        public TaskManagerContext CreateDbContext(string[] args)
        {
            // Build configuration to read the connection string from appsettings.json
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            var connectionString = configuration.GetConnectionString("TaskManagement_String");

            // Set up the DbContextOptions with the connection string
            var optionsBuilder = new DbContextOptionsBuilder<TaskManagerContext>();
            optionsBuilder.UseSqlServer(connectionString);

            return new TaskManagerContext(optionsBuilder.Options);
        }
    }
}
