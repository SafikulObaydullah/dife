
using DIFECMS.Common;
using DIFECMS.Domain.Models;
using DIFECMS.Domain;
using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Domain.ViewModel;
using DIFECMS.Repository.Contracts.Configuration;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EntityFrameworkCore.RawSQLExtensions.Extensions;

namespace DIFECMS.Repository.Implementations.Configuration
{
    public class LawyerRepository : ILawyerRepository
    {
        private readonly DCMSDBContext _db;
        public LawyerRepository(DCMSDBContext db)
        {
            _db = db;
        }
        public IEnumerable<Lawyer> Get()
        {
            var parms = new SqlParameter("@ID", Convert.ToInt64(0));
            var results = _db.Database.SqlQuery<Lawyer>("GetLawyer_SP", parms).ToList();
            return results;
        }
        public IEnumerable<Lawyer> GetLawyerWithDistrict()
        {
            var parms = new SqlParameter("@ID", Convert.ToInt64(0));
            //var DistrictID = new SqlParameter("@DistrictID", Convert.ToInt64(0));
            var results = _db.Database.SqlQuery<Lawyer>("GetLawyerWithDistrict_SP", parms).ToList();
            return results;
        }
      public SaveVM Save(Lawyer lawyer)
      {
         try
         {
            var ID = new SqlParameter { ParameterName = "ID", Value = lawyer.Id };
            var Name = new SqlParameter
            {
               ParameterName = "Name",
               Value = lawyer.Name == null ? DBNull.Value : lawyer.Name
            };
            var Degree = new SqlParameter
            {
               ParameterName = "Degree",
               Value = lawyer.Degree == null ? DBNull.Value : lawyer.Degree
            };
            var DistrictID = new SqlParameter
            {
               ParameterName = "DistrictID",
               Value = lawyer.DistrictID == null ? DBNull.Value : lawyer.DistrictID
            };
            var Address = new SqlParameter
            {
               ParameterName = "Address",
               Value = lawyer.Address == null ? DBNull.Value : lawyer.Address
            };
            var Designation = new SqlParameter
            {
               ParameterName = "Designation",
               Value = lawyer.Designation == null ? DBNull.Value : lawyer.Designation
            };
            var isActive = new SqlParameter { ParameterName = "isActive", Value = lawyer.isActive };
            var Creator = new SqlParameter { ParameterName = "Creator", Value = lawyer.Creator };
            var result = _db.Database.SqlQuery<SaveVM>("InsertUpdateLawyer_sp  @ID,@Name,@Degree,@DistrictID,@Address,@Designation,@IsActive,@Creator",
                ID, Name, Degree, DistrictID,Address,Designation, isActive, Creator).FirstOrDefault();
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
               ID = lawyer.Id,
               Code = (int)ProjectCodes.Error,
               Message = ex.Message,
               IsSuccess = false
            };
            return result;
         }
      }
   }
}
