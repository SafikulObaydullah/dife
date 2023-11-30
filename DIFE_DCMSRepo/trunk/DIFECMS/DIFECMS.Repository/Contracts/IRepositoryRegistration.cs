using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Repository.Contracts
{
    public interface IRepositoryRegistration
    {
        void AddInfrastucture(IServiceCollection services, string conStr);
    }
}
