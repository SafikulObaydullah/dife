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
    public class CaseNatureFacade : ICaseNatureFacade
    {
        private readonly ICaseNatureRepository _caseNatureRepository;
        public CaseNatureFacade(ICaseNatureRepository caseNatureRepository)
        {
            _caseNatureRepository = caseNatureRepository;
        }
        public IEnumerable<CaseNature> Get()
        {
            return _caseNatureRepository.Get();
        }

        public SaveVM Save(CaseNature caseNature)
        {
            return _caseNatureRepository.Save(caseNature);
        }
    }
}
