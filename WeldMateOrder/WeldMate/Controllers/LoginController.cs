using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TyrePark.Controllers
{
    using TyreParkOrderSystem.Repository;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Http;
    using global::TyrePark.Model;

    // For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

    namespace TyrePark.Controllers
    {
        public class LoginController : ApiController
        {
            private const string V = "{id}";
            private IDataRepository<Customer> dataRepository;

            public LoginController() : this(new LoginManager(new OrderContext()))
            {

            }

            public LoginController(IDataRepository<Customer> _dataRepository)
            {
                dataRepository = _dataRepository;
            }
            // GET: api/<CustomerController>
            [HttpGet]
            public IEnumerable<Customer> Get()
            {
                //return dataRepository.GetAll();
                return new List<Customer>();
            }

            // GET api/<CustomerController>/5
            [HttpGet]
            public Customer Get(string name)
            {
                var cust = new Customer();
                var login = dataRepository.Get(name);
                if (login == null)
                    throw new AccessViolationException("User Not Found");


                cust.EmailAddress = login.EmailAddress;
                cust.PhoneNumber = login.PhoneNumber;
                cust.CustomerName = login.CustomerName;
                cust.CompanyName = login.CompanyName;
                cust.GSTNumber = login.GSTNumber;



                return cust;
            }

            // POST api/<CustomerController>
            [HttpPost]
            public void Post([FromBody] Customer value)
            {
                dataRepository.Add(value);
            }

            [HttpPut]
            public void Put(string id, [FromBody] Customer value)
            {
                value.PhoneNumber = id;
                dataRepository.Update(value);
            }

            public IHttpActionResult Get(string name, string password)
            {
                Customer customer = new Customer();
                var login = dataRepository.Get(name);
                if (login == null)
                    throw new AccessViolationException("User Not Found");

                if (login.Password == password)
                {
                    customer.EmailAddress = login.EmailAddress;
                    customer.PhoneNumber = login.PhoneNumber;
                    customer.CustomerName = login.CustomerName;

                    return Ok(customer);
                }
                else
                    throw new AccessViolationException("Invalid Password");
            }

            //[HttpPost]
            //public void Post(List<Item> value)
            //{
            //    dataRepository.Add(value);
            //}
            // PUT api/<CustomerController>/5

            // DELETE api/<CustomerController>/5
            [HttpDelete]
            public void Delete(long id)
            {
                //dataRepository.Delete(id);
            }
        }
    }

}
