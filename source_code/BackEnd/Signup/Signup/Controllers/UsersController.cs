using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Signup.Models;
using Signup.Services;
using System.Data;

namespace Signup.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DatabaseContext _DbContext;
        private readonly EmailServices _emailservices;
        public UsersController(DatabaseContext dbContext, EmailServices emailServices)
        {
            _DbContext = dbContext;
            _emailservices = emailServices;
        }
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            try
            {
                var users = await _DbContext.Users.ToListAsync();
                if (users != null && users.Any())
                {
                    var response = new CustomStatusCode<IEnumerable<Users>>
                        (StatusCodes.Status200OK, "Get list successfully", users, null);
                    return Ok(response);
                }
                else
                {
                    var response = new CustomStatusCode<IEnumerable<Users>>
                        (StatusCodes.Status404NotFound, "Not found result", null, null);
                    return NotFound(users);
                }

            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError,
                    new CustomStatusCode<Users>()
                    {
                        Message = "An error occured while retrived model",
                        Error = ex.Message
                    });
            }
        }
        [HttpPost]
        public async Task<IActionResult> AddUser([FromBody] SignUpMail model)
        {
            try
            {
                var existingUserNameEmail = await _DbContext.Users.FirstOrDefaultAsync(u => u.Cus_Name == model.Users.Cus_Name && u.Cus_Email == model.Users.Cus_Email);
                var existingUserEmail = await _DbContext.Users.FirstOrDefaultAsync(u => u.Cus_Email == model.Users.Cus_Email);
                var existingUserName = await _DbContext.Users.FirstOrDefaultAsync(u => u.Cus_Name == model.Users.Cus_Name);
                if (existingUserNameEmail != null)
                {
                    // Both email and name already registered
                    var response = new CustomStatusCode<Users>(400, "Email and name already registered", null, null);
                    return BadRequest(response);
                }
                else if (existingUserEmail != null)
                {
                    // Email already registered
                    var response = new CustomStatusCode<Users>(400, "Email already registered", null, null);
                    return BadRequest(response);
                }
                else if (existingUserName != null)
                {
                    // Name already registered
                    var response = new CustomStatusCode<Users>(400, "Your name already registered", null, null);
                    return BadRequest(response);
                }
                else
                {
                    // Proceed with the registration process
                    model.Users.Code = GenerateRandomCode();
                    model.Users.Status = 0;
                    model.Users.Cus_Password = HashPass.HashPassword(model.Users.Cus_Password);
                    model.Users.Role = "User";
                    // (Rest of your registration logic)

                    var resource = await _DbContext.Users.AddAsync(model.Users);
                    await _DbContext.SaveChangesAsync();

                    if (resource != null)
                    {
                        model.EmailRequest.HtmlContent = $"This is the link to Verify http://localhost:3000/verifiedAccount/{model.Users.Cus_Id}?{model.Users.Code}";
                        await _emailservices.SendMailAsync(model.EmailRequest.Tomail, model.EmailRequest.Subject, model.EmailRequest.HtmlContent);
                        var response = new CustomStatusCode<Users>(201, "Register successful", model.Users, null);
                        return Ok(response);
                    }
                    else
                    {
                        var response = new CustomStatusCode<Users>(400, "Unable to register", null, null);
                        return BadRequest(response);
                    }
                }
            }
            catch (Exception Ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new CustomStatusCode<Users>()
                {
                    Error = Ex.Message,
                    Message = "An error occured while retrived model"
                });
            }
        }

        private string GenerateRandomCode()
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var random = new Random();

            // Generate a random string of length 20 using characters from the 'chars' string
            string code = new string(Enumerable.Repeat(chars, 100)
                .Select(s => s[random.Next(s.Length)])
                .ToArray());

            return code;
        }

        [HttpDelete("{id}")]
        /* [Authorize(Roles = "Admin")]*/
        public async Task<IActionResult> DeleteUser(int id)
        {
            try
            {
                var user = await _DbContext.Users.FindAsync(id);
                if (user != null)
                {
                    _DbContext.Users.Remove(user);
                    await _DbContext.SaveChangesAsync();
                    var response = new CustomStatusCode<Users>(200,
                           "Delete user successfully", user, null);
                    return Ok(response);
                }
                else
                {
                    var response = new CustomStatusCode<Users>(404,
"user not found or unable to delete", null, null);
                    return NotFound(response);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new CustomStatusCode<Users>()
                {
                    Message = "An error occurred while retrieving the model.",
                    Error = ex.Message
                });
            }
        }
        [HttpPut("{id}")]
        /* [Authorize(Roles = "Admin")]*/
        public async Task<IActionResult> UpdateUser(int id, [FromBody] ChangeInformation updatedUser)
        {
            try
            {
                var existingUser = await _DbContext.Users.FindAsync(id);
                if (existingUser != null)
                {
                    // Cập nhật thông tin của existingUser từ updatedUser
                    // Cập nhật các trường khác nếu cần
                    // Không cần thiết lập EntityState.Modified khi sử dụng FindAsync
                    existingUser.Cus_Phone = updatedUser.Cus_Phone;
                    existingUser.Cus_ADD = updatedUser.Cus_ADD;
                    _DbContext.Entry(existingUser).State = EntityState.Modified;
                    await _DbContext.SaveChangesAsync();
                    var response = new CustomStatusCode<Users>(200,
                           "Update user successfully", existingUser, null);
                    return Ok(response);
                }
                else
                {
                    var response = new CustomStatusCode<Users>(404,
                             "Not found user to update", null, null);
                    return NotFound(response);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new CustomStatusCode<Users>()
                {
                    Message = "An error occurred while retrieving the model.",
                    Error = ex.Message
                });
            }
        }
        [HttpPut("VerifyCus{id}")]
        /* [Authorize(Roles = "Admin")]*/
        public async Task<IActionResult> VerifyCus(int id)
        {
            try
            {
                var existingUser = await _DbContext.Users.FindAsync(id);
                if (existingUser != null)
                {
                    existingUser.Status = 2;
                    _DbContext.Users.Update(existingUser);
                    await _DbContext.SaveChangesAsync();

                    var response = new CustomStatusCode<Users>(200,
                           "Update user successfully", existingUser, null);
                    return Ok(response);
                }
                else
                {
                    var response = new CustomStatusCode<Users>(404,
                             "Not found user to update", null, null);
                    return NotFound(response);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new CustomStatusCode<Users>()
                {
                    Message = "An error occurred while retrieving the model.",
                    Error = ex.Message
                });
            }
        }
        [HttpPut("ChangePassword{id}")]
        public async Task<IActionResult> ChangPass(int id, [FromBody] ChangePasswordModel changePasswordModel)
        {
            try
            {
                var existingUser = await _DbContext.Users.FindAsync(id);
                if (existingUser != null)
                {
                    var checkPass = HashPass.VerifiedPassword(changePasswordModel.CurrentPassword, existingUser.Cus_Password);
                    if (checkPass)
                    {
                        if (changePasswordModel.NewPassword == changePasswordModel.ConfirmPassword)
                        {
                            existingUser.Cus_Password = HashPass.HashPassword(changePasswordModel.NewPassword);
                            _DbContext.Entry(existingUser).State = EntityState.Modified;
                            await _DbContext.SaveChangesAsync();
                            var response = new CustomStatusCode<Users>(200, "Update user successfully", existingUser, null);
                            return Ok(response);
                        }
                        else
                        {
                            var response = new CustomStatusCode<Users>(400, "Confirmpassword and NewPassword is incorrect", null, null);
                            return BadRequest(response);
                        }
                    }
                    else
                    {
                        var response = new CustomStatusCode<Users>(400, "Current password is incorrect", null, null);
                        return BadRequest(response);
                    }
                    /* // Cập nhật thông tin của existingUser từ updatedUser
                     existingUser.Cus_Password = HashPass.HashPassword(updatedUser.Cus_Password);
                     // Cập nhật các trường khác nếu cần
                     // Không cần thiết lập EntityState.Modified khi sử dụng FindAsync
                     _DbContext.Entry(existingUser).State = EntityState.Modified;
                     await _DbContext.SaveChangesAsync();
                     var response = new CustomStatusCode<Users>(200,
                            "Update user successfully", existingUser, null);
                     return Ok(response);*/
                }
                else
                {
                    var response = new CustomStatusCode<Users>(404,
                             "Not found user to update", null, null);
                    return NotFound(response);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new CustomStatusCode<Users>()
                {
                    Message = "An error occurred while retrieving the model.",
                    Error = ex.Message
                });
            }
        }

        [HttpGet("{id}")]
        /*     [Authorize(Roles = "Admin,User")]*/
        public async Task<IActionResult> GetUser(int id)
        {
            try
            {
                var user = await _DbContext.Users.FindAsync(id);
                if (user == null)
                {
                    var response = new CustomStatusCode<Users>(404,
                        "user not found or unable to delete", null, null);
                    return NotFound(response);
                }
                else
                {
                    var response = new CustomStatusCode<Users>(200,
                        "Get user successfully", user, null);

                    return Ok(response);
                }
            }
            catch (Exception ex)
            {

                return StatusCode(500, new CustomStatusCode<Users>()
                {
                    Message = "An error occurred while retrieving the model.",
                    Error = ex.Message
                });
            }
        }
        //
        [HttpPost("PostByAdmin")]
        public async Task<IActionResult> AddUserByAdmin(Users users)
        {
            try
            {

                users.Status = 2;
                users.Role = "User";
                users.Code = null;
                users.Cus_Password = HashPass.HashPassword(users.Cus_Password);
                var resource = await _DbContext.Users.AddAsync(users);
                await _DbContext.SaveChangesAsync();
                if (resource != null)
                {
                    var response = new CustomStatusCode<Users>(201, "add new user successful", users, null);
                    return Ok(response);
                }
                else
                {
                    var response = new CustomStatusCode<Users>(400, "Unable to add", null, null);
                    return BadRequest(response);
                }

            }
            catch (Exception Ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new CustomStatusCode<Users>()
                {
                    Error = Ex.Message,
                    Message = "An error occured while retrived model"
                });
            }
        }
        //
        [HttpPut("EditByAdmin/{id}")]
        /* [Authorize(Roles = "Admin")]*/
        public async Task<IActionResult> EditByAdmin(int id, [FromBody] ChangeInformation updatedUser)
        {
            try
            {
                var existingUser = await _DbContext.Users.FindAsync(id);
                if (existingUser != null)
                {
                    // Cập nhật thông tin của existingUser từ updatedUser
                    // Cập nhật các trường khác nếu cần
                    // Không cần thiết lập EntityState.Modified khi sử dụng FindAsync
                    existingUser.Cus_Phone = updatedUser.Cus_Phone;
                    existingUser.Cus_ADD = updatedUser.Cus_ADD;
                    _DbContext.Entry(existingUser).State = EntityState.Modified;
                    await _DbContext.SaveChangesAsync();
                    var response = new CustomStatusCode<Users>(200,
                           "Update user successfully", existingUser, null);
                    return Ok(response);
                }
                else
                {
                    var response = new CustomStatusCode<Users>(404,
                             "Not found user to update", null, null);
                    return NotFound(response);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new CustomStatusCode<Users>()
                {
                    Message = "An error occurred while retrieving the model.",
                    Error = ex.Message
                });
            }
        }
        [HttpPost("PostAdmin")]
        public async Task<IActionResult> AddEmpByAdmin(Users users)
        {
            try
            {
                users.Status = 2;
                users.Role = "Admin";
                users.Code = null;
                users.Cus_Password = HashPass.HashPassword(users.Cus_Password);
                var resource = await _DbContext.Users.AddAsync(users);
                await _DbContext.SaveChangesAsync();
                if (resource != null)
                {
                    var response = new CustomStatusCode<Users>(201, "add new Emp successful", users, null);
                    return Ok(response);
                }
                else
                {
                    var response = new CustomStatusCode<Users>(400, "Unable to register", null, null);
                    return BadRequest(response);
                }

            }
            catch (Exception Ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new CustomStatusCode<Users>()
                {
                    Error = Ex.Message,
                    Message = "An error occured while retrived model"
                });
            }
        }









    }

}