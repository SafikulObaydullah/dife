using DIFECMS.Common.Enums;
using DIFECMS.Common.Security;
using DIFECMS.Domain.Models.Accounts;
using DIFECMS.Service.Contracts;
using DIFECMS.Service.Contracts.Configuration;
using DIFECMS.Web.Attributes;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Security.Claims;

namespace DIFECMS.Web.Controllers
{
    public class AccountController : Controller
    {
        IHttpContextAccessor Accessor;
        IConfiguration configurations;

        private readonly IAccountFacade _accountFacade;
        private readonly IOfficeFacade _officefacade;
        private readonly IMinistryOrDepartmentFacade _ministryordepartmentfacade;
        private readonly IUserTypeFacade _usertypefacade;
        private readonly IDesignationFacade _designationfacade;

        public AccountController(IConfiguration configuration, IAccountFacade accountFacade, IUserTypeFacade usertypefacade,
            IOfficeFacade officefacade, IMinistryOrDepartmentFacade ministryordepartmentfacade, IHttpContextAccessor _accessor,
            IDesignationFacade designationfacade)
        {
            _accountFacade = accountFacade;
            _usertypefacade = usertypefacade;
            _officefacade = officefacade;
            _designationfacade = designationfacade;
            _ministryordepartmentfacade = ministryordepartmentfacade;
            configurations = configuration;
            this.Accessor = _accessor;
        }
        JsonSerializerSettings camelCaseFormatter = new JsonSerializerSettings
        {
            ContractResolver = new CamelCasePropertyNamesContractResolver(),
            Formatting = Newtonsoft.Json.Formatting.Indented,
            PreserveReferencesHandling = PreserveReferencesHandling.Objects,
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
        };

        public IActionResult Index()
        {
            return View();
        }
        //[TokenAuthorize]
        public IActionResult Login()
        {
            //bool isAuthorized = Convert.ToBoolean(HttpContext.Items["isAuthorized"]);
            //if (isAuthorized == true) { return RedirectToAction("Index", "Home"); }
            return View();
        }

        [HttpPost]
        public IActionResult Login(Login o)
        {

            int usertype = 0;
            Int64 userid = 0;
            Int64 officeId = 0;
            Int64 ministryOrDepartmentId = 0;
            string name = "";
            string password = "";
            bool activestatus = false;

            o.Password = TextEncryptionDecryption.Encrypt(o.Password, configurations["EncryptionKeys:Key2"].ToString());
            var user = _accountFacade.GetAuthenticUserData(o).FirstOrDefault();
            if (user != null)
            {
                usertype = user.UserTypeId;
                userid = user.Id;
                name = user.Name.ToString();
                password = o.Password;
                officeId = user.OfficeId;
                ministryOrDepartmentId = user.MinistryOrDepartmentId;
                activestatus = user.isActive;
                var ExpiryTime = DateTime.Now.AddDays(1);
                var userauthorizetoken = "EN#" + userid + "#" + usertype + "#" + name + "#" + ExpiryTime.ToString("yyyy-MM-dd") + "#" +
                    password + "#" + activestatus + "#" + officeId + "#" + ministryOrDepartmentId;

                userauthorizetoken = TextEncryptionDecryption.Encrypt(userauthorizetoken, configurations["EncryptionKeys:Key4"].ToString());
                var claims = new[] {
                    new Claim("name", name),
                    new Claim("userid", userid.ToString()) ,
                    new Claim("userType", usertype.ToString()),
                    new Claim("officeid", officeId.ToString()),
                    new Claim("ministryOrDepartmentId", ministryOrDepartmentId.ToString())
                };
                var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

                HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity));

                return RedirectToAction("Index", "Home");
            }
            else
            {
                ViewBag.errormsg = "Wrong User Name or Password";
                return View();
            }
        }
        public IActionResult Logout()
        {
            Response.Cookies.Delete("_language");
            Response.Cookies.Delete("_userid");
            Response.Cookies.Delete("_usertype");
            Response.Cookies.Delete("_name");
            Response.Cookies.Delete("_userauthorizetoken");
            HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Login");
        }

        [HttpPost]
        public IActionResult Registration(LoginUser o)
        {
            var userReg = User.Claims.ToList();
            o.CreatorId = Convert.ToInt64(userReg[1].Value);
            o.Username = o.Email;

            if (o.Id == 0 && o.Password == "")//for new user if password empty consider phone no as password
            {
                o.Password = TextEncryptionDecryption.Encrypt(o.PhoneNo, configurations["EncryptionKeys:Key2"].ToString());
            }
            else if (o.Password != "" || o.Password != null)
            {
                o.Password = TextEncryptionDecryption.Encrypt(o.Password, configurations["EncryptionKeys:Key2"].ToString());
            }
            var user = _accountFacade.SaveUser(o).ToList();
            if (user[0].IsSuccess == true)
            {
                var result = new
                {
                    userdata = user,
                    statusmessage = enumStatus.Found.ToString(),
                    statuscode = ((int)enumStatus.Found)
                };
                var response = Json(JsonConvert.SerializeObject(result, camelCaseFormatter));
                return response;
            }
            else
            {
                var result = new
                {
                    userdata = user,
                    statusmessage = enumStatus.NotFound.ToString(),
                    statuscode = ((int)enumStatus.NotFound)
                };
                var response = Json(JsonConvert.SerializeObject(result, camelCaseFormatter));
                return response;
            }
        }

        public IActionResult GetUsermanagementPageAllData()
        {
            var userReg = User.Claims.ToList();
            var id = Int64.Parse(userReg[1].Value);
            var result = new
            {
                usertype = _usertypefacade.Get().ToList(),
                office = _officefacade.Get().ToList(),
                designation = _designationfacade.Get().ToList(),
                ministryordepartment = _ministryordepartmentfacade.Get().ToList(),
                user = _accountFacade.GetAllUserData(id).ToList(),
                statusmessage = enumStatus.NotFound.ToString(),
                statuscode = ((int)enumStatus.NotFound)
            };
            var response = Json(JsonConvert.SerializeObject(result, camelCaseFormatter));
            return response;
        }
    }
}
