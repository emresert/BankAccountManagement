using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreWebAPI.Models
{
    public class APIDBContext : DbContext
    {
        public APIDBContext(DbContextOptions<APIDBContext>options) : base(options)
        {

        }

        public DbSet<Bank> Bank { get; set; }
        public DbSet<BankAccount> BankAccounts { get; set; }
    }
}
