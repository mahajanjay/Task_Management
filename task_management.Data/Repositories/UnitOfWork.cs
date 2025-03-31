using task_management.Data.DataContext;
using task_management.Data.Repositories;
using task_management.Shared.Interfaces.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly TaskManagerContext _context;
    public IUserRepository Users { get; private set; } 
    public IRoleRepository Roles { get; private set; }

    public UnitOfWork(TaskManagerContext context)
    {
        _context = context;
        Users = new UserRepository(_context);
        Roles = new RoleRepository(_context);
    }

    public async Task<int> CompleteAsync()
    {
        return await _context.SaveChangesAsync();
    }

    public void Dispose()
    {
        _context.Dispose();
    }
}