using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Domain.ViewModel;
using DIFECMS.Repository.Contracts.Configuration;
using DIFECMS.Service.Contracts.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Service.Implementations.Configuration
{
    public class ConcernedPersonFacade : IConcernedPersonFacade
    {
        private readonly IConcernedPersonRepository _concernedPersonRepo;

        public ConcernedPersonFacade(IConcernedPersonRepository concernedPersonRepo)
        {
            _concernedPersonRepo = concernedPersonRepo;
        }
        public IEnumerable<ConcernedPerson> Get(Int64 Creator)
        {
            return _concernedPersonRepo.Get(Creator);
        }

        public SaveVM Save(ConcernedPerson concernedPerson)
        {
            return _concernedPersonRepo.Save(concernedPerson);
        }
    }
}
