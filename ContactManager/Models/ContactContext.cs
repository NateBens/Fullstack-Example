using System;
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
            modelBuilder.Entity<ContactGroup>().HasData(
                new ContactGroup
                {
                    ContactGroupId = 1,
                    Name = "Family"
                }
            );
            //modelBuilder.Entity<ContactGroup>().HasMany(g => g.Contacts).WithOne(c => c.ContactGroup);
            //modelBuilder.Entity<Contact>().HasOne(c => c.ContactGroup).WithMany(g => g.Contacts);
            modelBuilder.Entity<Contact>().HasData(
                new Contact
                {
                    Id = 1,
                    Name = "Nathan Benson",
                    Birthdate = ((new DateTime(1997,3,28)).ToString("MMMM d, yyyy")),
                    ContactGroupId = 1,
                    Description = "Tallest, strongest, coolest, and most handsome developer I've ever seen",
                    Favorite = true
                },
                new Contact
                {
                    Id = 2,
                    Name = "Janessa Benson",
                    Birthdate = ((new DateTime(1994,11,3)).ToString("MMMM d, yyyy")),
                    ContactGroupId = 1,
                    Description = "Nate's beautiful wife",
                    Favorite = true
                }
                );
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