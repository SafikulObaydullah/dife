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
var MinistryOrDepartmentId = getUrlParameter('MinistryOrDepartmentId');
$(document).ready(function () {
    $("#YearFrom").html(IssueYearFrom);
    $("#YearTo").html(IssueYearTo);
    var o = new Object();
    o.MinistryOrDepartmentId = MinistryOrDepartmentId;
    o.OfficeId = OfficeId;
    o.IssueYearFrom = IssueYearFrom;
    o.IssueYearTo = IssueYearTo;
    BindData(o);
});
function BindData(reportParm) {

    //blockUI()
    $.ajax({
        url: "/Report/SearchResult",
        method: "GET",
        dataType: "json",
        data: reportParm,
        success: function (data) {
            //unblockUI();

            if (data == '') {
                EmptyTableData();
            }
            OfficeAndCourtWiseReportList = [];
            OfficeAndCourtWiseReportList = JSON.parse(data);
            var groupByObj = _.groupBy(OfficeAndCourtWiseReportList, 'MinistryDeptName');
            $("#reportHtml").html('');
            var html = "";
            for (var i = 0; i < Object.keys(groupByObj).length; i++) {

                html += '<br/><b>Ministry/Department : </b>' + Object.keys(groupByObj)[i] + ' <table id="tblCourtWiseOffice_' + i + '" class="table-bordered table-responsive table-striped mt-2" style="width: 100% "></table > ';
                $("#reportHtml").html(html);


            }
            for (var i = 0; i < Object.keys(groupByObj).length; i++) {

                var reportData = groupByObj["" + Object.keys(groupByObj)[i] + ""];
                var ColumnHeads = Object.keys(reportData[0]);
                tempArray = [];
                tempArray = ColumnHeads.splice(2, ColumnHeads.length);
                FindCourt(reportData, i);

            }
        }
    });

}

function FindCourt(reportData, tIndex) {
    tempArray2 = [];
    for (let i = 0; i < tempArray.length; i++) {
        tempArray[i] = tempArray[i].split('#')[0];
    }
    tempArray2 = _.uniq(tempArray, function (itm) { return itm });

    TableBind(reportData, tIndex);
}

function TableBind(reportData, tIndex) {
    console.log(reportData);
    var html = '<thead>'
    html += '<tr>' +
        '<th style="min-width:50px" rowspan=2>SL</th>' +
        '<th style="min-width:50px;text-align:left;"  rowspan=2>Office</th>';

    for (let i = 0; i < tempArray2.length; i++) {
        var HeaderRow = tempArray2[i].split('|');
        var CourtTypeId = HeaderRow[1]
        html += '<th style="min-width: 50px" colspan=3> <span style="display:none" id="txtCourtType_' + i + '">' + CourtTypeId + '</span> ' + HeaderRow[0] + '</th>';
    }
    html += '<th style="min-width:50px"  rowspan=2>Office Total</th>' +
        "</tr>";
    html += "<tr>";

    for (let j = 0; j < tempArray2.length; j++) {
        html += '<th style="min-width: 50px">Closed</th>' + '<th style="min-width: 50px">Open</th>' + '<th style="min-width: 50px">Total</th>';
    }

    html += "</tr>";
    html += "</thead>"

    for (var k = 0; k < reportData.length; k++) {
        var Office = reportData[k].OfficeName.split('(');
        var Office_N = Office[1].split(')');
        var OfficeId = Office_N[0];

        var grandTotal = 0;
        html += '<tr>' +
            '<td>' + (k + 1) + '</td>' +
            '<td>' + Office[0] + '</td>';

        for (let l = 0; l < tempArray2.length; l++) {
            objopen = tempArray2[l] + '#Open';
            objclose = tempArray2[l] + '#Clos';
            objtotal = tempArray2[l] + '#Totl';

            //tempArray2 = _.filter(OfficeAndCourtWiseReportList, function (o) { return o.OfficeName });

            var open = reportData[k][objopen];
            var closed = reportData[k][objclose];
            var total = reportData[k][objtotal];
            grandTotal = +grandTotal + +total;

            html += '<td style="min-width: 50px; color: blue; text-decoration: underline;text-align:center;cursor:pointer; background: #d9e1f2" onclick="openDetailsReport(' + OfficeId + ',' + l + ',2)">' + closed +
                '</td>' + '<td style="min-width: 50px;color: blue; text-decoration: underline;text-align:center;cursor:pointer; background: #d9e1f2" onclick="openDetailsReport(' + OfficeId + ',' + l + ',1)">' + open + '</td>' +
                '<td style="min-width: 50px; color: blue; text-decoration: underline;text-align:center;cursor:pointer; background: #d9e1f2"  onclick="openDetailsReport(' + OfficeId + ',' + l + ',0)">' + total + '</td>';
        }
        html += '<td style="min-width:50px;color: blue; text-decoration: underline;text-align:center;cursor:pointer; background: #f8e5ac">' + grandTotal + '</td>' +
            "</tr>";
    }

    $("#tblCourtWiseOffice_" + tIndex).append(html);
}
function openDetailsReport(officeId, indexOfCourtType, caseStatus) {
    var txtCourtTypeName = "#txtCourtType_" + indexOfCourtType
    var CourtTypeId = $(txtCourtTypeName).html();
    var url = '/Report/OfficeAndCourtWiseReportViewDetail?OfficeId=' + officeId + '&CourtTypeId=' + parseInt(CourtTypeId) + '&CaseStatus=' + caseStatus + '&IssueYearFrom=' + $("#YearFrom").html() + '&IssueYearTo=' + $("#YearTo").html();
    window.open(url, '_blank');
}
function EmptyTableData() {
    $("#tblCourtWiseOffice").html('');
    var html = '<thead>' +
        '<tr>' +
        '<th style = "font-size:20px;background:#e2efda;color:#bb0000 !important;" colspan ="25">No Data Available</th>' +
        '</tr >' +
        '</thead'
    $("#tblCourtWiseOffice").append(html);
    return;
}