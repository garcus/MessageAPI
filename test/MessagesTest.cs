using System;
using Xunit;
using System.Linq;
using Messages.DataAccess.Repositories;
using Messages.DataAccess.Models;

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
        public void GetAll()
        {
            var repo = new MessagesRepository(fixture.Db);
            var messages = repo.GetAll();
            Assert.NotEmpty(messages.ToList());
        }

        [Fact] void Get()
        {
            var repo = new MessagesRepository(fixture.Db);
            var message = repo.Get(1);
            Assert.Equal(1, message.Id);
        }

        [Fact] void GetNonExistant()
        {
            var repo = new MessagesRepository(fixture.Db);
            Assert.Throws<MessageNotFoundException>(() => repo.Get(100));
        }

        [Fact]
        public void Add()
        {
            var repo = new MessagesRepository(fixture.Db);
            var msg = new Message { Title = "New message", Body = "My body" };
            var m = repo.Add(msg);
            Assert.Equal(4, m.Id);
        }

        [Fact]
        public void Update()
        {
            var repo = new MessagesRepository(fixture.Db);
            var msg = new Message { Title = "Updated message", Body = "My updated body" };
            var m = repo.Update(1, msg);
            Assert.Equal("Updated message", m.Title);
            Assert.Equal("My updated body", m.Body);
        }

        [Fact]
        public void UpdateNonExistant()
        {
            var repo = new MessagesRepository(fixture.Db);
            var msg = new Message { Title = "Updated message", Body = "My updated body" };
            Assert.Throws<MessageNotFoundException>(() => repo.Update(100, msg));
        }

        [Fact]
        public void Delete()
        {
            var repo = new MessagesRepository(fixture.Db);
            repo.Delete(3);
            Assert.Throws<MessageNotFoundException>(() => repo.Get(3));
        }

        [Fact]
        public void DeleteNonExistant()
        {
            var repo = new MessagesRepository(fixture.Db);
            Assert.Throws<MessageNotFoundException>(() => repo.Delete(100));
        }
    }
}
