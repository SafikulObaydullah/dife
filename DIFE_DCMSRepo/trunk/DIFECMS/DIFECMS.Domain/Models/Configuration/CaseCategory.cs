using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Domain.Models.Configuration
{
    public class CaseCategory
    {
        public long ID { get; set; }
        public long CourtTypeID { get; set; }
        public string NameE { get; set; }
        public string NameB { get; set; }
        public string? Description { get; set; }
        public bool isActive { get; set; }
        public long Creator { get; set; }
        public DateTime? CreationDate { get; set; }
        public long? Modifier { get; set; }
        public DateTime? ModificationDate { get; set; }
    }
}
