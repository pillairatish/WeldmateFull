using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using TyrePark.Model;

namespace TyreParkOrderSystem.Repository
{
    public interface IDataRepository<TEntity>
    {
        IEnumerable<TEntity> GetAll();
        TEntity Get(long id);
        TEntity Get(string name);
        void Add(TEntity entity);
        void Add(List<TEntity> entity);

        void Update(TEntity entity);
        void Delete(long id);
        Task<int> SaveChangesAsync();
        DbContextTransaction BeginTransaction();
        IEnumerable<TEntity> GetByDates(DateTime dateTime, DateTime date);
    }
}
