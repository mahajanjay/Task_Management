using task_management.Server.DTO;
using task_management.Shared.Interfaces.Repositories;

namespace task_management.Server.Services
{
    public class UserService
    {
        private readonly IUnitOfWork _unitOfWork;
        public UserService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<DTO.User> GetUserByIdAsync(int id)
        {
            var userEntity = await _unitOfWork.Users.GetByIdAsync(id);
            return new DTO.User
            {
                Id = userEntity.Id,
                Name = userEntity.Name,
                Email = userEntity.Email,
                RoleId = userEntity.RoleId,
                TeamId = userEntity.TeamId
            };
        }
        public async Task<List<DTO.User>> GetAllUsersAsync()
        {
            var userEntities = await _unitOfWork.Users.GetAllAsync();
            return userEntities.Select(userEntity => new DTO.User
            {
                Id = userEntity.Id,
                Name = userEntity.Name,
                Email = userEntity.Email,
                RoleId = userEntity.RoleId,
                TeamId = userEntity.TeamId
            }).ToList();
        }
        public async Task<bool> CreateUserAsync(DTO.User user)
        {
            task_management.Shared.Entities.User userEntity = new task_management.Shared.Entities.User
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                RoleId = user.RoleId, 
                TeamId = user.TeamId
            };
            await _unitOfWork.Users.AddAsync(userEntity);
            return await _unitOfWork.CompleteAsync() > 0;
        }
        public async Task<bool> UpdateUserAsync(DTO.User user)
        {
            task_management.Shared.Entities.User userEntity = new task_management.Shared.Entities.User
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                RoleId = user.RoleId,
                TeamId = user.TeamId
            };

            _unitOfWork.Users.Update(userEntity);
            return await _unitOfWork.CompleteAsync() > 0;
        }
        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await _unitOfWork.Users.GetByIdAsync(id);
            if (user == null) return false;
            _unitOfWork.Users.Remove(user);
            return await _unitOfWork.CompleteAsync() > 0;
        }
    }
    
}
