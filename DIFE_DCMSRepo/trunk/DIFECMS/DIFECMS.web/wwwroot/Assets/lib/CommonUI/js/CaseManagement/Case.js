﻿var CasePriorityList = [
    { id: 1, nameE: "High" },
    { id: 2, nameE: "Medium" },
    { id: 3, nameE: "Low" }]
var RespondentType = [
    { id: 1, name: "Principal" },
    { id: 2, name: "Co-respondent" },
]
var RespondentCategoryList = [
    {
        id: 1,
        name: "Person(ব্যক্তি)"
    },
    {
        id: 2,
        name: "Establishment (প্রতিষ্ঠান)"
    }
]
var CourtTypeList = []
var CourtList = []
var CaseCategoryList = []
var CaseTypeList = []
var CaseNatureList = []
var CaseStatusList = []
var OfficeList = []
var ConcernedPersonList = []
var CaseData;
var CaseDataList = []
var documents = [];
var CaseDocuments = [];
var CaseReference = [];
var ConcernedDepartment = [];
var RespondentOfficeList = [];
var RespondentDepartmentList = [];
var RespondentDeptWiseOfficeList = [];
var LawyerList = [];
var RespondentPersonList = [];
var issueDateVar;
var saveFlag = 1;
var CaseLawyerList = [];

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
    var fab = $("#fab").kendoFloatingActionButton({
        text: 'Save',
        positionMode: "fixed",
        alignOffset: {
            x: 30,
            y: 30
        },
        themeColor: "primary",
        size: "medium",
    }).data("kendoFloatingActionButton");
    $(function () {
        $("[data-role=combobox]").each(function () {
            var widget = $(this).getKendoComboBox();
            widget.input.on("focus", function () {
                widget.open();
            });
        });
    });
    $("#btnReport").hide();
    BindInitialDDL();
    CaseId = CaseId == undefined ? 0 : CaseId;
    if (CaseId <= 0) {
        //console.log(CaseId)
    }
    CaseDropdownsLoad(CaseId);
    $('#issueDate').val('');
    $('#txtNextHearingDate').val('');
    $(".Kdatepicker").bind("focus", function () {
        $(this).data("kendoDatePicker").open();
    });

    $("#issueDate").kendoDatePicker({
        change: function () {
            issueDateVar = this.value();
            $('#txtNextHearingDate').val('');
            SetMinimumDateForHearing();
        }
    });

    $("#ddlCaseRefNo").kendoAutoComplete({
        dataTextField: "subject",
        dataValueField: "caseId",
        minLength: 1,
        dataSource: {
            type: "json",
            serverFiltering: true,
            transport: {
                read:
                    function (options) {
                        //console.log(options)
                        $.ajax({
                            url: '/Case/GetCaseIDAndSubjectByCaseNo',
                            contentType: 'application/json',
                            data: { caseNo: (options.data.filter.filters.length == 0 ? '' : options.data.filter.filters[0].value) },
                            type: "Get",
                            xhrFields: {
                                withCredentials: true
                            },
                            crossDomain: true,
                            success: function (result) {
                                CaseReference = [];
                                CaseReference = result;
                                if (CaseReference == null || CaseReference == 'null') {
                                    let arrayObj = [{ "subject": "No Data Found" }];
                                    CaseReference = arrayObj;
                                }
                                options.success(CaseReference);
                            }
                        });
                    }
            }
        },
        change: function (e) {
            if (this.value() == '') {
                $("#referenceInfo").html("");
                console.log("Empty")
            }
            $("#referenceInfo").text("Subject: " + this.value());
            $("#caseReferenceID").html(this.value());

        }
    });

})
function onSelectStepper(e) {
    var index = e.step.options.index;
    if (index == 0) {
        $('#generalInfo').show();
        $('#attachments').hide();
    }
    else if (index == 1) {
        $('#generalInfo').hide();
        $('#attachments').show();
    }

}

function SetMinimumDateForHearing() {
    if ($('#issueDate').val() == '') {
        $("#txtNextHearingDate").kendoDatePicker({
            min: new Date()
        });
    } else {
        $("#txtNextHearingDate").kendoDatePicker({
            min: kendo.parseDate(issueDateVar)
        });
    }

}

