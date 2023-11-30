using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Service.Contracts.Configuration;
using Microsoft.AspNetCore.Mvc;

namespace DIFECMS.Web.Controllers.Configuration
{
    public class CourtTypeController : Controller
    {
        private readonly ICourtTypeFacade _courtTypeFacade;

        public CourtTypeController(ICourtTypeFacade courtTypeFacade)
        {
            _courtTypeFacade = courtTypeFacade;
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult CourtTypeSave(CourtType courtType)
        {
            var user = User.Claims.ToList();
            courtType.Creator = Convert.ToInt64(user[1].Value);
            if (courtType != null)
            {
                var result = _courtTypeFacade.Save(courtType);
                return Json(result);
            }
            return View();
        }

        public JsonResult GetCourtTypeData()
        {
            return Json(_courtTypeFacade.Get());
        }

    }
}
