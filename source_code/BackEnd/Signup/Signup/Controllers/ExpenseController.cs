using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Signup.Models;

namespace Signup.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpenseController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;
        public ExpenseController(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet]
        public async Task<IEnumerable<Expense>> GetExpenses()
        {
            var expenses = await _dbContext.Expenses.ToListAsync();
            return expenses;
        }
        [HttpGet("{id}")]
        public async Task<Expense> GetExpense(int id)
        {
            var expense = await _dbContext.Expenses.FindAsync(id);
            return expense;
        }
        [HttpPost]
        public async Task<Expense> AddExpense(Expense expense)
        {
            await _dbContext.Expenses.AddAsync(expense);
            await _dbContext.SaveChangesAsync();
            return expense;
        }
        [HttpPut]
        public async Task<Expense> UpdateExpense(Expense expense)
        {
            var expenseExisted = await GetExpense(expense.Id);
            if (expenseExisted != null)
            {
                expenseExisted.DateOfExpense = expense.DateOfExpense;
                expenseExisted.TypeOfExpense = expense.TypeOfExpense;
                expenseExisted.AmountOfExpense = expense.AmountOfExpense;
                _dbContext.Entry(expenseExisted).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();
                return expenseExisted;
            }
            return null;
        }
        [HttpDelete("{id}")]
        public async Task<Expense> DeleteExpense(int id)
        {
            var expenseExisted = await GetExpense(id);
            if (expenseExisted != null)
            {
                _dbContext.Expenses.Remove(expenseExisted);
                await _dbContext.SaveChangesAsync();
                return expenseExisted;
            }
            return null;
        }
    }
}
