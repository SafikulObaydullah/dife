using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Domain.ViewModel.Configuration.Office
{
    public class UserBasedOfficeVM
    {
        public long OfficeId { get; set; }
        public string OfficeName { get; set; }
        public long MinistryOrDepartmentId { get; set; }
        public string MinistryOrDepartmentName { get; set; }
    }
}
