using Contract;
using Entities;
using System;
using System.Collections;
using System.Collections.Generic;

namespace Business
{
    public class LivroBusiness : ILivroBusiness
    {
        ILivroRepository _livroRep;

        public LivroBusiness(ILivroRepository livroRep)
        {
            _livroRep = livroRep;
        }

        public bool Delete(Livro entity)
        {
            throw new NotImplementedException();
        }

        public Livro Get(int id)
        {
            throw new NotImplementedException();
        }

        public dynamic Insert(Livro entity)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Livro> List()
        {
            return _livroRep.List();
        }

        public bool Update(Livro entity)
        {
            throw new NotImplementedException();
        }

    }
}
