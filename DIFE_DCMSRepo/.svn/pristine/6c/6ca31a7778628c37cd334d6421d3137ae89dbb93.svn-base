using DIFECMS.Common;
using DIFECMS.Domain;
using DIFECMS.Domain.Models;
using DIFECMS.Domain.ViewModel;
using DIFECMS.Domain.ViewModel.Case;
using DIFECMS.Domain.ViewModel.Dashboard;
using DIFECMS.Repository.Contracts;
using EntityFrameworkCore.RawSQLExtensions.Extensions;
using Microsoft.Data.SqlClient;
using System.Xml.Linq;

namespace DIFECMS.Repository.Implementations
{
    public class CaseRepository : ICaseRepository
    {
        private readonly DCMSDBContext _db;

        public CaseRepository(DCMSDBContext db)
        {
            _db = db;
        }
        public SaveVM Save(AddCaseVM caseInfo)
        {
            try
            {
                var ID = new SqlParameter { ParameterName = "ID", Value = caseInfo.ID };
                var CourtTypeID = new SqlParameter { ParameterName = "CourtTypeID", Value = caseInfo.CourtTypeID };
                var CourtID = new SqlParameter { ParameterName = "CourtID", Value = caseInfo.CourtID };
                var CaseCategoryID = new SqlParameter { ParameterName = "CaseCategoryID", Value = caseInfo.CaseCategoryID };
                var CaseNatureID = new SqlParameter { ParameterName = "CaseNatureID", Value = caseInfo.CaseNatureID };
                var CaseStatusID = new SqlParameter { ParameterName = "CaseStatusID", Value = caseInfo.CaseStatusID };
                var CasePriorityID = new SqlParameter { ParameterName = "CasePriorityID", Value = caseInfo.CasePriorityID };
                var CaseTypeID = new SqlParameter { ParameterName = "CaseTypeID", Value = caseInfo.CaseTypeID };
                var ConcernedOfficeID = new SqlParameter
                {
                    ParameterName = "ConcernedOfficeID",
                    Value = caseInfo.ConcernedOfficeID == 0 ? DBNull.Value : caseInfo.ConcernedOfficeID
                };
                var ConcernedPersonID = new SqlParameter { ParameterName = "ConcernedPersonID", Value = caseInfo.ConcernedPersonID };
                var CaseNo = new SqlParameter
                {
                    ParameterName = "CaseNo",
                    Value = caseInfo.CaseNo == null ? DBNull.Value : caseInfo.CaseNo
                };
                var CaseSubject = new SqlParameter
                {
                    ParameterName = "CaseSubject",
                    Value = caseInfo.CaseSubject == null ? DBNull.Value : caseInfo.CaseSubject
                };
                var Year = new SqlParameter
                {
                    ParameterName = "Year",
                    Value = caseInfo.Year
                };
                var IssueDate = new SqlParameter
                {
                    ParameterName = "IssueDate",
                    Value = caseInfo.IssueDate
                };
                var CasePetitioner = new SqlParameter
                {
                    ParameterName = "CasePetitioner",
                    Value = caseInfo.CasePetitioner == null ? DBNull.Value : caseInfo.CasePetitioner
                };
                var CaseDescription = new SqlParameter
                {
                    ParameterName = "CaseDescription",
                    Value = caseInfo.CaseDescription == null ? DBNull.Value : caseInfo.CaseDescription
                };
                var GovernmentLawyer = new SqlParameter
                {
                    ParameterName = "GovernmentLawyer",
                    Value = caseInfo.GovernmentLawyer == null ? DBNull.Value : caseInfo.GovernmentLawyer
                };
                var ReferenceCaseNo = new SqlParameter
                {
                    ParameterName = "ReferenceCaseNo",
                    Value = caseInfo.ReferenceCaseNo == null ? DBNull.Value : caseInfo.ReferenceCaseNo
                };
                var BackgroundOfCase = new SqlParameter
                {
                    ParameterName = "BackgroundOfCase",
                    Value = caseInfo.BackgroundOfCase == null ? DBNull.Value : caseInfo.BackgroundOfCase
                };
                var NextHearingDate = new SqlParameter
                {
                    ParameterName = "NextHearingDate",
                    Value = caseInfo.NextHearingDescription == null ? DBNull.Value : caseInfo.NextHearingDescription
                };

                var NextHearingDescription = new SqlParameter
                {
                    ParameterName = "NextHearingDescription",
                    Value = caseInfo.NextHearingDescription == null ? DBNull.Value : caseInfo.NextHearingDescription
                };
                var CaseSection = new SqlParameter
                {
                    ParameterName = "CaseSection",
                    Value = caseInfo.CaseSection == null ? DBNull.Value : caseInfo.CaseSection
                };
                var Creator = new SqlParameter { ParameterName = "Creator", Value = caseInfo.Creator };
                IEnumerable<CaseRespondentPersonOrOrg> CaseRespondentPersonList = caseInfo.CaseRespondentPersonList;
                IEnumerable<CaseRespondentOfficeVM> RespondentOfficeList = caseInfo.RespondentOfficeList;
                var child1Sxml = "";
                if (CaseRespondentPersonList != null)
                {
                    var childDataXml1 = new XElement("CaseRespondentPersonList", CaseRespondentPersonList.Select(x => new XElement("child",
                              new XElement("caseId", x.CaseId),
                              new XElement("categoryId", x.CategoryId),
                              new XElement("nameOfRespodent", x.NameOfRespondent),
                              new XElement("designation", x.Designation),
                              new XElement("address", x.Address),
                              new XElement("respondentAsId", x.RespondentAsId),
                              new XElement("establishmentInfo", x.TypeOfEstablishment)
               )));
                    child1Sxml = childDataXml1.ToString();
                }
                var child2Sxml = "";
                if (RespondentOfficeList != null)
                {
                    var childDataXml2 = new XElement("RespondentOfficeList", RespondentOfficeList.Select(x => new XElement("child",
                                   new XElement("caseId", x.CaseId),
                                   new XElement("officeId", x.OfficeId),
                                   new XElement("respondentTypeId", x.RespondentTypeId),
                                   new XElement("creator", x.Creator)
                    )));
                    child2Sxml = childDataXml2.ToString();
                }


                string SP = "InsertUpdateCaseInfo_sp " + caseInfo.ID + "," + caseInfo.CourtTypeID + "," + caseInfo.CourtID + ", " + caseInfo.CaseCategoryID + ","
                    + caseInfo.CaseNatureID + ", " + caseInfo.CaseStatusID + ", " + caseInfo.CasePriorityID + ", " + caseInfo.CaseTypeID + ","
                    + caseInfo.ConcernedOfficeID + ", " + caseInfo.ConcernedPersonID + ", N'" + caseInfo.CaseNo + "', N'" + caseInfo.CaseSubject + "', "
                    + caseInfo.Year + ", '" + caseInfo.IssueDate + "', N'" + caseInfo.CasePetitioner + "',N'" + caseInfo.CaseDescription + "',"
                    + caseInfo.GovernmentLawyer + ", N'" + caseInfo.ReferenceCaseNo + "', N'" + caseInfo.BackgroundOfCase + "'," + caseInfo.Creator +
                    ",'" + caseInfo.NextHearingDate + "', N'" + caseInfo.NextHearingDescription + "',N'" + caseInfo.CaseSection + "','" + child1Sxml + "','"
                    + child2Sxml + "','" + caseInfo.DateOfAssignedResponsibility + "'";

                var result = _db.Database.SqlQuery<SaveVM>(SP).FirstOrDefault();

                //var result = _db.Database.SqlQuery<SaveVM>("InsertUpdateCaseInfo_sp  @ID,@CourtTypeID,@CourtID," +
                //    "@CaseCategoryID,@CaseNatureID,@CaseStatusID,@CasePriorityID,@CaseTypeID,@ConcernedOfficeID," +
                //    "@ConcernedPersonID,@CaseNo,@CaseSubject,@Year,@IssueDate,@CasePetitioner,@CaseDescription,@PrincipalRespondent," +
                //    "@OtherRespondent,@IsDifeRespondent,@GovernmentLawyer,@ReferenceCaseNo,@BackgroundOfCase, @Creator, @NextHearingDate, @NextHearingDescription",
                //    ID, CourtTypeID, CourtID, CaseCategoryID, CaseNatureID, CaseStatusID, CasePriorityID, CaseTypeID,
                //    ConcernedOfficeID, ConcernedPersonID, CaseNo, CaseSubject, Year, IssueDate, CasePetitioner, CaseDescription, PrincipalRespondent,
                //    OtherRespondent, IsDifeRespondent, GovernmentLawyer, ReferenceCaseNo, BackgroundOfCase, Creator, NextHearingDate, NextHearingDescription).FirstOrDefault();

                if (result.IsSuccess == false)
                {
                    result.Code = (int)ProjectCodes.Error;
                }
                else
                {
                    result.Code = (int)ProjectCodes.Success;
                }
                var resultFinal = new SaveVM
                {
                    ID = result.ID,
                    IsSuccess = result.IsSuccess,
                    Code = result.Code,
                    Message = result.Message,
                };

                return resultFinal;
            }
            catch (Exception ex)
            {
                var result = new SaveVM
                {
                    ID = caseInfo.ID,
                    Code = (int)ProjectCodes.Error,
                    Message = ex.Message,
                    IsSuccess = false
                };
                return result;
            }
        }
        public SaveVM SaveCaseDocumentsData(CaseDocument o)
        {
            try
            {
                var SP = "CaseDocument_t_Insert_Update_SP " + o.id + "," + o.caseId + "," + o.doctypeid + ",'" + o.filetype + "','" + o.encryptionkey + "'," + o.Creator + ",N'" + o.description + "','" + o.issuedate + "'," + o.saveType + "";
                var result = _db.Database.SqlQuery<SaveVM>(SP).FirstOrDefault();
                if (result.IsSuccess == false)
                {
                    result.Code = (int)ProjectCodes.Error;
                }
                else
                {
                    result.Code = (int)ProjectCodes.Success;
                }
                var resultFinal = new SaveVM
                {
                    ID = result.ID,
                    IsSuccess = result.IsSuccess,
                    Code = result.Code,
                    Message = result.Message,
                };

                return resultFinal;
            }
            catch (Exception ex)
            {
                var result = new SaveVM
                {
                    Code = (int)ProjectCodes.Error,
                    Message = ex.Message,
                    IsSuccess = false
                };
                return result;
            }
        }
        public IEnumerable<Case> Get()
        {
            var parms = new SqlParameter("@ID", Convert.ToInt64(0));
            var results = _db.Database.SqlQuery<Case>("GetCase_sp", parms).ToList();
            return results;
        }
        public IEnumerable<CommonVM> GetCaseDocumentType()
        {
            var results = _db.Database.SqlQuery<CommonVM>("GetCaseDocumentTypes_SP").ToList();
            return results;
        }
        public IEnumerable<CaseDocument> GetCaseDocuments(Int64 CaseId)
        {
            var results = _db.Database.SqlQuery<CaseDocument>("GetDocumentsByCaseId_SP " + CaseId + "").ToList();
            return results;
        }
        public SaveVM DeleteCaseDocumet(Int64 DocumentId, Int64 UserId)
        {
            SaveVM ReturnObject = new SaveVM();
            try
            {
                var SP = "DeleteDocumentInfo_SP " + DocumentId + "," + UserId + "";
                ReturnObject = _db.Database.SqlQuery<SaveVM>(SP).FirstOrDefault();

            }
            catch (Exception ex)
            {
                ReturnObject.Code = (int)ProjectCodes.Error;
                ReturnObject.Message = ex.ToString();
            }
            return ReturnObject;

        }


