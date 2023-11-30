var OfficeList = []
var MinistryOrDepartmentList = []


$(document).ready(function () { 
    $("#parentOffice").kendoComboBox({
        placeholder: 'Select Parent Office',
        dataTextField: "nameE",
        dataValueField: "id",
        dataSource: []
    });
    $("#ministryOrDepartment").kendoComboBox({
        placeholder: 'Select Ministry/Department',
        dataTextField: "nameE",
        dataValueField: "id",
        dataSource: []
    });
    OfficeLoad();
});
function OfficeLoad() {
    $.ajax({
        url: "/Office/GetOfficeData",
        method: "GET",
        datatype: "json",
        success: function (data) {
           console.log(data);
            OfficeList = data.office;
            MinistryOrDepartmentList = data.ministryOrDepartment;
            OfficeDataBind();
            $("#parentOffice").data('kendoComboBox').dataSource.data(OfficeList);
            $("#ministryOrDepartment").data('kendoComboBox').dataSource.data(MinistryOrDepartmentList);
        }
    });
}


function OfficeDataBind() {
    $("#gridUser").kendoGrid({
        dataSource: OfficeList,
        sortable: true,
        toolbar: ["search"],
        search: {
            fields: ["nameE", "nameB", "address", "ministryOrDepartmentName"]
        },
        pageable: {
            pageSize: 15,
            pageSizes: [15, 30, 50, "all"],
            numeric: false
        },
        columns: [
            {
                title: "ID",
                field: "id", width: 50, 
            },
            {
                title: "Office Name English",
                field: "nameE", width: 90
            }, {
                title: "Office Name Bangla",
                field: "nameB", width: 90
            },
            {
                title: "Address",
                field: "address", width: 90
            },

            {
                title: "Ministry/Department",
                field: "ministryOrDepartmentName", width: 120
            },
            {
                title: "Action",
                template: "<button class='btn btn-success'  title='Edit' onclick='Edit(#:id#)'><span class='k-icon k-i-edit'></span></button>",
                field: "", width: 80
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
        o.parentId = $('#parentOffice').data("kendoComboBox").value();
        o.ministryOrDepartmentId = $("#ministryOrDepartment").data("kendoComboBox").value();
        console.log($("#ministryOrDepartment").data("kendoComboBox").text());
        o.nameE = $('#nameE').val();
        o.nameB = $('#nameB').val();
        o.address = $('#txtAddress').val();
        o.description = $('#description').val();
        o.isActive = $('#isActive').is(':checked') ? true : false;
        $.ajax({
            url: "/Office/OfficeSave",
            type: "POST",
            dataType: "json",
            data: o,
            success: function (data) {
                if (data.code == 200) {
                    toastr.success(data.message, 'Success');
                    OfficeLoad();
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
    var FilterData = _.filter(OfficeList, function (item) { return item.id == id });
    $('#nameE').val(FilterData[0].nameE);
    $('#nameB').val(FilterData[0].nameB);
    $('#description').val(FilterData[0].description);
    $('#txtAddress').val(FilterData[0].address);
    FilterData[0].parentId == 0 ? "" : $("#parentOffice").data("kendoComboBox").value(FilterData[0].parentId);
    FilterData[0].ministryOrDepartmentId == 0 ? "" : $("#ministryOrDepartment").data("kendoComboBox").value(FilterData[0].ministryOrDepartmentId);
    FilterData[0].isActive == false ? $('#isActive').prop('checked', false) : $('#isActive').prop('checked', true)
    $('#mdlUserReg').modal('toggle')
}
function AddNew() {
    $('#spanParentID').html(0);
    $('#nameE').val('');
    $('#nameB').val('');
    $('#description').val('');
    $('#txtAddress').val('');
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
    if ($("#ministryOrDepartment").data("kendoComboBox").value() == "" || $("#ministryOrDepartment").data("kendoComboBox").selectedIndex == -1) {
        $('#ministryOrDepartment').focus();
        popupNotification.warning('Please input ministry or department');
        return false;
    }
    if ($('#txtAddress').val() == "") {
        $('#txtAddress').focus();
        popupNotification.warning('Please input bangla name');
        return false;
    }
    return true;
}

