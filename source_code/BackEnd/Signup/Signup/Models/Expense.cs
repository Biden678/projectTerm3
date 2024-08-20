using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Signup.Models
{
    public class Expense
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public DateTime DateOfExpense { get; set; }
        [Required]
        public string TypeOfExpense { get; set; }
        [Required]
        public double AmountOfExpense { get; set; }
    }
}
