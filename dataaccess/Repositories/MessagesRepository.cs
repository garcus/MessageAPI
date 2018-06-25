using System.Linq;
using System.Collections.Generic;
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

        public Message Get(int id)
        {
            return _context.Messages.Where(m => m.Id == id).FirstOrDefault();
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
    }
}
