using Agenda3.Admin.Repository.Repositories;
using Agenda3.Admin.Domain.Login;

namespace Agenda3.Admin.Repository
{
    public interface ILogin
    {
        GenericRepository<Operador> OperadorRepository { get; }
    }
}
