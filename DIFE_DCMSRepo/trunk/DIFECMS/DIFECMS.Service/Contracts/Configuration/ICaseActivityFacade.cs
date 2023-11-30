using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Domain.ViewModel;
using DIFECMS.Domain.ViewModel.Configuration.CaseActivity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Service.Contracts.Configuration
{
    public interface ICaseActivityFacade
    {
        public SaveVM Save(CaseActivity caseActivity);
        public IEnumerable<CaseActivityVM> GetAllActivityByCaseId(long id);
    }
}
