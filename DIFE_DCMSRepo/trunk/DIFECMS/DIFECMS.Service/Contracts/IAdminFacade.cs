using DIFECMS.Domain.ViewModel;
using DIFECMS.Domain.ViewModel.Permission;
using DIFECMS.Domain.ViewModel.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Service.Contracts
{
    public interface IAdminFacade
    {
        public IEnumerable<UserPermissionVM> SearchPermission(PermissionSearchVM permissionSearch);
        public IEnumerable<UserOfficePermissionVM> UserOfficePermission(Int64 Id, Int64 loginId);
        public SaveVM AddOfficePermission(OfficePermissionAddVM officePermission);
    }
}
