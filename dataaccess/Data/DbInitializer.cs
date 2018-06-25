using Messages.DataAccess;
using Messages.DataAccess.Models;
using System.Linq;

namespace Messages.DataAccess.Data
{
    public static class DbInitializer
    {
        public static void Initialize(MessagesContext context)
        {
            context.Database.EnsureCreated();
            if (context.Messages.Any())
                return;
            var messages = new Message[]
            {
                new Message { Title = "Sverige vidare i VM", Body = "Enkelt!" },
                new Message { Title = "Microsoft köper GitHub", Body = "Hmmmmm" },
                new Message { Title = "En elefant promenerade...", Body = "...på en liten liten spindeltråd." }
            };
            foreach (Message m in messages)
                context.Messages.Add(m);
            context.SaveChanges();
        }
    }
}