using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using TyrePark.Model;
using TyreParkOrderSystem.Repository;

namespace TyrePark.Controllers
{
    public class ItemEntryController : ApiController
    {
        private IDataRepository<ItemEntry> dataRepository;
        public ItemEntryController() :this(new ItemEntryManager(new OrderContext()))
        {
        
        }

        public ItemEntryController(IDataRepository<ItemEntry> _dataRepository)
        {
            dataRepository = _dataRepository;
        }
        // GET: api/<CustomerController>
        [HttpGet]
        public IEnumerable<ItemEntry> Get()
        {
            var obj= dataRepository.GetAll().ToList();
            return obj;

        }

        [HttpGet]
        public IEnumerable<ItemEntry> GetByDate(int fromdate,int todate)
        {
            
            int year = fromdate / 10000;
            int month = (fromdate / 100)%100;
            int  day = fromdate % 100;

            int toyear = todate / 10000;
            int tomonth = (todate / 100) % 100;
            int today = todate % 100;

            DateTime dt = new DateTime(year,month,day);
            DateTime todt = new DateTime(toyear, tomonth, today);
            var obj = dataRepository.GetAll().ToList();
            return obj.Where(x => x.Date.Date >= dt.Date && x.Date.Date<=todt.Date).ToList();

        }

        // GET api/<CustomerController>/5
        [HttpGet]
        public ItemEntry Get(long id)
        {
            return dataRepository.Get(id);
        }

        [HttpGet]
        public IHttpActionResult GetByNumber(string id)
        {
            var data = dataRepository.Get(id);
            return Ok(data);
        }

        // POST api/<CustomerController>
        [HttpPost]
        public void Post([FromBody] ItemEntry value)
        {
            dataRepository.Add(value);
        }

        // PUT api/<CustomerController>/5
        [HttpPut]
        public void Put([FromBody] ItemEntry value)
        {
            dataRepository.Update(value);
        }

        // DELETE api/<CustomerController>/5
        [HttpDelete]
        public void Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}
