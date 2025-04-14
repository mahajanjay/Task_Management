using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using task_management.Server.DTO;

namespace task_management.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        private task_management.Server.Services.TeamService _teamService;
        public TeamController(Services.TeamService teamService)
        {
            _teamService = teamService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Team>>> GetAllTeams()
        {
            var teams = await _teamService.GetAllTeamsAsync();
            return Ok(new ApiResponse<List<Team>>
            {
                Success = true,
                Data = teams,
            });
        }
    }
}
