
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using TyrePark.Model;
using TyreParkOrderSystem.Repository;

namespace TyrePark.Controllers
{
    public class SalesController : ApiController
    {
        private IDataRepository<OrderEntry> dataRepository;

        public SalesController() : this(new OrderEntryManager(new OrderContext()))
        {

        }
        public SalesController(IDataRepository<OrderEntry> _dataRepository)
        {
            dataRepository = _dataRepository;
        }
        // GET: api/<CustomerController>
        [HttpGet]
        public IEnumerable<OrderEntry> Get()
        {
            return dataRepository.GetAll();
        }

        //// GET api/<CustomerController>/5
        //[HttpGet]
        //public OrderEntry Get(long id)
        //{
        //    return dataRepository.Get(id);
        //}


        public IEnumerable<OrderEntry> GetByDate(int fromdate, int todate)
        {

            int year = fromdate / 10000;
            int month = (fromdate / 100) % 100;
            int day = fromdate % 100;

            int toyear = todate / 10000;
            int tomonth = (todate / 100) % 100;
            int today = todate % 100;

            DateTime dt = new DateTime(year, month, day);
            DateTime todt = new DateTime(toyear, tomonth, today);
            var obj = dataRepository.GetAll().ToList();
            return obj.Where(x => x.BillDate.Date >= dt.Date && x.BillDate.Date <= todt.Date).ToList();

        }

        //[HttpGet]
        //public IHttpActionResult GetByBillNumber(string id)
        //{
        //    var data = dataRepository.Get(id);
        //    return Ok(data);
        //}

        [HttpGet]
        public IHttpActionResult GetByCustomer(string customernumber)
        {
            var data = dataRepository.GetAll().Where(x=>x.Customer==customernumber);
            return Ok(data);
        }

        // POST api/<CustomerController>
        [HttpPost]
        public IHttpActionResult Post([FromBody] OrderEntry value)
        {
            dataRepository.Add(value);
            return Ok(value.BillNo);
        }

        // PUT api/<CustomerController>/5
        [HttpPut]
        public void Put([FromBody] OrderEntry value)
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
