using DIFECMS.Domain;
using DIFECMS.Domain.Models.Accounts;
using DIFECMS.Domain.ViewModel;
using DIFECMS.Repository.Contracts;
using EntityFrameworkCore.RawSQLExtensions.Extensions;

namespace DIFECMS.Repository.Implementations
{
    public class AccountRepository : IAccountRepository
    {
        private readonly DCMSDBContext _db;

        public AccountRepository(DCMSDBContext db)
        {
            _db = db;
        }
        public IEnumerable<LoginUser> GetAuthenticUserData(Login o)
        {
            string SP = "AuthenticateUserData_SP '" + o.Username + "','" + o.Password + "'";
            var result = _db.Database.SqlQuery<LoginUser>(SP).ToList();
            return result;
        }
        public IEnumerable<LoginUser> GetAllUserData()
        {
            string SP = "GetAllUserData_SP";
            var result = _db.Database.SqlQuery<LoginUser>(SP).ToList();
            return result;
        }
        public IEnumerable<SaveVM> SaveUser(LoginUser o)
        {
            string SP = "User_t_Insert_Update_SP '" + o.Id + "','" + o.Name + "','" + o.Username + "','" + o.Password + "'," + o.UserTypeId + ",'" + o.Email + "','" + o.PhoneNo + "'," + o.OfficeId + "," + o.MinistryOrDepartmentId + "," + o.DesignationId + "," + o.isActive + "," + o.CreatorId + "";
            var result = _db.Database.SqlQuery<SaveVM>(SP).ToList();
            return result;
        }
    }
}
