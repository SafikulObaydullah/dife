using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Domain.ViewModel;
using DIFECMS.Domain.ViewModel.Configuration.CaseCategory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Service.Contracts.Configuration
{
    public interface ICaseCategoryFacade
    {
        public IEnumerable<CaseCategoryVM> Get();
        public SaveVM Save(CaseCategory caseCategory);
    }
}
