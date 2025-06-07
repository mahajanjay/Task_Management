using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace task_management.Shared
{
    public class Response<T>
    {
        public T Result { get; set; }
        public string ErrorMessages { get; set; }
    }
}
