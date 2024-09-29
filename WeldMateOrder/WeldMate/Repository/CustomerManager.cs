
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using TyrePark.Model;

namespace TyreParkOrderSystem.Repository
{
    public class CustomerManager:IDataRepository<Customer>
    {
        readonly OrderContext orderContext;
        public CustomerManager(OrderContext context)
        {
            orderContext = context;
        }

        public void Add(Customer entity)
        {
            var noError = orderContext.Customer.Where(x => x.PhoneNumber== entity.PhoneNumber).Count() > 0 ? throw new Exception("Bill No Already Present") : true;
            using (var tran = BeginTransaction())
            {
                try
                {

                    Customer customer = new Customer();// orderContext.PurchaseInvoice.FirstOrDefault(u => u.Id == entity.Id);
                    customer.PhoneNumber = entity.PhoneNumber;
                    customer.CustomerName= entity.CustomerName;
                    customer.EmailAddress = entity.EmailAddress;
                    customer.CustomerAddress = entity.CustomerAddress;
                    customer.Password = entity.Password;
                    orderContext.Customer.Add(customer);
                    orderContext.SaveChanges();

                    tran.Commit();
                }
                catch (Exception ex)
                {
                    tran.Rollback();
                }
            }
        }

        public async Task<int> SaveChangesAsync()
        {
            return await orderContext.SaveChangesAsync();
        }

        public DbContextTransaction BeginTransaction()
        {
            return orderContext.Database.BeginTransaction();
        }

        IEnumerable<Customer> IDataRepository<Customer>.GetAll()
        {
            throw new NotImplementedException();
        }

        Customer IDataRepository<Customer>.Get(long id)
        {
            throw new NotImplementedException();
        }

        Customer IDataRepository<Customer>.Get(string name)
        {
            throw new NotImplementedException();
        }

        void IDataRepository<Customer>.Add(List<Customer> entity)
        {
            throw new NotImplementedException();
        }

        void IDataRepository<Customer>.Update(Customer entity)
        {
            throw new NotImplementedException();
        }

        void IDataRepository<Customer>.Delete(long id)
        {
            throw new NotImplementedException();
        }

        IEnumerable<Customer> IDataRepository<Customer>.GetByDates(DateTime dateTime, DateTime date)
        {
            throw new NotImplementedException();
        }
    }


    public class LoginManager : IDataRepository<Customer>
    {
        readonly OrderContext orderContext;
        public LoginManager(OrderContext context)
        {
            orderContext = context;
        }

        public void Delete(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<int> SaveChangesAsync()
        {
            return await orderContext.SaveChangesAsync();
        }

        public DbContextTransaction BeginTransaction()
        {
            return orderContext.Database.BeginTransaction();
        }

        IEnumerable<Customer> IDataRepository<Customer>.GetAll()
        {
            throw new NotImplementedException();
        }
      
        Customer IDataRepository<Customer>.Get(string name)
        {
            var loginInfo = orderContext.Customer.Where(x => x.PhoneNumber == name.Trim());
            if (loginInfo.Count() != 0)
                return loginInfo.First();

            return null;
        }

        Customer IDataRepository<Customer>.Get(long id)
        {
            throw new NotImplementedException();
        }

        void IDataRepository<Customer>.Add(Customer entity)
        {
            orderContext.Customer.Add(entity);
            orderContext.SaveChanges();
        }

        void IDataRepository<Customer>.Add(List<Customer> entity)
        {
            throw new NotImplementedException();
        }

        void IDataRepository<Customer>.Update(Customer entity)
        {
            var loginInfo = orderContext.Customer.Where(x => x.PhoneNumber == entity.PhoneNumber.Trim()).First();
            if(loginInfo!=null)
            {
                
                loginInfo.GSTNumber = entity.GSTNumber;
                loginInfo.CustomerName = entity.CustomerName;
                loginInfo.CompanyName = entity.CompanyName;
                loginInfo.EmailAddress = entity.EmailAddress;
                orderContext.SaveChanges();
            }

            
        }

        IEnumerable<Customer> IDataRepository<Customer>.GetByDates(DateTime dateTime, DateTime date)
        {
            throw new NotImplementedException();
        }
    }
}
