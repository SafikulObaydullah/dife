using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Domain.ViewModel.User
{
    public class UserPermissionVM
    {
        public Int64 Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string PhoneNo { get; set; }
        public Int64 OfficeId { get; set; }
        public Int64 MinistryOrDepartmentId { get; set; }
        public Int64 DesignationId { get; set; }
        public string DesignationName { get; set; }
    }
}
