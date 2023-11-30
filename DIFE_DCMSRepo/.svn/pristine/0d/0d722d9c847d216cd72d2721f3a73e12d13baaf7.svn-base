using DIFECMS.Common;
using DIFECMS.Domain;
using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Domain.ViewModel;
using DIFECMS.Domain.ViewModel.Configuration.CaseType;
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
    public class CaseTypeRepository : ICaseTypeRepository
    {
        private readonly DCMSDBContext _db;
        public CaseTypeRepository(DCMSDBContext db)
        {
            _db = db;
        }
        public IEnumerable<GetCaseTypeVM> Get()
        {
            var parms = new SqlParameter("@ID", Convert.ToInt64(0));
            var result = _db.Database.SqlQuery<GetCaseTypeVM>("GetCaseType_sp", parms).ToList();
            return result;
        }

        public SaveVM Save(CaseType caseType)
        {
            try
            {
                var ID = new SqlParameter("@ID", caseType.ID);
                var CaseCategoryID = new SqlParameter("@CaseCategoryID", caseType.CaseCategoryID);
                var NameE = new SqlParameter
                {
                    ParameterName = "NameE",
                    Value = caseType.NameE == null ? DBNull.Value : caseType.NameE
                };
                var NameB = new SqlParameter
                {
                    ParameterName = "NameB",
                    Value = caseType.NameB == null ? DBNull.Value : caseType.NameB
                };
                var AbbreviatedForm = new SqlParameter
                {
                    ParameterName = "AbbreviatedForm",
                    Value = caseType.AbbreviatedForm == null ? DBNull.Value : caseType.AbbreviatedForm
                };
                var Description = new SqlParameter
                {
                    ParameterName = "Description",
                    Value = caseType.Description == null ? DBNull.Value : caseType.Description
                };
                var isActive = new SqlParameter { ParameterName = "isActive", Value = caseType.isActive };
                var Creator = new SqlParameter { ParameterName = "Creator", Value = caseType.Creator };
                var result = _db.Database.SqlQuery<SaveVM>("InsertUpdateCaseType_sp  @ID,@CaseCategoryID,@NameE,@NameB,@AbbreviatedForm,@Description,@IsActive,@Creator",
                    ID, CaseCategoryID, NameE, NameB, AbbreviatedForm, Description, isActive, Creator).FirstOrDefault();
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
                    ID = caseType.ID,
                    Code = (int)ProjectCodes.Error,
                    Message = ex.Message,
                    IsSuccess = false
                };
                return result;

            }
        }
    }
}
