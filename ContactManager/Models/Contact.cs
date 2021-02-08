using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace ContactManager.Models
{

    public class ContactGroup
    {
        [Required]
        public int ContactGroupId { get; set; }
        public string Name { get; set; }
        public ICollection<Contact> Contacts { get; set; }
    }
    public class Contact
    {
        [Required]
        public int Id {get; set; }
        [Required(ErrorMessage = "Name is required.")]
        public string Name {get; set; }
        public string Birthdate { get; set; }
        public ICollection<ContactGroup> ContactGroups { get; set; }
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