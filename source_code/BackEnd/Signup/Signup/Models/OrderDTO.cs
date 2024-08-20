using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Signup.Models
{
    public class OrderDTO
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public int Cus_Id { get; set; }
        [Required] 
        public string Type_Insurance { get; set; }
        [Required]
        public string Code_Order { get; set; }
        [Required]
        public string Name_Of_Vehicle_Owner { get; set; } // người chủ xe

        [Required]
        public DateTime DateFrom { get; set; }
        [Required]
        public DateTime DateTo { get; set; }
    }
}
