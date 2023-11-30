using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Domain.Models.Configuration
{
    public class Department
    {
        public BigInteger ID { get; set; }
        public string NameE { get; set; }
        public string NameB { get; set; }
        public string Address { get; set; }
        public string? Description { get; set; }
        public bool isActive { get; set; }
        public BigInteger Creator { get; set; }
        public DateTime CreationDate { get; set; }
        public BigInteger? Modifier { get; set; }
        public DateTime? ModificationDate { get; set; }
    }
}
