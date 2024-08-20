using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Signup.Models;
using Signup.Services;

namespace Signup.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ForgetPassController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;
        private readonly EmailServices _emailservices;
        public ForgetPassController(DatabaseContext databaseContext, EmailServices emailservices)
        {
            _dbContext = databaseContext;
            _emailservices = emailservices;
        }
        [HttpGet]
        public async Task<IActionResult> GetForget()
        {
            try
            {
                var forgetList = await _dbContext.ForgetPass.ToListAsync();
                if (forgetList != null && forgetList.Any())
                {
                    var response = new CustomStatusCode<IEnumerable<ForgetPass>>
                        (StatusCodes.Status200OK, "Get forgetList successfully", forgetList, null);
                    return Ok(response);
                }
                else
                {
                    var response = new CustomStatusCode<IEnumerable<ForgetPass>>
                        (StatusCodes.Status404NotFound, "Not found the forgetList", null, null);
                    return NotFound(forgetList);
                }
            }
            catch (Exception Ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new CustomStatusCode<ForgetPass>()
                    {
                        Message = "An error occured while retrived the model",
                        Error = Ex.Message
                    });
            }
        }
        [HttpPost]
        public async Task<IActionResult> AddForget(string email, [FromBody] ModelForgetPass modelForgetPass)
        {
            try
            {
                var user = await _dbContext.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Cus_Email == email);
                if (user != null)
                {
                    modelForgetPass.ForgetPass.Cus_Id = user.Cus_Id;
                    modelForgetPass.ForgetPass.Code = GenerateRandomCode();
                    modelForgetPass.ForgetPass.Status = 0;
                    modelForgetPass.EmailRequest.Tomail = email;
                    modelForgetPass.EmailRequest.Subject = "This is the Link to reset your password";
                    modelForgetPass.EmailRequest.HtmlContent = $"This is link to Reset http://localhost:3000/reset-password/{user.Cus_Id}?{modelForgetPass.ForgetPass.Code}";

                    // Rest of your code remains unchanged
                    var forgetPassDto = new ForgetPassDTO
                    {
                        For_Id = modelForgetPass.ForgetPass.For_Id,
                        Cus_Id = modelForgetPass.ForgetPass.Cus_Id,
                        Cus_Email = email,
                        Code = modelForgetPass.ForgetPass.Code,
                        Status = modelForgetPass.ForgetPass.Status
                    };
                    await _emailservices.SendMailAsync(modelForgetPass.EmailRequest.Tomail,
               modelForgetPass.EmailRequest.Subject, modelForgetPass.EmailRequest.HtmlContent);
                    // Manually create ForgetPass instance from ForgetPassDTO
                    var forgetPassEntity = new ForgetPass
                    {
                        For_Id = forgetPassDto.For_Id,
                        Cus_Email = forgetPassDto.Cus_Email,
                        Cus_Id = forgetPassDto.Cus_Id,
                        Code = forgetPassDto.Code,
                        Status = forgetPassDto.Status
                    };
                    await _dbContext.ForgetPass.AddAsync(forgetPassEntity);
                    await _dbContext.SaveChangesAsync();
                    // ...
                    var response = new CustomStatusCode<ForgetPassDTO>(200, "Add newForget successfully", forgetPassDto, null);
                    return Ok(response);
                }
                else
                {
                    var response = new CustomStatusCode<ForgetPassDTO>(400, "Your Email is not exist", null, null);
                    return BadRequest(response);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new CustomStatusCode<ForgetPassDTO>
                    {
                        Message = "An error occurred while adding forget password information",
                        Error = ex.Message,
                        InnerException = ex.InnerException?.Message
                    });
            }
        }







        private string GenerateRandomCode()
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var random = new Random();

            // Generate a random string of length 20 using characters from the 'chars' string
            string code = new string(Enumerable.Repeat(chars, 20)
                .Select(s => s[random.Next(s.Length)])
                .ToArray());

            return code;
        }
        //
        [HttpPut("SetPassword")]
        public async Task<IActionResult> SetPass(string code, [FromBody] SetPass setpass)
        {
            try
            {
                var existingUser = await _dbContext.ForgetPass
                    .Include(fp => fp.User)
                    .FirstOrDefaultAsync(c => c.Code == code);
                //&&c.Status == 0
                if (existingUser != null && existingUser.User != null)
                {
                    if (existingUser.Status != 1)
                    {
                        if (setpass.NewPassword == setpass.ConfirmPassword)
                        {
                            var hashedPassword = HashPass.HashPassword(setpass.NewPassword);

                            existingUser.User.Cus_Password = hashedPassword;
                            existingUser.Status = 1; // Assuming 1 represents a password reset status
                            _dbContext.Entry(existingUser).State = EntityState.Modified;
                            await _dbContext.SaveChangesAsync();

                            // Create an instance of SetPass with the hashed password
                            var setPassResponse = new SetPass { NewPassword = hashedPassword };

                            var response = new CustomStatusCode<SetPass>(200, "Update user successfully", setPassResponse, null);
                            return Ok(response);
                        }
                        else
                        {
                            var response = new CustomStatusCode<SetPass>(400, "Confirm password and New Password do not match", null, null);
                            return BadRequest(response);
                        }
                    }
                    else
                    {
                        var response = new CustomStatusCode<SetPass>(400, "Your code has been used", null, null);
                        return StatusCode(400, response);
                    }

                }
                else
                {
                    var response = new CustomStatusCode<SetPass>(404, "Not found user to update", null, null);
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




    }
}
