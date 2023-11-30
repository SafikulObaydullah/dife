using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Service.Contracts.Configuration;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace DIFECMS.Web.Controllers.Configuration
{
    public class CaseCategoryController : Controller
    {
        private readonly ICaseCategoryFacade _caseCategoryFacade;
        private readonly ICourtTypeFacade _courtTypeFacade;
        public CaseCategoryController(ICaseCategoryFacade caseCategoryFacade, ICourtTypeFacade courtTypeFacade)
        {
            _caseCategoryFacade = caseCategoryFacade;
            _courtTypeFacade = courtTypeFacade;

        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult CaseCategorySave(CaseCategory caseCategory)
        {
            var user = User.Claims.ToList();
            caseCategory.Creator = Convert.ToInt64(user[1].Value);
            if (ModelState.IsValid)
            {
                var result = _caseCategoryFacade.Save(caseCategory);
                return Json(result);
            }
            return View();
        }
        public JsonResult GetCaseCategoryData()
        {
            var res = new
            {
                caseCategory = _caseCategoryFacade.Get(),
                courtType = _courtTypeFacade.Get(),
            };
            return Json(res);
        }
    }
}
