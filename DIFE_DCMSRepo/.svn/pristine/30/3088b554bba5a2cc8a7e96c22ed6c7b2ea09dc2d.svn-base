using DIFECMS.Common;
using DIFECMS.Domain;
using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Domain.ViewModel;
using DIFECMS.Domain.ViewModel.Configuration.CourtType;
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
    public class CourtTypeRepository : ICourtTypeRepository
    {
        private readonly DCMSDBContext _db;
        public CourtTypeRepository(DCMSDBContext db)
        {
            _db = db;
        }
        public IEnumerable<GetCourtTypeVM> Get()
        {
            var parms = new SqlParameter("@ID", Convert.ToInt64(0));
            var results = _db.Database.SqlQuery<GetCourtTypeVM>("GetCourtType_sp", parms).ToList();
            return results;
        }

        public SaveVM Save(CourtType courtType)
        {
            try
            {
                var ID = new SqlParameter { ParameterName = "ID", Value = courtType.ID };
                var NameE = new SqlParameter
                {
                    ParameterName = "NameE",
                    Value = courtType.NameE == null ? DBNull.Value : courtType.NameE
                };
                var NameB = new SqlParameter
                {
                    ParameterName = "NameB",
                    Value = courtType.NameB == null ? DBNull.Value : courtType.NameB
                };
                var Description = new SqlParameter
                {
                    ParameterName = "Description",
                    Value = courtType.Description == null ? DBNull.Value : courtType.Description
                };
                var isActive = new SqlParameter { ParameterName = "isActive", Value = courtType.isActive };
                var Creator = new SqlParameter { ParameterName = "Creator", Value = courtType.Creator };
                var result = _db.Database.SqlQuery<SaveVM>("InsertUpdateCourtType_sp  @ID,@NameE,@NameB,@Description,@IsActive,@Creator",
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
                    ID = courtType.ID,
                    Code = (int)ProjectCodes.Error,
                    Message = ex.Message,
                    IsSuccess = false
                };
                return result;

            }
        }
    }
}
