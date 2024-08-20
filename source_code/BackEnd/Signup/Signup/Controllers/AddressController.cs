using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Signup.Models;

namespace Signup.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;

        public AddressController(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET: api/Product
        [HttpGet]
        public async Task<IActionResult> GetAddresses()
        {
            var addresses = await _dbContext.Addresses.ToListAsync();
            return Ok(addresses);
        }

        // GET: api/Product/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAddressById(int id)
        {
            var add = await _dbContext.Addresses.FindAsync(id);

            if (add == null)
            {
                return NotFound();
            }

            return Ok(add);
        }

        // POST: api/Product
        [HttpPost]
        public async Task<IActionResult> CreateAddress([FromBody] Address add)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _dbContext.Addresses.Add(add);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAddressById), new { id = add.Id }, add);
        }

        // PUT: api/Product/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAddress(int id, [FromBody] Address updatedAddress)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != updatedAddress.Id)
            {
                return BadRequest();
            }

            _dbContext.Entry(updatedAddress).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_dbContext.Addresses.Any(p => p.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(updatedAddress);
        }

        // DELETE: api/Product/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAddress(int id)
        {
            var add = await _dbContext.Addresses.FindAsync(id);
            if (add == null)
            {
                return NotFound();
            }

            _dbContext.Addresses.Remove(add);
            await _dbContext.SaveChangesAsync();

            return Ok(add);
        }
    }
}
