using System.Data.Entity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Agenda3.Admin.Entity.Identity
{
    public partial class IdentityContext : IdentityDbContext<ApplicationUser, CustomRole, short, CustomUserLogin, CustomUserRole, CustomUserClaim>
    {
        public IdentityContext()
            : base("Name=BDAgendaAdminContext")
        {
            Database.SetInitializer<IdentityContext>(null);
            this.Configuration.LazyLoadingEnabled = false;
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            //AspNetUsers
            var ApplicationUserMap = modelBuilder.Entity<ApplicationUser>();
            ApplicationUserMap.ToTable("LogOperador");
            ApplicationUserMap.Property(t => t.Id).HasColumnName("OperadorID");
            ApplicationUserMap.Property(t => t.Email).HasColumnName("Email");
            ApplicationUserMap.Property(t => t.EmailConfirmed).HasColumnName("EmailConfirmed");
            ApplicationUserMap.Property(t => t.PasswordHash).HasColumnName("Senha");
            ApplicationUserMap.Property(t => t.SecurityStamp).HasColumnName("SecurityStamp");
            ApplicationUserMap.Property(t => t.PhoneNumber).HasColumnName("PhoneNumber");
            ApplicationUserMap.Property(t => t.PhoneNumberConfirmed).HasColumnName("PhoneNumberConfirmed");
            ApplicationUserMap.Property(t => t.TwoFactorEnabled).HasColumnName("TwoFactorEnabled");
            ApplicationUserMap.Property(t => t.LockoutEndDateUtc).HasColumnName("LockoutEndDateUtc");
            ApplicationUserMap.Property(t => t.LockoutEnabled).HasColumnName("LockoutEnabled");
            ApplicationUserMap.Property(t => t.AccessFailedCount).HasColumnName("AccessFailedCount");
            ApplicationUserMap.Property(t => t.UserName).HasColumnName("Identificador");

            //AspNetRoles
            var CustomRoleMap = modelBuilder.Entity<CustomRole>();
            CustomRoleMap.ToTable("AspNetRoles");
            CustomRoleMap.Property(t => t.Id).HasColumnName("AspNetRolesID");

            //AspNetUserClaims
            var CustomUserClaimMap = modelBuilder.Entity<CustomUserClaim>();
            CustomUserClaimMap.ToTable("AspNetUserClaims");
            CustomUserClaimMap.Property(t => t.Id).HasColumnName("AspNetUserClaimsID");
            CustomUserClaimMap.Property(t => t.UserId).HasColumnName("OperadorID");

            //AspNetUserLogins
            var CustomUserLoginMap = modelBuilder.Entity<CustomUserLogin>();
            CustomUserLoginMap.ToTable("AspNetUserLogins");
            CustomUserLoginMap.Property(t => t.LoginProvider).HasColumnName("AspNetUserLoginsID");
            CustomUserLoginMap.Property(t => t.UserId).HasColumnName("OperadorID");

            //AspNetUserRoles
            var CustomUserRoleMap = modelBuilder.Entity<CustomUserRole>();
            CustomUserRoleMap.ToTable("AspNetUserRoles");
            CustomUserRoleMap.Property(t => t.RoleId).HasColumnName("AspNetRolesID");
            CustomUserRoleMap.Property(t => t.UserId).HasColumnName("OperadorID");
        }

        public static IdentityContext Create()
        {
            return new IdentityContext();
        }
    }
}
