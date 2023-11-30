using DIFECMS.Domain;
using DIFECMS.Domain.Models;
using DIFECMS.Repository.Contracts;
using EntityFrameworkCore.RawSQLExtensions.Extensions;
using Microsoft.Data.SqlClient;

namespace DIFECMS.Repository.Implementations
{
    public class CaseListRepository : ICaseListRepository
    {
        private readonly DCMSDBContext _db;

        public CaseListRepository(DCMSDBContext db)
        {
            _db = db;
        }
        public IEnumerable<CaseList> Get(CaseListSearch o)
        {
            var CaseNo = new SqlParameter
            {
                ParameterName = "CaseNo",
                Value = o.CaseNo
            };
            var CourtTypeID = new SqlParameter
            {
                ParameterName = "CourtTypeID",
                Value = o.CourtTypeID
            };
            var CaseCategoryID = new SqlParameter
            {
                ParameterName = "CaseCategoryID",
                Value = o.CaseCategoryID
            };
            var CourtID = new SqlParameter
            {
                ParameterName = "CourtID",
                Value = o.CourtID
            };
            var CaseTypeID = new SqlParameter
            {
                ParameterName = "CaseTypeID",
                Value = o.CaseTypeID
            };
            var ConcernedOfficeID = new SqlParameter
            {
                ParameterName = "ConcernedOfficeID",
                Value = o.ConcernedOfficeID
            };
            var ConcernedPersonID = new SqlParameter
            {
                ParameterName = "ConcernedPersonID",
                Value = o.ConcernedPersonID
            };
            var IssueDateFrom = new SqlParameter
            {
                ParameterName = "IssueDateFrom",
                Value = o.IssueDateFrom
            };
            var IssueDateTo = new SqlParameter
            {
                ParameterName = "IssueDateTo",
                Value = o.IssueDateTo
            };
            var CreatorId = new SqlParameter
            {
                ParameterName = "CreatorId",
                Value = o.CreatorId
            };
            //var results = _db.Database.SqlQuery<CaseList>("GetCaseListByParam_sp @CaseNo,@Year,@CourtTypeID,@CaseCategoryID,@CourtID, @CaseTypeID," +
            //    "@ConcernedOfficeID, @ConcernedPersonID, @IssueDateFrom," +
            //    "@IssueDateTo,@CreatorId", CaseNo, Year, CourtTypeID, CaseCategoryID, CourtID, CaseTypeID, ConcernedOfficeID, ConcernedPersonID,
            //    IssueDateFrom, IssueDateTo, CreatorId).ToList();


            var SPname = "GetCaseListByParam_sp N'" + o.CaseNo + "'," + o.CourtTypeID + "," + o.CaseCategoryID + "," + o.CourtID + "," + o.CaseTypeID + "," + o.ConcernedOfficeID + "" +
                "," + o.ConcernedPersonID + ",'" + o.IssueDateFrom + "','" + o.IssueDateTo + "','" + o.CreationDateFrom + "','" + o.CreationDateTo + "'," + o.CreatorId + "";
            var results = _db.Database.SqlQuery<CaseList>(SPname).ToList();

            return results;
        }
        public IEnumerable<CaseList> GetTotalUpcomingData(Int64 UserId, Int64 OfficeId)
        {
            var SPname = "GetTotalUpcomingData_SP " + UserId + "," + OfficeId + "";
            var results = _db.Database.SqlQuery<CaseList>(SPname).ToList();

            return results;
        }
        public IEnumerable<CaseList> GethearingPendingData(Int64 UserId, Int64 OfficeId)
        {
            var SPname = "GethearingPendingData_SP " + UserId + "," + OfficeId + "";
            var results = _db.Database.SqlQuery<CaseList>(SPname).ToList();

            return results;
        }
        public IEnumerable<CaseList> GetCaseActivityUpdatePendingData(Int64 UserId, Int64 OfficeId)
        {
            var SPname = "GetCaseActivityUpdatePendingData_SP " + UserId + "," + OfficeId + "";
            var results = _db.Database.SqlQuery<CaseList>(SPname).ToList();

            return results;
        }
        public IEnumerable<CaseList> GetMyUpcomingData(Int64 UserId, Int64 OfficeId)
        {
            var SPname = "GetMyUpcomingData_SP " + UserId + "," + OfficeId + "";
            var results = _db.Database.SqlQuery<CaseList>(SPname).ToList();

            return results;
        }
    }
}
