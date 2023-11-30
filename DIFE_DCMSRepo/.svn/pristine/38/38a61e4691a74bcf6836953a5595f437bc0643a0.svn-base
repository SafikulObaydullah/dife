using DIFECMS.Service.Contracts;
using DIFECMS.Service.Implementations;

namespace DIFECMS.Web.DependencyInjection
{
    public static class Services
    {
        public static IFacadeRegistration Service { get; set; } = new FacadeRegistration();

        public static void RegisterDependencies(IServiceCollection services, string conStr)
        {
            Service.AddInfrastucture(services, conStr);
        }
    }
}
