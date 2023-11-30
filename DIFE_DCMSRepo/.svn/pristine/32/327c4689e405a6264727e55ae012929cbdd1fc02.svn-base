using DIFECMS.Common;
using DIFECMS.Domain;
using DIFECMS.Domain.Models;
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
    public class ConcernedPersonRepository : IConcernedPersonRepository
    {
        private readonly DCMSDBContext _db;

        public ConcernedPersonRepository(DCMSDBContext db)
        {
            _db = db;
        }
        public IEnumerable<ConcernedPerson> Get(Int64 Creator)
        {
            var UserID = new SqlParameter { ParameterName = "UserID", Value = Creator };
            var results = _db.Database.SqlQuery<ConcernedPerson>("GetConcernedPerson_sp @UserID", UserID).ToList();
            return results;
        }

        public SaveVM Save(ConcernedPerson concernedPerson)
        {
            try
            {
                var ID = new SqlParameter { ParameterName = "ID", Value = concernedPerson.ID };
                var OfficeId = new SqlParameter { ParameterName = "OfficeId", Value = concernedPerson.OfficeId };
                var NameE = new SqlParameter
                {
                    ParameterName = "NameE",
                    Value = concernedPerson.NameE == null ? DBNull.Value : concernedPerson.NameE
                };
                var NameB = new SqlParameter
                {
                    ParameterName = "NameB",
                    Value = concernedPerson.NameB == null ? DBNull.Value : concernedPerson.NameB
                };
                var Email = new SqlParameter
                {
                    ParameterName = "Email",
                    Value = concernedPerson.Email == null ? DBNull.Value : concernedPerson.Email
                };
                var Address = new SqlParameter
                {
                    ParameterName = "Address",
                    Value = concernedPerson.Address == null ? DBNull.Value : concernedPerson.Address
                };
                var Phone = new SqlParameter
                {
                    ParameterName = "Phone",
                    Value = concernedPerson.Phone == null ? DBNull.Value : concernedPerson.Phone
                };
                var isActive = new SqlParameter { ParameterName = "isActive", Value = concernedPerson.isActive };
                var Creator = new SqlParameter { ParameterName = "Creator", Value = concernedPerson.Creator };
                var result = _db.Database.SqlQuery<SaveVM>("InsertUpdateConcernedPerson_sp  " +
                    "@ID, @OfficeId, @NameE,@NameB,@Email, @Phone, @Address, @IsActive, @Creator",
                    ID, OfficeId, NameE, NameB, Email, Phone, Address, isActive, Creator).FirstOrDefault();
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
                    ID = concernedPerson.ID,
                    Code = (int)ProjectCodes.Error,
                    Message = ex.Message,
                    IsSuccess = false
                };
                return result;
            }
        }
    }
}
