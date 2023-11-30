using DIFECMS.Domain.Models.Accounts;
using DIFECMS.Domain.ViewModel;

namespace DIFECMS.Repository.Contracts
{
    public interface IAccountRepository
    {
        IEnumerable<LoginUser> GetAuthenticUserData(Login o);
        IEnumerable<LoginUser> GetAllUserData();
        IEnumerable<SaveVM> SaveUser(LoginUser o);
    }
}
