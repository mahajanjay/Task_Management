using task_management.Shared.Interfaces.Repositories;

namespace task_management.Server.Services
{
    public class RoleService 
    {
        private readonly IUnitOfWork _unitOfWork;
        public RoleService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<List<DTO.Role>> GetAllRolesAsync()
        {
            var roleEntities = await _unitOfWork.Roles.GetAllAsync();
            return roleEntities.Select(roleEntity => new DTO.Role
            {
                Id = roleEntity.Id,
                Name = roleEntity.Name,
            }).ToList();
        }

        public async Task<DTO.Role> GetRoleByIdAsync(int id)
        {
            var roleEntity = await _unitOfWork.Roles.GetByIdAsync(id);
            return new DTO.Role
            {
                Id = roleEntity.Id,
                Name = roleEntity.Name,
            };
        }

        public async Task<bool> CreateRoleAsync(DTO.Role role)
        {
            task_management.Shared.Entities.Role roleEntity = new task_management.Shared.Entities.Role
            {
                Id = role.Id,
                Name = role.Name,
            };
            await _unitOfWork.Roles.AddAsync(roleEntity);
            return await _unitOfWork.CompleteAsync() > 0;
        }

        public async Task<bool> UpdateRoleAsync(DTO.Role role)
        {
            task_management.Shared.Entities.Role roleEntity = new task_management.Shared.Entities.Role
            {
                Id = role.Id,
                Name = role.Name,
            };
            _unitOfWork.Roles.Update(roleEntity);
            return await _unitOfWork.CompleteAsync() > 0;
        }

        public async Task<bool> DeleteRoleAsync(int id)
        {
            var roleEntity = await _unitOfWork.Roles.GetByIdAsync(id);
            if (roleEntity == null)
            {
                return false;
            }
            _unitOfWork.Roles.Remove(roleEntity);
            return await _unitOfWork.CompleteAsync() > 0;
        }
    }
}
