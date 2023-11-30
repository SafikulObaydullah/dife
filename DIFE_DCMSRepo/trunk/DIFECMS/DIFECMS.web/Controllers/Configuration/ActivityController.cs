using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Service.Contracts.Configuration;
using Microsoft.AspNetCore.Mvc;

namespace DIFECMS.Web.Controllers.Configuration
{
    public class ActivityController : Controller
    {
        private readonly IActivityFacade _activityFacade;

        public ActivityController(IActivityFacade activityFacade)
        {
            _activityFacade = activityFacade;
        }
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult ActivitySave(Activity activity)
        {
            var user = User.Claims.ToList();
            activity.Creator = Convert.ToInt64(user[1].Value);
            if (ModelState.IsValid)
            {
                var result = _activityFacade.Save(activity);
                return Json(result);
            }
            return View();
        }

        public JsonResult GetActivityData()
        {
            return Json(_activityFacade.Get());
        }


    }
}
