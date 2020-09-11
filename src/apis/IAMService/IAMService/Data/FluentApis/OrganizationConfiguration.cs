using IAMService.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace IAMService.Data.FluentApis
{
    public class OrganizationConfiguration : IEntityTypeConfiguration<Organization>
    {
        public void Configure(EntityTypeBuilder<Organization> builder)
        {
            builder.HasMany(o => o.Users)
                    .WithOne(e => e.Organization)
                    .OnDelete(DeleteBehavior.Cascade);
        }
    }
}