﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using task_management.Data.DataContext;
using task_management.Shared.Entities;
using task_management.Shared.Interfaces.Repositories;

namespace task_management.Data.Repositories
{
    public class TeamRepository : Repository<Team>, ITeamRepository
    {
        public TeamRepository(TaskManagerContext context) : base(context)
        {
        }
    }
}
