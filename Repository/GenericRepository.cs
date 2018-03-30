using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Dapper.Contrib.Extensions;
using Contract;

namespace Repository
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class
    {
        public virtual bool Delete(TEntity entity)
        {
            using (var conn = ConnectionFactory.GetConnection)
            {
                return conn.Delete(entity);
            }
        }

        public virtual dynamic Insert(TEntity entity)
        {
            using (var conn = ConnectionFactory.GetConnection)
            {
                return conn.Insert(entity);
            }
        }

        public virtual bool Update(TEntity entity)
        {
            using (var conn = ConnectionFactory.GetConnection)
            {
                return conn.Update(entity);
            }
        }

        public virtual IEnumerable<TEntity> List()
        {
            using (var conn = ConnectionFactory.GetConnection)
            {
                return conn.GetAll<TEntity>();
            }
        }

        public TEntity Get(int id)
        {
            using (var conn = ConnectionFactory.GetConnection)
            {
                return conn.Get<TEntity>(id);
            }
        }
    }
}
