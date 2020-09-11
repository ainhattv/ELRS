using System.Collections.Generic;

namespace IAMService.Models
{
    public class OrganizationModel
    {
        public string Id { get; set; }
        
        public string Name { get; set; }

        public string Address { get; set; }

        public string Email { get; set; }

        public decimal PhoneNumber { get; set; }

        public IEnumerable<UserModel> Users { get; set; }
    }
}