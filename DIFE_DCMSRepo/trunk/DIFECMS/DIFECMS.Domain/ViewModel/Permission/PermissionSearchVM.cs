using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Domain.ViewModel.Permission
{
    public class PermissionSearchVM
    {
        public string Name { get; set; }
        public Int64 MinistryOrDepartmentID { get; set; }
        public Int64 OfficeID { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
    }
}
