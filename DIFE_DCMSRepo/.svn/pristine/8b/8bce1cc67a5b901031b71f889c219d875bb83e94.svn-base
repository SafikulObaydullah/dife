using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Domain.ViewModel;
using DIFECMS.Domain.ViewModel.Configuration.Court;
using DIFECMS.Repository.Contracts.Configuration;
using DIFECMS.Service.Contracts.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Service.Implementations.Configuration
{
    public class CourtFacade : ICourtFacade
    {
        private readonly ICourtRepository _courtRepo;

        public CourtFacade(ICourtRepository courtRepo)
        {
            _courtRepo = courtRepo;
        }
        public IEnumerable<GetCourtVM> Get()
        {
            return _courtRepo.Get();
        }

        public SaveVM Save(Court court)
        {
            return _courtRepo.Save(court);
        }
    }
}
