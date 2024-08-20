using BCrypt.Net;

namespace Signup.Models
{
    public class HashPass
    {
        public static string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.EnhancedHashPassword(password);
        }
        public static bool VerifiedPassword(string enterPassword,string storeHash)
        {
            return BCrypt.Net.BCrypt.EnhancedVerify(enterPassword, storeHash);
        }
    }
}
