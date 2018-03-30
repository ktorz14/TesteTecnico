using System;
using System.Collections.Generic;
using System.Text;

namespace Contract
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {

        IEnumerable<TEntity> List();

        TEntity Get(int id);

        bool Update(TEntity entity);

        dynamic Insert(TEntity entity);

        bool Delete(TEntity entity);
    }
}
