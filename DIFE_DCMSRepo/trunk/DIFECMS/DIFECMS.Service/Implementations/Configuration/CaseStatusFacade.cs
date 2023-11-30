using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Domain.ViewModel;
using DIFECMS.Repository.Contracts.Configuration;
using DIFECMS.Service.Contracts.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Service.Implementations.Configuration
{
    public class CaseStatusFacade : ICaseStatusFacade
    {
        private readonly ICaseStatusRepository _caseStatusRepo;
        public CaseStatusFacade(ICaseStatusRepository caseStatusRepo)
        {
            _caseStatusRepo = caseStatusRepo;
        }
        public IEnumerable<CaseStatus> Get()
        {
            return _caseStatusRepo.Get();
        }

        public SaveVM Save(CaseStatus caseStatus)
        {
            return _caseStatusRepo.Save(caseStatus);
        }
    }
}
