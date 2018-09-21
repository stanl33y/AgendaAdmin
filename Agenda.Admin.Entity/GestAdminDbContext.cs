using System;
using System.Linq;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using Agenda3.Admin.Domain.Funcionarios;
using Agenda3.Admin.Domain.Login;
using Agenda3.Admin.Entity.Mapping.Funcionarios;
using Agenda3.Admin.Entity.Mapping.Login;
using System.Data.Entity.ModelConfiguration.Conventions;
using Agenda3.Admin.Entity.Mapping;
using Agenda3.Admin.Domain;

namespace Agenda3.Admin.Entity
{
    public partial class AgendaAdminDbContext : DbContext
    {
        public AgendaAdminDbContext()
            : base("Name=BDAgendaAdminContext")
        {
            this.Configuration.LazyLoadingEnabled = false;
            this.Configuration.ProxyCreationEnabled = false;
            this.Configuration.AutoDetectChangesEnabled = true;
            Database.SetInitializer<AgendaAdminDbContext>(null);
        }

        #region Funcionarios
        public DbSet<Agenda> Agendas { get; set; }
        #endregion

        #region Login
        public DbSet<Operador> LogOperadores { get; set; }
        #endregion

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //Remove a plularizaçao das tabelas
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            #region Funcionarios
            modelBuilder.Configurations.Add(new AgendaMap());
            #endregion

            #region Login
            modelBuilder.Configurations.Add(new OperadorMap());
            #endregion
        }

        public static AgendaAdminDbContext Create()
        {
            return new AgendaAdminDbContext();
        }

    }
}
