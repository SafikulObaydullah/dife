using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Service.Contracts;
using DIFECMS.Service.Contracts.Configuration;
using Microsoft.AspNetCore.Mvc;

namespace DIFECMS.Web.Controllers.CaseManagement
{
    public class CaseActivityUpdateEntryController : Controller
    {
        private readonly ICaseFacade _caseFacade;
        private readonly IActivityFacade _activityFacade;
        private readonly ICaseActivityFacade _caseActivityFacade;
        private readonly ICaseNatureFacade _natureFacade;

        public CaseActivityUpdateEntryController(ICaseFacade caseFacade, IActivityFacade activityFacade, ICaseActivityFacade caseActivityFacade,
            ICaseNatureFacade natureFacade)
        {
            _caseFacade = caseFacade;
            _activityFacade = activityFacade;
            _caseActivityFacade = caseActivityFacade;
            _natureFacade = natureFacade;
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult SaveCaseActivity(CaseActivity caseActivity)
        {
            if (caseActivity.NextHearingDate == null)
            {
                caseActivity.NextHearingDate = "";
            }
            if (ModelState.IsValid)
            {
                var result = _caseActivityFacade.Save(caseActivity);
                return Json(result);
            }
            return View();
        }

        public JsonResult GetCaseById(Int64 id)
        {
            var res = new
            {
                activity = _activityFacade.Get(),
                caseInfo = _caseFacade.GetById(id),
                caseActivityByCaseId = _caseActivityFacade.GetAllActivityByCaseId(id),
                caseDocument = _caseFacade.GetCaseDocuments(id),
                caseNature = _natureFacade.Get(),
                document = _caseFacade.GetCaseDocumentType(),
            };
            return Json(res);
        }

        public JsonResult GetCaseActivityByCaseId(Int64 id)
        {
            var res = new
            {
                caseActivityByCaseId = _caseActivityFacade.GetAllActivityByCaseId(id)
            };
            return Json(res);
        }
    }
}
