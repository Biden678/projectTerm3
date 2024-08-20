using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Signup.Models;

namespace Signup.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ForbiddenWordController : ControllerBase
    {
        private readonly DatabaseContext _DbContext;
        public ForbiddenWordController(DatabaseContext databaseContext)
        {
            _DbContext = databaseContext;
        }
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            try
            {
                var words = await _DbContext.ForbiddenWords.ToListAsync();
                if (words != null && words.Any())
                {
                    var response = new CustomStatusCode<IEnumerable<ForbiddenWord>>
                        (StatusCodes.Status200OK, "Get list successfully", words, null);
                    return Ok(response);
                }
                else
                {
                    var response = new CustomStatusCode<IEnumerable<ForbiddenWord>>
                        (StatusCodes.Status404NotFound, "Not found result", null, null);
                    return NotFound(words);
                }

            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError,
                    new CustomStatusCode<ForbiddenWord>()
                    {
                        Message = "An error occured while retrived model",
                        Error = ex.Message
                    });
            }
        }
        [HttpPost]
        public async Task<IActionResult> AddForbidden(ForbiddenWord fbw)
        {
            try
            {
                var resource = await _DbContext.ForbiddenWords.AddAsync(fbw);
                await _DbContext.SaveChangesAsync();
                if (resource != null)
                {
                    var response = new CustomStatusCode<ForbiddenWord>(201, "Add successful", fbw, null);
                    return Ok(response);
                }
                else
                {
                    var response = new CustomStatusCode<ForbiddenWord>(400, "Unable to Add", null, null);
                    return BadRequest(response);
                }
            }
            catch (Exception Ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new CustomStatusCode<ForbiddenWord>()
                {
                    Error = Ex.Message,
                    Message = "An error occured while retrived model"
                });
            }
        }
    }
}
