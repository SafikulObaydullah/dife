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

var OfficeId = getUrlParameter('OfficeId');
var ReportType = getUrlParameter('ReportType');
$(document).ready(function () {
    if (ReportType == 1) {
        $('#reportTitle').html('Case List (Total Upcoming)');
    }
    else if (ReportType == 2) {
        $('#reportTitle').html('Case List (Hearing Date Pending)');
    }
    else if (ReportType == 3) {
        $('#reportTitle').html('Pending List (Case Activity Update)');
    }
    else if (ReportType == 4) {
        $('#reportTitle').html('Case List(My Upcoming)');
    }
    BindData();
});



function BindData() {
    var o = new Object();
    o.officeId = OfficeId;
    o.reportType = ReportType;
    blockUI()
    $.ajax({
        url: "/CaseList/DashboardCardReport",
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
        height: 1000,
        scrollable: {
            endless: true
        },
        columns:
            [
                {
                    field: "id",
                    title: "ID",
                    width: 5, hidden: true
                }, {
                    field: "sl",
                    title: "SL",
                    width: 15
                },
                {
                    field: "caseNo",
                    title: "Case No",
                    width: 40
                },
                {
                    field: "nameE",
                    title: "Court Type",
                    width: 50
                },

                {
                    field: "caseSubject",
                    title: "Subject Case",
                    width: 60
                },
                {
                    field: "casePriority",
                    title: "Priority",
                    width: 25
                },
                {
                    field: "issueDate",
                    title: "Issue Date",
                    template: "#= new Date(issueDate.toString()).getFullYear() == 1 ? '' :  moment(issueDate).format('MMM Do YYYY') #",
                    width: 30
                },
                {
                    field: "activityDate",
                    title: "Last Hearing Date",
                    template: "#= new Date(activityDate.toString()).getFullYear() == 1 ? '' :  moment(activityDate).format('MMM Do YYYY') #",
                    width: 30
                },
                {
                    field: "nextHearingDate",
                    title: "Next Hearing Date",
                    template: "#= new Date(nextHearingDate.toString()).getFullYear() == 1 ? '' :  moment(nextHearingDate).format('MMM Do YYYY') #",
                    width: 30
                },
                {
                    field: "id",
                    title: "Action",
                    template: "<button title='Update Activity' class='k-button secondary' onclick='ActivityUpdate(\"#: id #\")'><span class='k-icon k-i-plus'></span></button><button class='k-button secondary' onclick='Report(\"#: id #\")'><span class='k-icon k-i-pdf'></span></button>",
                    width: 45
                }
            ]
    });
}


function Edit(id) {
    var url = '/Case/Index?ID=' + id;
    window.open(url, '_blank');
}

function Report(id) {
    var url = '/Report/Index?ID=' + id;
    window.open(url, '_blank');
}
function ActivityUpdate(id) {
    var url = '/CaseActivityUpdateEntry/Index?ID=' + id;
    window.open(url, '_blank');
}