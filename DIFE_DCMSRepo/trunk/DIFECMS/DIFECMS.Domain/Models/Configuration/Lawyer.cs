﻿

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Domain.Models.Configuration
{
    public class Lawyer
   {
        public Int64 Id { get; set; }
        public string Name { get; set; }
        public string Degree { get; set; }
        public Int64 DistrictID { get; set; }
        public string? DistrictName { get; set; }   
        public string? Address { get; set; }
        public string? Designation { get; set; }
        public bool isActive { get; set; }
        public Int64 Creator { get; set; }
        public DateTime? CreationDate { get; set; }
        public Int64? Modifier { get; set; }
        public DateTime? ModificationDate { get; set; }
    }
}
