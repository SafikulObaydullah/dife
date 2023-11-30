using DIFECMS.Common.Enums;
using DIFECMS.Common.Security;
using DIFECMS.Domain.Models;
using DIFECMS.Domain.ViewModel;
using DIFECMS.Domain.ViewModel.Case;
using DIFECMS.Service.Contracts;
using DIFECMS.Service.Contracts.Configuration;
using DIFECMS.Web.Attributes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Dynamic;
using System.Security.Claims;

namespace DIFECMS.Web.Controllers.CaseManagement
{

    public class CaseController : Controller
    {
        private IHttpContextAccessor Accessor;
        private IWebHostEnvironment Environment;
        private readonly IAccountFacade _accountFacade;
        private readonly ILawyerFacade _lawyerFacade;
        private readonly ICourtTypeFacade _courtTypeFacade;
        private readonly ICourtFacade _courtFacade;
        private readonly ICaseCategoryFacade _caseCategoryFacade;
        private readonly ICaseNatureFacade _caseNatureFacade;
        private readonly ICaseStatusFacade _caseStatusFacade;
        private readonly ICaseTypeFacade _caseTypeFacade;
        private readonly IOfficeFacade _officeFacade;
        private readonly IConcernedPersonFacade _concernedPersonFacade;
        private readonly ICaseFacade _caseFacade;
        private readonly IMinistryOrDepartmentFacade _ministryordepartmentfacade;

        JsonSerializerSettings camelCaseFormatter = new JsonSerializerSettings
        {
            ContractResolver = new CamelCasePropertyNamesContractResolver(),
            Formatting = Newtonsoft.Json.Formatting.Indented,
            PreserveReferencesHandling = PreserveReferencesHandling.Objects,
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
        };

        public CaseController(ICourtTypeFacade courtTypeFacade, ICourtFacade courtFacade, ICaseCategoryFacade caseCategoryFacade,
            ICaseNatureFacade caseNatureFacade, ICaseStatusFacade caseStatusFacade, ICaseTypeFacade caseTypeFacade,
            IOfficeFacade officeFacade, IConcernedPersonFacade concernedPersonFacade, ICaseFacade caseFacade,
            IMinistryOrDepartmentFacade ministryordepartmentfacade, IHttpContextAccessor _accessor, IWebHostEnvironment _environment,
            IAccountFacade accountFacade, ILawyerFacade lawyerFacade)
        {
            _courtTypeFacade = courtTypeFacade;
            _courtFacade = courtFacade;
            _caseCategoryFacade = caseCategoryFacade;
            _caseNatureFacade = caseNatureFacade;
            _caseStatusFacade = caseStatusFacade;
            _caseTypeFacade = caseTypeFacade;
            _officeFacade = officeFacade;
            _concernedPersonFacade = concernedPersonFacade;
            _caseFacade = caseFacade;
            _ministryordepartmentfacade = ministryordepartmentfacade;
            this.Accessor = _accessor;
            Environment = _environment;
            _accountFacade = accountFacade;
            _lawyerFacade = lawyerFacade;
        }
        public IActionResult Index()
        {
            bool isAuthorized = Convert.ToBoolean(HttpContext.Items["isAuthorized"]);
            return View();
        }
        public IActionResult CaseSave(AddCaseVM caseInfo)
        {
            var user = User.Claims.ToList();
            bool isAuthorized = Convert.ToBoolean(HttpContext.Items["isAuthorized"]);
            caseInfo.Creator = Convert.ToInt64(user[1].Value);

            if (caseInfo != null)
            {
                var result = _caseFacade.Save(caseInfo);
                return Json(result);
            }
            return View();
        }
         public JsonResult GetLawyer()
         {
               var res = new
               {
                  caselawyer = _lawyerFacade.Get().Where(l => l.isActive == true)
               };
            return Json(res); 
         }
        public JsonResult GetAllCaseData(Int64 id)
        {
            var user = User.Claims.ToList();
            bool isAuthorized = Convert.ToBoolean(HttpContext.Items["isAuthorized"]);
            var Creator = Convert.ToInt64(user[1].Value);
            var res = new
            {
                casedata = _caseFacade.GetById(id),
                courtType = _courtTypeFacade.Get().Where(ct => ct.isActive == true),
                court = _courtFacade.Get().Where(c => c.isActive == true),
                caseCategory = _caseCategoryFacade.Get().Where(cc => cc.isActive == true),
                caseNature = _caseNatureFacade.Get().Where(cn => cn.isActive == true),
                caseStatus = _caseStatusFacade.Get().Where(cs => cs.isActive == true),
                caseType = _caseTypeFacade.Get().Where(ct => ct.isActive == true),
                documentType = _caseFacade.GetCaseDocumentType(),
                caseDocuments = _caseFacade.GetCaseDocuments(id),
                officeAndMinistryOrDepartment = _officeFacade.GetUserBasedOffice(Creator),
                concernedPerson = _accountFacade.GetAllUserData(Creator).Where(cp => cp.isActive == true).ToList(),
                loginUserOfficeId = Convert.ToInt64(user[3].Value),
                loginUserDepartmentId = Convert.ToInt64(user[4].Value),
                respondentDepartment = _ministryordepartmentfacade.Get().Where(rd => rd.isActive == true),
                respondentOffice = _officeFacade.Get().Where(o => o.isActive == true),
                CaseRespondentPerson = _caseFacade.GetCaseRepondentPersonOrOrg(id).Where(rp => rp.isActive == true),
                CaseRespondentOffice = _caseFacade.GetRespondentOfficeData(id).Where(ro => ro.isActive == true),
                lawyer = _lawyerFacade.Get().Where(l => l.isActive == true)
            };
            return Json(res);
        }
        public JsonResult GetCaseById(Int64 id)
        {
            var result = _caseFacade.GetById(id);
            result.CaseRespondentPerson = _caseFacade.GetCaseRepondentPersonOrOrg(id);
            result.CaseRespondentOffice = _caseFacade.GetRespondentOfficeData(id);
            var response = Json(JsonConvert.SerializeObject(result, camelCaseFormatter));
            return response;

        }

