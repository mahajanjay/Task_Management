using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using task_management.Server.DTO;
using task_management.Server.Services;
using task_management.Shared;

namespace task_management.Server.Controllers
{
    [AllowAnonymous]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public readonly IConfiguration _configuration;
        private readonly AuthService _authService;
        public AuthController(IConfiguration configuration, AuthService authService)
        {
            _configuration = configuration;
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginResponse>> Post([FromBody] DTO.Login login)
        {
            Response<DTO.UserInfo> serviceResponse = await _authService.AuthenticateUserAsync(login.Email, login.Password);

            if (serviceResponse.ErrorMessages != null)
            {
                var errorResponse = new ApiResponse<bool>()
                {
                    Success = false,
                    Message = serviceResponse.ErrorMessages
                };

                return Unauthorized(errorResponse);
            }

            Response<LoginResponse> tokenResponse = _authService.GenerateJwtToken(serviceResponse.Result);

            if (tokenResponse.ErrorMessages != null)
            {
                var errorResponse = new ApiResponse<bool>()
                {
                    Success = false,
                    Message = tokenResponse.ErrorMessages
                };
                return Unauthorized(errorResponse);
            }

            return Ok(new ApiResponse<LoginResponse>
            {
                Data = tokenResponse.Result,
                Success = true,
            });
        }
    }
}
