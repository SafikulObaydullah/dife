using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Domain.ViewModel.Permission;
using DIFECMS.Service.Contracts.Configuration;
using DIFECMS.Service.Implementations.Configuration;
using Microsoft.AspNetCore.Mvc;

namespace DIFECMS.Web.Controllers.Configuration
{
    public class UserTypeController : Controller
    {
        private readonly IUserTypeFacade _userTypeFacade;

        public UserTypeController(IUserTypeFacade userTypeFacade)
        {
            _userTypeFacade = userTypeFacade;
        }
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult UserTypeSave(UserType userType)
        {
            var user = User.Claims.ToList();
            userType.Creator = Convert.ToInt64(user[1].Value);
            if (userType != null)
            {
                var result = _userTypeFacade.Save(userType);
                return Json(result);
            }
            return View();
        }
        public JsonResult GetUserTypeData()
        {
            return Json(_userTypeFacade.Get());
        }
    }
}
