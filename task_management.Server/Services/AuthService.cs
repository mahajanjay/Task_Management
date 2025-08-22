using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using task_management.Server.DTO;
using task_management.Shared;
using task_management.Shared.Entities;
using task_management.Shared.Interfaces.Repositories;

namespace task_management.Server.Services
{
    public class AuthService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _configuration;
        public AuthService(IUnitOfWork unitOfWork, IConfiguration configuration)
        {
            _unitOfWork = unitOfWork;
            _configuration = configuration;
        }

        public async Task<Response<DTO.UserInfo>> AuthenticateUserAsync(string email, string password)
        {
            try
            {
                IEnumerable<Shared.Entities.User> user = await _unitOfWork.Users.FindAsync(u => u.Email == email && u.Password == password);

                List<Shared.Entities.User> userList = user.ToList();

                if(userList.Count > 0)
                {
                    DTO.UserInfo userDto = new DTO.UserInfo
                    {
                        Id = userList[0].Id,
                        Name = userList[0].Name,
                        Email = userList[0].Email,
                        RoleId = userList[0].RoleId,
                        TeamId = userList[0].TeamId
                    };

                    return new Response<DTO.UserInfo>
                    {
                        Result = userDto
                    };
                }
                else
                {
                    return new Response<DTO.UserInfo>
                    {
                        ErrorMessages = "Username or Password doesn't match."
                    };
                }
            }
            catch (Exception ex)
            {
                return new Response<DTO.UserInfo>
                {
                    ErrorMessages = ex.Message
                };
            }
        }

        public Response<LoginResponse> GenerateJwtToken(UserInfo user)
        {
            var jwtSection = _configuration.GetSection("Jwt");
            var key = jwtSection.GetValue<string>("Key");
            var creds = new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
                SecurityAlgorithms.HmacSha256
            );

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Sub, user.Name),
                new Claim(ClaimTypes.Role, user.RoleId.ToString()),
            };

            var token = new JwtSecurityToken(
                issuer: jwtSection.GetValue<string>("Issuer"),
                audience: jwtSection.GetValue<string>("Audience"),
                claims: claims,
                expires: DateTime.Now.AddMinutes(jwtSection.GetValue<int>("ExpiresInMinutes")),
                signingCredentials: creds
            );

            LoginResponse loginResponse = new LoginResponse
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token)
            };

            return new Response<LoginResponse>
            {
                Result = loginResponse
            };
        }
    }
}
