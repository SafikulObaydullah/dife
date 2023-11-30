using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Service.Contracts.Configuration;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DIFECMS.Web.Controllers.Configuration
{
    public class CaseTypeController : Controller
    {
        private readonly ICaseTypeFacade _caseTypeFacade;
        private readonly ICaseCategoryFacade _caseCategoryFacade;
        public CaseTypeController(ICaseTypeFacade caseTypeFacade, ICaseCategoryFacade caseCategoryFacade)
        {
            _caseTypeFacade = caseTypeFacade;
            _caseCategoryFacade = caseCategoryFacade;

        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult CaseTypeSave(CaseType caseType)
        {
            var user = User.Claims.ToList();
            caseType.Creator = Convert.ToInt64(user[1].Value);
            if (ModelState.IsValid)
            {
                var result = _caseTypeFacade.Save(caseType);
                return Json(result);
            }
            return View();
        }

        public JsonResult GetCaseType()
        {
            var res = new
            {
                caseType = _caseTypeFacade.Get(),
                caseCategory = _caseCategoryFacade.Get()
            };
            return Json(res);
        }
    }
}
