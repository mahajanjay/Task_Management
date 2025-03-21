﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace task_management.Data.Entities
{
    class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public int RoleId { get; set; }
        public int TeamId { get; set; }
        
        public Role Role { get; set; }
        public Team Team { get; set; }

        public ICollection<Task> Tasks { get; set; }

    }  
}
