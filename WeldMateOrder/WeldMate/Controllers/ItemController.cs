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
        public class ItemController : ApiController
        {
            private IDataRepository<Item> dataRepository;

            public ItemController() : this(new ItemManager(new OrderContext()))
            {

            }

            public ItemController(IDataRepository<Item> _dataRepository)
            {
                dataRepository = _dataRepository;
            }
            // GET: api/<CustomerController>
            [HttpGet]
            public IEnumerable<Item> Get()
            {
                return dataRepository.GetAll();
            }

            // GET api/<CustomerController>/5
            [HttpGet]
            public Item Get(string name)
            {
                return dataRepository.Get(name);
            }

            // POST api/<CustomerController>
            [HttpPost]
            public void Post(List<Item> value)
            {
                dataRepository.Add(value);
            }

            //[HttpPost]
            //public void Post(List<Item> value)
            //{
            //    dataRepository.Add(value);
            //}
            // PUT api/<CustomerController>/5
            [HttpPut]
            public void Put(Item entity)
            {
                dataRepository.Update(entity);
            }

            // DELETE api/<CustomerController>/5
            [HttpDelete]
            public void Delete(long id)
            {
                dataRepository.Delete(id);
            }
        }
    }

}
