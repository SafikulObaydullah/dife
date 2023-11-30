using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Service.Contracts.Configuration;
using Microsoft.AspNetCore.Mvc;

namespace DIFECMS.Web.Controllers.Configuration
{
    public class CourtController : Controller
    {
        private readonly ICourtFacade _courtFacade;
        private readonly ICourtTypeFacade _courtTypeFacade;

        public CourtController(ICourtFacade courtFacade, ICourtTypeFacade courtTypeFacade)
        {
            _courtFacade = courtFacade;
            _courtTypeFacade = courtTypeFacade;
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult CourtSave(Court court)
        {
            var user = User.Claims.ToList();
            court.Creator = Convert.ToInt64(user[1].Value);
            if (ModelState.IsValid)
            {
                var result = _courtFacade.Save(court);
                return Json(result);
            }
            return View();
        }

        public JsonResult GetCourtAndCourtType()
        {
            var res = new
            {
                court = _courtFacade.Get(),
                courtType = _courtTypeFacade.Get()
            };
            return Json(res);
        }
    }
}
