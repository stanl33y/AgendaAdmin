using Agenda3.Admin.Repository.Repositories;
using Agenda3.Admin.Domain.Funcionarios;

namespace Agenda3.Admin.Repository
{
    public interface IFuncionarios
    {
        GenericRepository<Agenda> AgendaRepository { get; }
    }
}
