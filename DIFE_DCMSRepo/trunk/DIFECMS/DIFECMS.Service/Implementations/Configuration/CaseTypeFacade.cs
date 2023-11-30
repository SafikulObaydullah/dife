using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Domain.ViewModel;
using DIFECMS.Domain.ViewModel.Configuration.CaseType;
using DIFECMS.Repository.Contracts.Configuration;
using DIFECMS.Service.Contracts.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Service.Implementations.Configuration
{
    public class CaseTypeFacade : ICaseTypeFacade
    {
        private readonly ICaseTypeRepository _caseTypeRepo;

        public CaseTypeFacade(ICaseTypeRepository caseTypeRepo)
        {
            _caseTypeRepo = caseTypeRepo;
        }
        public IEnumerable<GetCaseTypeVM> Get()
        {
            return _caseTypeRepo.Get();
        }

        public SaveVM Save(CaseType caseType)
        {
            return _caseTypeRepo.Save(caseType);
        }
    }
}
