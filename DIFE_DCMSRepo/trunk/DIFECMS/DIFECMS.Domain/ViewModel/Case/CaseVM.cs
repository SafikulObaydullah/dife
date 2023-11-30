using DIFECMS.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Domain.ViewModel.Case
{
    public class CaseVM
    {
        public long ID { get; set; }
        public long CourtTypeID { get; set; }
        public long CourtID { get; set; }
        public long CaseCategoryID { get; set; }
        public long CaseNatureID { get; set; }
        public long CaseStatusID { get; set; }
        public long? CasePriorityID { get; set; }
        public long CaseTypeID { get; set; }
        public string CaseType { get; set; }
        public string CourtName { get; set; }
        public long ConcernedOfficeID { get; set; }
        public long ConcernedPersonID { get; set; }
        public string CaseNo { get; set; }
        public string CaseSubject { get; set; }
        public int Year { get; set; }
        public DateTime IssueDate { get; set; }
        public DateTime DateOfAssignmentResponsibility { get; set; }
        public string CasePetitioner { get; set; }
        public string CaseDescription { get; set; }
        public string PrincipalRespondent { get; set; }
        public string OtherRespondent { get; set; }
        public bool IsDifeRespondent { get; set; }
        public string GovernmentLawyer { get; set; }
        public Int64 GovernmentLawyerId { get; set; }
        public string ReferenceCaseNo { get; set; }
        public string CaseReference { get; set; }
        public string BackgroundOfCase { get; set; }
        public string CaseTypeName { get; set; }
        public long Creator { get; set; }
        public DateTime NextHearingDate { get; set; }
        public string NextHearingDescription { get; set; }
        public long ConcernedDepartmentID { get; set; }
        public string CaseSection { get; set; }
        public IEnumerable<GetCaseRespondentPersonOrOrgVM> CaseRespondentPerson { get; set; }
        public IEnumerable<GetRespondentOfficeVM> CaseRespondentOffice { get; set; }
    }
}
