using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Domain.ViewModel;
using DIFECMS.Domain.ViewModel.Configuration.MinistryOrDepartment;
using DIFECMS.Repository.Contracts.Configuration;
using DIFECMS.Service.Contracts.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Service.Implementations.Configuration
{
    public class MinistryOrDepartmentFacade : IMinistryOrDepartmentFacade
    {
        private readonly IMinistryOrDepartmentRepository _ministryOrDepartmentRepo;
        public MinistryOrDepartmentFacade(IMinistryOrDepartmentRepository ministryOrDepartmentRepo)
        {
            _ministryOrDepartmentRepo = ministryOrDepartmentRepo;
        }
        public IEnumerable<GetMinistryOrDepartmentVM> Get()
        {
            return _ministryOrDepartmentRepo.Get();
        }
        public SaveVM Save(MinistryOrDepartment ministryOrDepartment)
        {
            return _ministryOrDepartmentRepo.Save(ministryOrDepartment);
        }
    }
}
