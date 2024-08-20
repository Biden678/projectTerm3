using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Signup.Models
{
    public class ClaimList
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public int Id { get; set; }
        [Required]
        public string PolicyNumber { get; set; }
        [Required]
        public string ClaimNumber { get; set; }
        [Required]
        public string CusName { get; set; }
    }
}
