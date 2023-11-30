using DIFECMS.Common;
using DIFECMS.Domain;
using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Domain.ViewModel;
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
    public class OfficeRepository : IOfficeRepository
    {
        private readonly DCMSDBContext _db;

        public OfficeRepository(DCMSDBContext db)
        {
            _db = db;
        }
        public IEnumerable<GetOfficeVM> Get()
        {
            var parms = new SqlParameter("@ID", Convert.ToInt64(0));
            var results = _db.Database.SqlQuery<GetOfficeVM>("GetOffice_sp", parms).ToList();
            return results;
        }
        public IEnumerable<UserBasedOfficeVM> GetCaseUserBasedOffice(long id)
        {
            var results = _db.Database.SqlQuery<UserBasedOfficeVM>("GetUserbasedOffice_SP " + id + "").ToList();
            return results;
        }
        public IEnumerable<UserBasedOfficeVM> GetUserBasedOffice(long id)
        {
            var results = _db.Database.SqlQuery<UserBasedOfficeVM>("GetUserbasedOfficeDepartment_SP " + id + "").ToList();
            return results;
        }

        public SaveVM Save(Office office)
        {
            try
            {
                //string sql = "EXEC InsertUpdateDepartment_sp @ID,@NameE,@NameB,@Address,@Description,@IsActive,@Creator";
                var ID = new SqlParameter { ParameterName = "ID", Value = office.ID };
                var ParentId = new SqlParameter
                {
                    ParameterName = "ParentId",
                    Value = office.ParentId == 0 ? DBNull.Value : office.ParentId
                };
                var MinistryOrDepartmentId = new SqlParameter { ParameterName = "MinistryOrDepartmentId", Value = office.MinistryOrDepartmentId };
                var NameE = new SqlParameter
                {
                    ParameterName = "NameE",
                    Value = office.NameE == null ? DBNull.Value : office.NameE
                };
                var NameB = new SqlParameter
                {
                    ParameterName = "NameB",
                    Value = office.NameB == null ? DBNull.Value : office.NameB
                };
                var Address = new SqlParameter
                {
                    ParameterName = "Address",
                    Value = office.Address == null ? DBNull.Value : office.Address
                };
                var Description = new SqlParameter
                {
                    ParameterName = "Description",
                    Value = office.Description == null ? DBNull.Value : office.Description
                };
                var isActive = new SqlParameter { ParameterName = "isActive", Value = office.isActive };
                var Creator = new SqlParameter { ParameterName = "Creator", Value = office.Creator };
                var result = _db.Database.SqlQuery<SaveVM>("InsertUpdateOffice_sp  @ID, @ParentId, @MinistryOrDepartmentId, @NameE,@NameB,@Address,@Description,@IsActive,@Creator",
                    ID, ParentId, MinistryOrDepartmentId, NameE, NameB, Address, Description, isActive, Creator).FirstOrDefault();
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
                    ID = office.ID,
                    Code = (int)ProjectCodes.Error,
                    Message = ex.Message,
                    IsSuccess = false
                };
                return result;

            }
        }
    }
}
