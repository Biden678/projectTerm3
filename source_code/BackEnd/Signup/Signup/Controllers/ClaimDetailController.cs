using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Signup.Models;

namespace Signup.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClaimDetailController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;
        public ClaimDetailController(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet]
        public async Task<IEnumerable<ClaimDetail>> GetClaimDetails()
        {
            var claimDetails = await _dbContext.ClaimDetails.ToListAsync();
            return claimDetails;
        }
        [HttpGet("{id}")]
        public async Task<ClaimDetail> GetClaimDetail(int id)
        {
            var claimDetail = await _dbContext.ClaimDetails.FindAsync(id);
            return claimDetail;
        }
        [HttpPost]
        public async Task<ClaimDetail> AddClaimDetail(ClaimDetail claimDetail)
        {
            await _dbContext.ClaimDetails.AddAsync(claimDetail);
            await _dbContext.SaveChangesAsync();
            return claimDetail;
        }
        [HttpPut]
        public async Task<ClaimDetail> UpdateClaimDetail(ClaimDetail claimDetail)
        {
            var claimDetailExisted = await GetClaimDetail(claimDetail.Id);
            if (claimDetailExisted != null)
            {
                claimDetailExisted.ClaimNumber = claimDetail.ClaimNumber;
                claimDetailExisted.PolicyNumber = claimDetail.PolicyNumber;
                claimDetailExisted.PolicyStartDate = claimDetail.PolicyStartDate;
                claimDetailExisted.PolicyEndDate = claimDetail.PolicyEndDate;
                claimDetailExisted.CusName = claimDetail.CusName;
                claimDetailExisted.PlaceOfAccident = claimDetail.PlaceOfAccident;
                claimDetailExisted.DateOfAccident = claimDetail.DateOfAccident;
                claimDetailExisted.InsuredAmount = claimDetail.InsuredAmount;
                claimDetailExisted.ClaimableAmount = claimDetail.ClaimableAmount;
                _dbContext.Entry(claimDetailExisted).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();
                return claimDetailExisted;
            }
            return null;
        }
        [HttpDelete("{id}")]
        public async Task<ClaimDetail> DeleteClaimDetail(int id)
        {
            var claimDetailExisted = await GetClaimDetail(id);
            if (claimDetailExisted != null)
            {
                _dbContext.ClaimDetails.Remove(claimDetailExisted);
                await _dbContext.SaveChangesAsync();
                return claimDetailExisted;
            }
            return null;
        }
    }
}
