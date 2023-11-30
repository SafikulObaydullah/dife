using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Service.Contracts.Configuration;
using DIFECMS.Service.Implementations.Configuration;
using Microsoft.AspNetCore.Mvc;

namespace DIFECMS.Web.Controllers.Configuration
{
    public class MinistryOrDepartmentController : Controller
    {
        private readonly IMinistryOrDepartmentFacade _ministryOrDepartmentFacade;
        public MinistryOrDepartmentController(IMinistryOrDepartmentFacade ministryOrDepartmentFacade)
        {
            _ministryOrDepartmentFacade = ministryOrDepartmentFacade;
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult MinistryOrDepartmentSave(MinistryOrDepartment ministryOrDepartment)
        {
            var user = User.Claims.ToList();
            ministryOrDepartment.Creator = Convert.ToInt64(user[1].Value);
            if (ModelState.IsValid)
            {
                var result = _ministryOrDepartmentFacade.Save(ministryOrDepartment);
                return Json(result);
            }
            return View();
        }
        public JsonResult GetMinistryOrDepartmentData()
        {
            return Json(_ministryOrDepartmentFacade.Get());
        }
    }
}
