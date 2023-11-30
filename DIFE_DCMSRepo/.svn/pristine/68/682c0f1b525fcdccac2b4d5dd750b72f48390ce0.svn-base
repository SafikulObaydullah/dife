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
    public class ActivityFacade : IActivityFacade
    {
        private readonly IActivityRepository _activityRepository;
        public ActivityFacade(IActivityRepository activityRepository)
        {
            _activityRepository = activityRepository;
        }
        public IEnumerable<Activity> Get()
        {
            return _activityRepository.Get();
        }

        public SaveVM Save(Activity activity)
        {
            return _activityRepository.Save(activity);
        }
    }
}
