using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.Sqlite;


namespace ContactManager.Models
{
    public class ContactContext : DbContext
    {
        public ContactContext(DbContextOptions<ContactContext> options)
            : base(options)
        {
        }

        public DbSet<Contact> Contacts { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<Contact>().HasData(
                new Contact
                {
                    Id = 1,
                    Name = "Nathan Benson",
                    Birthdate = ((new DateTime(1997,3,28)).ToString("MMMM d, yyyy")),
                    ContactGroup = "Friends",
                    Description = "Tallest, strongest, coolest, and most handsome developer I've ever seen",
                    Favorite = true
                },
                new Contact
                {
                    Id = 2,
                    Name = "Janessa Benson",
                    Birthdate = ((new DateTime(1994,11,3)).ToString("MMMM d, yyyy")),
                    ContactGroup = "Friends",
                    Description = "Nate's beautiful wife",
                    Favorite = true
                }
                );
        }
    }
}