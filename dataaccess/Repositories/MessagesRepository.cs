using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Messages.DataAccess.Models;

namespace Messages.DataAccess.Repositories
{
    public class MessagesRepository
    {
        private readonly MessagesContext _context;

        public MessagesRepository(MessagesContext context)
        {
            _context = context;
        }

        public Message Get(long id)
        {
            var msg = _context.Messages.Where(m => m.Id == id).FirstOrDefault();
            if (msg == null)
                throw new MessageNotFoundException("Message not found.");
            return msg;
        }

        public IEnumerable<Message> GetAll()
        {
            return _context.Messages;
        }

        public IEnumerable<Message> Find(string term)
        {
            return _context.Messages
                .Where(m => m.Title.Contains(term))
                .OrderBy(m => m.Title);
        }

        public void Add(Message msg)
        {
            _context.Messages.Add(msg);
            _context.SaveChanges();
        }

        public void Update(long id, Message msg)
        {
            var m = _context.Messages.Find(id);
            if (m == null)
                throw new MessageNotFoundException("Message not found.");
            m.Title = msg.Title;
            m.Body = msg.Body;
            _context.Messages.Update(m);
            _context.SaveChanges();
        }

        public void Delete(long id)
        {
            var m = _context.Messages.Find(id);
            if (m == null)
                throw new MessageNotFoundException("Message not found.");
            _context.Messages.Remove(m);
            _context.SaveChanges();
        }
    }

    public class MessageNotFoundException : Exception 
    { 
        public MessageNotFoundException(string msg) : base(msg) { }
    }
}
