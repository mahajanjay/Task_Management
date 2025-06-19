using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using task_management.Server.DTO;
using task_management.Shared;

namespace task_management.Server.Controllers
{
    [Authorize]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        private Services.TeamService _teamService;
        public TeamController(Services.TeamService teamService)
        {
            _teamService = teamService;
        }

        [MapToApiVersion("1.0")]
        [HttpGet]
        public async Task<ActionResult<ApiResponse<List<Team>>>> Get()
        {
            Response<List<Team>> serviceResponse = await _teamService.GetAllTeamsAsync();

            if (serviceResponse.ErrorMessages != null) 
            {
                var errorResponse = new ApiResponse<List<Team>>
                {
                    Success = false,
                    Message = serviceResponse.ErrorMessages
                };

                return StatusCode(StatusCodes.Status500InternalServerError, errorResponse);
            }

            return Ok(new ApiResponse<List<Team>>
            {
                Success = true,
                Data = serviceResponse.Result,
            });
        }

        [MapToApiVersion("1.0")]
        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<Team>>> Get([FromRoute] int id)
        {
            Response<Team> serviceResponse = await _teamService.GetTeamByIdAsync(id);

            if(serviceResponse.ErrorMessages != null)
            {
                var errorResponse = new ApiResponse<Team>
                {
                    Success = false,
                    Message = serviceResponse.ErrorMessages
                };

                return StatusCode(StatusCodes.Status500InternalServerError, errorResponse);
            }

            return Ok(new ApiResponse<Team>
            {
                Success = true,
                Data = serviceResponse.Result,
            });
        }

        [MapToApiVersion("1.0")]
        [HttpPost]
        public async Task<ActionResult<ApiResponse<int>>> Post([FromBody] Team team)
        {
            Response<int> serviceResponse = await _teamService.CreateTeamAsync(team);
            if (serviceResponse.ErrorMessages != null)
            {
                var errorResponse = new ApiResponse<int>
                {
                    Success = false,
                    Message = serviceResponse.ErrorMessages
                };
                return StatusCode(StatusCodes.Status500InternalServerError, errorResponse);
            }

            return Ok(new ApiResponse<int>
            {
                Success = true,
                Data = serviceResponse.Result,
            });
        }

        [MapToApiVersion("1.0")]
        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<bool>>> Put([FromRoute] int id ,[FromBody] Team team)
        {
            Response<bool> serviceResponse = await _teamService.UpdateTeamAsync(team);
            if (serviceResponse.ErrorMessages != null)
            {
                var errorResponse = new ApiResponse<bool>
                {
                    Success = false,
                    Message = serviceResponse.ErrorMessages
                };
                return StatusCode(StatusCodes.Status500InternalServerError, errorResponse);
            }

            return Ok(new ApiResponse<bool>
            {
                Success = true,
                Data = serviceResponse.Result,
            });
        }

        [MapToApiVersion("1.0")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<bool>>> Delete([FromRoute] int id)
        {
            Response<bool> serviceResponse = await _teamService.DeleteTeamAsync(id);

            if(serviceResponse.ErrorMessages != null)
            {
                var errorResponse = new ApiResponse<bool>
                {
                    Success = false,
                    Message = serviceResponse.ErrorMessages
                };
                return StatusCode(StatusCodes.Status500InternalServerError, errorResponse);
            }

            return Ok(new ApiResponse<bool>
            {
                Success = true,
                Data = serviceResponse.Result,
            });
        }
    }
}
