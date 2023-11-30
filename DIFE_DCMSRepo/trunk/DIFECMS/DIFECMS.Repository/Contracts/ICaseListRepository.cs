using DIFECMS.Domain.Models;

namespace DIFECMS.Repository.Contracts
{
    public interface ICaseListRepository
    {
        public IEnumerable<CaseList> Get(CaseListSearch caseListSearch);
        public IEnumerable<CaseList> GetTotalUpcomingData(Int64 UserId, Int64 OfficeId);
        public IEnumerable<CaseList> GethearingPendingData(Int64 UserId, Int64 OfficeId);
        public IEnumerable<CaseList> GetCaseActivityUpdatePendingData(Int64 UserId, Int64 OfficeId);
        public IEnumerable<CaseList> GetMyUpcomingData(Int64 UserId, Int64 OfficeId);
    }
}
