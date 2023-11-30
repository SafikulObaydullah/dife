var GridData = []
var CaseCategoryList = [];
var CourtTypeList = [];
var CourtList = [];
var CaseTypeList = [];
var OfficeList = [];
var PersonList = [];


$(document).ready(function () {
    PopulateDropdown();
   
    $('#ex0').kendoExpansionPanel({
        title: 'Search Panel',
        expanded: true
    });
    $('#ex1').kendoExpansionPanel({
        title: 'Case Information',
        expanded: true
    });

    $("#cmbCourtType").kendoComboBox({
        dataTextField: "nameE",
        dataValueField: "id",
        dataSource: [],
        filter: "contains",
        suggest: true,
        placeholder: 'Select Court Type'
    });

    $("#cmbCaseCategory").kendoComboBox({
        dataTextField: "nameE",
        dataValueField: "id",
        dataSource: [],
        filter: "contains",
        suggest: true,
        placeholder: 'Select Category Type'
    });
    $("#cmbCaseType").kendoComboBox({
        dataTextField: "nameE",
        dataValueField: "id",
        dataSource: [],
        filter: "contains",
        suggest: true,
        placeholder: 'Select Court Type'
    });

    $("#cmbCourt").kendoComboBox({
        dataTextField: "nameE",
        dataValueField: "id",
        dataSource: [],
        filter: "contains",
        suggest: true,
        placeholder: 'Select Court'
    });
    $("#cmbConcPerson").kendoComboBox({
        dataTextField: "nameE",
        dataValueField: "id",
        dataSource: [],
        filter: "contains",
        suggest: true,
        placeholder: 'Select Person'
    });

    $("#cmbConcOffice").kendoComboBox({
        dataTextField: "officeName",
        dataValueField: "officeId",
        dataSource: [],
        filter: "contains",
        suggest: true,
        placeholder: 'Select Office'
    });
   
    $("#year").val('');
    $("#issueDateFrom").val('');
    $("#issueDateTo").val('');
    $(".Kyear").bind("focus", function () {
        $(this).data("kendoDatePicker").open();
    });
    $(".Kdatepicker").bind("focus", function () {
        $(this).data("kendoDatePicker").open();
    });
    $(".Kdatepicker").bind("focus", function () {
        $(this).data("kendoDatePicker").open();
    });
});

function PopulateDropdown() {
    $.ajax({
        url: "/CaseList/GetAllDropdown",
        method: "GET",
        dataType: "json",
        success: function (data) {
            CaseCategoryList = data.caseCategory;
            CourtTypeList = data.courtType;
            OfficeList = data.office;
            PersonList = data.person;
            CourtList = data.court;
            CaseTypeList = data.caseType;
            $("#cmbCourtType").data('kendoComboBox').dataSource.data(CourtTypeList);
            $("#cmbCaseCategory").data('kendoComboBox').dataSource.data(CaseCategoryList);
            $("#cmbCaseType").data('kendoComboBox').dataSource.data(CaseTypeList);
            $("#cmbCourt").data('kendoComboBox').dataSource.data(CourtList);
            $("#cmbConcPerson").data('kendoComboBox').dataSource.data(PersonList);
            $("#cmbConcOffice").data('kendoComboBox').dataSource.data(OfficeList);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error:", textStatus, errorThrown);
        }
    });
}


function ViewDetails() {
    var o = new Object();
    o.CaseNo = $("#caseNo").val();
    o.Year = $("#year").val();
    o.CourtTypeId = $("#cmbCourtType").data('kendoComboBox').value();
    o.CaseCategoryId = $("#cmbCaseCategory").data('kendoComboBox').value();
    o.CaseTypeId = $("#cmbCaseType").data('kendoComboBox').value();
    o.CourtId = $("#cmbCourt").data('kendoComboBox').value();
    o.ConcernedPersonId = $("#cmbConcPerson").data('kendoComboBox').value();
    o.ConcernedOfficeId = $("#cmbConcOffice").data('kendoComboBox').value();
    o.IssueDateFrom = $("#issueDateFrom").val();
    o.IssueDateTo = $("#issueDateTo").val();
    blockUI()
    $.ajax({
        url: "/Report/ReportSearchResult",
        method: "POST",
        dataType: "json",
        data: o,
        success: function (data) {
            unblockUI()
            GridData = data;
            GridBind();
        }
    });
    var caseNo = $("#caseNo").val()
    var year = $("#year").val()
    var CourtTypeId = $("#cmbCourtType").val()
    var Court = $("#cmbCourt").val()
    var CaseCategory = $("#cmbCaseCategory").val()
    var CaseType = $("#cmbCaseType").val()
    var issueDateFrom = $("#issueDateFrom").val()
    var issueDateTo = $("#issueDateTo").val()
    var ConcOffice = $("#cmbConcOffice").val()
    var ConcPerson = $("#cmbConcPerson").val()
    var url = '/Report/CaseListDetails?caseNo=' + caseNo + '&year=' + year + '&CourtTypeId=' + CourtTypeId + '&Court=' + Court + '&CaseCategory=' + CaseCategory + '&CaseType=' + CaseType + '&issueDateFrom=' + issueDateFrom + '&issueDateTo=' + issueDateTo + '&ConcOffice=' + ConcOffice + '&ConcPerson=' + ConcPerson;
    window.open(url, '_blank');
}



function GridBind() {
    var i = 1;
    _.map(GridData, function (o) {
        o.sl = i;
        i++;
    });
    /* console.log(GridData);*/

    var element = $("#tblCaseList").kendoGrid({
        dataSource: {
            data: GridData,
        },
        height: 450,
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
                    field: "nameE",
                    title: "Court Type",
                    width: 80
                },
                {
                    field: "caseNo",
                    title: "Case No",
                    width: 80
                },
                {
                    field: "caseSubject",
                    title: "Subject Case",
                    width: 150
                },
                {
                    field: "caseDescription",
                    title: "Title/Description",
                    width: 150
                },
                {
                    field: "id",
                    title: "Action",
                    template: "<button class='k-button info' onclick='Edit(\"#: id #\")'><span class='k-icon k-i-edit'></span></button><button class='k-button secondary' onclick='Report(\"#: id #\")'><span class='k-icon k-i-pdf'></span></button>",
                    width: 80
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

function ClearFields() {
    $("#caseNo").val('');
    $("#year").val('');
    $("#issueDateFrom").val('');
    $("#issueDateTo").val('');
    $("#cmbCourtType").data('kendoComboBox').value('');
    $("#cmbCaseCategory").data('kendoComboBox').value('');
    $("#cmbCourt").data('kendoComboBox').value('');
    $("#cmbCaseType").data('kendoComboBox').value('');
    $("#cmbConcPerson").data('kendoComboBox').value('');
    $("#cmbConcOffice").data('kendoComboBox').value('');
}
