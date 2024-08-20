using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Signup.Models
{
    public class Type_Insurance
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id_Type_Insurance { get; set; }

        [Required]
        [StringLength(50)]
        [MinLength(2)]
        public string Type { get; set; }

        public string ? Title { get; set; }

        public string ? Description { get; set; }

        // Navigation property
        // public ICollection<Type_Service> ? Type_Services { get; set; }

    }
}
