using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
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

        [Authorize]
        [MapToApiVersion("1.0")]
        [HttpGet]
        public async Task<ActionResult<ApiResponse<UserResponse>>> Get()
        {
            Response<UserResponse> serviceResponse = await _userService.GetAllUsersAsync();

            if(serviceResponse.ErrorMessages != null)
            {
                ApiResponse<UserResponse> errorResponse = new ApiResponse<UserResponse>
                {
                    Message = serviceResponse.ErrorMessages,
                    Success = false
                };

                return StatusCode(StatusCodes.Status500InternalServerError, errorResponse);
            }

            return Ok(new ApiResponse<UserResponse>
            {
                Data = serviceResponse.Result,
                Success = true,
            });
        }

        [Authorize]
        [MapToApiVersion("1.0")]
        [HttpGet("{id}")]   
        public async Task<ActionResult<ApiResponse<UserInfo>>> Get([FromRoute] int id)
        {
            Response<UserInfo> serviceResponse = await _userService.GetUserByIdAsync(id);

            if (serviceResponse.ErrorMessages != null)
            {
                ApiResponse<UserInfo> errorMessage = new ApiResponse<UserInfo>
                {
                    Message = serviceResponse.ErrorMessages,
                    Success = false
                };
                return StatusCode(StatusCodes.Status500InternalServerError, errorMessage);
            }

            return Ok(new ApiResponse<UserInfo>
            {
                Data = serviceResponse.Result,
                Success = true,
            });
        }

        [AllowAnonymous]
        [MapToApiVersion("1.0")]
        [HttpPost]
        public async Task<ActionResult<ApiResponse<int>>> Post([FromBody] UserInfo user)
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

        [Authorize]
        [MapToApiVersion("1.0")]
        [HttpPut("id")]
        public async Task<ActionResult<ApiResponse<int>>> Update([FromBody] UserInfo user)
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
