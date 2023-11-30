using DIFECMS.Domain;
using DIFECMS.Domain.ViewModel;
using DIFECMS.Domain.ViewModel.Permission;
using DIFECMS.Domain.ViewModel.User;
using DIFECMS.Repository.Contracts;
using EntityFrameworkCore.RawSQLExtensions.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace DIFECMS.Repository.Implementations
{
    public class AdminRepository : IAdminRepository
    {
        private readonly DCMSDBContext _db;

        public AdminRepository(DCMSDBContext db)
        {
            _db = db;
        }
        public IEnumerable<UserPermissionVM> SearchPermission(PermissionSearchVM permissionSearch)
        {
            string SP = "SearchPermission_sp '" + permissionSearch.Name + "', " + permissionSearch.MinistryOrDepartmentID +
                "," + permissionSearch.OfficeID + ",'" + permissionSearch.Email + "','" + permissionSearch.Phone + "'";
            var result = _db.Database.SqlQuery<UserPermissionVM>(SP).ToList();
            return result;
        }
        public IEnumerable<UserOfficePermissionVM> UserOfficePermission(Int64 Id, Int64 loginId)
        {
            string sp = "GetUserOfficePermission_sp " + Id+","+loginId;
            var result = _db.Database.SqlQuery<UserOfficePermissionVM>(sp).ToList();
            return result;
        }
        public SaveVM AddOfficePermission(OfficePermissionAddVM officePermission)
        {
            SaveVM result = new SaveVM();
            IEnumerable<officeVM> listChildren = officePermission.childList;
            var childDataXml = new XElement("childList", listChildren.Select(x => new XElement("child",
                               new XElement("userId", x.userId),
                               new XElement("officeId", x.officeId)
             )));

            var childSxml = childDataXml.ToString();
            var sp = "OfficePermissionAdd_sp " + officePermission.Creator + ",'" + childSxml + "'";
            result = _db.Database.SqlQuery<SaveVM>(sp).FirstOrDefault();
            return result;
        }
    }
}
