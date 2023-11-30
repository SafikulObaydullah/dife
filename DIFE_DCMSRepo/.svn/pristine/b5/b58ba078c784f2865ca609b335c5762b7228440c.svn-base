using DIFECMS.Common;
using DIFECMS.Domain.Models;
using DIFECMS.Domain;
using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Domain.ViewModel;
using DIFECMS.Repository.Contracts.Configuration;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EntityFrameworkCore.RawSQLExtensions.Extensions;

namespace DIFECMS.Repository.Implementations.Configuration
{
    public class ActivityRepository : IActivityRepository
    {
        private readonly DCMSDBContext _db;
        public ActivityRepository(DCMSDBContext db)
        {
            _db = db;
        }
        public IEnumerable<Activity> Get()
        {
            var parms = new SqlParameter("@ID", Convert.ToInt64(0));
            var results = _db.Database.SqlQuery<Activity>("GetActivity_sp", parms).ToList();
            return results;
        }

        public SaveVM Save(Activity activity)
        {
            try
            {
                var ID = new SqlParameter { ParameterName = "ID", Value = activity.ID };
                var NameE = new SqlParameter
                {
                    ParameterName = "NameE",
                    Value = activity.NameE == null ? DBNull.Value : activity.NameE
                };
                var NameB = new SqlParameter
                {
                    ParameterName = "NameB",
                    Value = activity.NameB == null ? DBNull.Value : activity.NameB
                };
                var Description = new SqlParameter
                {
                    ParameterName = "Description",
                    Value = activity.Description == null ? DBNull.Value : activity.Description
                };
                var isActive = new SqlParameter { ParameterName = "isActive", Value = activity.isActive };
                var Creator = new SqlParameter { ParameterName = "Creator", Value = activity.Creator };
                var result = _db.Database.SqlQuery<SaveVM>("InsertUpdateActivity_sp  @ID,@NameE,@NameB,@Description,@IsActive,@Creator",
                    ID, NameE, NameB, Description, isActive, Creator).FirstOrDefault();
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
                    ID = activity.ID,
                    Code = (int)ProjectCodes.Error,
                    Message = ex.Message,
                    IsSuccess = false
                };
                return result;
            }
        }
    }
}
