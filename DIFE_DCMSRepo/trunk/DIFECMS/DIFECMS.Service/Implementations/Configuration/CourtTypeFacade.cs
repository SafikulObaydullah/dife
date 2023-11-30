using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Domain.ViewModel;
using DIFECMS.Domain.ViewModel.Configuration.CourtType;
using DIFECMS.Repository.Contracts.Configuration;
using DIFECMS.Service.Contracts.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Service.Implementations.Configuration
{
    public class CourtTypeFacade : ICourtTypeFacade
    {
        private readonly ICourtTypeRepository _courtTypeRepo;

        public CourtTypeFacade(ICourtTypeRepository courtTypeRepo)
        {
            _courtTypeRepo = courtTypeRepo;
        }
        public IEnumerable<GetCourtTypeVM> Get()
        {
            return _courtTypeRepo.Get();
        }

        public SaveVM Save(CourtType courtType)
        {
            return _courtTypeRepo.Save(courtType);
        }
    }
}
