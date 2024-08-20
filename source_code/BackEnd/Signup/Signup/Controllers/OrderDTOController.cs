using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Signup.Models;

namespace Signup.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDTOController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;

        public OrderDTOController(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET: api/Product
        [HttpGet]
        public async Task<IActionResult> GetOrders()
        {
            var Orders = await _dbContext.OrderDTOs.ToListAsync();
            return Ok(Orders);
        }

        // GET: api/Product/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderById(int id)
        {
            var order = await _dbContext.OrderDTOs.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return Ok(order);
        }

        // POST: api/Product
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] OrderDTO order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _dbContext.OrderDTOs.Add(order);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrderById), new { id = order.Id }, order);
        }

        // PUT: api/Product/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder(int id, [FromBody] OrderDTO updatedOrder)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != updatedOrder.Id)
            {
                return BadRequest();
            }

            _dbContext.Entry(updatedOrder).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_dbContext.OrderDTOs.Any(p => p.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(updatedOrder);
        }

        // DELETE: api/Product/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _dbContext.OrderDTOs.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _dbContext.OrderDTOs.Remove(order);
            await _dbContext.SaveChangesAsync();

            return Ok(order);
        }
    }
}
