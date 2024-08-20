using Microsoft.Extensions.Options;
using System.Net.Mail;
using System.Net;
using Signup.Models;

namespace Signup.Services
{
    public class EmailServices
    {
        private readonly EmailSetting _emailSetting;
        public EmailServices(IOptions<EmailSetting> emailSetting)
        {
            _emailSetting = emailSetting.Value;
            // lay tat ca gia tri ben emailsettings trong appsettings
        }
        public async Task SendMailAsync(string toEmail, string subject, string HtmlContent)
        {
            var fromAddress = new MailAddress(_emailSetting.UserName);
            var toAddress = new MailAddress(toEmail);
            var smtp = new SmtpClient
            {
                Host = _emailSetting.Host,
                Port = _emailSetting.Port,
                EnableSsl = _emailSetting.EnableSsl,
                // ma hoa du lieu
                DeliveryMethod = SmtpDeliveryMethod.Network,
                //Network chi ra rang la email se dc gui thong qua mang.
                UseDefaultCredentials = false,
                //thong tin xac thuc dc gui de ket noi den may chu smtp
                Credentials = new NetworkCredential(_emailSetting.UserName, _emailSetting.Password)
            };
            using var message = new MailMessage(fromAddress, toAddress)
            {
                Subject = subject,
                Body = HtmlContent,
                IsBodyHtml = true
            };
            await smtp.SendMailAsync(message);
            //             ^ ham` trong SmtpClient chứ ko phải từ hàm SendmailAsync
        }
    }
}
