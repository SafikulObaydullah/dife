var UserList = []
var UserOfficePermission = [];
var CheckedOffice = []
var checkIds = "";
var checkedNodes = []
var userTypeList = [
    {
        id: 1,
        name: 'DIFE Admin'
    },
    {
        id: 2,
        name: 'External User'
    },
    {
        id: 3,
        name: 'User'
    },
]

var MinistryDepartmentList = []

var OfficeList = []

$(document).ready(function () {

    $('#name').on('keypress', function (e) {

        if (e.which == 13) {
            if ($('#name').val() != '')
                SearchUser();
            else {
                kendo.alert('Please put user name');
                return;
            }

        }
    });

    $('#ex1').kendoExpansionPanel({
        title: 'Search Panel',
        expanded: true
    });
    $('#ex2').kendoExpansionPanel({
        title: 'User Information',
        expanded: true
    });
    $('#ex3').kendoExpansionPanel({
        title: 'Permission List',
        expanded: true
    });
    $("#ddlOffice").kendoComboBox({
        placeholder: 'Select Office..',
        dataTextField: "nameE",
        dataValueField: "id",
        dataSource: [],
    });
    $("#ddlMinistryOrDepartment").kendoComboBox({
        placeholder: "Select Ministry..",
        dataTextField: "nameE",
        dataValueField: "id",
        dataSource: []
    });
    $("#ddlUser").kendoComboBox({
        placeholder: "Select User..",
        dataTextField: "nameAndDesginaion",
        dataValueField: "id",
        dataSource: [],
        change: function (e) {
            $.ajax({
                url: '/Admin/GetUserOfficePermission?id=' + $("#ddlUser").data('kendoComboBox').value(),
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                    UserOfficePermission = data;
                    LoadTreeView();
                }
            })
        }
    });
    LoadDropdowns();

});

function LoadTreeView() {
    var filterDepartmentData = _.uniq(UserOfficePermission, function (item) { return item.deptID, item.deptName });
    for (var i = 0; i < filterDepartmentData.length; i++) {
        filterDepartmentData[i].id = filterDepartmentData[i].deptID + "#D";
        filterDepartmentData[i].text = filterDepartmentData[i].deptName;
        var FilterData = _.filter(UserOfficePermission, function (item) { return item.deptID == filterDepartmentData[i].deptID });
        var officeDetailsArray = [];
        if (FilterData.length > 0) {
            for (var j = 0; j < FilterData.length; j++) {
                var objDetails = new Object();
                objDetails.id = FilterData[j].officeID + "#O";
                objDetails.text = FilterData[j].officeName;
                objDetails.checked = FilterData[j].isPermission;
                officeDetailsArray.push(objDetails);
            }
            filterDepartmentData[i].items = officeDetailsArray;
        }
    }

    $("#treeview-left").kendoTreeView({
        dataSource: new kendo.data.HierarchicalDataSource({
            data: filterDepartmentData,

        }),
        dataBound: function (e) {
            var treeView = $('#treeview-left').data('kendoTreeView');
            treeView.expand(".k-item");
        },
        check: onCheck,
        checkboxes: {
            checkChildren: true
        },

    });


    /*console.log(filterDepartmentData);*/
}


// function that gathers IDs of checked nodes
function checkedNodeIds(nodes, checkedNodes) {
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].checked) {

            if (checkedNodes.includes(nodes[i].id) == false) {
                checkedNodes.push(nodes[i].id);
            }

        }
        if (nodes[i].hasChildren) {

            checkedNodeIds(nodes[i].children.view(), checkedNodes);

        }
    }

}

function onCheck() {
    checkedNodes = []
    treeView = $("#treeview-left").data("kendoTreeView");
    checkedNodeIds(treeView.dataSource.view(), checkedNodes);
}

function Save() {
    var officePermissionData = new Object();
    var SaveData = []
    for (var i = 0; i < checkedNodes.length; i++) {
        var data = new Object();
        var nodeData = checkedNodes[i];
        var nodeObj = nodeData.split('#');
        if (nodeObj[1] == "O") {
            data.OfficeId = nodeObj[0];
            data.UserId = $("#ddlUser").data('kendoComboBox').value();
            SaveData.push(data);
        }
    }
    officePermissionData.childList = SaveData;
    officePermissionData.Creator = $("#ddlUser").data('kendoComboBox').value();
    $.ajax({
        type: "POST",
        url: '/Admin/AddOfficePermission',     // controllerName / ActionName
        data: officePermissionData,
        dataType: "json",
        success: function (data) {
            kendo.alert('Successfully Saved');
        },
        error: function (data) {
            unblockUI();
            kendo.alert('Error while saving data');

        }
    });


    console.log(SaveData);
}
function LoadDropdowns() {
    $.ajax({
        url: '/Admin/GetPermissionDropdown',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            OfficeList = data.office;
            $("#ddlOffice").data('kendoComboBox').dataSource.data(OfficeList);
            MinistryDepartmentList = data.ministryOrDepartment;
            $("#ddlMinistryOrDepartment").data('kendoComboBox').dataSource.data(MinistryDepartmentList);
        }
    })
}

function SearchUser() {
    var o = new Object();
    o.name = $('#name').val();
    o.ministryOrDepartmentId = $('#ddlMinistryOrDepartment').data("kendoComboBox").value();
    o.officeId = $('#ddlOffice').data("kendoComboBox").value();
    o.email = $('#email').val();
    o.phone = $('#phone').val();
    $.ajax({
        url: '/Admin/GetUserBasedOnSearch',
        method: 'GET',
        dataType: 'json',
        data: o,
        success: function (result) {
            console.log(result);
            UserList = result;
            UserList = _.map(UserList, function (user) { 
                if (user.designationName != null) {
                    user.nameAndDesginaion = user.name + " (" + user.designationName + ")";
                }
                else {
                    user.nameAndDesginaion = user.name;
                }
                return user;
            })
            $("#ddlUser").data('kendoComboBox').dataSource.data(UserList);
            $("#ddlUser").data('kendoComboBox').focus();
            $("#ddlUser").data('kendoComboBox').open();
        }

    })
}



