using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Signup.Models
{
    public class Product
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id_Product { get; set; }

        [Required]
        [StringLength(50)]
        [MinLength(2)]
        public string Contract_Name { get; set; }

        [Required]
        public int Id_Type_Insurance { get; set; }

        // Navigation property
        //public Type_Insurance ? Type_Insurance { get; set; }

        [Required]
        [Range(0, 100)]
        public int VAT { get; set; }

        [Required]
        [Range(0, 100)]
        public int Limited_Years { get; set; }

        [Required]
        [Range(0, 20000)]
        public int Level_Responsibility_For_People { get; set; }

        [Required]
        [Range(0, 20000)]
        public int Level_Responsibility_For_The_Property { get; set; }

        [Required]
        [StringLength(1000)]
        [MinLength(2)]
        public string Reason { get; set; }

        [Required]
        [Range(0, 100)]
        public int Damages { get; set; }

        [Required]
        [Range(0, 20000)]
        public int Price { get; set; }

        //
        [Required]
        [Range(0, 50)]
        public int Number_Of_Seats { get; set; }

        [Required]
        [Range(0, 50)]
        public int Payload { get; set; }
        

    }
}