        public CaseVM GetById(Int64 Id)
        {
            var result = _db.Database.SqlQuery<CaseVM>("GetCaseInfoById_sp " + Id + "").FirstOrDefault();
            return result;
        }
        public CardAndPriorityVM GetCardAndPriority(Int64 Id, Int64 ministryOrDeptId, Int64 office, Int64 UserType)
        {
            var result = _db.Database.SqlQuery<CardAndPriorityVM>("GetDashboardCardData_SP " + Id + "," + ministryOrDeptId + "," + office + "," + UserType + "").FirstOrDefault();
            return result;
        }

        public IEnumerable<CaseReferenceVM> GetReferenceByCaseNo(string caseNo)
        {
            var result = _db.Database.SqlQuery<CaseReferenceVM>("GetCaseIDAndSubjectByCaseNo_sp '" + caseNo + "'").ToList();
            return result;
        }
        public IEnumerable<MonthlyCaseSummary> GetMonthlyCaseSummary(Int64 caseCat, Int64 Creator)
        {
            var result = _db.Database.SqlQuery<MonthlyCaseSummary>("GetMonthlyCaseSummary_SP " + caseCat + "," + Creator + "").ToList();
            return result;
        }
        public IEnumerable<CaseDocument> GetFileEncbasicInfo(Int64 ID)
        {
            var result = _db.Database.SqlQuery<CaseDocument>("GetCaseDocumentsById_SP " + ID + "").ToList();
            return result;
        }

