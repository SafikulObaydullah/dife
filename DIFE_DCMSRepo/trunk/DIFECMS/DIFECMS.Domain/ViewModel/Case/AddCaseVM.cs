using DIFECMS.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Domain.ViewModel.Case
{
    public class AddCaseVM
    {
        public long ID { get; set; }
        public long CourtTypeID { get; set; }
        public long CourtID { get; set; }
        public long CaseCategoryID { get; set; }
        public long CaseNatureID { get; set; }
        public long CaseStatusID { get; set; }
        public long? CasePriorityID { get; set; }
        public long CaseTypeID { get; set; }
        public long ConcernedDepartmentId { get; set; }
        public long ConcernedOfficeID { get; set; }
        public long ConcernedPersonID { get; set; }
        public string CaseNo { get; set; }
        public string CaseSubject { get; set; }
        public int Year { get; set; }
        public DateTime IssueDate { get; set; }
        public string CasePetitioner { get; set; }
        public string CaseDescription { get; set; }
        public long GovernmentLawyer { get; set; }
        public string ReferenceCaseNo { get; set; }
        public string BackgroundOfCase { get; set; }

        public long Creator { get; set; }
        public DateTime NextHearingDate { get; set; }
        public string NextHearingDescription { get; set; }
        public string CaseSection { get; set; }
        public DateTime DateOfAssignedResponsibility { get; set; }
        public IEnumerable<CaseRespondentPersonOrOrg> CaseRespondentPersonList { get; set; }
        public IEnumerable<CaseRespondentOfficeVM> RespondentOfficeList { get; set; }

    }
}
