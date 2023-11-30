using DIFECMS.web.Models;
using DIFECMS.Web.Attributes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace DIFECMS.web.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }
        [Authorize]
        public IActionResult Index()
        {
            var user = User.Claims.ToList();
            var UserName = user[0].Value;
            var UserId = user[1].Value;
            var UserType = user[2].Value;
            //bool isAuthorized = Convert.ToBoolean(HttpContext.Items["isAuthorized"]);
            //if (isAuthorized == false) { return RedirectToAction("Login", "Account"); }
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }
      public IActionResult HelpDesk()
      {
         return View();
      }
      [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}