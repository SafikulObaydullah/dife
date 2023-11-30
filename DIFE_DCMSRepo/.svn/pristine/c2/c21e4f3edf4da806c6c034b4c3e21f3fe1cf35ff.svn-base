using DIFECMS.Common;
using DIFECMS.Domain;
using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Domain.ViewModel;
using DIFECMS.Domain.ViewModel.Configuration.MinistryOrDepartment;
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
    public class MinistryOrDepartmentRepository : IMinistryOrDepartmentRepository
    {
        private readonly DCMSDBContext _db;
        public MinistryOrDepartmentRepository(DCMSDBContext db)
        {
            _db = db;
        }
        public IEnumerable<GetMinistryOrDepartmentVM> Get()
        {
            var parms = new SqlParameter("@ID", Convert.ToInt64(0));
            var results = _db.Database.SqlQuery<GetMinistryOrDepartmentVM>("GetMinistryOrDepartment_sp", parms).ToList();
            return results;
        }
        public SaveVM Save(MinistryOrDepartment ministryOrDepartment)
        {
            try
            {
                //string sql = "EXEC InsertUpdateDepartment_sp @ID,@NameE,@NameB,@Address,@Description,@IsActive,@Creator";
                var ID = new SqlParameter { ParameterName = "ID", Value = ministryOrDepartment.ID };
                var NameE = new SqlParameter
                {
                    ParameterName = "NameE",
                    Value = ministryOrDepartment.NameE == null ? DBNull.Value : ministryOrDepartment.NameE
                };
                var NameB = new SqlParameter
                {
                    ParameterName = "NameB",
                    Value = ministryOrDepartment.NameB == null ? DBNull.Value : ministryOrDepartment.NameB
                };
                var Address = new SqlParameter
                {
                    ParameterName = "Address",
                    Value = ministryOrDepartment.Address == null ? DBNull.Value : ministryOrDepartment.Address
                };
                var Description = new SqlParameter
                {
                    ParameterName = "Description",
                    Value = ministryOrDepartment.Description == null ? DBNull.Value : ministryOrDepartment.Description
                };
                var isActive = new SqlParameter { ParameterName = "isActive", Value = ministryOrDepartment.isActive };
                var isDepartment = new SqlParameter { ParameterName = "isDepartment", Value = ministryOrDepartment.isDepartment };
                var Creator = new SqlParameter { ParameterName = "Creator", Value = ministryOrDepartment.Creator };
                var result = _db.Database.SqlQuery<SaveVM>("InsertUpdateMinistryOrDepartment_sp  @ID,@NameE,@NameB,@IsDepartment, @Address,@Description,@IsActive,@Creator",
                    ID, NameE, NameB, isDepartment, Address, Description, isActive, Creator).FirstOrDefault();
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
                    ID = ministryOrDepartment.ID,
                    Code = (int)ProjectCodes.Error,
                    Message = ex.Message,
                    IsSuccess = false
                };
                return result;
            }
        }
    }
}
