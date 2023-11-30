var CategoryList = [
    {
        id: 1,
        MasterCategname: 'Md. Ashfaqul Islam ',
        name: 'Additional District Judge ',
        description: 'Labour court dhaka',
        isActive: 'True'

    },
    {
        id: 2,
        MasterCategname: 'Md. Shohrowardi',
        name: 'Additional District Judge',
        description: 'Labour court dhaka',
        isActive: 'True'
    }
]
var masterCategory = [
    {
        id: 1,
        name: ' Labour court dhaka'
    },
    {
        id: 2,
        name: 'Labour court khulna'
    },

]

$(document).ready(function () {

    CategoryGrid();
    $("#cmbMasterCategory").kendoDropDownList({
        optionLabel: 'Select court',
        dataTextField: "name",
        dataValueField: "id",
        dataSource: masterCategory,
        index: 0
    });

});


function CategoryGrid() {
    $("#gridUser").kendoGrid({
        dataSource: CategoryList,
        sortable: true,
        columns: [
            {
                title: "ID",
                field: "id", width: 50
            },
            {
                title: "Name",
                field: "MasterCategname", width: 120
            },
            {
                title: "Designation",
                field: "name", width: 120
            },
            {
                title: "Court",
                field: "description", width: 80
            },
            {
                title: "Status",
                field: "isActive", width: 80
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
    var id = $('#spanParentID').html();
    if (id > 0) {
        _.map(CategoryList, function (o) {
            if (o.id == id) {
                o.name = $('#name').val();
                o.MasterCategname = $("#cmbMasterCategory").data('kendoComboBox').text();
                o.description = $('#description').val();

            }
        });
        popupNotification.success('Updated Sccessfully');

    }
    else {
        var o = new Object();
        o.id = (Math.max.apply(Math, CategoryList.map(function (o) { return o.id; })) + 1);
        o.name = $('#name').val();
        o.description = $('#description').val();
        o.isActive = $("#eq1").is(":checked") ? 'True' : 'False';
        o.MasterCategname = $("#cmbMasterCategory").data('kendoComboBox').text();
        CategoryList.push(o);
        popupNotification.success('Saved Sccessfully');

    }
    CategoryGrid();
    $('#mdlUserReg').modal('hide')
}

function Edit(id) {
    $('#spanParentID').html(id);
    var FilterData = _.filter(CategoryList, function (item) { return item.id == id });
    $('#name').val(FilterData[0].name);
    $('#description').val(FilterData[0].description);
    $('#cmbMasterCategory').val(FilterData[0].MasterCategname);

    $('#mdlUserReg').modal('toggle')
}
function AddNew() {
    $('#spanParentID').html(0);
    $('#name').val('');
    $('#description').val('');
    // $("#cmbMasterCategory").data('kendoComboBox').text('');
    $('#mdlUserReg').modal('toggle');

}
function PasswordChange(id) {
    $('#mdlPassChange').modal('toggle')
}
function ChangePassword() {
    popupNotification.info('Password Changed Successfully...');
    $('#mdlPassChange').modal('hide')

}