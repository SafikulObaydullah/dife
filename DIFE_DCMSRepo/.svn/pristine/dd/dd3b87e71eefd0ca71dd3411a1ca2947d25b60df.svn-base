var UserTypeList = []


$(document).ready(function () {
    UserTypeLoad();
});

function UserTypeLoad() {
    $.ajax({
        url: "/UserType/GetUserTypeData",
        method: "GET",
        dataType: "json",
        success: function (data) {
            UserTypeList = data;
            UserTypeDataBind();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error:", textStatus, errorThrown);
        }
    });

}


function UserTypeDataBind() {
    $("#gridTable").kendoGrid({
        dataSource: UserTypeList,
        sortable: true,
        toolbar: ["search"],
        search: {
            fields: ["name"]
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
                title: "User Type Name",
                field: "name", width: 90

            },
            {
                title: "Is Active",
                field: "isActive", width: 90,
                template: "#= isActive == true ? 'True' : 'False' #",

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
        o.name = $('#name').val();
        o.isActive = $('#isActive').is(':checked') ? true : false;
        $.ajax({
            url: "/UserType/UserTypeSave",
            type: "POST",
            dataType: "json",
            data: o,
            success: function (data) {
                if (data.code == 200) {
                    toastr.success(data.message, 'Success');
                    UserTypeLoad();
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
    var FilterData = _.filter(UserTypeList, function (item) { return item.id == id });
    $('#name').val(FilterData[0].name);
    FilterData[0].isActive == false ? $('#isActive').prop('checked', false) : $('#isActive').prop('checked', true)
    $('#mdlUserReg').modal('toggle')
}

function AddNew() {
    $('#spanParentID').html(0);
    $('#name').val('');
    $('#mdlUserReg').modal('toggle');
}

function Validate() {
    if ($('#name').val() == "") {
        $('#name').focus();
        popupNotification.warning('Please input name');
        return false;
    }
    return true;
}