        public JsonResult DeleteRespondentPersonorOrg(long id, long caseId)
        {
            var result = _caseFacade.DeleteRepondentPersonOrOrg(id, caseId).Where(rp => rp.isActive == true);
            return Json(result);
        }
        public JsonResult DeleteRespondentOffice(long id, long caseid)
        {
            var result = _caseFacade.DeleteRespondentOffice(id, caseid).Where(ro => ro.isActive == true);
            return Json(result);
        }

        public JsonResult AddCaseRespondentOfficeData(CaseRespondentOfficeVM respondent)
        {
            var user = User.Claims.ToList();
            respondent.Creator = Convert.ToInt64(user[1].Value);
            var res = _caseFacade.AddCaseRespondentOfficeData(respondent).Where(ro => ro.isActive == true);
            return Json(res);
        }

        public JsonResult AddCaseRespondentPersonData(CaseRespondentPersonOrOrg personOrOrg)
        {
            var res = _caseFacade.AddCaseRespondentPersonData(personOrOrg).Where(rp => rp.isActive == true);
            return Json(res);
        }
        public IActionResult SaveCaseDocumentsData(CaseDocument o)
        {
            try
            {
                var user = User.Claims.ToList();
                var Creator = Convert.ToInt64(user[1].Value);
                var postedFiles = Request.Form.Files;
                AppDomain.CurrentDomain.SetData("DataDirectory", System.IO.Path.Combine(Environment.ContentRootPath, "App_Data"));
                string AppData_Directory = AppDomain.CurrentDomain.GetData("DataDirectory").ToString() + "\\";

                var res = new SaveVM();
                if (postedFiles.Count > 0)
                {
                    for (int i = 0; i < postedFiles.Count; i++)
                    {
                        string EncKey = Guid.NewGuid().ToString();
                        o.filetype = Path.GetExtension(postedFiles[i].FileName);
                        o.encryptionkey = EncKey;
                        o.Creator = Creator;
                        o.saveType = 1;
                        res = _caseFacade.SaveCaseDocumentsData(o);
                        if (res.IsSuccess == true)
                        {
                            string EncdataDir = AppData_Directory + "EncryptedCaseFiles\\";
                            if (!Directory.Exists(EncdataDir))
                            {
                                Directory.CreateDirectory(EncdataDir);
                            }

                            var fileName = "Case_" + o.caseId + "_" + o.doctypeid + "_" + res.ID + Path.GetExtension(postedFiles[i].FileName);
                            using (FileStream stream = new FileStream(System.IO.Path.Combine(EncdataDir, fileName), FileMode.Create))
                            {
                                postedFiles[i].CopyTo(stream);
                            }
                            FileEncryption.Encrypt(System.IO.Path.Combine(EncdataDir, fileName), System.IO.Path.Combine(EncdataDir, "Enc_" + fileName), EncKey);
                            System.IO.File.Delete(System.IO.Path.Combine(EncdataDir, fileName));
                        }
                    }
                }
                else
                {
                    o.filetype = "";
                    o.encryptionkey = "";
                    o.Creator = Creator;
                    o.saveType = 2;
                    res = _caseFacade.SaveCaseDocumentsData(o);
                }


                var result = new
                {
                    caseDocuments = _caseFacade.GetCaseDocuments(o.caseId),
                    data = res,
                    statusmessage = enumStatus.Found.ToString(),
                    statuscode = ((int)enumStatus.Found)
                };

                var response = Json(JsonConvert.SerializeObject(result, camelCaseFormatter));
                return response;
            }
            catch (Exception ex)
            {

                var result = new
                {
                    data = new SaveVM(),
                    statusmessage = ex.Message.ToString(),
                    statuscode = ((int)enumStatus.InternalServerError)
                };

                var response = Json(JsonConvert.SerializeObject(result, camelCaseFormatter));
                return response;
            }
        }
        public JsonResult DeleteCaseDocument(Int64 id, Int64 UserId)
        {
            SaveVM returnObject = new SaveVM();
            try
            {

                var user = User.Claims.ToList();
                var Creator = Convert.ToInt64(user[1].Value);
                if (Creator > 0)
                {
                    returnObject = _caseFacade.DeleteCaseDocument(id, Creator);

                }
                else
                {
                    returnObject.Code = 201;
                    returnObject.Message = "You are not Authorized";
                }
            }
            catch (Exception ex)
            {
                returnObject.Message = ex.Message.ToString();
                returnObject.Code = ((int)enumStatus.InternalServerError);
                returnObject.ID = 0;

            }
            var response = Json(JsonConvert.SerializeObject(returnObject, camelCaseFormatter));
            return response;



        }

