var GridData = []
function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

var CaseNo = getUrlParameter('caseNo');
var Year = getUrlParameter('year');
var CourtTypeID = getUrlParameter('CourtTypeId');
var CaseCategoryID = getUrlParameter('CaseCategory');
var CaseTypeID = getUrlParameter('CaseType');
var CourtID = getUrlParameter('Court');
var ConcernedPersonID = getUrlParameter('ConcPerson');
var ConcernedOfficeID = getUrlParameter('ConcOffice');
var IssueDateFrom = getUrlParameter('issueDateFrom');
var IssueDateTo = getUrlParameter('issueDateTo');

$(document).ready(function () {
    CaseNo == undefined ? 0 : CaseNo;
    CaseReportDetails();
    
});


function CaseReportDetails() {
    var obj = new Object();
    obj.CaseNo = CaseNo;
    obj.Year = Year;
    obj.CourtTypeId = CourtTypeID;
    obj.CaseCategoryID = CaseCategoryID;
    obj.CaseTypeID = CaseTypeID;
    obj.CourtID = CourtID;
    obj.ConcernedPersonID = ConcernedPersonID;
    obj.ConcernedOfficeID = ConcernedOfficeID;
    obj.IssueDateFrom = IssueDateFrom;
    obj.IssueDateTo = IssueDateTo;
    $.ajax({
        url: "/Report/ReportSearchResult",
        method: "GET",
        dataType: "json",
        data: obj,
        success: function (data) {
            GridData = data;
            if (GridData.length>0) {
                BindData();
            }
        },
        error: function (er) {
            console.log(er)
        }
    })
}

function BindData() {
    var result = GridData;
    $("#caseListReport tbody").empty();
    var sl = 1;
    for (var i = 0; i < result.length; i++) {
        var tempIssueDate = result[i].issueDate == '0001-01-01T00:00:00' || result[i].issueDate == '1900-01-01T00:00:00' ? ' ' : moment(result[i].issueDate).format('MMM Do YYYY');
        var tempActivityDate = result[i].activityDate == '0001-01-01T00:00:00' || result[i].activityDate == '1900-01-01T00:00:00' ? ' ' : moment(result[i].activityDate).format('MMM Do YYYY');
        var tempHearingDate = result[i].nextHearingDate == '0001-01-01T00:00:00' || result[i].nextHearingDate == '1900-01-01T00:00:00' ? ' ' : moment(result[i].nextHearingDate).format('MMM Do YYYY');
        var html = "<tr><td id='slNo' style='text-align:center;vertical-align:inherit;' onclick='Report("+result[i].id+")' >" + sl + "</td>" +
            "<td style='width:10%;text-align:left;'>" + result[i].caseNo + "</td>" +
            "<td style='width:10%;text-align:left;' > " + result[i].nameE + "</td> " +
            " <td style='width:30%;text-align:left;'> " + result[i].caseSubject + "</td>" +
            " <td style='width:10%;text-align:left;'> " + result[i].casePriority + "</td>" +
            " <td style='width:10%;text-align:left;'> " + tempIssueDate  + "</td>" +
            " <td style='width:10%;text-align:left;'> " + tempActivityDate + "</td>" +
            " <td style='width:10%;text-align:left;'> " + tempHearingDate + "</td>" +
            "</tr>";
            $("#caseListReport tbody").append(html)
            sl = sl + 1;
    }
}

function Report(id) {
    var url = '/Report/Index?ID=' + id;
    window.open(url, '_blank');
}