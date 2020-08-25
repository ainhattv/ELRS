using System;

namespace IAMService.Entities
{
    public class EntitiesBase
    {
        public EntitiesBase()
        {
            this.Id = Guid.NewGuid().ToString();
            this.CreatedDate = DateTime.UtcNow;
        }

        public virtual string Id { get; set; }

        public virtual DateTime CreatedDate { get; set; }

        public virtual DateTime UpdatedDate { get; set; }
    }
}