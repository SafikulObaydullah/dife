using DIFECMS.Domain.ViewModel;
using DIFECMS.Domain.ViewModel.Permission;
using DIFECMS.Domain.ViewModel.User;
using DIFECMS.Repository.Contracts;
using DIFECMS.Service.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Service.Implementations
{
    public class AdminFacade : IAdminFacade
    {
        private readonly IAdminRepository _adminRepository;

        public AdminFacade(IAdminRepository adminRepository)
        {
            _adminRepository = adminRepository;
        }
        public IEnumerable<UserPermissionVM> SearchPermission(PermissionSearchVM permissionSearch)
        {
            return _adminRepository.SearchPermission(permissionSearch);
        }

        public IEnumerable<UserOfficePermissionVM> UserOfficePermission(Int64 Id, Int64 loginId)
        {
            return _adminRepository.UserOfficePermission(Id, loginId);
        }
        public SaveVM AddOfficePermission(OfficePermissionAddVM officePermission)
        {
            return _adminRepository.AddOfficePermission(officePermission);
        }

    }
}
