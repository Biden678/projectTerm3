using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Signup.Models
{
    public class VehicleError
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string ClaimNumber { get; set; }
        [Required]
        public string ErrorOfVehicle { get; set; }
        [Required]
        public decimal Price { get; set; }
    }
}
