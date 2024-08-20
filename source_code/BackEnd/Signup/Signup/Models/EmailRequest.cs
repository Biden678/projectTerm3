namespace Signup.Models
{
    public class EmailRequest
    {
        public string Tomail { get; set; }

        public string Subject { get; set; }

        public string HtmlContent { get; set; }
    }
}
