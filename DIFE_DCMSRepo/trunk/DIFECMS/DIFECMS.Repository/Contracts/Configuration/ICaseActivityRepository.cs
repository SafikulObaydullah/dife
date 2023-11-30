using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Domain.ViewModel;
using DIFECMS.Domain.ViewModel.Configuration.CaseActivity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Repository.Contracts.Configuration
{
    public interface ICaseActivityRepository
    {
        public SaveVM Save(CaseActivity caseActivity);
        public IEnumerable<CaseActivityVM> GetAllActivityByCaseId(Int64 id);

    }
}
