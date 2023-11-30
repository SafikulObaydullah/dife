using DIFECMS.Domain;
using DIFECMS.Domain.Models;
using DIFECMS.Domain.ViewModel.Report;
using DIFECMS.Repository.Contracts;
using EntityFrameworkCore.RawSQLExtensions.Extensions;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace DIFECMS.Repository.Implementations
{
    public class ReportRepository : IReportRepository
    {
        private readonly DCMSDBContext _db;
        private readonly IConfiguration _configuration;

        public ReportRepository(DCMSDBContext db, IConfiguration configuration)
        {
            _db = db;
            _configuration = configuration;
        }
        public CaseReportVM GetCaseReport(long id)
        {
            var result = _db.Database.SqlQuery<CaseReportVM>("GetCaseInfoByIdForReport_sp " + id + "").FirstOrDefault();
            return result;
        }
        public IEnumerable<CaseList> GetCaseList(CaseListSearch o)
        {
            var CaseNo = new SqlParameter
            {
                ParameterName = "CaseNo",
                Value = o.CaseNo
            };
            var Year = new SqlParameter
            {
                ParameterName = "Year",
                Value = o.Year
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


            var SPname = "GetCaseListReportByParam_SP '" + o.CaseNo + "'," + o.Year + "," + o.CourtTypeID + "," + o.CaseCategoryID + "," + o.CourtID + "," + o.CaseTypeID + "," + o.ConcernedOfficeID + "" +
                "," + o.ConcernedPersonID + ",'" + o.IssueDateFrom + "','" + o.IssueDateTo + "','" + o.CreationDateFrom + "','" + o.CreationDateTo + "'," + o.CreatorId + "";
            var results = _db.Database.SqlQuery<CaseList>(SPname).ToList();

            return results;
        }
        public DataTable GetOfficeAndCourtWiseReport(OfficeAndCourtWiseReportVM officeAndCourtWiseReportVM)
        {
            return BindGrid(officeAndCourtWiseReportVM);
        }
        public List<CaseList> GetOfficeAndCourtWiseReportDetail(OfficeAndCourtWiseReportVM officeAndCourtWiseReportVM)
        {

            var SPname = "OfficeAndCourtWiseReport_Detail_SP " + officeAndCourtWiseReportVM.IssueYearFrom + "," + officeAndCourtWiseReportVM.IssueYearTo + "," + officeAndCourtWiseReportVM.OfficeId + "," + officeAndCourtWiseReportVM.CourtTypeId + "," + officeAndCourtWiseReportVM.caseStatus +"";
            var results = _db.Database.SqlQuery<CaseList>(SPname).ToList();
            return results.ToList();
        }
        private DataTable BindGrid(OfficeAndCourtWiseReportVM officeAndCourtWiseReportVM)
        {
            string constring = _configuration.GetConnectionString("conStr");
            var dataTable = new DataTable();
            using (SqlConnection sqlConnection = new SqlConnection(constring))
            {
                sqlConnection.Open();
                SqlCommand sqlCmd = new SqlCommand("OfficeAndCourtWiseReport", sqlConnection);
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.Parameters.AddWithValue("@yearFrom", officeAndCourtWiseReportVM.IssueYearFrom);
                sqlCmd.Parameters.AddWithValue("@yearTo", officeAndCourtWiseReportVM.IssueYearTo);
                sqlCmd.Parameters.AddWithValue("@user_ID", 0);
                sqlCmd.Parameters.AddWithValue("@ministry_Dept_id", officeAndCourtWiseReportVM.MinistryOrDepartmentId);
                sqlCmd.Parameters.AddWithValue("@officeId", officeAndCourtWiseReportVM.OfficeId);

                SqlDataReader rdr = sqlCmd.ExecuteReader();

                dataTable.Load(rdr);
                sqlConnection.Close();
            }

            return dataTable;
        }
        
    }
}
