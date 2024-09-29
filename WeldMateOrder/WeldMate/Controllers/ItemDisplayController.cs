using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TyrePark.Model;
using TyreParkOrderSystem.Repository;

namespace TyrePark.Controllers
{
    public class ItemDisplayController : Controller
    {
        private IDataRepository<Item> dataRepository;

        public ItemDisplayController() : this(new ItemManager(new OrderContext()))
        {

        }

        public ItemDisplayController(IDataRepository<Item> _dataRepository)
        {
            dataRepository = _dataRepository;
        }
        // GET: ItemDisplay
        public ActionResult Index()
        {
            return View(dataRepository.GetAll().ToList());
        }

        // GET: ItemDisplay/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: ItemDisplay/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: ItemDisplay/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: ItemDisplay/Edit/5
        public ActionResult Edit(int id)
        {
            return View(dataRepository.GetAll().Where(i => i.ItemId == id).FirstOrDefault());
        }

        // POST: ItemDisplay/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here
                var employee = new Item();
                UpdateModel<Item>(employee);
                dataRepository.Update(employee);
                return RedirectToAction("Index");
            }
            catch(Exception ex)
            {
                return View();
            }
        }

        // GET: ItemDisplay/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: ItemDisplay/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
