//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;
//using System.Web.Http;
//using TyrePark.Model;
//using TyreParkOrderSystem.Repository;

//namespace TyrePark.Controllers
//{
//    public class ItemReportController : ApiController
//    {
//        private ItemReportManager dataRepository;

//        public ItemReportController() : this(new ItemReportManager(new OrderContext()))
//        {

//        }
//        public ItemReportController(ItemReportManager _dataRepository)
//        {
//            dataRepository = _dataRepository;
//        }
//        // GET: ItemReport
      

//        [HttpGet]
//        public List<ItemReport> Get(int fromdate, int todate)
//        {
//            int year = fromdate / 10000;
//            int month = (fromdate / 100) % 100;
//            int day = fromdate % 100;

//            int toyear = todate / 10000;
//            int tomonth = (todate / 100) % 100;
//            int today = todate % 100;

//            DateTime dt = new DateTime(year, month, day);
//            DateTime todt = new DateTime(toyear, tomonth, today);

//            var dt1 = dataRepository.GetByDates(dt,  todt).ToList();

//            return dt1;
//        }

//        [HttpGet]
//        [System.Web.Http.Route("api/ItemReport/GetByDate")]
//        public DailyItemReport GetByDate(int fromdate, int todate, int tyreType)
//        {
//            int year = fromdate / 10000;
//            int month = (fromdate / 100) % 100;
//            int day = fromdate % 100;

//            int toyear = todate / 10000;
//            int tomonth = (todate / 100) % 100;
//            int today = todate % 100;

//            DateTime dt = new DateTime(year, month, day);
//            DateTime todt = new DateTime(toyear, tomonth, today);

//            var dt1 = dataRepository.GetByDate(dt,todt,tyreType);

//            return dt1;
//        }
//    }
//}