using System.ComponentModel.DataAnnotations;

namespace Messages.DataAccess.Models
{
    public class Message
    {
        public long Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Title { get; set; }
        [MaxLength(500)]
        public string Body { get; set; }
    }
}