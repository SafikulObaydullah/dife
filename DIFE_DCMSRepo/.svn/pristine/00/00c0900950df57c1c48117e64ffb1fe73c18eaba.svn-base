using DIFECMS.Domain.Models.Accounts;
using DIFECMS.Domain.ViewModel;

namespace DIFECMS.Service.Contracts
{
    public interface IAccountFacade
    {
        IEnumerable<LoginUser> GetAuthenticUserData(Login o);
        IEnumerable<LoginUser> GetAllUserData(long id);
        IEnumerable<SaveVM> SaveUser(LoginUser o);
    }
}
