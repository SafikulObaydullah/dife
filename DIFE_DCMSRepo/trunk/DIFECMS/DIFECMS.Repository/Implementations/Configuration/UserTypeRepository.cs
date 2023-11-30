using DIFECMS.Common;
using DIFECMS.Domain;
using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Domain.ViewModel;
using DIFECMS.Domain.ViewModel.Configuration.Office;
using DIFECMS.Repository.Contracts.Configuration;
using EntityFrameworkCore.RawSQLExtensions.Extensions;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace DIFECMS.Repository.Implementations.Configuration
{
    public class UserTypeRepository : IUserTypeRepository
    {
        private readonly DCMSDBContext _db;

        public UserTypeRepository(DCMSDBContext db)
        {
            _db = db;
        }
        public IEnumerable<UserType> Get()
        {
            var parms = new SqlParameter("@ID", Convert.ToInt64(0));
            var results = _db.Database.SqlQuery<UserType>("GetUserType_sp", parms).ToList();
            return results;
        }

        public SaveVM Save(UserType userType)
        {
            try
            {
                var ID = new SqlParameter { ParameterName = "ID", Value = userType.ID };
                var Name = new SqlParameter
                {
                    ParameterName = "Name",
                    Value = userType.Name == null ? DBNull.Value : userType.Name
                };
                var isActive = new SqlParameter { ParameterName = "isActive", Value = userType.isActive };
                var Creator = new SqlParameter { ParameterName = "Creator", Value = userType.Creator };
                var result = _db.Database.SqlQuery<SaveVM>("InsertUpdateUserType_sp  @ID,@Name,@IsActive,@Creator",
                   ID, Name, isActive, Creator).FirstOrDefault();
                if (result.IsSuccess == false)
                {
                    result.Code = (int)ProjectCodes.Error;
                }
                else
                {
                    result.Code = (int)ProjectCodes.Success;
                }
                var resultFinal = new SaveVM
                {
                    ID = result.ID,
                    IsSuccess = result.IsSuccess,
                    Code = result.Code,
                    Message = result.Message,
                };

                return resultFinal;

            }
            catch (Exception ex)
            {
                var result = new SaveVM
                {
                    ID = userType.ID,
                    Code = (int)ProjectCodes.Error,
                    Message = ex.Message,
                    IsSuccess = false
                };
                return result;
            }
        }
    }

}
