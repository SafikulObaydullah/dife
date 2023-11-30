using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Domain.ViewModel.Configuration.CaseType
{
    public class GetCaseTypeVM
    {
        public Int64 ID { get; set; }
        public Int64 CaseCategoryID { get; set; }
        public string CaseCategory { get; set; }
        public string NameE { get; set; }
        public string NameB { get; set; }
        public string Description { get; set; }
        public string AbbreviatedForm { get; set; }
        public bool isActive { get; set; }
    }
}
