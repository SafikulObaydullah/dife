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
    public class DesignationRepository : IDesignationRepository
    {
        private readonly DCMSDBContext _db;
        public DesignationRepository(DCMSDBContext db)
        {
            _db = db;
        }
        public IEnumerable<Designation> Get()
        {
            var parms = new SqlParameter("@ID", Convert.ToInt64(0));
            var results = _db.Database.SqlQuery<Designation>("GetDesignation_sp", parms).ToList();
            return results;
        }

        public SaveVM Save(Designation designation)
        {
            try
            {
                var ID = new SqlParameter { ParameterName = "ID", Value = designation.ID };
                var NameE = new SqlParameter
                {
                    ParameterName = "NameE",
                    Value = designation.NameE == null ? DBNull.Value : designation.NameE
                };
                var NameB = new SqlParameter
                {
                    ParameterName = "NameB",
                    Value = designation.NameB == null ? DBNull.Value : designation.NameB
                };

                var isActive = new SqlParameter { ParameterName = "isActive", Value = designation.isActive };
                var Creator = new SqlParameter { ParameterName = "Creator", Value = designation.Creator };
                var result = _db.Database.SqlQuery<SaveVM>("InsertUpdateDesignation_sp  @ID,@NameE,@NameB,@isActive,@Creator",
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
                    ID = designation.ID,
                    Code = (int)ProjectCodes.Error,
                    Message = ex.Message,
                    IsSuccess = false
                };
                return result;
            }
        }
    }
}
