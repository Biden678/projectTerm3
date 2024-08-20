using Microsoft.EntityFrameworkCore;

namespace Signup.Models
{
    public class DatabaseContext:DbContext
    {
        public DatabaseContext(DbContextOptions options) : base(options) { }
        public DbSet<Users> Users { get; set; }


        public DbSet<Type_Insurance> Type_Insurances { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Expense> Expenses { get; set; }
        public DbSet<ClaimDetail> ClaimDetails { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDTO> OrderDTOs { get; set; }
        public DbSet<Area> Areas { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<MaintenanceStatus> MaintenanceStatusS { get; set; }
        public DbSet<ForbiddenWord> ForbiddenWords { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<ForgetPass> ForgetPass { get; set; }

        public DbSet<ClaimList> ClaimLists { get; set; }
        public DbSet<VehicleError> VehicleErrors { get; set; }
    }
}
