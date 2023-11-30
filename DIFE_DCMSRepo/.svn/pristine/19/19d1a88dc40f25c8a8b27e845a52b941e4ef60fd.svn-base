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
var IssueYearFrom = getUrlParameter('IssueYearFrom');
var IssueYearTo = getUrlParameter('IssueYearTo');
var OfficeId = getUrlParameter('OfficeId');
var CourtTypeId = getUrlParameter('CourtTypeId');
var CaseStatus = getUrlParameter('CaseStatus');
$(document).ready(function () {
    //if (CourtTypeId == 1) {
    //    $('#reportTitle').html('Total Upcoming Case List');
    //}
    //else if (CourtTypeId == 2) {
    //    $('#reportTitle').html('Hearing Pending Case List');
    //}
    //else if (CourtTypeId == 3) {
    //    $('#reportTitle').html('Case Activity Update Pending List');
    //}
    //else if (CourtTypeId == 4) {
    //    $('#reportTitle').html('My Upcoming Case List');
    //}
    BindData();
});
function BindData() {
    var o = new Object();
    o.IssueYearFrom = IssueYearFrom == null ? '' : IssueYearFrom;
    o.IssueYearTo = IssueYearTo == null ? '' : IssueYearTo;
    o.officeId = OfficeId;
    o.CourtTypeId = CourtTypeId;
    o.CaseStatus = CaseStatus;
    blockUI()
    $.ajax({
        url: "/Report/OfficeAndCourtWiseReportDetails",
        method: "GET",
        dataType: "json",
        data: o,
        success: function (data) {
            unblockUI()
            GridData = data;
            GridBind();
        }
    });
}
function GridBind() {
    var i = 1;
    _.map(GridData, function (o) {
        o.sl = i;
        i++;
    });

    var element = $("#tblCaseList").kendoGrid({
        dataSource: {
            data: GridData,
        },
        height: 2000,
        scrollable: {
            endless: true
        },
        columns:
            [
                {
                    field: "id",
                    title: "ID",
                    width: 30, hidden: true
                }, {
                    field: "sl",
                    title: "SL No",
                    width: 50
                },
                {
                    field: "courtType",
                    title: "Court Type",
                    width: 100
                },
                {
                    field: "caseNo",
                    title: "Case No",
                    width: 100
                },
                {
                    field: "caseSection",
                    title: "Case Section",
                    width: 100
                },
                {
                    field: "caseSubject",
                    title: "Subject Case",
                    width: 100
                },
                {
                    field: "caseDescription",
                    title: "Title/Description",
                    width: 300
                },
                {
                    field: "id",
                    title: "Report",
                    template: "<button class='k-button secondary' onclick='Report(\"#: id #\")'><span class='k-icon k-i-pdf'></span></button>",
                    width: 80
                }
            ]
    });
}
function Report(id) {
    var url = '/Report/Index?ID=' + id;
    window.open(url, '_blank');
}