using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using Agenda3.Admin.Domain.Login;

namespace Agenda3.Admin.Entity.Mapping.Login
{
    public class OperadorMap : EntityTypeConfiguration<Operador>
    {
        public OperadorMap()
        {
            // Primary Key
            this.HasKey(t => t.OperadorID);

            // Properties
            this.Property(t => t.Identificador)
                .IsRequired()
                .HasMaxLength(256);

            this.Property(t => t.Senha)
                .IsRequired();

            this.Property(t => t.Administrador)
                .IsRequired();

            this.Property(t => t.DataCadastro)
                .IsRequired();

            this.Property(t => t.Email)
                .HasMaxLength(256);

            this.Property(t => t.EmailConfirmed)
                .IsRequired();

            this.Property(t => t.PhoneNumberConfirmed)
                .IsRequired();

            this.Property(t => t.TwoFactorEnabled)
                .IsRequired();

            this.Property(t => t.LockoutEnabled)
                .IsRequired();

            this.Property(t => t.AccessFailedCount)
                .IsRequired();

            // Table & Column Mappings
            this.ToTable("LogOperador");
            this.Property(t => t.OperadorID).HasColumnName("OperadorID");
            this.Property(t => t.Identificador).HasColumnName("Identificador");
            this.Property(t => t.Senha).HasColumnName("Senha");
            this.Property(t => t.Administrador).HasColumnName("Administrador");
            this.Property(t => t.DataCadastro).HasColumnName("DataCadastro");
            this.Property(t => t.DataExpiracao).HasColumnName("DataExpiracao");
            this.Property(t => t.Email).HasColumnName("Email");
            this.Property(t => t.EmailConfirmed).HasColumnName("EmailConfirmed");
            this.Property(t => t.SecurityStamp).HasColumnName("SecurityStamp");
            this.Property(t => t.PhoneNumber).HasColumnName("PhoneNumber");
            this.Property(t => t.PhoneNumberConfirmed).HasColumnName("PhoneNumberConfirmed");
            this.Property(t => t.TwoFactorEnabled).HasColumnName("TwoFactorEnabled");
            this.Property(t => t.LockoutEndDateUtc).HasColumnName("LockoutEndDateUtc");
            this.Property(t => t.LockoutEnabled).HasColumnName("LockoutEnabled");
            this.Property(t => t.AccessFailedCount).HasColumnName("AccessFailedCount");

            // Relationships
        }
    }
}
