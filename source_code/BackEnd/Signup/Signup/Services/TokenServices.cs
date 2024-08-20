using Microsoft.IdentityModel.Tokens;
using Signup.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Signup.Services
{
    public class TokenServices
    {
        public static string GenerateJSONWebToken(IConfiguration configuration, Users user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
                {
                //cung cap thong tin cho token sau khi giai ma~
                new Claim("Cus_id",user.Cus_Id.ToString()),
                    new Claim("Email", user.Cus_Email),
                    new Claim(ClaimTypes.Role, user.Role),
                        new Claim("Role", user.Role),
                    new Claim("Name", user.Cus_Name),
                    new Claim("Email", user.Cus_Email),
                    new Claim("Phone", user.Cus_Phone.ToString()),
                    new Claim("Address", user.Cus_ADD),
                     new Claim("Status", user.Status.ToString()),
                     new Claim("Password",user.Cus_Password)
                };

            var token = new JwtSecurityToken(configuration["Jwt:Issuer"],
                configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(120),
                //thoi` han token toi` tai
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
            //in ra token
        }
    }
}
