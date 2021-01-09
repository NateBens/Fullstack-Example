using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ContactManager.Models;

namespace ContactManager
{
    public class Startup
    {
        private IWebHostEnvironment _appEnv;
        public Startup(IConfiguration configuration, IWebHostEnvironment appEnv)
        {
            Configuration = configuration;
            _appEnv = appEnv;
        }

        public IConfiguration Configuration { get; }
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllersWithViews();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            //Use DB in project directory.  If it does not exist, create it:
            var connectionStringBuilder = new SqliteConnectionStringBuilder();
            connectionStringBuilder.DataSource = $"{_appEnv.ContentRootPath}/Contactdb.db";
            var connectionString = connectionStringBuilder.ToString();
            var connection = new SqliteConnection(connectionString);
            //var connection = new SqliteConnection("ContactsDB.db");
            services.AddDbContext<ContactContext>(options => options.UseSqlite(connection));
            //InitializeDb(connection);
            
            //services.AddDbContext<ContactContext>(options =>
            //options.UseSqlite(@"./ContactsDB.db"));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });

        }
        public void InitializeDb(SqliteConnection connection)
        {
            using(connection)
            {
                connection.Open();
                //Create contacts table if it doesnt exist:
                var delTableCmd = connection.CreateCommand();
                string createTableQuery = @"CREATE TABLE IF NOT EXISTS Contacts (
                Id INTEGER PRIMARY KEY AUTOINCREMENT,
                Name TEXT NOT NULL,
                Birthdate DATETIME,
                ContactGroup TEXT,
                Description TEXT,
                Favorite INTEGER,
                CreatedAt DATETIME,
                UpdatedAt DATETIME
                );";
                delTableCmd.CommandText = createTableQuery;
                delTableCmd.ExecuteNonQuery();   
            }

        }
    }
}