using System;
using System.Linq;
using System.Data.Entity;
using System.Threading.Tasks;
using System.Linq.Expressions;
using System.Collections.Generic;

namespace Agenda3.Admin.Repository.Repositories
{
    public class GenericRepository<TEntity> : IDisposable where TEntity : class
    {
        protected bool disposed = false;
        protected DbContext _context;
        protected readonly DbSet<TEntity> _dbset;

        public GenericRepository(DbContext context)
        {
            _context = context;
            _dbset = context.Set<TEntity>();
        }

        /// <summary>
        /// Get Entity
        /// </summary>
        /// <param name="filter">Expressão Lambda de busca (Where)</param>
        /// <param name="page">Número da página</param>
        /// <param name="pageSize">Quantidade de registro por página</param>
        /// <returns>IQueryable</returns>
        public IQueryable<TEntity> Get(Expression<Func<TEntity, bool>> filter = null, int? page = null, int? pageSize = null)
        {
            IQueryable<TEntity> query = _dbset;

            if (filter != null)
                query = query.Where(filter);

            if (page != null && pageSize != null)
                query = query.Skip((page.Value - 1) * pageSize.Value).Take(pageSize.Value);

            return query;
        }

        /// <summary>
        /// Get Entity By ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Entidade</returns>
        public virtual TEntity GetByID(int id)
        {
            return _dbset.Find(id);
        }

        /// <summary>
        /// Get Entity By SQL Query
        /// </summary>
        /// <param name="queryString"></param>
        /// <param name="par"></param>
        /// <returns></returns>
        public virtual IQueryable<TEntity> GetFromQuery(string queryString, params object[] par)
        {
            return _dbset.SqlQuery(queryString, par).AsQueryable();
            //return _context.Database.SqlQuery<TEntity>(queryString, par);
        }

        /// <summary>
        /// Get Entity Async
        /// </summary>
        /// <param name="Filter"></param>
        /// <param name="Includes"></param>
        /// <returns>Lista de entidade</returns>
        public virtual async Task<List<TEntity>> GetAsync(Expression<Func<TEntity, bool>> filter = null, int? page = null, int? pageSize = null)
        {
            return await this.Get(filter, page, pageSize).ToListAsync();
        }

        /// <summary>
        /// Get Entity By ID Async
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Entidade</returns>
        public virtual async Task<TEntity> GetByIDAsync(int id)
        {
            return await _dbset.FindAsync(id);
        }

        /// <summary>
        /// Insert Entity
        /// </summary>
        /// <param name="entity"></param>
        /// <returns>Entidade</returns>
        public virtual void Insert(TEntity entity)
        {
            _dbset.Add(entity);
        }

        /// <summary>
        /// Insert Entitys
        /// </summary>
        /// <param name="entities"></param>
        public virtual void Insert(IEnumerable<TEntity> entities)
        {
            foreach (var entity in entities)
            {
                _dbset.Add(entity);
            }
        }

        /// <summary>
        /// Delete Entity
        /// </summary>
        /// <param name="entity"></param>
        public virtual void Delete(TEntity entity)
        {
            _dbset.Attach(entity);
            _context.Entry(entity).State = EntityState.Deleted;
        }

        /// <summary>
        /// Delete Entity By ID
        /// </summary>
        /// <param name="id"></param>
        public virtual void Delete(object id)
        {
            TEntity entityToDelete = _dbset.Find(id);
            Delete(entityToDelete);
        }

        /// <summary>
        /// Update Entity
        /// </summary>
        /// <param name="entity"></param>
        public virtual void Update(TEntity entity)
        {
            _dbset.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
