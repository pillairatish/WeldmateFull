using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TyrePark.Model
{
    public class OrderEntry
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public long BillNo { get; set; }
        public DateTime BillDate { get; set; }
        public double BillAmount { get; set; }
        public string Customer { get; set; }
        public string EmailAddress{ get; set; }
        public DateTime CreatedDate { get; set; } 
        public string UpdatedBy { get; set; } 
        public DateTime UpdatedDate { get; set; }  
        public int OrderStatus { get; set; }
        public string Comments { get; set; }
        public virtual ICollection<OrderEntryDetail> OrderEntryDetail { get; set; }

    }
    public class OrderEntryDetail
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        
        [System.Runtime.Serialization.IgnoreDataMember]
        public virtual OrderEntry OrderEntry { get; set; }
        public virtual Item Item { get; set; }
        public long Quantity { get; set; }
    }
}
