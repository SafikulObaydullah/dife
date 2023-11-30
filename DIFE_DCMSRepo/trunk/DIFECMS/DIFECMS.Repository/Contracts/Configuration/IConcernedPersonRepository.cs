using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Domain.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Repository.Contracts.Configuration
{
    public interface IConcernedPersonRepository
    {
        public IEnumerable<ConcernedPerson> Get(Int64 Creator);
        public SaveVM Save(ConcernedPerson concernedPerson);
    }
}
