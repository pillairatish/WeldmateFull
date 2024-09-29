using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TyrePark.Model
{

    public enum OrderStatus
    {
        Delivered,
        Cancelled,
        Partial,
        Returned,
    }

    public class ItemEntry
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public  DateTime Date { get; set; }
        public string CreatedBy { get; set; } = "Stan";
        public DateTime CreatedDate { get; set; } 
        public string UpdatedBy { get; set; } 
        public DateTime UpdatedDate { get; set; } 
        public virtual ICollection<ItemEntryDetail> ItemEntryDetail { get; set; }
        public OrderStatus OrderStatus { get; set; }

    }

    public class ItemEntryDetail
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [System.Runtime.Serialization.IgnoreDataMember]
        public virtual ItemEntry ItemEntry{ get; set; }

        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; } 

        public string UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; } 
        public virtual Item Item{ get; set; }
        public long Quantity { get; set; }
        public OrderStatus OrderStatus { get; set; }

    }
}
