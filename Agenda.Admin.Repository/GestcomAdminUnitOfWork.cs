using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Threading.Tasks;
using Agenda3.Admin.Entity;
using Agenda3.Admin.Repository.Modules;
using Agenda3.Admin.Repository.Repositories;
using System.Data.Entity.Validation;

namespace Agenda3.Admin.Repository
{
    public class AgendaAdminUnitOfWork: IUnitOfWork
    {
        private bool _disposed;
        private readonly AgendaAdminDbContext _context;

        public IFuncionarios Funcionarios { get; private set; }
        public ILogin Login { get; private set; }

        public AgendaAdminUnitOfWork(AgendaAdminDbContext Context)
        {
            _disposed = false;
            _context = Context;
            this.Funcionarios = new Funcionarios(this._context);
            this.Login = new Login(this._context);
        }

        public AgendaAdminUnitOfWork()
            :this(new AgendaAdminDbContext()) { }

        /// <summary>
        /// Save All Changes
        /// </summary>
        /// <returns></returns>
        public int SaveChanges() {
            return _context.SaveChanges();
        }

        /// <summary>
        /// Save All Changes Async
        /// </summary>
        /// <returns></returns>
        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }

        /// <summary>
        /// Executa uma query no banco de dados
        /// </summary>
        /// <param name="queryString"></param>
        /// <param name="par"></param>
        /// <returns></returns>
        public int Execute(string queryString, params object[] par) {
            return _context.Database.ExecuteSqlCommand(queryString, par); 
        }

        /// <summary>
        /// Executa uma query no banco de dados Async
        /// </summary>
        /// <param name="queryString"></param>
        /// <param name="par"></param>
        /// <returns></returns>
        public async Task<int> ExecuteAsync(string queryString, params object[] par)
        {
            return await _context.Database.ExecuteSqlCommandAsync(queryString, par);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
                if (disposing)
                    _context.Dispose();
            _disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}