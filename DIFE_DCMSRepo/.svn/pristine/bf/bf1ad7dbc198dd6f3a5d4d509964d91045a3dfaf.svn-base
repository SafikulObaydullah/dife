using DIFECMS.Domain.Models.Accounts;
using DIFECMS.Domain.ViewModel;
using DIFECMS.Repository.Contracts;
using DIFECMS.Service.Contracts;

namespace DIFECMS.Service.Implementations
{
    public class AccountFacade : IAccountFacade
    {
        private readonly IAccountRepository _accountRepo;
        public AccountFacade(IAccountRepository accountRepo)
        {
            _accountRepo = accountRepo;
        }

        public IEnumerable<LoginUser> GetAuthenticUserData(Login o)
        {
            return _accountRepo.GetAuthenticUserData(o);
        }
        public IEnumerable<LoginUser> GetAllUserData(long id)
        {
            return _accountRepo.GetAllUserData(id);
        }
        public IEnumerable<SaveVM> SaveUser(LoginUser o)
        {
            return _accountRepo.SaveUser(o);
        }
    }
}
