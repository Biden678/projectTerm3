using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Signup.Models
{
    public class ForgetPass
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int For_Id { get; set; }
        public int Cus_Id { get; set; }
        public string Cus_Email { get; set; }
        [ForeignKey("Cus_Id")] // Add this annotation to specify the foreign key relationship
        public Users? User { get; set; } // Navigation property pointing to Users entity
        public string Code { get; set; }
        public int Status { get; set; }
    }
}
