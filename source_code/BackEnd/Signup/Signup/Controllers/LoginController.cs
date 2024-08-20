using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Signup.Models;
using Signup.Services;

namespace Signup.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;
        private readonly IConfiguration _configuration;
        public LoginController(IConfiguration configuration, DatabaseContext databaseContext)
        {
            _dbContext = databaseContext;
            _configuration = configuration;
        }
        [HttpPost]
        public IActionResult Login([FromBody] UserCreadential creadentials)
        {
            var user = Authenticate(creadentials);
            if (user != null)
            {
                var tokenString = TokenServices.GenerateJSONWebToken(_configuration, user);
                return Ok(new { Token = tokenString });
            }
            else
            {
                return NotFound("Account is not valid");
            }
        }

        private Users Authenticate(UserCreadential userCreadentials)
        {
            var currentUser = _dbContext.Users.FirstOrDefault(x =>
            x.Cus_Name == userCreadentials.Name);
            if (currentUser != null)
            {
                var checkPass = HashPass.VerifiedPassword(userCreadentials.Password, currentUser.Cus_Password);
                if (checkPass)
                {
                    return currentUser;
                }
                else
                {
                    return null;
                }

            }
            return null;
        }
    }
}