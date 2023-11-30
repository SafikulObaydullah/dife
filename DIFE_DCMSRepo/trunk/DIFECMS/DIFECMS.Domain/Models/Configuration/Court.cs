using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Domain.Models.Configuration
{
    public class Court
    {
        public Int64 ID { get; set; }
        public Int64 CourtTypeID { get; set; }
        public string NameE { get; set; }
        public string NameB { get; set; }
        public string? Description { get; set; }
        public bool isActive { get; set; }
        public Int64 Creator { get; set; }
        public DateTime CreationDate { get; set; }
        public Int64? Modifier { get; set; }
        public DateTime? ModificationDate { get; set; }
    }
}
