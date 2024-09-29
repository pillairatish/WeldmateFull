//using System;
//using System.Collections.Generic;
//using System.ComponentModel.DataAnnotations;
//using System.ComponentModel.DataAnnotations.Schema;
//using System.Linq;
//using System.Threading.Tasks;

//namespace TyrePark.Model
//{
//    public class BranchTransfer
//    {
//        [Key]
//        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
//        public long Id { get; set; }
//        public  DateTime TransferDate { get; set; }
//        public virtual ICollection<BranchTransferDetail> BranchTransferDetail { get; set; }
        
//    }

//    public class BranchTransferDetail
//    {
//        [Key]
//        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
//        public long Id { get; set; }

//        [System.Runtime.Serialization.IgnoreDataMember]
//        public virtual BranchTransfer BranchTransfer { get; set; }
//        public int FromBranch { get; set; }
//        public int ToBranch { get; set; }
//        public virtual Item Item{ get; set; }
//        public long Quantity { get; set; }
//    }
//}