        public IEnumerable<GetRespondentOfficeVM> AddCaseRespondentOfficeData(CaseRespondentOfficeVM respondent)
        {
            var sp = "InsertUpdateCaseRespondentOffice_SP " + respondent.Id + "," + respondent.CaseId + "," + respondent.OfficeId + "," + respondent.RespondentTypeId + "," + respondent.Creator;
            var result = _db.Database.SqlQuery<GetRespondentOfficeVM>(sp).ToList();
            return result;
        }

        public IEnumerable<GetRespondentOfficeVM> GetRespondentOfficeData(Int64 caseId)
        {
            var result = _db.Database.SqlQuery<GetRespondentOfficeVM>("GetRespondentOffice_sp " + caseId).ToList();
            return result;
        }

        public IEnumerable<GetCaseRespondentPersonOrOrgVM> GetCaseRepondentPersonOrOrg(Int64 caseId)
        {
            var result = _db.Database.SqlQuery<GetCaseRespondentPersonOrOrgVM>("GetCaseRespondentPersonOrOrg_sp " + caseId).ToList();
            return result;
        }

        public IEnumerable<GetCaseRespondentPersonOrOrgVM> AddCaseRespondentPersonData(CaseRespondentPersonOrOrg personOrOrg)
        {
            string sp = "InsertUpdateCaseRespondentPersonOrORG_sp " + personOrOrg.Id + "," + personOrOrg.CaseId + "," + personOrOrg.CategoryId + ",N'"
                + personOrOrg.NameOfRespondent + "',N'" + personOrOrg.Designation + "',N'" + personOrOrg.Address + "',N'"
                + personOrOrg.TypeOfEstablishment + "'," + personOrOrg.RespondentAsId;
            var result = _db.Database.SqlQuery<GetCaseRespondentPersonOrOrgVM>(sp).ToList();
            return result;
        }

        public IEnumerable<GetCaseRespondentPersonOrOrgVM> DeleteRepondentPersonOrOrg(Int64 id, Int64 caseId)
        {
            var result = _db.Database.SqlQuery<GetCaseRespondentPersonOrOrgVM>("DeleteCaseRespondentPerson_sp " + id + ',' + caseId).ToList();
            return result;
        }
        public IEnumerable<GetRespondentOfficeVM> DeleteRespondentOffice(Int64 id, Int64 caseId)
        {
            var result = _db.Database.SqlQuery<GetRespondentOfficeVM>("DeleteCaseRespondentOffice_sp " + id + ',' + caseId).ToList();
            return result;

        }
    }
}
