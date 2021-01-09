using System;
using System.ComponentModel.DataAnnotations;

namespace ContactManager.Models
{
    public class Contact
    {
        [Required]
        public long Id {get; set; }
        [Required(ErrorMessage = "Name is required.")]
        public string Name {get; set; }
        public string Birthdate { get; set; }
        public string ContactGroup {get; set; }
        public string Description {get; set; }
        public bool Favorite {get; set; }
        public string CreatedAt { get; set; }
        public string UpdatedAt { get; set; }

        public Contact() {
            Favorite = false;
            CreatedAt = (DateTime.Now).ToString();
            UpdatedAt = (DateTime.Now).ToString();
        }
    }
    
}