
var userTypeList = [
    {
        id: 1,
        name: 'Admin'
    },
    {
        id: 2,
        name: 'Monitoring User'
    },
    {
        id: 3,
        name: 'User'
    }
]

var AllUserList = [];

$(document).ready(function () {
    $("#ddlUserType").kendoComboBox({
        placeholder: 'Select User Type',
        dataTextField: "name",
        dataValueField: "id",
        dataSource: []
    });
    $("#ddlMinistryDepartment").kendoComboBox({
        placeholder: "Select Ministry..",
        dataTextField: "nameE",
        dataValueField: "id",
        dataSource: [],
        change: onMinistryDepartmentChange
    });
    $("#ddlOffice").kendoComboBox({
        placeholder: "Select Office..",
        dataTextField: "nameE",
        dataValueField: "id",
        dataSource: []
    });
    $("#ddlDesignation").kendoComboBox({
        placeholder: "Select Designation..",
        dataTextField: "nameE",
        dataValueField: "id",
        dataSource: []
    });

    GetUsermanagementPageAllData();

});

function onMinistryDepartmentChange(e) {
    if (this.dataItem() == undefined) {
        $("#ddlOffice").data('kendoComboBox').dataSource.data([])
        $("#ddlOffice").data('kendoComboBox').value('');
        return;
    }
    var id = this.dataItem().id
    var FilterData = _.filter(OfficeList, function (item) { return item.ministryOrDepartmentId == id });
    $("#ddlOffice").data('kendoComboBox').dataSource.data([])
    $("#ddlOffice").data('kendoComboBox').value('')
    $("#ddlOffice").data('kendoComboBox').dataSource.data(FilterData)
    $("#ddlOffice").data('kendoComboBox').focus();
    $("#ddlOffice").data('kendoComboBox').open();
}


function GetUsermanagementPageAllData() {
    blockUI();
    $.ajax({
        url: "/Account/GetUsermanagementPageAllData",
        method: "GET",
        dataType: "json",
        success: function (data) {
            unblockUI();
            var result = JSON.parse(data);
            console.log(result);
            MinistryList = [];
            MinistryList = result.ministryordepartment;
            $("#ddlMinistryDepartment").data('kendoComboBox').dataSource.data([]);
            $("#ddlMinistryDepartment").data('kendoComboBox').dataSource.data(MinistryList);

            UsertypeList = [];
            UsertypeList = result.usertype;
            $("#ddlUserType").data('kendoComboBox').dataSource.data([]);
            $("#ddlUserType").data('kendoComboBox').dataSource.data(UsertypeList);

            DesignationList = [];
            DesignationList = result.designation;
            $("#ddlDesignation").data('kendoComboBox').dataSource.data([]);
            $("#ddlDesignation").data('kendoComboBox').dataSource.data(DesignationList);

            OfficeList = [];
            OfficeList = result.office;
            $("#ddlOffice").data('kendoComboBox').dataSource.data([]);
            $("#ddlOffice").data('kendoComboBox').dataSource.data(OfficeList);

            AllUserList = result.user;
            console.log(AllUserList);
            UserGrid();

        }
    });
}

