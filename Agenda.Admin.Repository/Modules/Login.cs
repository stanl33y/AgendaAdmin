using System.Data.Entity;
using Agenda3.Admin.Domain.Login;
using Agenda3.Admin.Repository.Repositories;

namespace Agenda3.Admin.Repository.Modules
{
    public class Login : ILogin
    {
        private readonly DbContext _context;

        public GenericRepository<Operador> OperadorRepository { get; private set; }

        public Login(DbContext context)
        {
            this._context = context;
            this.OperadorRepository = new GenericRepository<Operador>(_context);
        }
    }
}
