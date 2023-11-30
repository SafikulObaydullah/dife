var CaseData;
var CaseDataList = [];
var ActivityList = [];
var CaseActivityList = [];
var CaseDocumentList = [];
var activityTypeText;
var validate = true;
var CaseNatureList = []

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

var CaseId = getUrlParameter('ID');


$(document).ready(function () {
    $('#ep1').kendoExpansionPanel({
        title: 'Case Activity',
        expanded: true
    });

    $('#ep2').kendoExpansionPanel({
        title: 'Attachment',
    });
    $("#ddlJudgementType").kendoComboBox({
        placeholder: "Select Judgement Type...",
        dataTextField: "nameE",
        dataValueField: "id",
        autoBind: false,
        dataSource: [],
    });
    $("#ddlDocumentType").kendoComboBox({
        placeholder: 'Select Document Type',
        dataTextField: "name",
        dataValueField: "id",
        dataSource: [],
        filter: "contains"
    });

    $(".Kdatepicker").bind("focus", function () {
        $(this).data("kendoDatePicker").open();
    });

    var JudgementComboList = $("#ddlJudgementType").data("kendoComboBox");
    JudgementComboList.wrapper.hide();
    $('#JudgementLabel').hide();

    $("#ddlActivityType").kendoComboBox({
        placeholder: "Select Activity Type...",
        dataTextField: "nameE",
        dataValueField: "id",
        autoBind: false,
        dataSource: [],
        change: function (e) {
            if ($('#ddlActivityType').data("kendoComboBox").text() == "Judgement") {
                var caseNatureTypeList = $("#ddlJudgementType").data("kendoComboBox");
                caseNatureTypeList.dataSource.data([]);
                caseNatureTypeList.dataSource.data(CaseNatureList);

                caseNatureTypeList.refresh();
                var caseNatureTypeList = $("#ddlJudgementType").data("kendoComboBox");
                caseNatureTypeList.wrapper.show();
                $('#JudgementLabel').show();
            }
            else {
                var JudgementComboList = $("#ddlJudgementType").data("kendoComboBox");
                JudgementComboList.wrapper.hide();
                $('#JudgementLabel').hide();
            }
        }

    });
    CaseId == undefined ? 0 : CaseId;
    CaseLoad(CaseId);
});


function CaseLoad(id) {
    $.ajax({
        url: "/CaseActivityUpdateEntry/GetCaseById?id=" + id,
        method: "GET",
        dataType: 'json',
        success: function (data) {
            console.log(data);
            CaseData = data.caseInfo;
            ActivityList = data.activity;
            documents = data.document;
            $('#ddlDocumentType').data('kendoComboBox').dataSource.data(documents)
            $("#ddlActivityType").data('kendoComboBox').dataSource.data(ActivityList);
            CaseActivityList = data.caseActivityByCaseId;
            CaseNatureList = data.caseNature;
            if (CaseData != null) {
                CaseDataList.push(CaseData);
            }
            CaseDocumentList = data.caseDocument;
            console.log(CaseActivityList);
            console.log(CaseDataList);
            BindInitialDDL();
            $("#caseNo").text(CaseDataList[0].caseNo);
            $("#subject").text(CaseDataList[0].caseSubject);
            $("#issueDate").text(moment(CaseDataList[0].issueDate).format('MM/DD/YYYY'));
            $("#court").text(CaseDataList[0].courtName);
            $("#caseType").text(CaseDataList[0].caseType);
            $("#respondent").text(CaseDataList[0].principalRespondent);
            $('#spanCaseID').text(CaseDataList[0].id);
            console.log($('#spanCaseID').text());
            ShowCaseActivities();
            ShowAttachments();
        }
    });
}

function ShowAttachments() {
    var attachmentHtml = '';
    for (var i = 0; i < CaseDocumentList.length; i++) {
        attachmentHtml += '<tr style="">' +
            '<td onclick="DownloadDocuments(' + CaseDocumentList[i].id + ')">' +
            '<input type="checkbox" class="k-checkbox" checked disabled /> ' +
            '<span style="color:blue;text-decoration:underline;cursor:pointer;">' + CaseDocumentList[i].docTypeName + '</span>' +
            '</td>' +
            '<td>' + (CaseDocumentList[i].issuedate == "0001-01-01T00_00_00" ? "" : moment(CaseDocumentList[i].issuedate).format('LL')) + '</td>' +
            '</tr>';
    }
    $('#attachmentTable tbody').append(attachmentHtml);
}

