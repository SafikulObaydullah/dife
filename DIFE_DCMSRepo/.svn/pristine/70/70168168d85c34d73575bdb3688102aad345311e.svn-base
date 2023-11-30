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
    public class UserTypeFacade : IUserTypeFacade
    {
        private readonly IUserTypeRepository _userTypeRepository;

        public UserTypeFacade(IUserTypeRepository userTypeRepository)
        {
            _userTypeRepository = userTypeRepository;
        }
        public IEnumerable<UserType> Get()
        {
            return _userTypeRepository.Get();
        }
        public SaveVM Save(UserType userType)
        {
            return _userTypeRepository.Save(userType);
        }
    }
}
