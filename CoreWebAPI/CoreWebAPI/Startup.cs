using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoreWebAPI.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace CoreWebAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            // ------> we added our Apı context as manual  // bu satırı manuel olarak eklememiz gerekir
            // -----> appsettings.json dosyasındaki alowed hostun altın connection string kısmını elimizle oluşturduk. 
            // ---->  ve devconnetionu buraya ekledik.
            //-----> arkasından consola Add-Migration "InitialDB" ve Updata-Database komutu yazılarak migration klasörü oluşturulur.
            services.AddDbContext<APIDBContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DevConnection"))); 
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            

            // Nuget package managerden ASP.NETCORE.CORS Uygulamasını ekledik. Çünkü .NET CORE ve Angular farklı localhost
            // adresi kullandığı için bu configurasyonu yaptık. Ayrıca bi alt satırdaki kodlarda http optionsları api mize ulaşmak için
            // yazdık ve status kod döndürdük. Kendi localhost adresini yazmayı unutma.
            app.UseCors(options => options.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader());

            app.Use(async (ctx, next) => {
                await next();
                if (ctx.Response.StatusCode == 204)
                {
                    ctx.Response.ContentLength = 0;
                }
            });


            app.UseMvc();
        }
    }
}
