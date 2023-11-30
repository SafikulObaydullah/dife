using DIFECMS.Common;
using DIFECMS.Domain;
using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Domain.ViewModel;
using DIFECMS.Domain.ViewModel.Configuration.Court;
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
    public class CourtRepository : ICourtRepository
    {
        private readonly DCMSDBContext _db;

        public CourtRepository(DCMSDBContext db)
        {
            _db = db;
        }
        public IEnumerable<GetCourtVM> Get()
        {
            var parms = new SqlParameter("@ID", Convert.ToInt64(0));
            return _db.Database.SqlQuery<GetCourtVM>("GetCourt_sp", parms).ToList();
        }

        public SaveVM Save(Court court)
        {
            try
            {
                var ID = new SqlParameter("@ID", court.ID);
                var CourtTypeID = new SqlParameter("@CourtTypeID", court.CourtTypeID);
                var NameE = new SqlParameter
                {
                    ParameterName = "NameE",
                    Value = court.NameE == null ? DBNull.Value : court.NameE
                };
                var NameB = new SqlParameter
                {
                    ParameterName = "NameB",
                    Value = court.NameB == null ? DBNull.Value : court.NameB
                };
                var Description = new SqlParameter
                {
                    ParameterName = "Description",
                    Value = court.Description == null ? DBNull.Value : court.Description
                };
                var isActive = new SqlParameter { ParameterName = "isActive", Value = court.isActive };
                var Creator = new SqlParameter { ParameterName = "Creator", Value = court.Creator };
                var result = _db.Database.SqlQuery<SaveVM>("InsertUpdateCourt_sp  @ID,@CourtTypeID,@NameE,@NameB,@Description,@IsActive,@Creator",
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
                    ID = court.ID,
                    Code = (int)ProjectCodes.Error,
                    Message = ex.Message,
                    IsSuccess = false
                };
                return result;
            }
        }
    }
}
