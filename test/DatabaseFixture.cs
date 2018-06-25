using System;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Messages.DataAccess;
using Messages.DataAccess.Data;

namespace Messages.Test
{
    public class DatabaseFixture : IDisposable
    {
        private SqliteConnection conn;
        public MessagesContext Db { get; private set; }

        public DatabaseFixture()
        {
            conn = new SqliteConnection("DataSource=:memory:");
            conn.Open();
            var options = new DbContextOptionsBuilder<MessagesContext>()
                .UseSqlite(conn)
                .Options;
            Db = new MessagesContext(options);
            Db.Database.EnsureCreated();
            DbInitializer.Initialize(Db);
        }

        public void Dispose()
        {
            conn.Close();
        }
    }
}
