using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Security.Principal;

namespace Signup.Models
{
    public class ClaimDetail
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public int Id { get; set; }
        public int? Cus_Id { get; set; }
        [Required]
        public string ClaimNumber { get; set; }
        [Required]
        public string PolicyNumber { get; set; }
        [Required]
        public DateTime PolicyStartDate { get; set; }
        [Required]
        public DateTime PolicyEndDate { get; set; }
        [Required]
        public string CusName { get; set; }
        [Required]
        public string PlaceOfAccident { get; set; }
        [Required]
        public DateTime DateOfAccident { get; set; }
        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal InsuredAmount { get; set; }
        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal ClaimableAmount { get; set; }
        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal BankAccountNumber { get; set; }
        [Required]
        public string NameOfBank { get; set; }

    }
}