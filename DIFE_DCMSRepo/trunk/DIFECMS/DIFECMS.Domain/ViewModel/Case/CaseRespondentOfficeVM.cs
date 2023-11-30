using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Domain.ViewModel.Case
{
    public class CaseRespondentOfficeVM
    {
        public long Id { get; set; }
        public long CaseId { get; set; }
        public long OfficeId { get; set; }
        public long RespondentTypeId { get; set; }
        public long Creator { get; set; }
    }
}
