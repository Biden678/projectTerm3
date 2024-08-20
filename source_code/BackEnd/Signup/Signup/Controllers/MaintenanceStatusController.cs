using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Signup.Models;

namespace Signup.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaintenanceStatusController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;

        public MaintenanceStatusController(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET: api/Product
        [HttpGet]
        public async Task<IActionResult> GetMaintenance()
        {
            var main = await _dbContext.MaintenanceStatusS.ToListAsync();
            return Ok(main);
        }

        // GET: api/Product/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMaintenanceById(int id)
        {
            var main = await _dbContext.MaintenanceStatusS.FindAsync(id);

            if (main == null)
            {
                return NotFound();
            }

            return Ok(main);
        }

        // POST: api/Product
        [HttpPost]
        public async Task<IActionResult> CreateMaintenance([FromBody] MaintenanceStatus main)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _dbContext.MaintenanceStatusS.Add(main);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMaintenanceById), new { id = main.Id }, main);
        }

        // PUT: api/Product/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMaintenance(int id, [FromBody] MaintenanceStatus updatedMain)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != updatedMain.Id)
            {
                return BadRequest();
            }

            _dbContext.Entry(updatedMain).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_dbContext.MaintenanceStatusS.Any(p => p.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(updatedMain);
        }

        // DELETE: api/Product/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMaintenance(int id)
        {
            var main = await _dbContext.MaintenanceStatusS.FindAsync(id);
            if (main == null)
            {
                return NotFound();
            }

            _dbContext.MaintenanceStatusS.Remove(main);
            await _dbContext.SaveChangesAsync();

            return Ok(main);
        }


    }
}
