using Microsoft.AspNetCore.Mvc;

namespace DIFECMS.Web.Controllers
{
    public class CaseManagementController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult CaseEntry()
        {
            ViewBag.userType = "1";
            ViewBag.Message = "Case Entry";

            return View();
        }

        public ActionResult CaseList()
        {
            ViewBag.userType = "1";
            ViewBag.Message = "Case List.";

            return View();
        }
        public ActionResult CaseTransfer()
        {
            ViewBag.userType = "1";
            ViewBag.Message = "Case List.";

            return View();
        }
        public ActionResult CaseActivityUpdate()
        {
            ViewBag.userType = "1";
            ViewBag.Message = "Case List.";

            return View();
        }
        public ActionResult CaseActivityUpdateEntry()
        {
            ViewBag.userType = "1";
            ViewBag.Message = "Case Activity Update Entry.";

            return View();
        }
    }
}
