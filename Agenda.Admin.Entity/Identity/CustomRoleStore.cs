using Microsoft.AspNet.Identity.EntityFramework;

namespace Agenda3.Admin.Entity.Identity
{
    public class CustomRoleStore : RoleStore<CustomRole, short, CustomUserRole>
    {
        public CustomRoleStore(IdentityContext context) : base(context) { }
    }
}
