using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Signup.Models
{
    public class Order
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string ? Type_Insurance { get; set; }
        
        [Required]
        public int Cus_Id { get; set; }

        [Required]
        public string Code_Order { get; set; }

        //
        [Required]
        public int Number_Of_Seats { get; set; }

        [Required]
        public int Payload { get; set; }


        public string ? LicensePlates { get; set; } //Biển số xe
        [Required]  
        public string ChassisNumber { get; set; } //Số khung (*)
        [Required]
        public string EngineNumber { get; set; } //Số máy (*)

        [Required]
        public int Price { get; set; }
        [Required]
        public int Vat { get; set; }


        //
        [Required]
        public DateTime DateFrom { get; set; }
        [Required]
        public DateTime DateTo { get; set; }
        [Required]
        public int Duration { get; set; } // limit years

        //

        [Required]
        public int Level_Responsibility_For_People { get; set; }

        [Required]
        public int Level_Responsibility_For_The_Property { get; set; }

        //

        [Required]
        public string Name_Of_Vehicle_Owner { get; set; } // người chủ xe

        [Required]
        public string Vehicle_Owner_Address { get; set; } // địa chỉ chủ nhà

        public string ? Phone { get; set; }

        public string ? CMND { get; set; }

        public string ? Vehicle_Owner_Tax_Code { get; set; }


        [Required]
        public decimal Total { get; set; }

    }
}
