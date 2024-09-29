//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;

//namespace TyrePark.Controllers
//{
//    using TyreParkOrderSystem.Repository;
//    using System;
//    using System.Collections.Generic;
//    using System.Linq;
//    using System.Threading.Tasks;
//    using System.Web.Http;
//    using global::TyrePark.Model;

//    // For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

//    namespace TyrePark.Controllers
//    {
//        public class ItemHistoryController : ApiController
//        {
//            private IDataRepository<ItemHistory> dataRepository;

//            public ItemHistoryController() : this(new ItemHistoryManager(new OrderContext()))
//            {

//            }

//            public ItemHistoryController(IDataRepository<ItemHistory> _dataRepository)
//            {
//                dataRepository = _dataRepository;
//            }
//            // GET: api/<CustomerController>
//            [HttpGet]
//            public IEnumerable<ItemHistory> Get()
//            {
//                return dataRepository.GetAll();
//            }

//            // GET api/<CustomerController>/5
//            [HttpGet]
//            public List<ItemHistory> Get(string date)
//            {
//                ItemReportManager itemReportManager = new ItemReportManager(new OrderContext());
//                var ob =itemReportManager.GetItemHistory(new DateTime(2021,10,01), DateTime.Now.AddDays(-1));
//                return ob;

//            }
            
//            [HttpGet]
//            public DateTime GetLastEntryDate(int i,int j)
//            {
//                var date =dataRepository.GetAll().OrderByDescending(x=>x.Date).First().Date;
//                return date;
//            }

//            // POST api/<CustomerController>
//            [HttpPost]
//            public void Post(List<ItemHistory> value)
//            {
//                dataRepository.Add(value);
//            }

//            //[HttpPost]
//            //public void Post(List<Item> value)
//            //{
//            //    dataRepository.Add(value);
//            //}
//            // PUT api/<CustomerController>/5
//            [HttpPut]
//            public void Put(int id, [FromBody] string value)
//            {

//            }

//            // DELETE api/<CustomerController>/5
//            [HttpDelete]
//            public void Delete(int id)
//            {

//            }
//        }
//    }

//}
