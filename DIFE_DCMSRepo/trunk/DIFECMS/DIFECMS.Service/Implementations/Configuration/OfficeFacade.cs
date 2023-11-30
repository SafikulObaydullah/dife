using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Domain.ViewModel;
using DIFECMS.Domain.ViewModel.Configuration.Office;
using DIFECMS.Repository.Contracts.Configuration;
using DIFECMS.Service.Contracts.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Service.Implementations.Configuration
{
    public class OfficeFacade : IOfficeFacade
    {
        private readonly IOfficeRepository _officeRepo;

        public OfficeFacade(IOfficeRepository officeRepo)
        {
            _officeRepo = officeRepo;
        }
        public IEnumerable<GetOfficeVM> Get()
        {
            return _officeRepo.Get();
        }

        public IEnumerable<UserBasedOfficeVM> GetUserBasedOffice(long id)
        {
            return _officeRepo.GetUserBasedOffice(id);
        }

        public SaveVM Save(Office office)
        {
            return _officeRepo.Save(office);
        }
    }
}
