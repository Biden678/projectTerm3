using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Signup.Models
{
    public class Users
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Cus_Id { get; set; }

        [Required]
        [StringLength(30)]
        public string Cus_Name { get; set; }

        [Required]
        [EmailAddress]
        public string Cus_Email { get; set; }

        [Required]
        public string Cus_Password { get; set; }

        [Required]
        [StringLength(70)]
        [MinLength(20)]
        public string Cus_ADD { get; set; }

        [Required]
        [StringLength(10, ErrorMessage = "Phone must have 10 numeric character")]
        [MinLength(10, ErrorMessage = "Phone must have 10 numeric character")]
        [RegularExpression("^[0-9]{10}$", ErrorMessage = "Phone must contain only numeric characters.")]
        public string Cus_Phone { get; set; }


        public string ? Role { get; set; }
        public string ? Code { get; set; }
        public int Status { get; set; }


        public DateTime ? CreateAt { get; set; }

    }
}
