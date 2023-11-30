
using DIFECMS.Common;
using DIFECMS.Domain.Models;
using DIFECMS.Domain;
using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Domain.ViewModel;
using DIFECMS.Repository.Contracts.Configuration;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EntityFrameworkCore.RawSQLExtensions.Extensions;

namespace DIFECMS.Repository.Implementations.Configuration
{
    public class DistrictRepository : IDistrictRepository
    {
        private readonly DCMSDBContext _db;
        public DistrictRepository(DCMSDBContext db)
        {
            _db = db;
        }
        public IEnumerable<District> Get()
        {
            var parms = new SqlParameter("@ID", Convert.ToInt64(0));
            var results = _db.Database.SqlQuery<District>("GetDistrict_SP", parms).ToList();
            return results;
        }
    }
}
