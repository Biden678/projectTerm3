using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Signup.Models;

namespace Signup.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AreaController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;

        public AreaController(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET: api/Product
        [HttpGet]
        public async Task<IActionResult> GetAreas()
        {
            var areas = await _dbContext.Areas.ToListAsync();
            return Ok(areas);
        }

        // GET: api/Product/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAreaById(int id)
        {
            var area = await _dbContext.Areas.FindAsync(id);

            if (area == null)
            {
                return NotFound();
            }

            return Ok(area);
        }

        // POST: api/Product
        [HttpPost]
        public async Task<IActionResult> CreateArea([FromBody] Area area)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _dbContext.Areas.Add(area);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAreaById), new { id = area.Id }, area);
        }

        // PUT: api/Product/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateArea(int id, [FromBody] Area updatedArea)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != updatedArea.Id)
            {
                return BadRequest();
            }

            _dbContext.Entry(updatedArea).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_dbContext.Areas.Any(p => p.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(updatedArea);
        }

        // DELETE: api/Product/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArea(int id)
        {
            var area = await _dbContext.Areas.FindAsync(id);
            if (area == null)
            {
                return NotFound();
            }

            _dbContext.Areas.Remove(area);
            await _dbContext.SaveChangesAsync();

            return Ok(area);
        }
    }
}
