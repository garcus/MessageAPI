using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Messages.DataAccess.Models;
using Messages.DataAccess.Repositories;

namespace Messages.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("MyCorsPolicy")]
    public class MessagesController : Controller
    {
        private readonly MessagesRepository _msgRepo;

        public MessagesController(MessagesRepository msgRepo)
        {
            _msgRepo = msgRepo;
        }

        #region GET api/messages
        [HttpGet]
        public IEnumerable<Message> GetAll()
        {
            return _msgRepo.GetAll();
        }
        #endregion

        #region GET api/messages/{id}
        [HttpGet("{id}")]
        public IActionResult GetById(long id)
        {
            Message msg = null;
            try
            {
                msg = _msgRepo.Get(id);
            }
            catch (MessageNotFoundException)
            {
                return NotFound();
            }
           return Ok(msg);
        }
        #endregion

        #region POST api/messages
        [HttpPost]
        public IActionResult Create([FromBody] Message msg)
        {
            if (msg == null || !ModelState.IsValid)
                return BadRequest(ModelState);

            _msgRepo.Add(msg);
            return CreatedAtAction(nameof(GetById), new { id = msg.Id }, msg);
        }
        #endregion

        #region PUT api/messages/{id}
        [HttpPut("{id}")]
        public IActionResult Update(long id, [FromBody] Message msg)
        {
            try
            {
                _msgRepo.Update(id, msg);
            }
            catch (MessageNotFoundException)
            {
                return NotFound();
            }
            return NoContent();
       }
        #endregion

        #region DELETE api/messages/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            try
            {
                _msgRepo.Delete(id);
            }
            catch (MessageNotFoundException)
            {
                return NotFound();
            }
            return NoContent();
        }
        #endregion
    }
}
