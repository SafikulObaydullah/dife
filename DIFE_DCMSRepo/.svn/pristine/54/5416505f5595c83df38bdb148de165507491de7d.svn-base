using DIFECMS.Common;
using DIFECMS.Domain;
using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Domain.ViewModel;
using DIFECMS.Domain.ViewModel.Configuration.CaseCategory;
using DIFECMS.Domain.ViewModel.Configuration.Office;
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
    public class CaseCategoryRepository : ICaseCategoryRepository
    {
        private readonly DCMSDBContext _db;
        public CaseCategoryRepository(DCMSDBContext db)
        {
            _db = db;
        }
        public IEnumerable<CaseCategoryVM> Get()
        {
            var parms = new SqlParameter("@ID", Convert.ToInt64(0));
            var results = _db.Database.SqlQuery<CaseCategoryVM>("GetCaseCategory_sp", parms).ToList();
            return results;
        }

        public SaveVM Save(CaseCategory caseCategory)
        {
            try
            {
                var ID = new SqlParameter { ParameterName = "ID", Value = caseCategory.ID };
                var CourtTypeID = new SqlParameter { ParameterName = "CourtTypeID", Value = caseCategory.CourtTypeID };
                var NameE = new SqlParameter
                {
                    ParameterName = "NameE",
                    Value = caseCategory.NameE == null ? DBNull.Value : caseCategory.NameE
                };
                var NameB = new SqlParameter
                {
                    ParameterName = "NameB",
                    Value = caseCategory.NameB == null ? DBNull.Value : caseCategory.NameB
                };
                var Description = new SqlParameter
                {
                    ParameterName = "Description",
                    Value = caseCategory.Description == null ? DBNull.Value : caseCategory.Description
                };
                var isActive = new SqlParameter { ParameterName = "isActive", Value = caseCategory.isActive };
                var Creator = new SqlParameter { ParameterName = "Creator", Value = caseCategory.Creator };
                var result = _db.Database.SqlQuery<SaveVM>("InsertUpdateCaseCategory_sp  @ID,@CourtTypeID,@NameE,@NameB,@Description,@IsActive,@Creator",
                    ID, CourtTypeID, NameE, NameB, Description, isActive, Creator).FirstOrDefault();
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
                    ID = caseCategory.ID,
                    Code = (int)ProjectCodes.Error,
                    Message = ex.Message,
                    IsSuccess = false
                };
                return result;

            }
        }
    }
}
