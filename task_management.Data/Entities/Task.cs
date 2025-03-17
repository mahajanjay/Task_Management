using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace task_management.Data.Entities
{
    class Task
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        /*
         AssignedTo is User id refers to users
         */
    }
}
