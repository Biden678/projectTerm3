namespace Signup.Models
{
    public class ForgetPassDTO
    {
        public int For_Id { get; set; }
        public int Cus_Id { get; set; }
        public string Cus_Email { get; set; }
        public string Code { get; set; }
        public int Status { get; set; }
    }
}
