using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.Sqlite;

namespace ContactManager.Models
{
    public class ContactContext : DbContext
    {
        public ContactContext()
        {
        }

        public DbSet<Contact> Contacts { get; set; }
        public DbSet<ContactGroup> ContactGroups { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder) {

            var contactGroups = new[]
            {
                new ContactGroup
                {
                    ContactGroupId = 1,
                    Name = "Family",
                    Contacts = new List<Contact>()
                },
                new ContactGroup
                {
                    ContactGroupId = 2,
                    Name = "Friends",
                    Contacts = new List<Contact>()
                }
            };
            var contacts = new[]
            {
                new Contact
                {
                    Id = 1,
                    Name = "Nathan Benson",
                    Birthdate = ((new DateTime(1997,3,28)).ToString("MMMM d, yyyy")),
                    Description = "Tallest, strongest, coolest, and most handsome developer I've ever seen",
                    Favorite = true,
                    ContactGroups = new List<ContactGroup>()
                },
                new Contact
                {
                    Id = 2,
                    Name = "Janessa Benson",
                    Birthdate = ((new DateTime(1994,11,3)).ToString("MMMM d, yyyy")),
                    Description = "Nate's beautiful wife",
                    Favorite = true,
                    ContactGroups = new List<ContactGroup>()
                }
            };
            //Add Nate and Janessa to Family, add Nate to friends.
            //Seeding many to many data is complicated
            /*contactGroups[0].Contacts.Add(contacts[0]);
            contactGroups[0].Contacts.Add(contacts[1]);
            contactGroups[1].Contacts.Add(contacts[0]);
            contacts[0].ContactGroups.Add(contactGroups[0]);
            contacts[0].ContactGroups.Add(contactGroups[1]);
            contacts[1].ContactGroups.Add(contactGroups[0]);*/

            modelBuilder.Entity<ContactGroup>().HasData(contactGroups[0],contactGroups[1]);
            //modelBuilder.Entity<ContactGroup>().HasMany(g => g.Contacts).WithOne(c => c.ContactGroup);
            //modelBuilder.Entity<Contact>().HasOne(c => c.ContactGroup).WithMany(g => g.Contacts);
            modelBuilder.Entity<Contact>().HasData(contacts[0],contacts[1]);
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionStringBuilder = new SqliteConnectionStringBuilder();
            connectionStringBuilder.DataSource = "Contactdb.db";
            var connectionString = connectionStringBuilder.ToString();
            var connection = new SqliteConnection(connectionString);
            optionsBuilder.UseSqlite(connection);        }
    }
}