        public IActionResult DownloadCaseDocumentById(Int64 ID)
        {
            var res = _caseFacade.GetFileEncbasicInfo(ID).ToList();
            AppDomain.CurrentDomain.SetData("DataDirectory", System.IO.Path.Combine(Environment.ContentRootPath, "App_Data"));
            string AppData_Directory = AppDomain.CurrentDomain.GetData("DataDirectory").ToString() + "\\";

            string extension = res[0].filetype;
            Int64 caseId = res[0].caseId;
            Int64 doctypeid = res[0].doctypeid;
            var fileName = "Enc_Case_" + caseId + "_" + doctypeid + "_" + ID + extension;
            string EncryptionKey = res[0].encryptionkey;

            string EncdataDir = AppData_Directory + "EncryptedCaseFiles\\";
            string FileLocation = EncdataDir + fileName;

            if (System.IO.File.Exists(FileLocation) == true)
            {
                CopyFileStream(EncdataDir, FileLocation);
                string Outpath = System.IO.Path.Combine(this.Environment.WebRootPath, "TemporaryFileStorage\\CaseDocFiles\\");
                if (!Directory.Exists(Outpath))
                {
                    Directory.CreateDirectory(Outpath);
                }
                FileEncryption.Decrypt(System.IO.Path.Combine(EncdataDir, "Dec_" + fileName), System.IO.Path.Combine(Outpath, fileName), EncryptionKey);
                System.IO.File.Delete(System.IO.Path.Combine(EncdataDir, "Dec_" + fileName));
            }
            res[0].encryptionkey = "";
            return Json(res);
        }

