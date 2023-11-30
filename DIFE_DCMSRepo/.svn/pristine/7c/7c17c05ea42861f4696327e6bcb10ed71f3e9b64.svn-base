using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Domain.ViewModel;
using DIFECMS.Domain.ViewModel.Configuration.CaseCategory;
using DIFECMS.Repository.Contracts.Configuration;
using DIFECMS.Service.Contracts.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Service.Implementations.Configuration
{
    public class CaseCategoryFacade : ICaseCategoryFacade
    {
        private readonly ICaseCategoryRepository _caseCategoyRepo;
        public CaseCategoryFacade(ICaseCategoryRepository caseCategoryRepo)
        {
            _caseCategoyRepo = caseCategoryRepo;
        }
        public IEnumerable<CaseCategoryVM> Get()
        {
            return _caseCategoyRepo.Get();
        }

        public SaveVM Save(CaseCategory caseCategory)
        {
            return _caseCategoyRepo.Save(caseCategory);
        }
    }
}
