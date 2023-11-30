using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Domain.Models.Configuration
{
    public class ConcernedPerson
    {
        public Int64 ID { get; set; }
        public string? OfficeName { get; set; }
        public Int64 OfficeId { get; set; }
        public string NameE { get; set; }
        public string NameB { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public bool isActive { get; set; }
        public Int64 Creator { get; set; }
        public DateTime CreationDate { get; set; }
        public Int64 Modifier { get; set; }
        public DateTime ModificationDate { get; set; }
        public string Designation { get; set; }
    }
}
