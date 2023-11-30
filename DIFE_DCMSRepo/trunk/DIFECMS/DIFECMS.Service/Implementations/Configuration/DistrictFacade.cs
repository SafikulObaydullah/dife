
using DIFECMS.Domain.Models;
using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Domain.ViewModel;
using DIFECMS.Repository.Contracts;
using DIFECMS.Repository.Contracts.Configuration;
using DIFECMS.Service.Contracts.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Service.Implementations.Configuration
{
    public class DistrictFacade : IDistrictFacade
    {
        private readonly IDistrictRepository _districtRepository;
        public DistrictFacade(IDistrictRepository districtRepository)
        {
         _districtRepository = districtRepository;
        }
        public IEnumerable<District> Get()
        {
            return _districtRepository.Get();
        }
    }
}
