using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc.Cors.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Messages.DataAccess;
using Messages.DataAccess.Repositories;

namespace Messages
{
    public class Startup
    {
        private SqliteConnection _conn;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(o => o.AddPolicy("MyCorsPolicy", builder =>
            {
                builder.WithOrigins("http://127.0.0.1:8081")
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            }));
            _conn = new SqliteConnection("Data Source=:memory:");
            _conn.Open();
            services.AddDbContext<MessagesContext>(options => { options.UseSqlite(_conn); });
            services.AddScoped<MessagesRepository>();
            services.AddMvc();
        }
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else 
            {
                app.UseExceptionHandler("/Error");
                // app.UseHsts();
            }

            // Setup context
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetRequiredService<MessagesContext>();
                context.Database.EnsureCreated();
            }

            app.UseCors("MyCorsPolicy");
            app.UseMvc();
        }
    }
}
