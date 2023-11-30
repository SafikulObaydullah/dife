using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Service.Contracts.Configuration;
using Microsoft.AspNetCore.Mvc;

namespace DIFECMS.Web.Controllers.Configuration
{
    public class CaseStatusController : Controller
    {
        private readonly ICaseStatusFacade _caseStatusFacade;

        public CaseStatusController(ICaseStatusFacade caseStatusFacade)
        {
            _caseStatusFacade = caseStatusFacade;
        }
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult CaseStatusOrSave(CaseStatus caseStatus)
        {
            var user = User.Claims.ToList();
            caseStatus.Creator = Convert.ToInt64(user[1].Value);
            if (ModelState.IsValid)
            {
                var result = _caseStatusFacade.Save(caseStatus);
                return Json(result);
            }
            return View();
        }

        public JsonResult GetCaseStatusData()
        {
            return Json(_caseStatusFacade.Get());
        }
    }
}
