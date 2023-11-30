﻿using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Domain.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Service.Contracts.Configuration
{
    public interface ICaseStatusFacade
    {
        public IEnumerable<CaseStatus> Get();
        public SaveVM Save(CaseStatus caseStatus);
    }
}
