var CaseNatureList = []


$(document).ready(function () {
    CaseNatureLoad();
});

function CaseNatureLoad() {

    $.ajax({
        url: "/CaseNature/GetCaseNatureData",
        method: "GET",
        dataType: "json",
        success: function (data) {
            CaseNatureList = data;
            CaseNatureDataBind();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error:", textStatus, errorThrown);
        }
    });

}


function CaseNatureDataBind() {
    $("#gridTable").kendoGrid({
        dataSource: CaseNatureList,
        sortable: true,
        toolbar: ["search"],
        search: {
            fields: ["nameE", "nameB", "description"]
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
                title: "Case Category Name English",
                field: "nameE", width: 90

            },
            {
                title: "Case Category Name Bangla",
                field: "nameB", width: 90
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
    var validate = true;
    validate = Validate();
    if (validate == true) {
        o.id = $('#spanParentID').html();
        o.nameE = $('#nameE').val();
        o.nameB = $('#nameB').val();
        o.description = $('#description').val();
        o.isActive = $('#isActive').is(':checked') ? true : false;
        $.ajax({
            url: "/CaseNature/CaseNatureSave",
            type: "POST",
            dataType: "json",
            data: o,
            success: function (data) {
                console.log(data.code);
                if (data.code == 200) {
                    toastr.success(data.message, 'Success');
                    CaseNatureLoad();
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
    var FilterData = _.filter(CaseNatureList, function (item) { return item.id == id });
    $('#nameE').val(FilterData[0].nameE);
    $('#nameB').val(FilterData[0].nameB);
    $('#description').val(FilterData[0].description);
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
    return true;
}
