using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace task_management.Shared.Entities
{
    public class Role
    {
        public int Id { get; set; } // Unique identifier for the role
        public string Name { get; set; } // Name of the role (e.g., "Admin", "User")

        public ICollection<User> Users { get; set; }
    }
}
