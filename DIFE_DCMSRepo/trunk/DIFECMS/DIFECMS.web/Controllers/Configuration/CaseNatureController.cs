using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Service.Contracts.Configuration;
using Microsoft.AspNetCore.Mvc;

namespace DIFECMS.Web.Controllers.Configuration
{
    public class CaseNatureController : Controller
    {
        private readonly ICaseNatureFacade _caseNatureFacade;
        public CaseNatureController(ICaseNatureFacade caseNatureFacade)
        {
            _caseNatureFacade = caseNatureFacade;
        }
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult CaseNatureSave(CaseNature caseNature)
        {
            var user = User.Claims.ToList();
            caseNature.Creator = Convert.ToInt64(user[1].Value);
            if (ModelState.IsValid)
            {
                var result = _caseNatureFacade.Save(caseNature);
                return Json(result);
            }
            return View();
        }

        public JsonResult GetCaseNatureData()
        {
            return Json(_caseNatureFacade.Get());
        }
    }
}
