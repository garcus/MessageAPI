using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Messages.DataAccess.Models;
using Messages.DataAccess.Repositories;

namespace Messages.Controllers
{
    [Route("api/[controller]")]
    public class MessagesController : Controller
    {
        private readonly MessagesRepository _msgRepo;

        public MessagesController(MessagesRepository msgRepo)
        {
            _msgRepo = msgRepo;
        }

        #region GET api/messages
        [HttpGet]
        public IEnumerable<Message> Get()
        {
            return _msgRepo.GetAll();
        }
        #endregion

        #region GET api/messages/{id}
        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(Message))]
        [ProducesResponseType(404)]
        public IActionResult Get(int id)
        {
            var msg = _msgRepo.Get(id);
            if (msg == null)
                return NotFound();
            return Ok(msg);
        }
        #endregion

        #region POST api/messages
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }
        #endregion

        #region PUT api/messages/{id}
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }
        #endregion

        #region DELETE api/messages/{id}
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
        #endregion
    }
}
