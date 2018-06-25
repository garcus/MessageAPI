using Microsoft.EntityFrameworkCore;
using Messages.DataAccess.Models;

namespace Messages.DataAccess
{
    public class MessagesContext : DbContext
    {
        public MessagesContext(DbContextOptions<MessagesContext> options) : base(options)
        { }

        public DbSet<Message> Messages { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Message>().ToTable("Message");
        }
    }
}