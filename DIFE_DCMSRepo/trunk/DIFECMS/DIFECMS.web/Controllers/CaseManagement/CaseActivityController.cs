using DIFECMS.Service.Contracts.Configuration;
using Microsoft.AspNetCore.Mvc;

namespace DIFECMS.Web.Controllers.CaseManagement
{
    public class CaseActivityController : Controller
    {
        private readonly ICourtTypeFacade _courtTypeFacade;
        private readonly ICaseCategoryFacade _caseCategoryFacade;

        public CaseActivityController(ICourtTypeFacade courtTypeFacade, ICaseCategoryFacade caseCategoryFacade)
        {
            _courtTypeFacade = courtTypeFacade;
            _caseCategoryFacade = caseCategoryFacade;
        }
        public IActionResult Index()
        {
            return View();
        }
        public JsonResult GetAllDropdown()
        {
            var res = new
            {
                courtType = _courtTypeFacade.Get(),
                caseCategory = _caseCategoryFacade.Get()
            };
            return Json(res);
        }
    }
}
