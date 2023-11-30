
using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Service.Contracts.Configuration;
using DIFECMS.Service.Implementations.Configuration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DIFECMS.Web.Controllers.Configuration
{
    [Authorize]
    public class LawyerController : Controller
    {
        private readonly ILawyerFacade _lawyerFacade;
      private readonly IDistrictFacade _districtFacade;

      public LawyerController(ILawyerFacade lawyerFacade, IDistrictFacade districtFacade)
        {
              _lawyerFacade = lawyerFacade;
             _districtFacade = districtFacade;
      }
        public IActionResult Index()
        {
            return View();
        }

        public JsonResult GetLawyerData()
        {
         var res = new
         {
           
            lawyerdis = _lawyerFacade.GetLawyerWithDistrict(),
            district = _districtFacade.Get()
         };
            return Json(res);
        }
      public IActionResult LawyerSave(Lawyer lawyer)
      {
         var user = User.Claims.ToList();
         lawyer.Creator = Convert.ToInt64(user[1].Value);
         if (ModelState.IsValid)
         {
            var result = _lawyerFacade.Save(lawyer);
            return Json(result);
         }
         return View();
      }
   }
}
