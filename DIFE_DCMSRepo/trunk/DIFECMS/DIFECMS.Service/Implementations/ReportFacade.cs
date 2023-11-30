using DIFECMS.Domain.Models;
using DIFECMS.Domain.ViewModel.Report;
using DIFECMS.Repository.Contracts;
using DIFECMS.Service.Contracts;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Service.Implementations
{
    public class ReportFacade : IReportFacade
    {
        private readonly IReportRepository _reportRepo;

        public ReportFacade(IReportRepository reportRepo)
        {
            _reportRepo = reportRepo;
        }
        public CaseReportVM GetCaseReport(long id)
        {
            return _reportRepo.GetCaseReport(id);
        }
        public IEnumerable<CaseList> GetCaseList(CaseListSearch caseListSearch)
        {
            return _reportRepo.GetCaseList(caseListSearch);
        }
        public DataTable GetOfficeAndCourtWiseReport(OfficeAndCourtWiseReportVM officeAndCourtWiseReportVM)
        {
            return _reportRepo.GetOfficeAndCourtWiseReport(officeAndCourtWiseReportVM);
        }
        public List<CaseList> GetOfficeAndCourtWiseReportDetail(OfficeAndCourtWiseReportVM officeAndCourtWiseReportVM)
        {
            return _reportRepo.GetOfficeAndCourtWiseReportDetail(officeAndCourtWiseReportVM);
        }
        
    }
}
