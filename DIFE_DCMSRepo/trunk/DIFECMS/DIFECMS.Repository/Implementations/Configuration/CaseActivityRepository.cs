using DIFECMS.Common;
using DIFECMS.Domain;
using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Domain.ViewModel;
using DIFECMS.Domain.ViewModel.Configuration.CaseActivity;
using DIFECMS.Repository.Contracts.Configuration;
using EntityFrameworkCore.RawSQLExtensions.Extensions;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Repository.Implementations.Configuration
{
    public class CaseActivityRepository : ICaseActivityRepository
    {
        private readonly DCMSDBContext _db;

        public CaseActivityRepository(DCMSDBContext db)
        {
            _db = db;
        }

        public IEnumerable<CaseActivityVM> GetAllActivityByCaseId(long id)
        {
            var parms = new SqlParameter("@ID", id);
            var results = _db.Database.SqlQuery<CaseActivityVM>("GetCaseActivitByCaseId_sp @ID", parms).ToList();
            return results;
        }

        public SaveVM Save(CaseActivity caseActivity)
        {

            try
            {
                var ID = new SqlParameter { ParameterName = "ID", Value = caseActivity.ID };
                var CaseID = new SqlParameter { ParameterName = "CaseID", Value = caseActivity.CaseId };
                var ActivityTypeID = new SqlParameter { ParameterName = "ActivityTypeID", Value = caseActivity.ActivityTypeId };
                var ActivityNatureId = new SqlParameter { ParameterName = "ActivityNatureID", Value = caseActivity.ActivityNatureId };

                var Description = new SqlParameter
                {
                    ParameterName = "Description",
                    Value = caseActivity.Description == null ? DBNull.Value : caseActivity.Description
                };
                var ActivityDate = new SqlParameter { ParameterName = "ActivityDate", Value = caseActivity.ActivityDate };
                var NextHearingDate = new SqlParameter { ParameterName = "NextHearingDate", Value = caseActivity.NextHearingDate };
                var Creator = new SqlParameter { ParameterName = "Creator", Value = caseActivity.Creator };
                var result = _db.Database.SqlQuery<SaveVM>("InsertUpdateCaseActivity_sp  @ID,@CaseID,@ActivityTypeID," +
                    "@ActivityNatureID,@ActivityDate,@NextHearingDate,@Description, @Creator",
                    ID, CaseID, ActivityTypeID, ActivityNatureId, ActivityDate, NextHearingDate, Description,
                    Creator).FirstOrDefault();
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
                    ID = caseActivity.ID,
                    Code = (int)ProjectCodes.Error,
                    Message = ex.Message,
                    IsSuccess = false
                };
                return result;

            }
        }
    }
}
