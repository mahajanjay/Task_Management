using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace task_management.Shared.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }

        [MinLength(8, ErrorMessage = "Password must be at least 8 characters long.")]
        public string Password { get; set; }
        public int RoleId { get; set; }
        public int TeamId { get; set; }
        
        public Role Role { get; set; }
        public Team Team { get; set; }

        public ICollection<Task> Tasks { get; set; }

    }  
}
