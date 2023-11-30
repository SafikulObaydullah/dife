using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Domain.Models.Configuration
{
    public class CaseActivity
    {
        public Int64 ID { get; set; }
        public Int64 CaseId { get; set; }
        public Int64 ActivityTypeId { get; set; }
        public Int64 ActivityNatureId { get; set; }
        public string? Description { get; set; }
        public DateTime ActivityDate { get; set; }
        public string? NextHearingDate { get; set; }
        public Int64 Creator { get; set; }
        public DateTime? CreationDate { get; set; }
        public Int64? Modifier { get; set; }
        public DateTime? ModificationDate { get; set; }
    }
}
