using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TyrePark.Model;
using TyreParkOrderSystem.Repository;

namespace TyrePark.Controllers
{
    public class OrderDisplayController : Controller
    {
        private IDataRepository<OrderEntry> dataRepository;
        public OrderDisplayController() : this(new OrderEntryManager(new OrderContext()))
        {

        }
        public OrderDisplayController(IDataRepository<OrderEntry> _dataRepository)
        {
            dataRepository = _dataRepository;
        }


        public ActionResult Index()
        {
            ViewBag.Title = "Display Orders";

            var data = dataRepository.GetAll().Where(x=>x.OrderStatus==0).ToList();
            ViewBag.OrderDetails = data;
            return View();
        }
    }
}
