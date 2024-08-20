using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Signup.Models
{
    public class MaintenanceStatus
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int MainStatus { get; set; }
    }
}