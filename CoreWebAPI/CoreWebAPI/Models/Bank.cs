using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoreWebAPI.Models
{
    public class Bank
    {
        [Key]
        public int BankID { get; set; }

        [Column(TypeName = "NVARCHAR(100)")]
        public string BankName { get; set; }
    }
}
