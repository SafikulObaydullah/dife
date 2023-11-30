using DIFECMS.Repository.Contracts;
using DIFECMS.Repository.Implementations;
using DIFECMS.Service.Contracts;
using DIFECMS.Service.Contracts.Configuration;
using DIFECMS.Service.Implementations.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Service.Implementations
{
    public class FacadeRegistration : IFacadeRegistration
    {
        public static IRepositoryRegistration Registration { get; set; } = new RepositoryRegistration();

        public void AddInfrastucture(IServiceCollection services, string conStr)
        {
            Registration.AddInfrastucture(services, conStr);

            services.AddTransient<IOfficeFacade, OfficeFacade>();
            services.AddTransient<ICourtTypeFacade, CourtTypeFacade>();
            services.AddTransient<ICaseTypeFacade, CaseTypeFacade>();
            services.AddTransient<ICourtFacade, CourtFacade>();
            services.AddTransient<IMinistryOrDepartmentFacade, MinistryOrDepartmentFacade>();
            services.AddTransient<ICaseCategoryFacade, CaseCategoryFacade>();
            services.AddTransient<ICaseNatureFacade, CaseNatureFacade>();
            services.AddTransient<ICaseStatusFacade, CaseStatusFacade>();
            services.AddTransient<IConcernedPersonFacade, ConcernedPersonFacade>();
            services.AddTransient<IActivityFacade, ActivityFacade>();
            services.AddTransient<ICaseFacade, CaseFacade>();
            services.AddTransient<ICaseListFacade, CaseListFacade>();
            services.AddTransient<ICaseActivityFacade, CaseActivityFacade>();
            services.AddTransient<IAccountFacade, AccountFacade>();
            services.AddTransient<IReportFacade, ReportFacade>();
            services.AddTransient<IUserTypeFacade, UserTypeFacade>();
            services.AddTransient<IDesignationFacade, DesignationFacade>();
            services.AddTransient<IAdminFacade, AdminFacade>();
            services.AddTransient<ILawyerFacade, LawyerFacade>();
            services.AddTransient<IDistrictFacade, DistrictFacade>();
        }
    }
}
