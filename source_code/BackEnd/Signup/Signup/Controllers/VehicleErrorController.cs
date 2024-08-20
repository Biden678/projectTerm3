using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Signup.Models;

namespace Signup.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleErrorController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;
        public VehicleErrorController(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet]
        public async Task<IEnumerable<VehicleError>> GetVehicleErrors()
        {
            var vehicleError = await _dbContext.VehicleErrors.ToListAsync();
            return vehicleError;
        }
        [HttpGet("{id}")]
        public async Task<VehicleError> GetVehicleError(int id)
        {
            var vehicleError = await _dbContext.VehicleErrors.FindAsync(id);
            return vehicleError;
        }
        [HttpPost]
        public async Task<VehicleError> AddVehicleError(VehicleError vehicleError)
        {
            await _dbContext.VehicleErrors.AddAsync(vehicleError);
            await _dbContext.SaveChangesAsync();
            return vehicleError;
        }
        [HttpPut]
        public async Task<VehicleError> UpdateVehicleError(VehicleError vehicleError)
        {
            var vehicleExisted = await GetVehicleError(vehicleError.Id);
            if (vehicleExisted != null)
            {
                vehicleExisted.ClaimNumber = vehicleError.ClaimNumber;
                vehicleExisted.ErrorOfVehicle = vehicleError.ErrorOfVehicle;
                vehicleExisted.Price = vehicleError.Price;
                _dbContext.Entry(vehicleExisted).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();
                return vehicleExisted;
            }
            return null;
        }
        [HttpDelete("{id}")]
        public async Task<VehicleError> DeleteVehicleError(int id)
        {
            var vehicleExisted = await GetVehicleError(id);
            if (vehicleExisted != null)
            {
                _dbContext.VehicleErrors.Remove(vehicleExisted);
                await _dbContext.SaveChangesAsync();
                return vehicleExisted;
            }
            return null;
        }
    }
}
