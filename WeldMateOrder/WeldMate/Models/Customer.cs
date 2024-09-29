using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TyrePark.Model
{
    public class Customer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public  string PhoneNumber { get; set; }
        public string CustomerName{ get; set; }
        public string CustomerAddress { get; set; }
        public string CompanyName { get; set; }
        public string GSTNumber{ get; set; }
        public string EmailAddress { get; set; }
        public string Password { get; set; }
        public DateTime LastLoginTime { get; set; }

    }

    //public class Login
    //{
    //    [Key]
    //    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    //    public long Id { get; set; }
    //    public string PhoneNumber { get; set; }
    //    public string Password { get; set; }
    //    public DateTime LastLoginTime { get; set; }
    //}


}
