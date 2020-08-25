using System;
using Microsoft.AspNetCore.Identity;

namespace IAMService.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser()
        {
        }

        public string OrganizationId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Address { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }
    }
}
