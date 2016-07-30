using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;

namespace losol.ListR
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // Define ssl certificate file
            var certFile = "selfsignedcert.pfx";
            var signingCertificate = new System.Security.Cryptography.X509Certificates.X509Certificate2(certFile, "lappen");
            
            var host = new WebHostBuilder()
                .UseKestrel(options => {
                    options.UseHttps(signingCertificate);
                    }
                    )
                .UseUrls("https://localhost:5001")
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup<Startup>()
                .Build();

            host.Run();
        }
    }
}
