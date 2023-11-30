﻿using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Domain.ViewModel;
using DIFECMS.Domain.ViewModel.Configuration.CaseType;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Repository.Contracts.Configuration
{
    public interface ICaseTypeRepository
    {
        public SaveVM Save(CaseType caseType);
        public IEnumerable<GetCaseTypeVM> Get();
    }
}
