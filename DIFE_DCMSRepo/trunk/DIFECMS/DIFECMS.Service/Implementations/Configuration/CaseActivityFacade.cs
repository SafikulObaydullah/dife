using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Domain.ViewModel;
using DIFECMS.Domain.ViewModel.Configuration.CaseActivity;
using DIFECMS.Repository.Contracts.Configuration;
using DIFECMS.Service.Contracts;
using DIFECMS.Service.Contracts.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Service.Implementations.Configuration
{
    public class CaseActivityFacade : ICaseActivityFacade
    {
        private readonly ICaseActivityRepository _caseActivityRepository;

        public CaseActivityFacade(ICaseActivityRepository caseActivityRepository)
        {
            _caseActivityRepository = caseActivityRepository;

        }

        public IEnumerable<CaseActivityVM> GetAllActivityByCaseId(long id)
        {
            return _caseActivityRepository.GetAllActivityByCaseId(id);
        }

        public SaveVM Save(CaseActivity caseActivity)
        {
            return _caseActivityRepository.Save(caseActivity);
        }
    }
}
