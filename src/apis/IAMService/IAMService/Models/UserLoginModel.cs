using System.ComponentModel.DataAnnotations;

namespace IAMService.Models
{
    public class UserLoginModel
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        [StringLength(200)]
        public string UserName { get; set; }

        [Required]
        [StringLength(200, MinimumLength = 8)]
        public string Password { get; set; }
    }
}