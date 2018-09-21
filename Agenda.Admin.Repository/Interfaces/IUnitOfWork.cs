using Agenda3.Admin.Repository.Repositories;
using System;
using System.Threading.Tasks;
using System.Data.Entity.Validation;
using System.Collections.Generic;

namespace Agenda3.Admin.Repository
{
    public interface IUnitOfWork : IDisposable  
    {
        IFuncionarios Funcionarios { get; }
        ILogin Login { get; }

        int SaveChanges();
        Task<int> SaveChangesAsync();

        int Execute(string queryString, params object[] par);
        Task<int> ExecuteAsync(string queryString, params object[] par);
    }
}
