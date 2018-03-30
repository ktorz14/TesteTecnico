using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Contract
{
    public interface ILivroBusiness
    {

        IEnumerable<Livro> List();

        Livro Get(int id);

        bool Update(Livro entity);

        dynamic Insert(Livro entity);

        bool Delete(Livro entity);

    }
}
