using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Service.Contracts.Configuration;
using Microsoft.AspNetCore.Mvc;

namespace DIFECMS.Web.Controllers.Configuration
{
    public class ConcernedPersonController : Controller
    {
        private readonly IConcernedPersonFacade _concernedPersonFacade;
        private readonly IOfficeFacade _officeFacade;

        public ConcernedPersonController(IConcernedPersonFacade concernedPersonFacade, IOfficeFacade officeFacade)
        {
            _concernedPersonFacade = concernedPersonFacade;
            _officeFacade = officeFacade;
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult ConcernedPersonSave(ConcernedPerson concernedPerson)
        {
            if (ModelState.IsValid)
            {
                var result = _concernedPersonFacade.Save(concernedPerson);
                return Json(result);
            }
            return View();
        }
        public JsonResult GetConcernedPersonAndOffice()
        {
            var res = new
            {
                office = _officeFacade.Get(),
                concernedPerson = _concernedPersonFacade.Get(0)
            };
            return Json(res);
        }
    }
}
