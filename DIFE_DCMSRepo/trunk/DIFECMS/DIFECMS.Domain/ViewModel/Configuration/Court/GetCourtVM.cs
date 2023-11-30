using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Domain.ViewModel.Configuration.Court
{
    public class GetCourtVM
    {
        public Int64 ID { get; set; }
        public Int64 CourtTypeID { get; set; }
        public string CourtType { get; set; }
        public string NameE { get; set; }
        public string NameB { get; set; }
        public string Description { get; set; }
        public bool isActive { get; set; }
    }
}
