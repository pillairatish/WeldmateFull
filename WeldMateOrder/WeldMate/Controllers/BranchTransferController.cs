using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using TyrePark.Model;
using TyreParkOrderSystem.Repository;

namespace TyrePark.Controllers
{
    public class BranchTransferController : ApiController
    {
        private IDataRepository<ItemEntry> dataRepository;
        public BranchTransferController() :this(new ItemEntryManager(new OrderContext()))
        {
        
        }

        public BranchTransferController(IDataRepository<ItemEntry> _dataRepository)
        {
            dataRepository = _dataRepository;
        }
        // GET: api/<CustomerController>
        [HttpGet]
        public IEnumerable<ItemEntry> Get()
        {
            return null;
        }

        [HttpGet]
        public IEnumerable<ItemEntry> GetByDate(int fromdate,int todate)
        {
            return null;
        }

        // GET api/<CustomerController>/5
        [HttpGet]
        public ItemEntry Get(long id)
        {
            return new ItemEntry();
        }

        [HttpGet]
        public IHttpActionResult GetByNumber(string id)
        {
            return Ok();
        }

        // POST api/<CustomerController>
        [HttpPost]
        public void Post([FromBody] ItemEntry value)
        {
            
        }

        // PUT api/<CustomerController>/5
        [HttpPut]
        public void Put(int id, [FromBody] string value)
        {
           
        }

        // DELETE api/<CustomerController>/5
        [HttpDelete]
        public void Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}
