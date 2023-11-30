using DIFECMS.Domain;
using DIFECMS.Repository.Contracts;
using DIFECMS.Repository.Contracts.Configuration;
using DIFECMS.Repository.Implementations.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Repository.Implementations
{
    public class RepositoryRegistration : IRepositoryRegistration
    {
        public void AddInfrastucture(IServiceCollection services, string conStr)
        {
            services.AddDbContext<DCMSDBContext>(options =>
            {
                options.UseSqlServer(conStr);
            });
            services.AddTransient<IOfficeRepository, OfficeRepository>();
            services.AddTransient<ICourtTypeRepository, CourtTypeRepository>();
            services.AddTransient<ICaseTypeRepository, CaseTypeRepository>();
            services.AddTransient<ICourtRepository, CourtRepository>();
            services.AddTransient<IMinistryOrDepartmentRepository, MinistryOrDepartmentRepository>();
            services.AddTransient<ICaseCategoryRepository, CaseCategoryRepository>();
            services.AddTransient<ICaseNatureRepository, CaseNatureRepository>();
            services.AddTransient<ICaseStatusRepository, CaseStatusRepository>();
            services.AddTransient<IConcernedPersonRepository, ConcernedPersonRepository>();
            services.AddTransient<IActivityRepository, ActivityRepository>();
            services.AddTransient<ICaseRepository, CaseRepository>();
            services.AddTransient<ICaseListRepository, CaseListRepository>();
            services.AddTransient<ICaseActivityRepository, CaseActivityRepository>();
            services.AddTransient<IAccountRepository, AccountRepository>();
            services.AddTransient<IReportRepository, ReportRepository>();
            services.AddTransient<IUserTypeRepository, UserTypeRepository>();
            services.AddTransient<IDesignationRepository, DesignationRepository>();
            services.AddTransient<IAdminRepository, AdminRepository>();
            services.AddTransient<ILawyerRepository, LawyerRepository>();
            services.AddTransient<IDistrictRepository, DistrictRepository>();
        }

    }
}
