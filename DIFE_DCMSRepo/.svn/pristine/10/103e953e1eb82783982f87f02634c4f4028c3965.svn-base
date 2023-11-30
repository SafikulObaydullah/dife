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
    public class DesignationFacade : IDesignationFacade
    {
        private readonly IDesignationRepository _designationRepository;
        public DesignationFacade(IDesignationRepository designationRepository)
        {
            _designationRepository = designationRepository;
        }
        public IEnumerable<Designation> Get()
        {
            return _designationRepository.Get();
        }

        public SaveVM Save(Designation designation)
        {
            return _designationRepository.Save(designation);
        }
    }
}
