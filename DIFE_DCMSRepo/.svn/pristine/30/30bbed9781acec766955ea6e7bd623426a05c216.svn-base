using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Service.Contracts.Configuration;
using Microsoft.AspNetCore.Mvc;

namespace DIFECMS.Web.Controllers.Configuration
{
    public class OfficeController : Controller
    {
        private readonly IOfficeFacade _officeFacade;
        private readonly IMinistryOrDepartmentFacade _ministryOrDepartmentFacade;

        public OfficeController(IOfficeFacade officeFacade, IMinistryOrDepartmentFacade ministryOrDepartmentFacade)
        {
            _officeFacade = officeFacade;
            _ministryOrDepartmentFacade = ministryOrDepartmentFacade;
        }
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult OfficeSave(Office office)
        {
            var user = User.Claims.ToList();
            office.Creator = Convert.ToInt64(user[1].Value);
            if (office != null)
            {
                var result = _officeFacade.Save(office);
                return Json(result);
            }
            return View();
        }
        public JsonResult GetUserBasedOfficeData(long id)
        {
            return Json(_officeFacade.GetUserBasedOffice(id));
        }
        public JsonResult GetOfficeData()
        {
            var res = new
            {
                office = _officeFacade.Get(),
                ministryOrDepartment = _ministryOrDepartmentFacade.Get()
            };
            return Json(res);
        }
    }
}
