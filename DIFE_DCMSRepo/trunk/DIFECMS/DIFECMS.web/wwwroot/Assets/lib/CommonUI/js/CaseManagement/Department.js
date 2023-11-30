var DepartmentList = []


$(document).ready(function () {
    DepartmentLoad();
});

function DepartmentLoad() {

    $.ajax({
        url: "/Department/GetDepartmentData",
        method: "GET",
        dataType: "json",
        success: function (data) {
            DepartmentList = data;
            console.log(DepartmentList);
            DepartmentDataBind();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error:", textStatus, errorThrown);
        }
    });

}


function DepartmentDataBind() {
    $("#gridTable").kendoGrid({
        dataSource: DepartmentList,
        sortable: true,
        columns: [
            {
                title: "ID",
                field: "id", width: 50
            },

            {
                title: "Department Name English",
                field: "nameE", width: 90

            },
            {
                title: "Department Name Bangla",
                field: "nameB", width: 90
            },
            {
                title: "Head Office",
                field: "address", width: 80
            },
            {
                title: "Description",
                field: "description", width: 120
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
    o.id = $('#spanParentID').html();
    o.nameE = $('#nameE').val();
    o.nameB = $('#nameB').val();
    o.address = $('#txtAddress').val();
    o.description = $('#description').val();
    o.isActive = $('#isActive').is(':checked') ? true : false;
    if (o.nameB == "" || o.nameB == "" || o.address == "") {
        alert("Please enter required information");
    } else {
        $.ajax({
            url: "/Department/DepartmentSave",
            type: "POST",
            dataType: "json",
            data: o,
            success: function (data) {
                console.log(data.code);
                if (data.code == 200) {
                    popupNotification.success('Saved Successfully');
                    DepartmentLoad();
                } else {
                    popupNotification.error('Error Saving');
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                popupNotification.error('Error Saving');
            }
        });
        $('#mdlUserReg').modal('hide')
    }
}

function Edit(id) {
    $('#spanParentID').html(id);
    var FilterData = _.filter(DepartmentList, function (item) { return item.id == id });
    $('#nameE').val(FilterData[0].nameE);
    $('#nameB').val(FilterData[0].nameB);
    $('#description').val(FilterData[0].description);
    $("#txtAddress").val(FilterData[0].address);
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
