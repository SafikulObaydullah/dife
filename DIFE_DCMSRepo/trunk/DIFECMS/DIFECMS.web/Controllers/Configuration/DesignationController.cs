using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Service.Contracts.Configuration;
using Microsoft.AspNetCore.Mvc;

namespace DIFECMS.Web.Controllers.Configuration
{
    public class DesignationController : Controller
    {
        private readonly IDesignationFacade _designationFacade;

        public DesignationController(IDesignationFacade designationFacade)
        {
            _designationFacade = designationFacade;
        }
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult DesignationSave(Designation designation)
        {
            var user = User.Claims.ToList();
            designation.Creator = Convert.ToInt64(user[1].Value);
            if (ModelState.IsValid)
            {
                var result = _designationFacade.Save(designation);
                return Json(result);
            }
            return View();
        }

        public JsonResult GetDesignationData()
        {
            return Json(_designationFacade.Get());
        }
    }
}
