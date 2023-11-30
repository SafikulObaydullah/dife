
using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Service.Contracts.Configuration;
using Microsoft.AspNetCore.Mvc;

namespace DIFECMS.Web.Controllers.Configuration
{
    public class DistrictController : Controller
    {
        private readonly IDistrictFacade _districtFacade;

        public DistrictController(IDistrictFacade districtFacade)
        {
            _districtFacade = districtFacade;
        }
        public JsonResult GetDistrictData()
        {
            return Json(_districtFacade.Get());
        }


    }
}
