using DIFECMS.Domain.Models;
using DIFECMS.Service.Contracts;
using DIFECMS.Service.Contracts.Configuration;
using DIFECMS.Web.Attributes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DIFECMS.Web.Controllers.CaseManagement
{
    [Authorize]
    public class CaseListController : Controller
    {
        private readonly ICaseCategoryFacade _categoryFacade;
        private readonly ICourtTypeFacade _courtTypeFacade;
        private readonly ICaseListFacade _caseListFacade;
        private readonly ICourtFacade _courtFacade;
        private readonly ICaseTypeFacade _caseTypeFacade;
        private readonly IOfficeFacade _officeFacade;
        private readonly IConcernedPersonFacade _personFacade;
        public CaseListController(ICaseCategoryFacade categoryFacade, ICourtTypeFacade courtType,
            ICaseListFacade caseListFacade, ICourtFacade courtFacade, ICaseTypeFacade caseTypeFacade,
            IOfficeFacade officeFacade, IConcernedPersonFacade personFacade)
        {
            _categoryFacade = categoryFacade;
            _courtTypeFacade = courtType;
            _caseListFacade = caseListFacade;
            _courtFacade = courtFacade;
            _caseTypeFacade = caseTypeFacade;
            _officeFacade = officeFacade;
            _personFacade = personFacade;
        }
        public IActionResult Index()
        {
            return View();
        }

        public JsonResult GetAllDropdown()
        {
            var user = User.Claims.ToList();
            Int64 Creator = Convert.ToInt64(user[1].Value);
            bool isAuthorized = Convert.ToBoolean(HttpContext.Items["isAuthorized"]);
            var res = new
            {
                courtType = _courtTypeFacade.Get(),
                court = _courtFacade.Get(),
                caseCategory = _categoryFacade.Get(),
                caseType = _caseTypeFacade.Get(),
                office = _officeFacade.GetUserBasedOffice(Creator),
                person = _personFacade.Get(Creator),
            };
            return Json(res);
        }
        public IActionResult SearchResult(CaseListSearch caseListFilter)
        {
            var user = User.Claims.ToList();
            //bool isAuthorized = Convert.ToBoolean(HttpContext.Items["isAuthorized"]);
            var Creator = Convert.ToInt64(user[1].Value);
            caseListFilter.CreatorId = Creator;
            if (caseListFilter.CaseNo == null)
            {
                caseListFilter.CaseNo = "";
            }
            if (caseListFilter.IssueDateFrom == null)
            {
                caseListFilter.IssueDateFrom = "";
            }
            if (caseListFilter.IssueDateTo == null)
            {
                caseListFilter.IssueDateTo = "";
            }
            if (caseListFilter.CreationDateFrom == null)
            {
                caseListFilter.CreationDateFrom = "";
            }
            if (caseListFilter.CreationDateTo == null)
            {
                caseListFilter.CreationDateTo = "";
            }
            return Json(_caseListFacade.Get(caseListFilter));
        }
        public IActionResult DashboardCardReport(Int64 officeId, int reportType)
        {
            var user = User.Claims.ToList();
            bool isAuthorized = Convert.ToBoolean(HttpContext.Items["isAuthorized"]);
            Int64 Creator = Convert.ToInt64(user[1].Value);
            if (reportType == 1)
            {
                return Json(_caseListFacade.GetTotalUpcomingData(Creator, officeId));
            }
            else if (reportType == 2)
            {
                return Json(_caseListFacade.GethearingPendingData(Creator, officeId));
            }
            else if (reportType == 3)
            {
                return Json(_caseListFacade.GetCaseActivityUpdatePendingData(Creator, officeId));
            }
            else if (reportType == 4)
            {
                return Json(_caseListFacade.GetMyUpcomingData(Creator, officeId));
            }
            else
            {
                return Json("");
            }

        }
    }
}
