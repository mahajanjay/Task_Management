using task_management.Shared;
using task_management.Shared.Entities;
using task_management.Shared.Interfaces.Repositories;

namespace task_management.Server.Services
{
    public class TeamService
    {
        private readonly IUnitOfWork _unitOfWork;

        public TeamService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Response<List<DTO.Team>>> GetAllTeamsAsync()
        {
            try
            {
                IEnumerable<Team> teamEntities = await _unitOfWork.Teams.GetAllAsync();

                List<DTO.Team> teams = teamEntities.Select(teamEntity => new DTO.Team
                {
                    Id = teamEntity.Id,
                    Name = teamEntity.Name,
                }).ToList();

                return new Response<List<DTO.Team>>
                {
                    Result = teams,
                };
            }
            catch (Exception ex)
            {
                return new Response<List<DTO.Team>>
                {
                    ErrorMessages = ex.Message
                };
            }
            
        }

        public async Task<Response<DTO.Team>> GetTeamByIdAsync(int id)
        {
            try
            {
                Team teamEntity = await _unitOfWork.Teams.GetByIdAsync(id);
                var team = new DTO.Team
                {
                    Id = teamEntity.Id,
                    Name = teamEntity.Name,
                };

                return new Response<DTO.Team>
                {
                    Result = team,
                };
            }
            catch (Exception ex)
            {
                return new Response<DTO.Team>
                {
                    ErrorMessages = ex.Message
                };
            }
        }

        public async Task<Response<int>> CreateTeamAsync(DTO.Team team)
        {
            try
            {
                Team teamEntity = new Team
                {
                    Id = team.Id,
                    Name = team.Name,
                };
                await _unitOfWork.Teams.AddAsync(teamEntity);
                await _unitOfWork.CompleteAsync();

                //newly created team ID
                int id = teamEntity.Id;

                return new Response<int>
                {
                    Result = id
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

        public async Task<Response<bool>> UpdateTeamAsync(DTO.Team team)
        {
            try
            {
                var entity = await _unitOfWork.Teams.GetByIdAsync(team.Id);

                Team teamEntity = new Team
                {
                    Id = team.Id,
                    Name = team.Name,
                };
                _unitOfWork.Teams.Update(teamEntity);
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

        public async Task<Response<bool>> DeleteTeamAsync(int id)
        {
            try
            {
                var teamEntity = await _unitOfWork.Teams.GetByIdAsync(id);
                if (teamEntity == null)
                {
                    return new Response<bool>
                    {
                        Result = false
                    };
                }
                _unitOfWork.Teams.Remove(teamEntity);
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
