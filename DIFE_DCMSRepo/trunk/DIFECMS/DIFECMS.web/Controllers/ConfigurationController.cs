using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Service.Contracts.Configuration;
using Microsoft.AspNetCore.Mvc;

namespace DIFECMS.Web.Controllers
{
    public class ConfigurationController : Controller
    {

        // GET: Configuration
        public ActionResult Index()
        {
            ViewBag.userType = "1";
            return View();
        }
        public ActionResult MasterCategory()
        {
            ViewBag.userType = "1";
            return View();
        }
        public ActionResult Category()
        {
            ViewBag.userType = "1";
            return View();
        }
        public ActionResult Ministry()
        {
            ViewBag.userType = "1";
            return View();
        }

        public ActionResult Department()
        {
            ViewBag.userType = "1";
            return View();
        }
        public ActionResult Office()
        {
            ViewBag.userType = "1";
            return View();
        }
        public ActionResult CourtType()
        {
            ViewBag.userType = "1";
            return View();
        }
        public ActionResult Court()
        {
            ViewBag.userType = "1";
            return View();
        }
        public ActionResult CaseType()
        {
            ViewBag.userType = "1";
            return View();
        }
        public ActionResult CaseSubject()
        {
            ViewBag.userType = "1";
            return View();
        }
        public ActionResult Judgement()
        {
            ViewBag.userType = "1";
            return View();
        }
        public ActionResult Lawyer()
        {
            ViewBag.userType = "1";
            return View();
        }
        public ActionResult Others()
        {
            ViewBag.userType = "1";
            return View();
        }
    }

}