function ShowCaseActivities() {
    var html = '';
    var i = 1;
    for (i = 1; i <= CaseActivityList.length; i++) {
        html += '<div class="col-md-12">' +
            '<div class="flexbox mb-3">' +
            ' <div class="flexcard flexcardGreen">' +
            '   <span id="spanParentID" style="display:none">0</span>' +
            ' <div class="flexcardNumber flexcardNumberGreen" style="justify-content: space-between;">' + i + ' : ' + CaseActivityList[i - 1].activityName + '<button style="border-radius: 25px;" class="btn btn-warning me-2" onclick="Edit(' + CaseActivityList[i - 1].id + ')">Edit</button></div>' +
            '<div class="flex flexcardText" style="justify-content:left !important">' +
            ' <div class="row">' +
            ' <div class="col-md-2" style="text-align:right;">' +
            ' <p> <strong>Date </strong></p>' +
            '</div>' +
            '<div class="col-md-4">' +
            '<p> : ' + moment(CaseActivityList[i - 1].activityDate).format('MM/DD/YYYY') +
            '</p>' +
            '</div>' +
            '<div class="col-md-2" style="text-align:right;">' +
            '<p> <strong>Type </strong></p>' +
            '</div>' +
            '<div class="col-md-4">' +
            '<p> : ' + CaseActivityList[i - 1].caseType + '</p>' +
            '</div>' +
            '<div class="col-md-2" style="text-align:right;">' +
            '<p> <strong>Lawyer </strong></p>' +
            '</div>' +
            '<div class="col-md-4">' +
            '<p> : ' + CaseActivityList[i - 1].governmentLawyer + '</p>' +
            '</div>' +
            '<div class="col-md-6"></div>' +
            '<div class="col-md-2" style="text-align:right;">' +
            '<p> <strong>Description </strong></p>' +
            '</div>' +
            '<div class="col-md-10" style="margin-bottom: 10px;overflow-y: scroll;height: 100px;">' +
            '<p> : ' + CaseActivityList[i - 1].description +
            '</p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
    }
    $("#caseActivityCard").append(html);
}

function BindInitialDDL() {
    $(".Ktextarea").kendoTextArea({
        rows: 3,
        maxLength: 500,
        placeholder: "Enter your text here."
    });
}

