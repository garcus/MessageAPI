using System;
using Xunit;
using System.Linq;
using Messages.DataAccess.Repositories;

namespace Messages.Test
{
    [Collection("Messages tests")]
    public class MessagesTest : IClassFixture<DatabaseFixture>
    {
        DatabaseFixture fixture;

        public MessagesTest(DatabaseFixture fixture)
        {
            this.fixture = fixture;
        }

        [Fact]
        public void Get()
        {
            var repo = new MessagesRepository(fixture.Db);
            var messages = repo.GetAll();
            Assert.Equal(3, messages.ToList().Count);
        }
    }
}
