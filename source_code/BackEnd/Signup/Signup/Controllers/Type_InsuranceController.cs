using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Signup.Models;

namespace Signup.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Type_InsuranceController : ControllerBase
    {
            private readonly DatabaseContext _dbContext;

            public Type_InsuranceController(DatabaseContext dbContext)
            {
                _dbContext = dbContext;
            }

            // GET: api/TypeInsurance
            [HttpGet]
            public async Task<IActionResult> GetTypeInsurance()
            {
                var insurances = await _dbContext.Type_Insurances.ToListAsync();
                return Ok(insurances);
            }

            // GET: api/TypeInsurance/5
            [HttpGet("{id}")]
            public async Task<IActionResult> GetTypeInsuranceById(int id)
            {
                var insurance = await _dbContext.Type_Insurances.FindAsync(id);

                if (insurance == null)
                {
                    return NotFound();
                }

                return Ok(insurance);
            }

            // POST: api/TypeInsurance
            [HttpPost]
            public async Task<IActionResult> CreateTypeInsurance([FromBody] Type_Insurance typeInsurance)
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                _dbContext.Type_Insurances.Add(typeInsurance);
                await _dbContext.SaveChangesAsync();

                return CreatedAtAction(nameof(GetTypeInsuranceById), new { id = typeInsurance.Id_Type_Insurance }, typeInsurance);
            }

            // PUT: api/TypeInsurance/5
            [HttpPut("{id}")]
            public async Task<IActionResult> UpdateTypeInsurance(int id, [FromBody] Type_Insurance updatedTypeInsurance)
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (id != updatedTypeInsurance.Id_Type_Insurance)
                {
                    return BadRequest();
                }

                _dbContext.Entry(updatedTypeInsurance).State = EntityState.Modified;

                try
                {
                    await _dbContext.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!_dbContext.Type_Insurances.Any(ti => ti.Id_Type_Insurance == id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

                return Ok(updatedTypeInsurance);
            }

            // DELETE: api/TypeInsurance/5
            [HttpDelete("{id}")]
            public async Task<IActionResult> DeleteTypeInsurance(int id)
            {
                var typeInsurance = await _dbContext.Type_Insurances.FindAsync(id);
                if (typeInsurance == null)
                {
                    return NotFound();
                }

                _dbContext.Type_Insurances.Remove(typeInsurance);
                await _dbContext.SaveChangesAsync();

                return Ok(typeInsurance);
            }
        }
}