function BindInitialDDL() {
    $("#tabstrip").kendoTabStrip({
        select: onTabSelect, change: function (x) {
            $('#tabstripofElements-1').css('height', '100%')
            $('#tabstripofElements-2').css('height', '100%')
        }
    });
    tabStrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
    tabStrip.select(0);
    $("#ddlCourtType").kendoComboBox({
        placeholder: 'Select Court Type',
        dataTextField: "nameE",
        dataValueField: "id",
        dataSource: [],
        filter: "contains",
        change: function () {
            if (this.dataItem() == undefined) {
                $("#ddlCourt").data('kendoComboBox').dataSource.data([]);
                $("#ddlCourt").data('kendoComboBox').value('');
                return;
            }
            var id = this.dataItem().id;
            var FilterData = _.filter(CourtList, function (item) { return item.courtTypeID == id });
            $("#ddlCourt").data('kendoComboBox').dataSource.data([]);
            $("#ddlCourt").data('kendoComboBox').dataSource.data(FilterData);
            $("#ddlCourt").data('kendoComboBox').focus();
            $("#ddlCourt").data('kendoComboBox').open();
            var FilterData2 = _.filter(CaseCategoryList, function (item) { return item.courtTypeID == id });
            $("#ddlCaseCategory").data('kendoComboBox').dataSource.data([]);
            $("#ddlCaseCategory").data('kendoComboBox').value('');
            $("#ddlCaseCategory").data('kendoComboBox').dataSource.data(FilterData2);
        }
    });
    $("#ddlCourt").kendoComboBox({
        placeholder: 'Select Court..',
        dataTextField: "nameE",
        dataValueField: "id",
        dataSource: [],
        filter: "contains",
    });
    $("#ddlConcernedDepartment").kendoComboBox({
        placeholder: 'Select Concerned Department',
        dataTextField: "ministryOrDepartmentName",
        dataValueField: "ministryOrDepartmentId",
        dataSource: [],
        filter: "contains",
        change: function () {

            if (this.dataItem() == undefined) {
                $("#ddlConOff").data('kendoComboBox').dataSource.data([]);
                $("#ddlConOff").data('kendoComboBox').value('');
                return;
            }
            var id = this.dataItem().ministryOrDepartmentId;
            var FilterData = _.filter(OfficeAndDepartmentList, function (item) { return item.ministryOrDepartmentId == id });
            $("#ddlConOff").data('kendoComboBox').dataSource.data([]);
            $("#ddlConOff").data('kendoComboBox').dataSource.data(FilterData);
            $("#ddlConOff").data('kendoComboBox').focus();
            $("#ddlConOff").data('kendoComboBox').open();
        }
    });

    $("#ddlCaseCategory").kendoComboBox({
        placeholder: 'Select Case Category',
        dataTextField: "nameE",
        dataValueField: "id",
        dataSource: [],
        filter: "contains",
        change: function () {
            if (this.dataItem() == undefined) {
                $("#ddlCaseType").data('kendoComboBox').dataSource.data([]);
                $("#ddlCaseType").data('kendoComboBox').value('');
                return;
            }
            var id = this.dataItem().id;
            var FilterData = _.filter(CaseTypeList, function (item) { return item.caseCategoryID == id });
            $("#ddlCaseType").data('kendoComboBox').dataSource.data([]);
            $("#ddlCaseType").data('kendoComboBox').dataSource.data(FilterData);
            $("#ddlCaseType").data('kendoComboBox').focus();
            $("#ddlCaseType").data('kendoComboBox').open();
        }
    });
    $("#ddlCaseType").kendoComboBox({
        placeholder: 'Select Case Type',
        dataTextField: "nameE",
        dataValueField: "id",
        dataSource: [],
        filter: "contains"
    });
    $("#ddlCasePriority").kendoComboBox({
        placeholder: 'Select Case Priority',
        dataTextField: "nameE",
        dataValueField: "id",
        dataSource: [],
        filter: "contains"
    });
    $("#ddlCaseNature").kendoComboBox({
        placeholder: 'Select Case Nature',
        dataTextField: "nameE",
        dataValueField: "id",
        dataSource: [],
        filter: "contains",
        change: function () {
            $('#caseNatureValue').html(this.value());
        }
    });
    $("#ddlCaseStatus").kendoComboBox({
        placeholder: 'Select Case Status',
        dataTextField: "nameE",
        dataValueField: "id",
        dataSource: [],
        filter: "contains"
    });
    $("#ddlConOff").kendoComboBox({
        placeholder: 'Select Concerned Office',
        dataTextField: "officeName",
        dataValueField: "officeId",
        dataSource: [],
        filter: "contains",
        change: function () {
            if (this.dataItem() == undefined) {
                $("#ddlConPer").data('kendoComboBox').dataSource.data([]);
                $("#ddlConPer").data('kendoComboBox').value('');
                return;
            }
            var id = this.dataItem().officeId;
            var FilterData = _.filter(ConcernedPersonList, function (item) { return item.officeId == id });
            for (var i = 0; i < FilterData.length; i++) {
                FilterData[i].concernedPersonOffice = FilterData[i].name + " (" + FilterData[i].officeName + ")";
            };
            $("#ddlConPer").data('kendoComboBox').dataSource.data([]);
            $("#ddlConPer").data('kendoComboBox').text("");
            $("#ddlConPer").data('kendoComboBox').dataSource.data(FilterData);
            $("#ddlConPer").data('kendoComboBox').focus();
            $("#ddlConPer").data('kendoComboBox').open();
        }
    });
    $("#ddlConPer").kendoComboBox({
        placeholder: 'Select Concerned Person',
        //dataTextField: "concernedPersonOffice",
        dataTextField: "name",
        dataValueField: "id",
        dataSource: [],
       filter: "contains"
    });
    $("#ddlDocumentType").kendoComboBox({
        placeholder: 'Select Document Type',
        dataTextField: "name",
        dataValueField: "id",
        dataSource: [],
        filter: "contains"
    });
    $("#ddlRespondentOffice").kendoComboBox({
        placeholder: 'Select Respondent Office',
        dataTextField: "nameE",
        dataValueField: "id",
        dataSource: [],
        filter: "contains"
    });
    $("#ddlRespondentType").kendoComboBox({
        placeholder: 'Select Respondent Type',
        dataTextField: "name",
        dataValueField: "id",
        dataSource: [],
        filter: "contains"
    });
    $("#ddlLawyer").kendoComboBox({
        placeholder: 'Select lawyer',
        dataTextField: "name",
        dataValueField: "id",
        dataSource: [],
        filter: "contains",
        select: function (e) {
            this.open();
            this.focus();
        }
    });
    $("#ddlRespondentCategory").kendoComboBox({
        placeholder: 'Select category',
        dataTextField: "name",
        dataValueField: "id",
        dataSource: RespondentCategoryList,
        filter: "contains",
        change: function () {
            this.value() == 1 ? $('#designationDiv').show() : $('#designationDiv').hide();
        }
    });
    $("#ddlRespondentDepartment").kendoComboBox({
        placeholder: 'Select Respondent Department',
        dataTextField: "nameE",
        dataValueField: "id",
        dataSource: [],
        filter: "contains",
        change: function () {

            if (this.dataItem() == undefined) {
                $("#ddlRespondentOffice").data('kendoComboBox').dataSource.data([]);
                $("#ddlRespondentOffice").data('kendoComboBox').value('');
                return;
            }
            var id = this.dataItem().id;
            var FilterData = _.filter(RespondentDeptWiseOfficeList, function (item) { return item.ministryOrDepartmentId == id });
            for (var i = 0; i < FilterData.length; i++) {
                FilterData[i].officeName = FilterData[i].nameE;
            };
            $("#ddlRespondentOffice").data('kendoComboBox').dataSource.data([]);
            $("#ddlRespondentOffice").data('kendoComboBox').dataSource.data(FilterData);
            $("#ddlRespondentOffice").data('kendoComboBox').focus();
            $("#ddlRespondentOffice").data('kendoComboBox').open();
        }
    });
    $("#ddlRespondentAs").kendoComboBox({
        placeholder: 'Select Repondent Type',
        dataTextField: "name",
        dataValueField: "id",
        dataSource: RespondentType,
        filter: "contains"
    });
}
function CaseDropdownsLoad(id) {
    blockUI();
    $.ajax({
        url: "/Case/GetAllCaseData?id=" + id,
        method: "GET",
        dataType: "json",
        success: function (data) {
            console.log(data);
            unblockUI();
            CourtTypeList = data.courtType;
            $("#ddlCourtType").data('kendoComboBox').dataSource.data(CourtTypeList);
            OfficeList = data.office;
            CourtList = data.court;
            CaseCategoryList = data.caseCategory;
            CaseNatureList = data.caseNature;
            $("#ddlCaseNature").data('kendoComboBox').dataSource.data(CaseNatureList);
            CaseStatusList = data.caseStatus;
            $("#ddlCaseStatus").data('kendoComboBox').dataSource.data(CaseStatusList);
            CaseTypeList = data.caseType;
            ConcernedPersonList = data.concernedPerson


            $("#ddlCasePriority").data('kendoComboBox').dataSource.data(CasePriorityList);

            OfficeAndDepartmentList = data.officeAndMinistryOrDepartment;
            var filterDepartmentData = _.uniq(OfficeAndDepartmentList, function (itm) { return itm.ministryOrDepartmentId, itm.ministryOrDepartmentName });
            $('#ddlConcernedDepartment').data('kendoComboBox').dataSource.data(filterDepartmentData)
           $("#ddlConcernedDepartment").data('kendoComboBox').value(data.loginUserDepartmentId);

            var FilterData = _.filter(OfficeAndDepartmentList, function (item) { return item.ministryOrDepartmentId == data.loginUserDepartmentId });
            $("#ddlConOff").data('kendoComboBox').dataSource.data([]);
            $("#ddlConOff").data('kendoComboBox').dataSource.data(FilterData);
           $("#ddlConOff").data('kendoComboBox').value(data.loginUserOfficeId);
           /*console.log(ConcernedPersonList);*/

           var FilterPersonData = _.filter(ConcernedPersonList, function (item) { return item.officeId == data.loginUserOfficeId });
           $("#ddlConPer").data('kendoComboBox').dataSource.data([]);
           $("#ddlConPer").data('kendoComboBox').dataSource.data(FilterPersonData);
           //for (var i = 0; i < FilterPersonData.length; i++) {
           //   $("#ddlConPer").data('kendoComboBox').value(FilterPersonData[i].id);
           //}
           

            CaseData = data.casedata;
            CaseDocuments = data.caseDocuments;
            DocumentType = data.documentType;
            $("#ddlDocumentType").data('kendoComboBox').dataSource.data(DocumentType);
            if (CaseData != null) {
                CaseDataList.push(CaseData)
                console.log(CaseDataList);
            }

            if (CaseDataList.length > 0) {
                BindParentData();
            }
            $("#gridCaseDocuments").hide();
            if (CaseDocuments.length > 0) {
                $("#gridCaseDocuments").show();
                BindDocumentGrid();
            }
            RespondentDepartmentList = data.respondentDepartment;
            $('#ddlRespondentDepartment').data('kendoComboBox').dataSource.data(RespondentDepartmentList);
            RespondentDeptWiseOfficeList = data.respondentOffice;


            LawyerList = data.lawyer;
            $('#ddlLawyer').data('kendoComboBox').dataSource.data(LawyerList);
            $('#ddlRespondentType').data('kendoComboBox').dataSource.data(RespondentType);
            RespondentPersonList = data.caseRespondentPerson;
            RespondentOfficeList = data.caseRespondentOffice;
            if (RespondentPersonList.length > 0) {
                RespondentPersonGridBind(RespondentPersonList);
            }
            if (RespondentOfficeList.length > 0) {
                RespondentGridBind(RespondentOfficeList);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            unblockUI();
            console.log("Error:", textStatus, errorThrown);
        }
    })
}


function onTabSelect(e) {
    $('#' + this.element[0].id).css('height', '100%');
    $("#mdlRespondentOffice").hide();
    if (e.item.id == 'tabstrip-tab-2') {
        if ($("#caseNatureValue").html() == 0) {
            popupNotification.warning('Please input case nature');
            $("#ddlCaseNature").data('kendoComboBox').focus();
            $("#ddlCaseNature").data('kendoComboBox').open();
            const myTabTimeout = setTimeout(myGreeting, 5000);
        }
        else if ($("#caseNatureValue").html() == 2) {
            $('#mdlRespondentOffice').show();
            //AddRespondent();
        }
        else if ($('#spanCaseID').html() <= 0) {

        }
        else {
            var o = new Object();
            o.id = -1;
            o.caseId = getUrlParameter('ID');
            o.officeId = 0;
            o.respondentTypeId = 0;
            o.creator = 0;
            //blockUI();
        }
    } else if (e.item.id == 'tabstrip-tab-3') {
        if ($('#spanCaseID').html() <= 0) {
            popupNotification.warning('Please save a case and then upload attachments.');
            const myTabTimeout = setTimeout(myGreeting, 5000);
        }
    }
}


function myTabStopFunction() {
    var tabStrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
    tabStrip.select(tabStrip.tabGroup.children("li").eq(0));
    clearTimeout(myTabTimeout);
}


function Save() {
    var o = new Object();
    var validate = true;
    var regExp = /\(([^)]+)\)/;
    var matches = regExp.exec($('#ddlCaseRefNo').val());
    var referenceCaseNo = 0;
    if (matches == null || matches == "" || matches == 0) {
        referenceCaseNo = 0;
    }
    else {
        referenceCaseNo = matches[1];
    }

    validate = Validate();
    if (validate == true && RespondentPersonList.length > 0) {
        o.id = $('#spanCaseID').html();
        o.CaseNo = $('#caseNo').val();
        o.year = moment($('#issueDate').val()).format('YYYY');
        o.courtTypeID = $('#ddlCourtType').data('kendoComboBox').value();
        o.courtID = $('#ddlCourt').data('kendoComboBox').value();
        o.caseCategoryID = $('#ddlCaseCategory').data('kendoComboBox').value();
        o.caseTypeID = $('#ddlCaseType').data('kendoComboBox').value();
        o.caseNatureID = $('#ddlCaseNature').data('kendoComboBox').value();
        o.caseStatusID = $('#ddlCaseStatus').data('kendoComboBox').value();
        o.caseSubject = $('#caseSubject').val();
        o.casePriorityID = $("#ddlCasePriority").data('kendoComboBox').value();
        o.issueDate = $('#issueDate').val() == "" ? "" : moment($('#issueDate').val()).format('YYYY-MM-DD');
        o.casePetitioner = $('#casePetitioner').val();
        o.caseDescription = $('#caseDescription').val();
        o.concernedDepartmentId = $('#ddlConcernedDepartment').data('kendoComboBox').value();
        o.concernedOfficeID = $('#ddlConOff').data('kendoComboBox').value();
        o.concernedPersonID = $('#ddlConPer').data('kendoComboBox').value();
        o.governmentLawyer = $('#ddlLawyer').data('kendoComboBox').value();
        o.referenceCaseNo = referenceCaseNo;
        o.backgroundOfCase = $('#backgroundOfCase').val();
        o.nextHearingDate = $('#txtNextHearingDate').val() == "" ? "" : moment($('#txtNextHearingDate').val()).format('YYYY-MM-DD');
        o.dateOfAssignedResponsibility = $('#dateOfResponsibility').val() == "" ? "" : moment($('#dateOfResponsibility').val()).format('YYYY-MM-DD');
        o.nextHearingDescription = $('#txtNextHearingDescription').val();
        o.caseSection = $('#txtCaseSection').val();
        if (o.id > 0) {
            o.CaseRespondentPersonList = [];
            o.RespondentOfficeList = [];
        }
        else {
            o.CaseRespondentPersonList = RespondentPersonList;
            o.RespondentOfficeList = RespondentOfficeList;
        }

        o.creator = o.id;
        blockUI();
        $.ajax({
            url: "/Case/CaseSave",
            type: "POST",
            dataType: "json",
            data: o,
            success: function (data) {
                unblockUI();

                if (data.code == 200) {
                    $('#spanCaseID').html(data.id)
                    kendo.confirm(data.message + ". Do you want to upload attachments?", {
                        messages: {
                            okText: "Ok",
                            cancel: "Cancel"
                        }
                    }).done(function () {
                       $("#tabstrip").kendoTabStrip().data("kendoTabStrip").select(2);
                       $("#fab").hide();

                    }).fail(function () {

                    });

                } else {
                    popupNotification.error(data.message);
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                unblockUI();
                popupNotification.error(data.message);
            }
        });
        $('#mdlUserReg').modal('hide')
    }
    else {
        if (validate == true) {
            popupNotification.warning('Please atleast enter one respondent for the case');
            $("#tabstrip").kendoTabStrip().data("kendoTabStrip").select(1);
        }
         if ($("#caseNatureValue").html() == 2) {
           $('#mdlRespondentOffice').show();
        }
    }
}

function DateValidator(s) {
    $(s).kendoValidator({
        rules: {
            dateValidation: function (element) {
                var value = $(element).val();
                var date = kendo.parseDate(value);
                if (!date) {
                    $(s).val('');
                    return false;
                }
                return true;
            }
        }
    })
}



function Validate() {
    //if ($('#issueDate').val() == "") {
    //    $('#issueDate').focus();
    //    popupNotification.warning('Please select issue date');
    //    return false;
    //}
    
    //if (!DateValidator('#issueDate')) {
    //    $('.k-form-error').hide();
    //    popupNotification.warning('Please enter valid date');
    //    return false;
    //} 

    if ($('#ddlCourtType').data('kendoComboBox').value() == "" || $("#ddlCourtType").data('kendoComboBox').selectedIndex == -1) {
       $("#ddlCourtType").data('kendoComboBox').focus();
       $("#ddlCourtType").data('kendoComboBox').open();
        popupNotification.warning('Please input court type');
        return false;
    }
    if ($('#ddlCourt').data('kendoComboBox').value() == "" || $("#ddlCourt").data('kendoComboBox').selectedIndex == -1) {
       $("#ddlCourt").data('kendoComboBox').focus();
       $("#ddlCourt").data('kendoComboBox').open();
        popupNotification.warning('Please input court');
        return false;
    }
    if ($('#ddlCaseCategory').data('kendoComboBox').value() == "" || $("#ddlCaseCategory").data('kendoComboBox').selectedIndex == -1) {
       $("#ddlCaseCategory").data('kendoComboBox').focus();
       $("#ddlCaseCategory").data('kendoComboBox').open();
        popupNotification.warning('Please input valid case category');
        return false;
    }
    if ($('#ddlCaseType').data('kendoComboBox').value() == "" || $("#ddlCaseType").data('kendoComboBox').selectedIndex == -1) {
       $("#ddlCaseType").data('kendoComboBox').focus();
       $("#ddlCaseType").data('kendoComboBox').open();
        popupNotification.warning('Please input valid case type');
        return false;
   }
   
   var dateValue = $('#issueDate').val();
   var isValidDate = moment(dateValue).isValid();
   if (!isValidDate) {
      $('#issueDate').focus();
      popupNotification.warning('Please enter valid Date');
      return false;
   }
   if ($('#txtCaseSection').val() == "") {
      $('#txtCaseSection').focus();
      popupNotification.warning('Please input case Section');
      return false;
   }
   if ($('#txtCaseSection').val().length > 200) {
      $('#txtCaseSection').focus();
      popupNotification.warning('Please limit you case Section below 200 characters');
      return false;
   }
    if ($('#ddlCaseNature').data('kendoComboBox').value() == "" || $("#ddlCaseNature").data('kendoComboBox').selectedIndex == -1) {
       $("#ddlCaseNature").data('kendoComboBox').focus();
       $("#ddlCaseNature").data('kendoComboBox').open();
        popupNotification.warning('Please input valid case nature');
        return false;
    }
    if ($('#caseSubject').val() == "") {
       $('#caseSubject').focus();
      popupNotification.warning('Please input case subject');
      return false;
    }
   if ($('#caseSubject').val().length > 500) {
       $('#caseSubject').focus();
       popupNotification.warning('Please limit you case subject below 500 characters');
       return false;
    }
    if ($('#casePetitioner').val() == "") {
      $('#casePetitioner').focus();
      popupNotification.warning('Please input case petitioner');
      return false;
    }
    if ($('#casePetitioner').val().length > 500) {
      $('#casePetitioner').focus();
      popupNotification.warning('Please limit you case petitioner below 500 characters');
      return false;
    }
    if ($('#caseDescription').val() == "") {
      $('#caseDescription').focus();
      popupNotification.warning('Please input case description');
      return false;
    }
    if ($('#caseDescription').val().length > 500) {
      $('#caseDescription').focus();
      popupNotification.warning('Please limit you case description below 500 characters');
      return false;
    }
    if ($('#ddlCaseStatus').data('kendoComboBox').value() == "" || $("#ddlCaseStatus").data('kendoComboBox').selectedIndex == -1) {
       $("#ddlCaseStatus").data('kendoComboBox').focus();
       $("#ddlCaseStatus").data('kendoComboBox').open();
        popupNotification.warning('Please input valid case status');
        return false;
    }
    if ($('#ddlCasePriority').data('kendoComboBox').value() == "" || $("#ddlCasePriority").data('kendoComboBox').selectedIndex == -1) {
       $("#ddlCasePriority").data('kendoComboBox').focus();
       $("#ddlCasePriority").data('kendoComboBox').open();
        popupNotification.warning('Please input valid case priority');
        return false;
    }
    if ($('#ddlLawyer').data('kendoComboBox').value() == "" || $("#ddlLawyer").data('kendoComboBox').selectedIndex == -1) {
      $("#ddlLawyer").data('kendoComboBox').focus();
      $("#ddlLawyer").data('kendoComboBox').open();
      popupNotification.warning('Please input valid case priority');
      return false;
   }
   if (($('#ddlRespondentCategory').data('kendoComboBox').value() == "" || $("#ddlRespondentCategory").data('kendoComboBox').selectedIndex == -1) && ($('#ddlLawyer').data('kendoComboBox').value() != "" || $("#ddlLawyer").data('kendoComboBox').selectedIndex != -1)) {
      $("#tabstrip").kendoTabStrip().data("kendoTabStrip").select(1);
      $("#ddlRespondentCategory").data('kendoComboBox').focus();
      $("#ddlRespondentCategory").data('kendoComboBox').open();
      popupNotification.warning('Please input valid case category');
      return false;
   }
   if ($('#txtRespondentName').val() == "") {
      $('#txtRespondentName').focus();
      popupNotification.warning('Please input Respondent Name');
      return false;
   }
   if ($('#txtRespondentName').val().length > 200) {
      $('#txtRespondentName').focus();
      popupNotification.warning('Please limit you Respondent Name below 200 characters');
      return false;
   }
   if ($('#ddlRespondentCategory').data('kendoComboBox').value() == 1 && $('#txtDesignation').val() == "") {
      $('#txtDesignation').focus();
      popupNotification.warning('Please input designation');
      return false;
   }
   if ($('#txtAddress').val() == "") {
      $('#txtAddress').focus();
      popupNotification.warning('Please input Address');
      return false;
   }
   if ($('#txtAddress').val().length > 200) {
      $('#txtAddress').focus();
      popupNotification.warning('Please limit you Address below 200 characters');
      return false;
   }
   if ($('#txtEstablishmentInfo').val() == "") {
      $('#txtEstablishmentInfo').focus();
      popupNotification.warning('Please input EstablishmentInfo');
      return false;
   }
   if ($('#txtEstablishmentInfo').val().length > 200) {
      $('#txtEstablishmentInfo').focus();
      popupNotification.warning('Please limit you EstablishmentInfo below 200 characters');
      return false;
   }
   if ($('#ddlRespondentAs').data('kendoComboBox').value() == "" || $("#ddlRespondentAs").data('kendoComboBox').selectedIndex == -1) {
      $("#ddlRespondentAs").data('kendoComboBox').focus();
      $("#ddlRespondentAs").data('kendoComboBox').open();
      popupNotification.warning('Please input valid Respondent As');
      return false;
   }
   if (($('#ddlConcernedDepartment').data('kendoComboBox').value() == "" || $("#ddlConcernedDepartment").data('kendoComboBox').selectedIndex == -1) && ($('#ddlRespondentAs').data('kendoComboBox').value() != "" || $("#ddlRespondentAs").data('kendoComboBox').selectedIndex != -1)) {
      $("#ddlConcernedDepartment").data('kendoComboBox').focus();
      $("#ddlConcernedDepartment").data('kendoComboBox').open();
      popupNotification.warning('Please input valid Respondent Department');
      return false;
   }
   if ($('#ddlConOff').data('kendoComboBox').value() == "" || $("#ddlConOff").data('kendoComboBox').selectedIndex == -1) {
      $("#ddlConOff").data('kendoComboBox').focus();
      $("#ddlConOff").data('kendoComboBox').open();
      popupNotification.warning('Please input valid Office');
      return false;
   }
   if ($('#ddlConPer').data('kendoComboBox').value() == "" || $("#ddlConPer").data('kendoComboBox').selectedIndex == -1) {
      $("#ddlConPer").data('kendoComboBox').focus();
      $("#ddlConPer").data('kendoComboBox').open();
      popupNotification.warning('Please input valid Person');
      return false;
   }
   var dte = $('#dateOfResponsibility').val();
   var isValidate = moment(dte).isValid();
   if (!isValidate) {
      $('#dateOfResponsibility').focus();
      popupNotification.warning('Please enter valid date of responsibility');
      return false;
   }
  
   //var inputDate = $('#txtNextHearingDate').val();
   //var isValidate = moment(inputDate).isValid();
   //if (!isValidate) {
   //   $('#txtNextHearingDate').focus();
   //   popupNotification.warning('Please enter valid hearing date');
   //   return false;
   //}
    return true;
}

function ClearFields() {
    $('#spanCaseID').html(0);
    $('#caseNo').val("");
    $("#ddlCourtType").data('kendoComboBox').value('');
    $("#ddlCourt").data('kendoComboBox').value('');
    $("#ddlCaseCategory").data('kendoComboBox').value('');
    $("#ddlCaseType").data('kendoComboBox').value('');
    $("#ddlCaseNature").data('kendoComboBox').value('');
    $("#ddlCaseStatus").data('kendoComboBox').value('');
    $("#ddlCasePriority").data('kendoComboBox').value('');
    $('#caseSubject').val("");
    $('#issueDate').val("");
    $('#casePetitioner').val("");
    $('#caseDescription').val("");
    $('#principalRespondent').val("");
    $('#otherRespondent').val("");
    $("#ddlConOff").data('kendoComboBox').value('');
    $("#ddlConPer").data('kendoComboBox').value('');
    $('#governmentLawyer').val("");
    $('#refCaseNo').val("");
    $('#backgroundOfCase').val("");
    $('#txtCaseSection').val("");
}

function BindParentData() {
    $('#spanCaseID').html(CaseDataList[0].id)
    $('#caseNo').val(CaseDataList[0].caseNo)
    //$('#year').val(CaseDataList[0].year)
    $("#ddlCourtType").data('kendoComboBox').value(CaseDataList[0].courtTypeID);


    var FilterData = _.filter(CourtList, function (item) { return item.courtTypeID == CaseDataList[0].courtTypeID });
    $("#ddlCourt").data('kendoComboBox').dataSource.data([]);
    $("#ddlCourt").data('kendoComboBox').dataSource.data(FilterData);
    $("#ddlCourt").data('kendoComboBox').value(CaseDataList[0].courtID);

    var FilterData2 = _.filter(CaseCategoryList, function (item) { return item.courtTypeID == CaseDataList[0].courtTypeID });
    $("#ddlCaseCategory").data('kendoComboBox').dataSource.data([]);
    $("#ddlCaseCategory").data('kendoComboBox').value('');
    $("#ddlCaseCategory").data('kendoComboBox').dataSource.data(FilterData2);
    $("#ddlCaseCategory").data('kendoComboBox').value(CaseDataList[0].caseCategoryID);


    var FilterData = _.filter(CaseTypeList, function (item) { return item.caseCategoryID == CaseDataList[0].caseCategoryID });
    $("#ddlCaseType").data('kendoComboBox').dataSource.data([]);
    $("#ddlCaseType").data('kendoComboBox').dataSource.data(FilterData);
    $("#ddlCaseType").data('kendoComboBox').value(CaseDataList[0].caseTypeID);
    $("#caseNatureValue").html(CaseDataList[0].caseNatureID);
    $("#ddlCaseNature").data('kendoComboBox').value(CaseDataList[0].caseNatureID);
    $("#ddlCaseStatus").data('kendoComboBox').value(CaseDataList[0].caseStatusID);
    $("#ddlCasePriority").data('kendoComboBox').value(CaseDataList[0].casePriorityID);
    $('#caseSubject').val(CaseDataList[0].caseSubject);
    CaseDataList[0].isDifeRespondent == false ? $('#isDifeRespondent').prop('checked', false) : $('#isDifeRespondent').prop('checked', true)
    $('#issueDate').val(moment(CaseDataList[0].issueDate).format('MM/DD/YYYY'));
    $('#casePetitioner').val(CaseDataList[0].casePetitioner);
    $('#caseDescription').val(CaseDataList[0].caseDescription);
    $('#principalRespondent').val(CaseDataList[0].principalRespondent);
    $('#otherRespondent').val(CaseDataList[0].otherRespondent);
    $("#ddlConcernedDepartment").data('kendoComboBox').value(CaseDataList[0].concernedDepartmentID);
    var FilterData = _.filter(OfficeAndDepartmentList, function (item) { return item.ministryOrDepartmentId == CaseDataList[0].concernedDepartmentID });
    $("#ddlConOff").data('kendoComboBox').dataSource.data([]);
    $("#ddlConOff").data('kendoComboBox').dataSource.data(FilterData);
    $("#ddlConOff").data('kendoComboBox').value(CaseDataList[0].concernedOfficeID);

    var FilterData = _.filter(ConcernedPersonList, function (item) { return item.officeId == CaseDataList[0].concernedOfficeID });
    for (var i = 0; i < FilterData.length; i++) {
        FilterData[i].concernedPersonOffice = FilterData[i].name + " (" + FilterData[i].officeName + ")";
    };
    $("#ddlConPer").data('kendoComboBox').dataSource.data([]);
    $("#ddlConPer").data('kendoComboBox').text("");
    $("#ddlConPer").data('kendoComboBox').dataSource.data(FilterData);



    $("#ddlConPer").data('kendoComboBox').value(CaseDataList[0].concernedPersonID);
    $('#ddlLawyer').data('kendoComboBox').value(CaseDataList[0].governmentLawyerId);
    $('#ddlCaseRefNo').val(CaseDataList[0].caseReference);
    $('#backgroundOfCase').val(CaseDataList[0].backgroundOfCase);
    $('#txtNextHearingDate').val(CaseDataList[0].nextHearingDate == "0001-01-01T00:00:00" ? "" : moment(CaseDataList[0].nextHearingDate).format('MM/DD/YYYY'));
    $('#txtNextHearingDescription').val(CaseDataList[0].nextHearingDescription);
    $('#txtNextHearingDate').attr('disabled', 'disabled');
    $('#txtNextHearingDescription').attr('disabled', 'disabled');
    $('#txtCaseSection').val(CaseDataList[0].caseSection);
    $('#dateOfResponsibility').val(CaseDataList[0].dateOfAssignmentResponsibility == "0001-01-01T00:00:00" ? "" : moment(CaseDataList[0].dateOfAssignmentResponsibility).format('MM/DD/YYYY'));

    if (CaseDocuments.length > 0) {
        for (var i = 0; i < CaseDocuments.length; i++) {
            $('#txtDescription_' + CaseDocuments[i].doctypeid).val(CaseDocuments[i].description);
            $('#btnViewDoc_' + CaseDocuments[i].doctypeid).show();
        }
    }
    $("#btnReport").show();
}
function Report() {
    var id = $('#spanCaseID').html()
    var url = '/Report/Index?ID=' + id;
    window.open(url, '_blank');
}
function CreateLawyer() {
   var url = '/Lawyer/Index';
   window.open(url, '_blank');
}
function GetLawyer() {
   blockUI();
   $.ajax({
      url: "/Case/GetLawyer",
      method: "GET",
      dataType: "json",
      success: function (data) {
         unblockUI();
         CaseLawyerList = data.caselawyer;
         $('#ddlLawyer').data('kendoComboBox').dataSource.data(CaseLawyerList);
      }
   });
}
function ValidateRespondentOffice() {
  
    if ($('#ddlRespondentDepartment').data('kendoComboBox').value() == "" || $("#ddlRespondentDepartment").data('kendoComboBox').selectedIndex == -1) {
       $("#ddlRespondentDepartment").data('kendoComboBox').focus();
       $("#ddlRespondentDepartment").data('kendoComboBox').open();
        popupNotification.warning('Please input valid Respondent Department');
        return false;
    }
    if ($('#ddlRespondentOffice').data('kendoComboBox').value() == "" || $("#ddlRespondentOffice").data('kendoComboBox').selectedIndex == -1) {
       $("#ddlRespondentOffice").data('kendoComboBox').focus();
       $("#ddlRespondentOffice").data('kendoComboBox').open();
        popupNotification.warning('Please input valid Respondent Office');
        return false;
    }
    if ($('#ddlRespondentType').data('kendoComboBox').value() == "" || $("#ddlRespondentType").data('kendoComboBox').selectedIndex == -1) {
       $("#ddlRespondentType").data('kendoComboBox').focus();
       $("#ddlRespondentType").data('kendoComboBox').open();
       popupNotification.warning('Please input valid Respondent Type');
       return false;
    }
   
    return true;
}


function RespondentGridBind(_dataSource) {
    var i = 1;
    _.map(_dataSource, function (o) {
        o.sl = i;
        i++;
    });
    var element = $("#respondentGrid").kendoGrid({
        dataSource: {
            data: _dataSource,
        },
        columns:
            [
                {
                    field: "sl",
                    title: "SL",
                    width: 15
                },
                {
                    field: "officeName",
                    title: "Office Name",
                    width: 50
                },
                {
                    field: "respondentType",
                    title: "Respondent Type",
                    width: 30
                },
                {
                    field: "",
                    title: "Action",
                    template: "<button class='k-button info' onclick='EditRespondentOffice(\"#: id #\")'><span class='k-icon k-i-edit'></span></button><button class='k-button danger' onclick='DeleteRespondentOffice(\"#: id #\")'><span class='k-icon k-i-trash'></span></button>",
                    width: 30
                }
            ]
    });
}

function RespondentPersonGridBind(_dataSource) {
    var i = 1;
    _.map(_dataSource, function (o) {
        o.sl = i;
        i++;
    });
    var element = $("#respondentPersonGrid").kendoGrid({
        dataSource: {
            data: _dataSource,
        },
        columns:
            [
                {
                    field: "sl",
                    title: "SL",
                    width: 15
                },
                {
                    field: "categoryName",
                    title: "Category",
                    width: 50
                },
                {
                    field: "nameOfRespondent",
                    title: "Respondent Name",
                    width: 30
                },
                {
                    field: "designation",
                    title: "Desgination",
                    width: 30
                },
                {
                    field: "address",
                    title: "Address",
                    width: 30
                },
                {
                    field: "typeOfEstablishment",
                    title: "Establishment Info",
                    width: 30
                },
                {
                    field: "respondentAsName",
                    title: "Type of Respomdent",
                    width: 30
                },
                {
                    field: "",
                    title: "Action",
                    template: "<button class='k-button info' onclick='EditRespondentPerson(\"#: id #\")'><span class='k-icon k-i-edit'></span></button><button class='k-button danger' onclick='DeleteRespondentPersonOrOrg(\"#: id #\")'><span class='k-icon k-i-trash'></span></button>",
                    width: 30
                }
            ]
    });
}
function ValidateRespondentToList() {
    if ($('#ddlRespondentCategory').data('kendoComboBox').value() == "" || $("#ddlRespondentCategory").data('kendoComboBox').selectedIndex == -1) {
        $("#ddlRespondentCategory").data('kendoComboBox').focus();
        $("#ddlRespondentCategory").data('kendoComboBox').open();
        popupNotification.warning('Please input valid case category');
        return false;
    }
   if ($('#txtRespondentName').val() == "") {
        $('#txtRespondentName').focus();
        popupNotification.warning('Please input RespondentName');
        return false;
   }
   if ($('#ddlRespondentCategory').data('kendoComboBox').value() == 1 && $('#txtDesignation').val() == "") {
      $('#txtDesignation').focus();
      popupNotification.warning('Please input designation');
      return false;
   }
    if ($('#txtAddress').val() == "") {
        $('#txtAddress').focus();
        popupNotification.warning('Please input Address');
        return false;
    }
    if ($('#txtEstablishmentInfo').val() == "") {
        $('#txtEstablishmentInfo').focus();
        popupNotification.warning('Please input EstablishmentInfo');
        return false;
    }
    if ($('#ddlRespondentAs').data('kendoComboBox').value() == "" || $("#ddlRespondentAs").data('kendoComboBox').selectedIndex == -1) {
        $("#ddlRespondentAs").data('kendoComboBox').focus();
        $("#ddlRespondentAs").data('kendoComboBox').open();
        popupNotification.warning('Please input valid Respondent As');
        return false;
    }
    return true;
}

function AddRespondentToList() {
    var validate = true;
    validate = ValidateRespondentToList();
    if (validate == true) {
        var o = new Object();
        o.categoryId = $('#ddlRespondentCategory').data('kendoComboBox').value();
        o.categoryName = $('#ddlRespondentCategory').data('kendoComboBox').text();
        o.nameOfRespondent = $('#txtRespondentName').val();
        o.designation = $('#txtDesignation').val();
        o.address = $('#txtAddress').val();
        o.typeOfEstablishment = $('#txtEstablishmentInfo').val();
        o.respondentAsId = $('#ddlRespondentAs').data('kendoComboBox').value();
        o.respondentAsName = $('#ddlRespondentAs').data('kendoComboBox').text();
            var FilterData = _.filter(RespondentPersonList, function (item) {
                return item.categoryId == o.categoryId &&
                    item.nameOfRespondent == o.nameOfRespondent &&
                    item.designation == o.designation &&
                    item.address == o.address &&
                    item.typeOfEstablishment == o.typeOfEstablishment &&
                    item.respondentAsId == o.respondentAsId
            });
            if (FilterData.length > 0) {
                popupNotification.warning('Duplicate Respondent');
                return;
            }
            var lengthOfList = RespondentPersonList.length;
            o.id = (lengthOfList + 1) * (-1);
       

        if ($("#spanCaseID").html() > 0) {
            o.caseId = $("#spanCaseID").html();
            o.id = $('#respondentPersonId').html();
            // ajax call
            $.ajax({
                url: '/Case/AddCaseRespondentPersonData',
                method: 'GET',
                dataType: 'json',
                data: o,
                success: function (data) {
                    RespondentPersonList = data;
                    RespondentPersonGridBind(RespondentPersonList);
                    /*ClearRespodentPersonField();*/
                },
            });
        }
        else {
            var FilterData = _.filter(RespondentPersonList, function (item) { return item.id == o.id });
            if (FilterData.length > 0) {
                _.map(RespondentPersonList, function (o) {
                    if (o.id == $("#respondentPersonId").html()) {
                        o.categoryId = $('#ddlRespondentCategory').data('kendoComboBox').value();
                        o.nameOfRespondent = $('#txtRespondentName').val();
                        o.designation = $('#txtDesignation').val();
                        o.address = $('#txtAddress').val();
                        o.typeOfEstablishment = $('#txtEstablishmentInfo').val();
                        o.respondentAsId = $('#ddlRespondentAs').data('kendoComboBox').value();
                    }
                });
                $('#respondentPersonId').html(0);
                $('#btnAddRespondentPerson').text('Add');
                RespondentPersonGridBind(RespondentPersonList);
            }
            else {
                RespondentPersonList.push(o);
                RespondentPersonGridBind(RespondentPersonList);
            }
        }
    }
    RespondentPersonGridBind(RespondentPersonList);
    $('#respondentPersonGrid').show();
}

function AddRespondentOffice() {
    var validate = true;
    validate = ValidateRespondentOffice();
    if (validate == true) {
        var o = new Object();
        o.caseId = getUrlParameter('ID');
        o.officeId = $('#ddlRespondentOffice').data('kendoComboBox').value();
        o.officeName = $('#ddlRespondentOffice').data('kendoComboBox').text();
        o.respondentTypeId = $('#ddlRespondentType').data('kendoComboBox').value();
        o.departmentId = $('#ddlRespondentDepartment').data('kendoComboBox').value();
        o.respondentType = $('#ddlRespondentType').data('kendoComboBox').text();
        if ($("#caseRepondentOfficeId").html() == 0) {
            var FilterData = _.filter(RespondentOfficeList, function (item) {
                return item.officeId == o.officeId &&
                    item.respondentTypeId == o.respondentTypeId

            });
            if (FilterData.length > 0) {
                popupNotification.warning('Duplicate office');
                $('#respondentOfficeBtn').text('Save');
                return;
            }
            var lengthOfList = RespondentOfficeList.length;
            o.id = (lengthOfList + 1) * (-1);
        }
        else {
            o.id = $("#caseRepondentOfficeId").html();
        }
        if ($("#spanCaseID").html() > 0) {
            o.caseId = $("#spanCaseID").html();
            o.id = $('#caseRepondentOfficeId').html();
            $.ajax({
                url: '/Case/AddCaseRespondentOfficeData',
                method: 'POST',
                dataType: 'json',
                data: o,
                success: function (data) {
                    RespondentOfficeList = data;
                    RespondentGridBind(RespondentOfficeList);
                },
                error: function (xhr, textStatus, errorThrown) {
                    unblockUI();
                    popupNotification.error(data.message);
                }
            })
        }
        else {
            var FilterData = _.filter(RespondentOfficeList, function (item) { return item.id == o.id });
            if (FilterData.length > 0) {
                _.map(RespondentOfficeList, function (o) {
                    if (o.id == $("#caseRepondentOfficeId").html()) {
                        o.departmentId = $('#ddlRespondentDepartment').data('kendoComboBox').value();
                        o.departmentName = $('#ddlRespondentDepartment').data('kendoComboBox').text();
                        o.officeId = $('#ddlRespondentOffice').data('kendoComboBox').value();
                        o.officeName = $('#ddlRespondentOffice').data('kendoComboBox').text();
                        o.respondentTypeId = $('#ddlRespondentType').data('kendoComboBox').value();;
                        o.respondentType = $('#ddlRespondentType').data('kendoComboBox').text();
                    }
                });
                $('#caseRepondentOfficeId').html(0);
                $('#respondentOfficeBtn').text('Save');
                RespondentPersonGridBind(RespondentPersonList);
            }
            else {
                RespondentOfficeList.push(o);
                RespondentGridBind(RespondentOfficeList);
            }
        }
        RespondentGridBind(RespondentOfficeList);
        $('#respondentGrid').show();
    }
}




function EditRespondentPerson(id) { 
    $('#respondentPersonId').html(id);
    var FilterData = _.filter(RespondentPersonList, function (item) { return item.id == id });
    $('#ddlRespondentCategory').data('kendoComboBox').value(FilterData[0].categoryId);
    $('#txtRespondentName').val(FilterData[0].nameOfRespondent);
    if ($('#ddlRespondentCategory').data('kendoComboBox').value() == 1) {
      $('#designationDiv').show();
    }
    if($('#ddlRespondentCategory').data('kendoComboBox').value() == 2) {
      $('#designationDiv').hide();
    }
    $('#txtDesignation').val(FilterData[0].designation);
    $('#txtAddress').val(FilterData[0].address);
    $('#txtEstablishmentInfo').val(FilterData[0].typeOfEstablishment);
    $('#ddlRespondentAs').data('kendoComboBox').value(FilterData[0].respondentAsId);
    $('#btnAddRespondentPerson').text('Update');
}

function EditRespondentOffice(id) {
    $('#caseRepondentOfficeId').html(id);
    var FilterData = _.filter(RespondentOfficeList, function (item) { return item.id == id });
    $('#ddlRespondentDepartment').data('kendoComboBox').value(FilterData[0].departmentId);

    console.log(RespondentDeptWiseOfficeList, RespondentOfficeList);
    var OfficeFilterData = _.filter(RespondentDeptWiseOfficeList, function (item) { return item.ministryOrDepartmentId == FilterData[0].departmentId });
    $("#ddlRespondentOffice").data('kendoComboBox').dataSource.data([]);
    $("#ddlRespondentOffice").data('kendoComboBox').dataSource.data(OfficeFilterData);
    $("#ddlRespondentOffice").data('kendoComboBox').value(FilterData[0].officeId);
    $('#ddlRespondentType').data('kendoComboBox').value(FilterData[0].respondentTypeId);
    $('#respondentOfficeBtn').text('Update');

}

function ClearRespodentPersonField() {
    $('#respondentPersonId').html(0);
    $('#ddlRespondentCategory').data('kendoComboBox').value('');
    $('#txtRespondentName').val('');
    $('#txtDesignation').val('');
    $('#txtAddress').val('');
    $('#txtEstablishmentInfo').val('');
    $('#ddlRespondentAs').data('kendoComboBox').value('')
}
function ClearRespondentOffice() {
    $('#caseRepondentOfficeId').html(0);
    $('#ddlRespondentDepartment').data('kendoComboBox').value('');
    $('#ddlRespondentOffice').data('kendoComboBox').value('');
    $('#ddlRespondentType').data('kendoComboBox').value('');
}

function DeleteRespondentPersonOrOrg(id) {
    if ($('#spanCaseID').html() <= 0) {
        RespondentPersonList = _.filter(RespondentPersonList, function (o) { return o.id != id })
        if (RespondentPersonList.length <= 0) {
            $('#respondentPersonGrid').hide();
        }
        RespondentPersonGridBind(RespondentPersonList);
    } else {
        var o = new Object();
        o.id = id;
        o.caseId = $('#spanCaseID').html();
        $.ajax({
            url: '/Case/DeleteRespondentPersonorOrg',
            method: 'GET',
            dataType: 'json',
            data: o,
            success: function (data) {
                RespondentPersonList = data;
                if (RespondentPersonList.length <= 0) {
                    $('#respondentPersonGrid').hide();
                }
                RespondentPersonGridBind(RespondentPersonList);
            },
            error: function (xhr, textStatus, errorThrown) {
                unblockUI();
                popupNotification.error(data.message);
            }
        });
    }
}

function DeleteRespondentOffice(id) {
    if ($('#spanCaseID').html() <= 0) {
        RespondentOfficeList = _.filter(RespondentOfficeList, function (o) { return o.id != id })
        if (RespondentOfficeList.length <= 0) {
            $('#respondentGrid').hide();
        }
        RespondentGridBind(RespondentOfficeList);
    } else {
        var o = new Object();
        o.id = id;
        o.caseId = $('#spanCaseID').html();
        $.ajax({
            url: '/Case/DeleteRespondentOffice',
            method: 'GET',
            dataType: 'json',
            data: o,
            success: function (data) {
                RespondentOfficeList = data;
                if (RespondentOfficeList.length <= 0) {
                    $('#respondentGrid').hide();
                }
                RespondentGridBind(RespondentOfficeList);
            },
            error: function (xhr, textStatus, errorThrown) {
                unblockUI();
                popupNotification.error(data.message);
            }
        });
    }
}

function isValidDate(date) {
    var isValid = !isNaN(new Date(date));
    return isValid;
}

