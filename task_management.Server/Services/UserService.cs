using task_management.Server.DTO;
using task_management.Shared;
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

        public async Task<Response<DTO.UserInfo>> GetUserByIdAsync(int id)
        {
            try
            {
                var userEntity = await _unitOfWork.Users.GetByIdAsync(id);

                UserInfo user = new DTO.UserInfo
                {
                    Id = userEntity.Id,
                    Name = userEntity.Name,
                    Email = userEntity.Email,
                    RoleId = userEntity.RoleId,
                    TeamId = userEntity.TeamId
                };

                return new Response<DTO.UserInfo>
                {
                    Result = user,
                };
            }
            catch(Exception ex)
            {
                return new Response<DTO.UserInfo>
                {
                    ErrorMessages = ex.Message
                };
            }

        }

        public async Task<Response<UserResponse>> GetAllUsersAsync()
        {
            try
            {
                var userEntities = await _unitOfWork.Users.GetAllAsync();
                UserResponse userResponse = new UserResponse();
                userResponse.Users = userEntities.Select(userEntity => new DTO.UserInfo
                {
                    Id = userEntity.Id,
                    Name = userEntity.Name,
                    Email = userEntity.Email,
                    RoleId = userEntity.RoleId,
                    TeamId = userEntity.TeamId
                }).ToList();
                    
                return new Response<UserResponse>
                {
                    Result = userResponse
                };
            }
            catch(Exception ex)
            {
                return new Response<UserResponse>
                {
                    ErrorMessages = ex.Message
                };
            }
        }

        public async Task<Response<int>> CreateUserAsync(DTO.UserInfo user)
        {
            try
            {
                Shared.Entities.User userEntity = new Shared.Entities.User
                {
                    Name = user.Name,
                    Email = user.Email,
                    Password = user.Password,
                    RoleId = user.RoleId,
                    TeamId = user.TeamId
                };
                await _unitOfWork.Users.AddAsync(userEntity);
                int id = await _unitOfWork.CompleteAsync();

                int result = id > 0 ? userEntity.Id : 0;

                return new Response<int>
                {
                    Result = result
                };
            }
            catch (Exception ex)
            {
                return new Response<int>
                {
                    ErrorMessages = ex.Message
                };
            }
            
        }

        public async Task<Response<int>> UpdateUserAsync(DTO.UserInfo user)
        {
            try
            {
                Shared.Entities.User userEntity = new Shared.Entities.User
                {
                    Id = user.Id,
                    Name = user.Name,
                    Email = user.Email,
                    RoleId = user.RoleId,
                    TeamId = user.TeamId
                };

                _unitOfWork.Users.Update(userEntity);
                int id = await _unitOfWork.CompleteAsync();

                int result = id > 0 ? userEntity.Id : 0;
                return new Response<int>
                {
                    Result = result
                };
            }
            catch (Exception ex)
            {
                return new Response<int>
                {
                    ErrorMessages = ex.Message
                };
            }
        }

        public async Task<Response<bool>> DeleteUserAsync(int id)
        {
            try
            {
                var user = await _unitOfWork.Users.GetByIdAsync(id);
                if (user == null)
                {
                    return new Response<bool>
                    {
                        ErrorMessages = "User not found."
                    };
                }
                _unitOfWork.Users.Remove(user);
                bool result = await _unitOfWork.CompleteAsync() > 0;

                return new Response<bool>
                {
                    Result = result
                };
            }
            catch (Exception ex)
            {
                return new Response<bool>
                {
                    ErrorMessages = ex.Message
                };
            }
        }
    }
    
}
