using Microsoft.AspNetCore.Mvc;
using task_management.Server.DTO;
using task_management.Server.Services;

namespace task_management.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        public UserService _userService;
        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet("getUsers")]
        public async Task<ActionResult<ApiResponse<List<User>>>> Get()
        {
            List<User> users = await _userService.GetAllUsersAsync();

            return Ok(new ApiResponse<List<User>>
            {
                Data = users,
                Success = true,
            });
        }
    }
}
