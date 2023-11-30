﻿using DIFECMS.Domain.Models;
using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Domain.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Repository.Contracts.Configuration
{
    public interface IActivityRepository
    {
        public IEnumerable<Activity> Get();
        public SaveVM Save(Activity activity);
    }
}