        public static string CopyFileStream(string outputDirectory, string inputFilePath)
        {
            FileInfo inputFile = new FileInfo(inputFilePath);
            using (FileStream originalFileStream = inputFile.OpenRead())
            {
                var fileName = Path.GetFileName(inputFile.FullName);
                var outputFileName = Path.Combine(outputDirectory, "Dec_" + fileName);
                using (FileStream outputFileStream = System.IO.File.Create(outputFileName))
                {
                    originalFileStream.CopyTo(outputFileStream);
                }
                return outputFileName;
            }
        }

        public JsonResult GetDashboardPageData()
        {
            var user = User.Claims.ToList();

            Int64 Creator = Convert.ToInt64(user[1].Value);
            Int64 UserType = Convert.ToInt64(user[2].Value);
            var officeAndMinistryOrDepartment = _officeFacade.GetUserBasedOffice(Creator);
            var caseType = _caseTypeFacade.Get();
            var casecategory = _caseCategoryFacade.Get();

            Int64 ministryOrDeptId = -1;
            Int64 office = -1;

            if (UserType == 1 || UserType == 2)
            {
                ministryOrDeptId = 0;
                office = 0;
            }
            else
            {
                var uniq = officeAndMinistryOrDepartment.GroupBy(x => x.MinistryOrDepartmentId).Select(y => y.First()).Distinct().ToList();

                if (uniq.Count == 1)
                {
                    ministryOrDeptId = uniq[0].MinistryOrDepartmentId;
                    var FData = officeAndMinistryOrDepartment.Where(x => x.MinistryOrDepartmentId == ministryOrDeptId).ToList();
                    if (FData.Count == 1)
                    {
                        office = FData[0].OfficeId;
                    }
                    else if (FData.Count > 1)
                    {
                        office = 0;
                    }
                }
                else if (uniq.Count > 1)
                {
                    ministryOrDeptId = 0;
                    office = 0;
                }
            }

            var cardAndPriority = _caseFacade.GetCardAndPriority(Creator, ministryOrDeptId, office, UserType);
            var monthlycasesummary = _caseFacade.GetMonthlyCaseSummary(0, Creator).ToList();
            var res = new
            {
                casecategory = casecategory,
                officeAndMinistryOrDepartment = officeAndMinistryOrDepartment,
                caseType = caseType,
                cardAndPriority = cardAndPriority,
                monthlycasesummary = monthlycasesummary,

            };
            return Json(res);
        }
        [HttpGet]
        public JsonResult GetDashboardPageDataByParam(Int64 ministryOrDeptId, Int64 office)
        {
            var user = User.Claims.ToList();
            Int64 Creator = Convert.ToInt64(user[1].Value);
            Int64 UserType = Convert.ToInt64(user[2].Value);

            var cardAndPriority = _caseFacade.GetCardAndPriority(Creator, ministryOrDeptId, office, UserType);
            var monthlycasesummary = _caseFacade.GetMonthlyCaseSummary(0, Creator).ToList();
            var res = new
            {
                cardAndPriority = cardAndPriority,
                monthlycasesummary = monthlycasesummary,

            };
            return Json(res);
        }
        public JsonResult GetMonthlyCaseSummaryByCategory(Int64 caseCat)
        {
            var user = User.Claims.ToList();
            Int64 Creator = Convert.ToInt64(user[1].Value);
            Int64 UserType = Convert.ToInt64(user[2].Value);

            var monthlycasesummary = _caseFacade.GetMonthlyCaseSummary(caseCat, Creator).ToList();
            var res = new
            {
                monthlycasesummary = monthlycasesummary,

            };
            return Json(res);
        }

        public JsonResult GetCaseIDAndSubjectByCaseNo(string caseNo)
        {
            var res = _caseFacade.GetReferenceByCaseNo(caseNo);
            return Json(res);
        }

    }
}
