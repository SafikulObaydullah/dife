using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Domain.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Service.Contracts.Configuration
{
    public interface ICaseNatureFacade
    {
        public IEnumerable<CaseNature> Get();
        public SaveVM Save(CaseNature caseNature);
    }
}
