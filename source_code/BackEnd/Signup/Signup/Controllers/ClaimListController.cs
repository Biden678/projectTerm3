using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Signup.Models;

namespace Signup.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClaimListController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;
        public ClaimListController(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet]
        public async Task<IEnumerable<ClaimList>> GetClaimLists()
        {
            var claimLists = await _dbContext.ClaimLists.ToListAsync();
            return claimLists;
        }
        [HttpGet("{id}")]
        public async Task<ClaimList> GetClaimList(int id)
        {
            var claimList = await _dbContext.ClaimLists.FindAsync(id);
            return claimList;
        }
        [HttpPost]
        public async Task<ClaimList> AddClaimList(ClaimList claimList)
        {
            await _dbContext.ClaimLists.AddAsync(claimList);
            await _dbContext.SaveChangesAsync();
            return claimList;
        }
        [HttpPut]
        public async Task<ClaimList> UpdateClaimList(ClaimList claimList)
        {
            var claimListExisted = await GetClaimList(claimList.Id);
            if (claimListExisted != null)
            {
                claimListExisted.ClaimNumber = claimList.ClaimNumber;
                claimListExisted.PolicyNumber = claimList.PolicyNumber;
                claimListExisted.CusName = claimList.CusName;
                _dbContext.Entry(claimListExisted).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();
                return claimListExisted;
            }
            return null;
        }
        [HttpDelete("{id}")]
        public async Task<ClaimList> DeleteClaimList(int id)
        {
            var claimListExisted = await GetClaimList(id);
            if (claimListExisted != null)
            {
                _dbContext.ClaimLists.Remove(claimListExisted);
                await _dbContext.SaveChangesAsync();
                return claimListExisted;
            }
            return null;
        }
    }
}
