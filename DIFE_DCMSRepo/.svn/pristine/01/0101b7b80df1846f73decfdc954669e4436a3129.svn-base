using DIFECMS.Common.Security;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace DIFECMS.Web.Attributes
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class TokenAuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            IConfiguration config = (new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json").Build());
            string queryString = "";
            string connectionString = config["ConnectionStrings:conStr"].ToString();
            var EncToken = context.HttpContext.Request.Cookies["_userauthorizetoken"];

            if (EncToken == null || EncToken == "")
            {
                context.Result = new RedirectToRouteResult(
                new RouteValueDictionary
                {
                    {"action", "Login"},
                    {"controller", "Account"}
                });
            }
            else
            {

                var token = TextEncryptionDecryption.Decrypt(EncToken, config["EncryptionKeys:Key4"].ToString());
                if (token == "")
                {
                    context.HttpContext.Items["isAuthorized"] = false;
                    context.Result = new RedirectToRouteResult(
                    new RouteValueDictionary
                    {
                        {"action", "Login"},
                        {"controller", "Account"}
                    });
                }
                else
                {
                    var userId = token.Split("#")[1];
                    if (userId == null || userId == "")
                    {
                        context.HttpContext.Items["isAuthorized"] = false;
                        context.Result = new RedirectToRouteResult(
                        new RouteValueDictionary
                        {
                            {"action", "Login"},
                            {"controller", "Account"}
                        });
                    }
                    else
                    {
                        queryString = "select * from User_t where Id=" + userId + "";
                        var ReturnToken = CustomToken.GenerateUserAuthorizeTokenData(connectionString, queryString);

                        if (token.Trim() == ReturnToken.Trim())
                        {
                            context.HttpContext.Items["isAuthorized"] = true;
                            context.HttpContext.Items["language"] = token.Split("#")[0];
                            context.HttpContext.Items["userid"] = token.Split("#")[1];
                            context.HttpContext.Items["usertype"] = token.Split("#")[2];
                            context.HttpContext.Items["name"] = token.Split("#")[3];
                            context.HttpContext.Items["isactive"] = token.Split("#")[6];
                        }
                        else
                        {
                            context.HttpContext.Items["isAuthorized"] = false;
                            context.Result = new RedirectToRouteResult(
                            new RouteValueDictionary
                            {
                                {"action", "Login"},
                                {"controller", "Account"}
                            });
                        }
                    }
                }

            }
        }


    }
}
