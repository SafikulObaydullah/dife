using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Domain.ViewModel.Configuration.CourtType
{
    public class GetCourtTypeVM
    {
        public Int64 ID { get; set; }
        public string NameE { get; set; }
        public string NameB { get; set; }
        public string Description { get; set; }
        public bool isActive { get; set; }
    }
}
