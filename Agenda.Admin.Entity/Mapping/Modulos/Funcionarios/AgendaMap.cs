using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using Agenda3.Admin.Domain.Funcionarios;

namespace Agenda3.Admin.Entity.Mapping.Funcionarios
{
    public class AgendaMap : EntityTypeConfiguration<Agenda>
    {
        public AgendaMap()
        {
            // Primary Key
            this.HasKey(t => t.AgendaID);

            // Properties
            this.Property(t => t.Titulo)
                .IsRequired()
                .HasMaxLength(250);

            this.Property(t => t.Descricao)
                .IsRequired();

            this.Property(t => t.DataInicio)
                .IsRequired();

            this.Property(t => t.DataFim)
                .IsRequired();

            this.Property(t => t.Marcador)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("cliAgenda");
            this.Property(t => t.AgendaID).HasColumnName("AgendaID");
            this.Property(t => t.Titulo).HasColumnName("Titulo");
            this.Property(t => t.Descricao).HasColumnName("Descricao");
            this.Property(t => t.DataInicio).HasColumnName("DataInicio");
            this.Property(t => t.DataFim).HasColumnName("DataFim");
            this.Property(t => t.Marcador).HasColumnName("Marcador");

            // Relationships
            this.HasRequired(t => t.Operador)
                .WithMany(t => t.Agendas)
                .HasForeignKey(d => d.OperadorID)
                .WillCascadeOnDelete(true);
        }
    }
}
