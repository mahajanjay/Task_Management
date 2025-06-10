using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using task_management.Server.DTO;
using task_management.Server.Services;
using task_management.Shared;

namespace task_management.Server.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        public UserService _userService;
        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [MapToApiVersion("1.0")]
        [HttpGet]
        public async Task<ActionResult<ApiResponse<List<User>>>> Get()
        {
            Response<List<User>> serviceResponse = await _userService.GetAllUsersAsync();

            if(serviceResponse.ErrorMessages != null)
            {
                ApiResponse<List<User>> errorResponse = new ApiResponse<List<User>>
                {
                    Message = serviceResponse.ErrorMessages,
                    Success = false
                };

                return StatusCode(StatusCodes.Status500InternalServerError, errorResponse);
            }

            return Ok(new ApiResponse<List<User>>
            {
                Data = serviceResponse.Result,
                Success = true,
            });
        }

        [MapToApiVersion("1.0")]
        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<User>>> Get([FromRoute] int id)
        {
            Response<User> serviceResponse = await _userService.GetUserByIdAsync(id);

            if (serviceResponse.ErrorMessages != null)
            {
                ApiResponse<User> errorMessage = new ApiResponse<User>
                {
                    Message = serviceResponse.ErrorMessages,
                    Success = false
                };
                return StatusCode(StatusCodes.Status500InternalServerError, errorMessage);
            }

            return Ok(new ApiResponse<User>
            {
                Data = serviceResponse.Result,
                Success = true,
            });
        }

        [MapToApiVersion("1.0")]
        [HttpPost]
        public async Task<ActionResult<ApiResponse<int>>> Post([FromBody] User user)
        {
            Response<int> serviceResponse = await _userService.CreateUserAsync(user);

            if (serviceResponse.ErrorMessages != null)
            {
                ApiResponse<int> errorResponse = new ApiResponse<int>
                {
                    Message = serviceResponse.ErrorMessages,
                    Success = false
                };
                return StatusCode(StatusCodes.Status500InternalServerError, errorResponse);
            }

            return Ok(new ApiResponse<int>
            {
                Data = serviceResponse.Result,
                Success = true,
            });
        }

        [MapToApiVersion("1.0")]
        [HttpPut("id")]
        public async Task<ActionResult<ApiResponse<int>>> Update([FromBody] User user)
        {
            Response<int> serviceResponse = await _userService.UpdateUserAsync(user);

            if (serviceResponse.ErrorMessages != null)
            {
                ApiResponse<int> errorResponse = new ApiResponse<int>
                {
                    Message = serviceResponse.ErrorMessages,
                    Success = false
                };
                return StatusCode(StatusCodes.Status500InternalServerError, errorResponse);
            }

            return Ok(new ApiResponse<int>
            {
                Data = serviceResponse.Result,
                Success = true,
            });
        }
    }
}
