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
    public class CaseNatureRepository : ICaseNatureRepository
    {
        private readonly DCMSDBContext _db;
        public CaseNatureRepository(DCMSDBContext db)
        {
            _db = db;
        }
        public IEnumerable<CaseNature> Get()
        {
            var parms = new SqlParameter("@ID", Convert.ToInt64(0));
            var results = _db.Database.SqlQuery<CaseNature>("GetCaseNature_sp", parms).ToList();
            return results;
        }

        public SaveVM Save(CaseNature caseNature)
        {
            try
            {
                var ID = new SqlParameter { ParameterName = "ID", Value = caseNature.ID };
                var NameE = new SqlParameter
                {
                    ParameterName = "NameE",
                    Value = caseNature.NameE == null ? DBNull.Value : caseNature.NameE
                };
                var NameB = new SqlParameter
                {
                    ParameterName = "NameB",
                    Value = caseNature.NameB == null ? DBNull.Value : caseNature.NameB
                };
                var Description = new SqlParameter
                {
                    ParameterName = "Description",
                    Value = caseNature.Description == null ? DBNull.Value : caseNature.Description
                };
                var isActive = new SqlParameter { ParameterName = "isActive", Value = caseNature.isActive };
                var Creator = new SqlParameter { ParameterName = "Creator", Value = caseNature.Creator };
                var result = _db.Database.SqlQuery<SaveVM>("InsertUpdateCaseNature_sp  @ID,@NameE,@NameB,@Description,@IsActive,@Creator",
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
                    ID = caseNature.ID,
                    Code = (int)ProjectCodes.Error,
                    Message = ex.Message,
                    IsSuccess = false
                };
                return result;
            }
        }
    }
}
