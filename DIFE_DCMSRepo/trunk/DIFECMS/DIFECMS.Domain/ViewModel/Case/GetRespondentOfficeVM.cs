using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Domain.ViewModel.Case
{
    public class GetRespondentOfficeVM
    {
      public long Id { get; set; }
      public long OfficeId { get; set; }
      public string OfficeName { get; set; }
      public long DepartmentId { get; set; }
      public string DepartmentName { get; set; }
      public long RespondentTypeId { get; set; }
      public string RespondentType { get; set; }
      public bool isActive { get; set; }
   }
}
