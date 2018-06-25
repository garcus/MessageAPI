using System.ComponentModel.DataAnnotations;

namespace Messages.DataAccess.Models
{
    public class Message
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string Body { get; set; }
    }
}