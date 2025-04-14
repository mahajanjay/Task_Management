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

        public async Task<List<DTO.Team>> GetAllTeamsAsync()
        {
            var teamEntities = await _unitOfWork.Teams.GetAllAsync();
            return teamEntities.Select(teamEntity => new DTO.Team
            {
                Id = teamEntity.Id,
                Name = teamEntity.Name,
            }).ToList();
        }

        public async Task<DTO.Team> GetTeamByIdAsync(int id)
        {
            var teamEntity = await _unitOfWork.Teams.GetByIdAsync(id);
            return new DTO.Team
            {
                Id = teamEntity.Id,
                Name = teamEntity.Name,
            };
        }

        public async Task<bool> CreateTeamAsync(DTO.Team team)
        {
            task_management.Shared.Entities.Team teamEntity = new task_management.Shared.Entities.Team
            {
                Id = team.Id,
                Name = team.Name,
            };
            await _unitOfWork.Teams.AddAsync(teamEntity);
            return await _unitOfWork.CompleteAsync() > 0;
        }

        public async Task<bool> UpdateTeamAsync(DTO.Team team)
        {
            task_management.Shared.Entities.Team teamEntity = new task_management.Shared.Entities.Team
            {
                Id = team.Id,
                Name = team.Name,
            };
            _unitOfWork.Teams.Update(teamEntity);
            return await _unitOfWork.CompleteAsync() > 0;
        }

        public async Task<bool> DeleteTeamAsync(int id)
        {
            var teamEntity = await _unitOfWork.Teams.GetByIdAsync(id);
            if (teamEntity == null)
            {
                return false;
            }
            _unitOfWork.Teams.Remove(teamEntity);
            return await _unitOfWork.CompleteAsync() > 0;
        }
    }
}
