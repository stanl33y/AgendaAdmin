using System.Data.Entity;
using Agenda3.Admin.Domain.Funcionarios;
using Agenda3.Admin.Repository.Repositories;

namespace Agenda3.Admin.Repository.Modules
{
    public class Funcionarios : IFuncionarios
    {
        private readonly DbContext _context;
        
        public GenericRepository<Agenda> AgendaRepository { get; private set; }

        public Funcionarios(DbContext context)
        {
            this._context = context;
            this.AgendaRepository = new GenericRepository<Agenda>(_context);
        }
    }
}
