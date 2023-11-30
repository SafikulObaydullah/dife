using DIFECMS.Domain.Models;
using DIFECMS.Domain.ViewModel.Report;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Repository.Contracts
{
    public interface IReportRepository
    {
        public CaseReportVM GetCaseReport(Int64 id);
        public DataTable GetOfficeAndCourtWiseReport(OfficeAndCourtWiseReportVM officeAndCourtWiseReportVM);
        public List<CaseList> GetOfficeAndCourtWiseReportDetail(OfficeAndCourtWiseReportVM officeAndCourtWiseReportVM);
        public IEnumerable<CaseList> GetCaseList(CaseListSearch o);
    }
}
