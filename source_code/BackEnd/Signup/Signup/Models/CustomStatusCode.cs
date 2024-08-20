namespace Signup.Models
{
    public class CustomStatusCode<T>
    {
        public CustomStatusCode() { }
        public CustomStatusCode(int status,string message,T?data,string?error) {
            StatusCode = status;
            Message = message;
            Data = data;
            Error = error;
        }
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public T? Data { get; set; }
        public string ? Error { get; set; }
        public string? InnerException { get; internal set; }
    }

}
