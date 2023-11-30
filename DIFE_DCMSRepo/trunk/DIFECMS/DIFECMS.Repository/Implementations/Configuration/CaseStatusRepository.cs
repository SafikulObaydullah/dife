using DIFECMS.Common;
using DIFECMS.Domain;
using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Domain.ViewModel;
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
    public class CaseStatusRepository : ICaseStatusRepository
    {
        private readonly DCMSDBContext _db;
        public CaseStatusRepository(DCMSDBContext db)
        {
            _db = db;
        }
        public IEnumerable<CaseStatus> Get()
        {
            var parms = new SqlParameter("@ID", Convert.ToInt64(0));
            var results = _db.Database.SqlQuery<CaseStatus>("GetCaseStatus_sp", parms).ToList();
            return results;
        }

        public SaveVM Save(CaseStatus caseStatus)
        {
            try
            {
                var ID = new SqlParameter { ParameterName = "ID", Value = caseStatus.ID };
                var NameE = new SqlParameter
                {
                    ParameterName = "NameE",
                    Value = caseStatus.NameE == null ? DBNull.Value : caseStatus.NameE
                };
                var NameB = new SqlParameter
                {
                    ParameterName = "NameB",
                    Value = caseStatus.NameB == null ? DBNull.Value : caseStatus.NameB
                };
                var isActive = new SqlParameter { ParameterName = "isActive", Value = caseStatus.isActive };
                var Creator = new SqlParameter { ParameterName = "Creator", Value = caseStatus.Creator };
                var result = _db.Database.SqlQuery<SaveVM>("InsertUpdateCaseStatus_sp  @ID,@NameE,@NameB,@IsActive,@Creator",
                    ID, NameE, NameB, isActive, Creator).FirstOrDefault();
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
                    ID = caseStatus.ID,
                    Code = (int)ProjectCodes.Error,
                    Message = ex.Message,
                    IsSuccess = false
                };
                return result;
            }
        }
    }
}