function Save() {
    var o = new Object();
    validate = Validate();
    if (validate == true) {
        o.id = $('#spanParentID').html();
        o.caseId = CaseId;
        o.activityTypeId = $('#ddlActivityType').data("kendoComboBox").value();
        o.activityNatureId = 1;
        o.activityDate = $('#activityDate').val() == "" ? "" : moment($('#activityDate').val()).format('YYYY-MM-DD')
        if (o.activityDate == "") {
            popupNotification.warning('Enter Activity Date');
            return;
        }
        o.nextHearingDate = $('#nextHearingDate').val() == "" ? "" : moment($('#nextHearingDate').val()).format('YYYY-MM-DD')

        const date1 = new Date(moment($('#nextHearingDate').val()).format('YYYY-MM-DD'));
        const date2 = new Date(moment($('#activityDate').val()).format('YYYY-MM-DD'));

        if (date1 < date2) {
            popupNotification.warning('Hearing date cannot be smaller');
            return
        }

        o.description = $('#description').val();
        $.ajax({
            url: "/CaseActivityUpdateEntry/SaveCaseActivity",
            type: "POST",
            dataType: "json",
            data: o,
            success: function (data) {
                console.log(data.code);
                if (data.code == 200) {
                    popupNotification.success('Saved Successfully');
                    UpdateCaseActivity();

                } else {
                    popupNotification.error('Error Saving');
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                popupNotification.error('Error Saving');
            }
        });
        $('#mdlActivity').modal('hide')
    }
}

function UpdateCaseActivity() {
    $.ajax({
        url: "/CaseActivityUpdateEntry/GetCaseActivityByCaseId?id=" + CaseId,
        method: "GET",
        dataType: 'json',
        success: function (data) {
            console.log(data);
            CaseActivityList = data.caseActivityByCaseId;
            $("#caseActivityCard").html('');
            ShowCaseActivities();
        }
    });
}

function Edit(id) {
    $('#mdlActivity').modal('toggle');
    $('#spanParentID').html(id);
    var FilterData = _.filter(CaseActivityList, function (item) { return item.id == id });
    $('#ddlActivityType').data('kendoComboBox').value(FilterData[0].activityTypeId);
    $('#activityDate').val(moment(FilterData[0].activityDate).format('MM/DD/YYYY'));
    $('#nextHearingDate').val(moment(FilterData[0].nextHearingDate).format('MM/DD/YYYY'));
    $('#description').val(FilterData[0].description);
    if ($('#ddlActivityType').data("kendoComboBox").text() == "Judgement") {
        var caseNatureTypeList = $("#ddlJudgementType").data("kendoComboBox");
        caseNatureTypeList.dataSource.data([]);
        caseNatureTypeList.dataSource.data(CaseNatureList);
        caseNatureTypeList.refresh();
        var caseNatureTypeList = $("#ddlJudgementType").data("kendoComboBox");
        caseNatureTypeList.wrapper.show();
        $('#JudgementLabel').show();
    }
    else {
        var caseNatureTypeList = $("#ddlJudgementType").data("kendoComboBox");
        caseNatureTypeList.wrapper.hide();
        $('#JudgementLabel').hide();
    }
    console.log(FilterData);
}

function ViewDetails() {
    var url = '/Report/Index?ID=' + CaseId;
    window.open(url, '_blank');
}
//function Edit() {
//    $('#mdlActivity').modal('toggle')
//}
function AddActivity() {
    $('#spanParentID').html(0);
    $('#ddlActivityType').data('kendoComboBox').value('');
    $('#activityDate').val('');
    $('#nextHearingDate').val('');
    $('#description').val('');
    if (CaseActivityList.length > 0) {
        const maxId = Math.max(...CaseActivityList.map(obj => obj.id));
        var FilterData = _.filter(CaseActivityList, function (item) { return item.id == maxId });
        console.log(FilterData[0].nextHearingDate);
        if (FilterData[0].nextHearingDate == null || FilterData[0].nextHearingDate == "" || FilterData[0].nextHearingDate == "0001-01-01T00_00_00" || FilterData[0].nextHearingDate =="1900-01-01T00:00:00") {
            $('#activityDate').prop('disabled', false);
            $('#activityDate').data('kendoDatePicker').enable(true);
        }
        else {
            $('#activityDate').val(moment(FilterData[0].nextHearingDate).format('MM/DD/YYYY'));
            $('#activityDate').prop('disabled', true);
            $('#activityDate').data('kendoDatePicker').enable(false);
        }
    }


    $('#mdlActivity').modal('toggle')
}

function Validate() {
    if ($('#ddlActivityType').data('kendoComboBox').value() == "" || $('#ddlActivityType').data('kendoComboBox').selectedIndex == -1) {
        $('#ddlActivityType').focus();
        popupNotification.warning('Please input valid activity type');
        return false;
    }
    if ($('#activityDate').val() == "") {
        $('#activityDate').focus();
        popupNotification.warning('Please input activity date');
        return false;
    }
    if ($('#description').val() == "") {
        $('#description').focus();
        popupNotification.warning('Please input description');
        return false;
    }
    if ($('#ddlActivityType').data('kendoComboBox').text() == "Judgement") {
        if ($('#ddlJudgementType').data('kendoComboBox').value() == "" || $('#ddlJudgementType').data('kendoComboBox').selectedIndex == -1) {
            $('#ddlJudgementType').focus();
            popupNotification.warning('Please input valid judgment type');
            return false;
        }
    } else {
        if ($('#nextHearingDate').val() == "") {
            $('#nextHearingDate').focus();
            popupNotification.warning('Please input next hearing date');
            return false;
        }
    }
    return true;
}

function DownloadDocuments(id) {
    DownloadCaseDocumentById(id)
}