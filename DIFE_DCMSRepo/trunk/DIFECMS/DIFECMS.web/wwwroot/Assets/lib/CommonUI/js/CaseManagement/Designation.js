var DesignationList = []


$(document).ready(function () {
    DesignationLoad();
});

function DesignationLoad() {

    $.ajax({
        url: "/Designation/GetDesignationData",
        method: "GET",
        dataType: "json",
        success: function (data) {
            DesignationList = data;
            DesignationDataBind();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error:", textStatus, errorThrown);
        }
    });

}


function DesignationDataBind() {
    $("#gridTable").kendoGrid({
        dataSource: DesignationList,
        sortable: true,
        toolbar: ["search"],
        search: {
            fields: ["nameE", "nameB"]
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
                title: "Designation English",
                field: "nameE", width: 90

            },
            {
                title: "Designation Bangla",
                field: "nameB", width: 90
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
    o.id = $('#spanParentID').html();
    o.nameE = $('#nameE').val();
    o.nameB = $('#nameB').val();
    o.isActive = $('#isActive').is(':checked') ? true : false;
    validate = Validate();
    if (validate == true){
        $.ajax({
            url: "/Designation/DesignationSave",
            type: "POST",
            dataType: "json",
            data: o,
            success: function (data) {
                console.log(data.code);
                if (data.code == 200) {
                    toastr.success(data.message, 'Success');
                    DesignationLoad();
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
    var FilterData = _.filter(DesignationList, function (item) { return item.id == id });
    $('#nameE').val(FilterData[0].nameE);
    $('#nameB').val(FilterData[0].nameB);

    FilterData[0].isActive == false ? $('#isActive').prop('checked', false) : $('#isActive').prop('checked', true)
    $('#mdlUserReg').modal('toggle')
}

function AddNew() {
    $('#spanParentID').html(0);
    $('#nameE').val('');
    $('#nameB').val('');
    $('#mdlUserReg').modal('toggle');
}

function Validate() {
    if ($('#nameE').val() == ""){
        $('#nameE').focus();
        popupNotification.warning('Please enter english name');
        return false;
    }
    if ($('#nameB').val() == ""){
        $('#nameB').focus();
        popupNotification.warning('Please enter bangla name');
        return false;
    }
    return true;
}
