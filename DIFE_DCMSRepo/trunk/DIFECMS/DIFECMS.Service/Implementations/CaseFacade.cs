using DIFECMS.Domain.Models;
using DIFECMS.Domain.ViewModel;
using DIFECMS.Domain.ViewModel.Case;
using DIFECMS.Domain.ViewModel.Dashboard;
using DIFECMS.Repository.Contracts;
using DIFECMS.Service.Contracts;

namespace DIFECMS.Service.Implementations
{
    public class CaseFacade : ICaseFacade
    {
        private readonly ICaseRepository _caseRepo;
        public CaseFacade(ICaseRepository caseRepo)
        {
            _caseRepo = caseRepo;
        }
        public IEnumerable<Case> Get()
        {
            return _caseRepo.Get();
        }
        public IEnumerable<CommonVM> GetCaseDocumentType()
        {
            return _caseRepo.GetCaseDocumentType();
        }
        public IEnumerable<CaseDocument> GetCaseDocuments(Int64 CaseId)
        {
            return _caseRepo.GetCaseDocuments(CaseId);
        }
        public SaveVM DeleteCaseDocument(Int64 CaseDocumentId, Int64 UserId)
        {
            return _caseRepo.DeleteCaseDocumet(CaseDocumentId, UserId);
        }

        public CaseVM GetById(Int64 id)
        {
            return _caseRepo.GetById(id);
        }
        public CardAndPriorityVM GetCardAndPriority(Int64 id, Int64 ministryOrDeptId, Int64 office, Int64 UserType)
        {
            return _caseRepo.GetCardAndPriority(id, ministryOrDeptId, office, UserType);
        }

        public SaveVM Save(AddCaseVM caseInfo)
        {
            return _caseRepo.Save(caseInfo);
        }
        public SaveVM SaveCaseDocumentsData(CaseDocument caseInfo)
        {
            return _caseRepo.SaveCaseDocumentsData(caseInfo);
        }

        public IEnumerable<CaseReferenceVM> GetReferenceByCaseNo(string caseNo)
        {
            return _caseRepo.GetReferenceByCaseNo(caseNo);
        }
        public IEnumerable<MonthlyCaseSummary> GetMonthlyCaseSummary(Int64 caseCat, Int64 creator)
        {
            return _caseRepo.GetMonthlyCaseSummary(caseCat, creator);
        }
        public IEnumerable<CaseDocument> GetFileEncbasicInfo(Int64 ID)
        {
            return _caseRepo.GetFileEncbasicInfo(ID);
        }

        public IEnumerable<GetRespondentOfficeVM> AddCaseRespondentOfficeData(CaseRespondentOfficeVM respondent)
        {
            return _caseRepo.AddCaseRespondentOfficeData(respondent);
        }

        public IEnumerable<GetRespondentOfficeVM> GetRespondentOfficeData(Int64 caseId)
        {
            return _caseRepo.GetRespondentOfficeData(caseId);
        }
        public IEnumerable<GetCaseRespondentPersonOrOrgVM> GetCaseRepondentPersonOrOrg(Int64 caseId)
        {
            return _caseRepo.GetCaseRepondentPersonOrOrg(caseId);
        }

        public IEnumerable<GetCaseRespondentPersonOrOrgVM> AddCaseRespondentPersonData(CaseRespondentPersonOrOrg personOrOrg)
        {
            return _caseRepo.AddCaseRespondentPersonData(personOrOrg);
        }

        public IEnumerable<GetCaseRespondentPersonOrOrgVM> DeleteRepondentPersonOrOrg(Int64 id, Int64 caseId)
        {
            return _caseRepo.DeleteRepondentPersonOrOrg(id, caseId);
        }

        public IEnumerable<GetRespondentOfficeVM> DeleteRespondentOffice(Int64 id, Int64 caseId)
        {
            return _caseRepo.DeleteRespondentOffice(id, caseId);
        }
    }
}
