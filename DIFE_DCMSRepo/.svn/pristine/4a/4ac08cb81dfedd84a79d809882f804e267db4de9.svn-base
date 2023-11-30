using DIFECMS.Domain.Models;
using DIFECMS.Repository.Contracts;
using DIFECMS.Service.Contracts;

namespace DIFECMS.Service.Implementations
{
    public class CaseListFacade : ICaseListFacade
    {
        private readonly ICaseListRepository _caseListRepo;

        public CaseListFacade(ICaseListRepository caseListRepo)
        {
            _caseListRepo = caseListRepo;
        }
        public IEnumerable<CaseList> Get(CaseListSearch caseListSearch)
        {
            return _caseListRepo.Get(caseListSearch);
        }
        public IEnumerable<CaseList> GetTotalUpcomingData(Int64 UserId, Int64 OfficeId)
        {
            return _caseListRepo.GetTotalUpcomingData(UserId, OfficeId);
        }
        public IEnumerable<CaseList> GethearingPendingData(Int64 UserId, Int64 OfficeId)
        {
            return _caseListRepo.GethearingPendingData(UserId, OfficeId);
        }
        public IEnumerable<CaseList> GetCaseActivityUpdatePendingData(Int64 UserId, Int64 OfficeId)
        {
            return _caseListRepo.GetCaseActivityUpdatePendingData(UserId, OfficeId);
        }
        public IEnumerable<CaseList> GetMyUpcomingData(Int64 UserId, Int64 OfficeId)
        {
            return _caseListRepo.GetMyUpcomingData(UserId, OfficeId);
        }
    }
}
