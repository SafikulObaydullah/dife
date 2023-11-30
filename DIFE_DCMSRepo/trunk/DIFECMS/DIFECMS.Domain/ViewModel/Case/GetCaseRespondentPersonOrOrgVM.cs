﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Domain.ViewModel.Case
{
    public class GetCaseRespondentPersonOrOrgVM
    {
        public Int64 Id { get; set; }
        public Int64 CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string NameOfRespondent { get; set; }
        public string Designation { get; set; }
        public string Address { get; set; }
        public string TypeOfEstablishment { get; set; }
        public Int64 RespondentAsId { get; set; }
        public string RespondentAsName { get; set; }
        public bool isActive { get; set; }

    }
}
