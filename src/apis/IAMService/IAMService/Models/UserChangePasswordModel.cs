namespace IAMService.Models
{
    public class UserChangePasswordModel
    {
        public string UserName { get; set; }

        public string Password { get; set; }

        public string NewPassword { get; set; }
    }
}