function UserGrid() {

    $("#gridUser").kendoGrid({
        dataSource: AllUserList,
        sortable: true,
        toolbar: ["search"],
        search: {
            fields: ["name", "username", "departmentName", "officeName", "email", "phoneNo", "userTypeName","designationName"]
        },
        pageable: {
            pageSize: 15,
            pageSizes: [15, 30, 50, "all"],
            numeric: false
        },
        columns: [
            {
                title: "ID",
                field: "id", width: 50, hidden: true,  
            },
            {
                title: "Full Name",
                field: "name", width: 120
            },
            {
                title: "User Name",
                field: "username", width: 120
            },
            {
                title: "Ministry/Department",
                field: "departmentName", width: 100
            },
            {
                title: "Office Name",
                field: "officeName", width: 100
            },
            {
                title: "Email",
                field: "email", width: 80
            },
            {
                title: "Phone",
                field: "phoneNo", width: 80
            },
            {
                title: "User Type",
                field: "userTypeName", width: 80
            },
            {
                title: "Designation",
                field: "designationName", width: 80
            },
            {
                title: "Action",
                template: "<button class='btn btn-success'  title='Edit' onclick='Edit(#:id#)'><span class='k-icon k-i-edit'></span></button><button style='margin-left: 2px;' title='Password Change' class='btn btn-warning' onclick='PasswordChange(#:id#)'><span class='k-icon k-i-reset'></span></button>",
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
        o.Id = $('#spanParentID').html();
        o.Name = $('#name').val();
        o.Email = $('#email').val();
        o.PhoneNo = $('#phone').val();
        o.OfficeId = $("#ddlOffice").data('kendoComboBox').value();
        o.MinistryOrDepartmentId = $("#ddlMinistryDepartment").data('kendoComboBox').value();
        o.UserTypeId = $("#ddlUserType").data('kendoComboBox').value();
        o.DesignationId = $("#ddlDesignation").data('kendoComboBox').value();
        o.isActive = $('#isActive').prop('checked');
        o.Password = $('#Password').val();
        $.ajax({
            url: "/Account/Registration",
            method: "POST",
            dataType: "json",
            data: o,
            success: function (data) {
                var result = JSON.parse(data);
                if (result.statuscode == 302) {
                    popupNotification.success(result.userdata[0].message);
                    $('#mdlUserReg').modal('hide');
                    GetUsermanagementPageAllData();
                }
                else {
                    popupNotification.error(result.userdata[0].message)
                }
            }
        });
    }
}

function Edit(id) {
    $('#spanParentID').html(id);
    var FilterData = _.filter(AllUserList, function (item) { return item.id == id });
    console.log(FilterData);
    $('#name').val(FilterData[0].name);
    $("#ddlMinistryDepartment").data('kendoComboBox').value(FilterData[0].ministryOrDepartmentId);
    $("#ddlOffice").data('kendoComboBox').value(FilterData[0].officeId);
    $("#ddlDesignation").data('kendoComboBox').value(FilterData[0].designationId);

    $('#email').val(FilterData[0].email);
    $('#phone').val(FilterData[0].phoneNo);
    $("#ddlUserType").data('kendoComboBox').value(FilterData[0].userTypeId);
    $('#isActive').prop('checked', FilterData[0].isActive);
    $('#mdlUserReg').modal('toggle')
}

function AddNew() {
    $('#spanParentID').html(0);
    $('#name').val('');
    $('#email').val('');
    $('#phone').val('');
    $('#Password').val('');
    $("#ddlMinistryDepartment").data('kendoComboBox').value('');
    $("#ddlOffice").data('kendoComboBox').value('');
    $("#ddlUserType").data('kendoComboBox').value('');
    $("#ddlDesignation").data('kendoComboBox').value('');
    $('#isActive').prop('checked', true);
    $('#mdlUserReg').modal('toggle');
}

function Validate() {
    if ($('#name').val() == "") {
        $('#name').focus();
        popupNotification.warning('Please enter name');
        return false;
    }
    if ($('#ddlMinistryDepartment').data('kendoComboBox').selectedIndex == -1) {
        $('#ddlMinistryDepartment').focus();
        popupNotification.warning('Please enter valid ministry or department');
        return false;
    }
    if ($('#ddlOffice').data('kendoComboBox').selectedIndex == -1) {
        $('#ddlOffice').focus();
        popupNotification.warning('Please enter valid office');
        return false;
    }
    if ($('#ddlUserType').data('kendoComboBox').selectedIndex == -1) {
        $('#ddlUserType').focus();
        popupNotification.warning('Please enter valid user type');
        return false;
    }
    if ($('#ddlDesignation').data('kendoComboBox').selectedIndex == -1) {
        $('#ddlDesignation').focus();
        popupNotification.warning('Please enter valid designation');
        return false;
    }
    return true;
}
