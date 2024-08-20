using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Signup.Models;
using Signup.Services;

namespace Signup.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly DatabaseContext _DbContext;
        private readonly EmailServices _emailservices;
        public ContactController(DatabaseContext databaseContext, EmailServices emailservices)
        {
            _DbContext = databaseContext;
            _emailservices = emailservices;
        }
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            try
            {
                var contacts = await _DbContext.Contacts.ToListAsync();
                if (contacts != null && contacts.Any())
                {
                    var response = new CustomStatusCode<IEnumerable<Contact>>
                        (StatusCodes.Status200OK, "Get list successfully", contacts, null);
                    return Ok(response);
                }
                else
                {
                    var response = new CustomStatusCode<IEnumerable<Contact>>
                        (StatusCodes.Status404NotFound, "Not found result", null, null);
                    return NotFound(contacts);
                }

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new CustomStatusCode<Contact>()
                    {
                        Message = "An error occured while retrived model",
                        Error = ex.Message
                    });
            }
        }
        [HttpPost]
        public async Task<IActionResult> AddContact(Contact contact)
        {
            try
            {
                var fbw = await _DbContext.ForbiddenWords.Select(w => w.word.ToLower()).ToListAsync();
                var contactTitle = contact.Title.ToLower();

                if (ContainsForbiddenWord(contactTitle, fbw))
                {
                    var response = new CustomStatusCode<Contact>(400, "Contact title contains forbidden words", null, null);
                    return BadRequest(response);
                }

                var resource = await _DbContext.Contacts.AddAsync(contact);
                await _DbContext.SaveChangesAsync();

                if (resource.Entity != null) // Kiểm tra sau khi thêm contact
                {
                    var response = new CustomStatusCode<Contact>(201, "Add contact successfully", contact, null);
                    return Ok(response);
                }
                else
                {
                    var response = new CustomStatusCode<Contact>(400, "Unable to add contact", null, null);
                    return BadRequest(response);
                }
            }
            catch (Exception Ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new CustomStatusCode<Contact>()
                {
                    Message = "An error occurred while retrieved the model",
                    Error = Ex.Message
                });
            }
        }
        [HttpPost("respond")]
        public async Task<IActionResult> GetContact(int id, [FromBody] EmailRequest emailRequest)
        {
            try
            {
                var contact = await _DbContext.Contacts.FindAsync(id);
                if (contact != null)
                {
                    emailRequest.Tomail = contact.Email;
                    emailRequest.Subject = "We have received your email. We appreciate your feedback.";
                    if (emailRequest == null || string.IsNullOrEmpty(emailRequest.HtmlContent))
                    {
                        return BadRequest("Email details are not complete");
                    }
                    await _emailservices.SendMailAsync(emailRequest.Tomail, emailRequest.Subject, emailRequest.HtmlContent);
                    _DbContext.Contacts.Remove(contact);
                    await _DbContext.SaveChangesAsync();
                    /* DELETE contact after response */
                    var response = new CustomStatusCode<Contact>
                        (200, "get message in contact successfull", contact, null);
                    return Ok(response);

                }
                else
                {
                    var response = new CustomStatusCode<Contact>
                        (404, "Not found this message in contact", null, null);
                    return NotFound(response);
                }
            }
            catch (Exception Ex)
            {
                return StatusCode(500, new CustomStatusCode<Contact>()
                {
                    Message = "An error occurred while retrieving the model",
                    Error = Ex.Message
                });
            }
        }
        private bool ContainsForbiddenWord(string title, List<string> fbw)
        {
            var normalizedTitle = NormalizeForbiddenWord(title);

            foreach (var forbiddenWord in fbw)
            {
                var normalizedForbiddenWord = NormalizeForbiddenWord(forbiddenWord);
                if (normalizedTitle.Contains(normalizedForbiddenWord))
                {
                    return true;
                }
            }

            return false;
        }

        private string NormalizeForbiddenWord(string word)
        {
            // Chuyển đổi thành chữ thường
            word = word.ToLower();

            // Loại bỏ các ký tự trùng lặp (ví dụ: "ssshhhiiittt" thành "shit")
            var uniqueChars = word.Distinct().ToArray();
            return new string(uniqueChars);
        }
        [HttpDelete("{id}")]
        /* [Authorize(Roles = "Admin")]*/
        public async Task<IActionResult> DeleteContact(int id)
        {
            try
            {
                var contact = await _DbContext.Contacts.FindAsync(id);
                if (contact != null)
                {
                    _DbContext.Contacts.Remove(contact);
                    await _DbContext.SaveChangesAsync();
                    var response = new CustomStatusCode<Contact>(200,
                           "Delete user successfully", contact, null);
                    return Ok(response);
                }
                else
                {
                    var response = new CustomStatusCode<Contact>(404,
                               "user not found or unable to delete", null, null);
                    return NotFound(response);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new CustomStatusCode<Contact>()
                {
                    Message = "An error occurred while retrieving the model.",
                    Error = ex.Message
                });
            }
        }


    }
}
