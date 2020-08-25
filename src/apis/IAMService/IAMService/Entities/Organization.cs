using System.Collections.Generic;

namespace IAMService.Entities
{
    public class Organization : EntitiesBase
    {
        public Organization() : base()
        {

        }

        public string OwnerId { get; set; }
        public ApplicationUser Owner { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public string Email { get; set; }

        public decimal PhoneNumber { get; set; }

        public virtual ICollection<ApplicationUser> Users { get; set; }
    }
}