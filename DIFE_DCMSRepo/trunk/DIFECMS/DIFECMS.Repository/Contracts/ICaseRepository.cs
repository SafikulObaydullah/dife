﻿using DIFECMS.Domain.Models;
using DIFECMS.Domain.ViewModel;
using DIFECMS.Domain.ViewModel.Case;
using DIFECMS.Domain.ViewModel.Dashboard;

namespace DIFECMS.Repository.Contracts
{
    public interface ICaseRepository
    {
        public SaveVM Save(AddCaseVM caseInfo);
        public SaveVM SaveCaseDocumentsData(CaseDocument caseInfo);
        public SaveVM DeleteCaseDocumet(Int64 DocumentId, Int64 UserId);
        public IEnumerable<Case> Get();
        public IEnumerable<CommonVM> GetCaseDocumentType();
        public IEnumerable<CaseDocument> GetCaseDocuments(Int64 CaseId);
        public CaseVM GetById(Int64 Id);
        public CardAndPriorityVM GetCardAndPriority(Int64 Id, Int64 ministryOrDeptId, Int64 office, Int64 UserType);
        public IEnumerable<CaseReferenceVM> GetReferenceByCaseNo(string caseNo);
        public IEnumerable<MonthlyCaseSummary> GetMonthlyCaseSummary(Int64 caseCat, Int64 Creator);
        public IEnumerable<CaseDocument> GetFileEncbasicInfo(Int64 ID);
        public IEnumerable<GetRespondentOfficeVM> AddCaseRespondentOfficeData(CaseRespondentOfficeVM respondent);
        public IEnumerable<GetCaseRespondentPersonOrOrgVM> AddCaseRespondentPersonData(CaseRespondentPersonOrOrg personOrOrg);
        public IEnumerable<GetRespondentOfficeVM> GetRespondentOfficeData(Int64 caseId);
        public IEnumerable<GetCaseRespondentPersonOrOrgVM> GetCaseRepondentPersonOrOrg(Int64 caseId);
        public IEnumerable<GetCaseRespondentPersonOrOrgVM> DeleteRepondentPersonOrOrg(Int64 id, Int64 caseId);
        public IEnumerable<GetRespondentOfficeVM> DeleteRespondentOffice(Int64 id, Int64 caseId);
    }
}
