using Microsoft.AspNet.Identity.EntityFramework;

namespace Agenda3.Admin.Entity.Identity
{
    public class CustomUserStore : UserStore<ApplicationUser, CustomRole, short, CustomUserLogin, CustomUserRole, CustomUserClaim>
    {
        public CustomUserStore(IdentityContext context) : base(context) { }
    }
}