var CaseTypeList = []
var CaseCategoryList = []

$(document).ready(function () {

    CaseTypeLoad();
    $("#cmbCaseCategory").kendoComboBox({
        placeholder: 'Select Case Category',
        dataTextField: "nameE",
        dataValueField: "id",
        dataSource: []
    });
});

function CaseTypeLoad() {
    $.ajax({
        url: "/CaseType/GetCaseType",
        mathod: "GET",
        dataType: "json",
        success: function (data) {
            console.log(data);
            CaseTypeList = data.caseType;
            CaseCategoryList = data.caseCategory;
            $('#cmbCaseCategory').data('kendoComboBox').dataSource.data([]);
            $('#cmbCaseCategory').data('kendoComboBox').dataSource.data(CaseCategoryList);
            CaseTypeDataBind();
        }
    })
}


function CaseTypeDataBind() {
    $("#gridUser").kendoGrid({
        dataSource: CaseTypeList,
        sortable: true,
        toolbar: ["search"],
        search: {
            fields: ["nameE", "abbreviatedForm", "description", "officeName", "email", "phoneNo", "userTypeName", "designationName"]
        },
        pageable: {
            pageSize: 15,
            pageSizes: [15, 30, 50, "all"],
            numeric: false
        },
        columns: [
            {
                title: "ID",
                field: "id", width: 50
            },

            {
                title: "Case Type English",
                field: "nameE", width: 80
            },
           
            {
                title: "Case Type Bangla",
                field: "nameB", width:80
            },
            {
                title: "Abbreviated Form",
                field: "abbreviatedForm", width: 80
            },
            {
                title: "Case Category",
                field: "caseCategoryID", width: 80
            },
            {
                title: "Description",
                field: "description", width: 80
            },
            {
                title: "Action",
                template: "<button class='btn btn-success'  title='Edit' onclick='Edit(#:id#)'><span class='k-icon k-i-edit'></span></button>",
                field: "", width: 110
            },
        ]
    });
}

function Save() {
    var o = new Object();
    var validate = true;
    validate = Validate();
    if (validate == true) {
        o.id = $('#spanParentID').html();
        o.id = $('#spanParentID').html();
        o.nameE = $('#nameE').val();
        o.nameB = $('#nameB').val();
        o.caseCategoryId = $('#cmbCaseCategory').data("kendoComboBox").value()
        o.abbreviatedForm = $('#txtAbbFrm').val();
        o.description = $('#description').val();
        o.isActive = $('#isActive').is(':checked') ? true : false;

        $.ajax({
            url: "/CaseType/CaseTypeSave",
            type: "POST",
            dataType: "json",
            data: o,
            success: function (data) {
                console.log(data.code);
                if (data.code == 200) {
                    toastr.success(data.message, 'Success');
                    CaseTypeLoad();
                    $('#mdlUserReg').modal('hide')
                } else {
                    toastr.warning(data.message, "Waring");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                toastr.error('Error Saving', 'Error');
            }
        });
        
    }

}

function Edit(id) {
    $('#spanParentID').html(id);
    var FilterData = _.filter(CaseTypeList, function (item) { return item.id == id });
    $('#nameE').val(FilterData[0].nameE);
    $('#nameB').val(FilterData[0].nameB);
    $('#description').val(FilterData[0].description);
    console.log(FilterData[0].caseCategoryId);
    $('#cmbCaseCategory').data("kendoComboBox").value(FilterData[0].caseCategoryID)
    $('#txtAbbFrm').val(FilterData[0].abbreviatedForm);
    FilterData[0].isActive == false ? $('#isActive').prop('checked', false) : $('#isActive').prop('checked', true)
    $('#mdlUserReg').modal('toggle')
}
function AddNew() {
    $('#spanParentID').html(0);
    $('#nameE').val('');
    $('#nameB').val('');
    $('#description').val('');
    $('#txtAbbFrm').val('');
    $('#cmbCaseCategory').data("kendoComboBox").value('');
    $('#mdlUserReg').modal('toggle');

}

function Validate() {
    if ($('#nameE').val() == "") {
        $('#nameE').focus();
        popupNotification.warning('Please input english name');
        return false;
    }
    if ($('#nameB').val() == "") {
        $('#nameB').focus();
        popupNotification.warning('Please input bangla name');
        return false;
    }
    if ($('#cmbCaseCategory').data("kendoComboBox").value() == '' || $('#cmbCaseCategory').data("kendoComboBox").selectedIndex == -1) {
        $('#cmbCaseCategory').focus();
        popupNotification.warning('Please input valid case category');
        return false;
    }
    if ($('#txtAbbFrm').val() == "") {
        $('#txtAbbFrm').focus();
        popupNotification.warning('Please input abbreviation');
        return false;
    }
    return true;
}
