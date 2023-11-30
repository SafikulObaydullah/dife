var CourtList = []
var CourtTypeList = []

$(document).ready(function () {
    CourtAndCourtTypeListLoad();
    $("#cmbCourtType").kendoComboBox({
        placeholder: 'Select Court Type',
        dataTextField: "nameE",
        dataValueField: "id",
        dataSource: []
    });

});


function CourtAndCourtTypeListLoad() {
    $.ajax({
        url: "/Court/GetCourtAndCourtType",
        method: "GET",
        dataType: "Json",
        success: function (data) {
            CourtList = data.court;
            CourtTypeList = data.courtType;
            $("#cmbCourtType").data('kendoComboBox').dataSource.data([]);
            $("#cmbCourtType").data('kendoComboBox').dataSource.data(CourtTypeList);
            CourtDataBind();
        }
    });
}

function CourtDataBind() {
    $("#gridUser").kendoGrid({
        dataSource: CourtList,
        sortable: true,
        toolbar: ["search"],
        search: {
            fields: ["courtType", "nameE", "nameB", "description"]
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
                title: "Court Type Name",
                field: "courtType", width: 120,
            },
            {
                title: "Court Name English",
                field: "nameE", width: 120
            },
            {
                title: "Court Name Bengali",
                field: "nameB", width: 120
            },
            {
                title: "Description",
                field: "description", width: 120
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
        o.courtTypeID = $('#cmbCourtType').data('kendoComboBox').value();
        o.nameE = $('#nameE').val();
        o.nameB = $('#nameB').val();
        o.description = $('#description').val();
        o.isActive = $('#isActive').is(':checked') ? true : false;
        $.ajax({
            url: "/Court/CourtSave",
            type: "POST",
            dataType: "json",
            data: o,
           success: function (data) {
                if (data.code == 200) {
                    toastr.success(data.message, 'Success');
                    CourtAndCourtTypeListLoad();
                    $('#mdlUserReg').modal('hide')
                } else {
                    toastr.warning(data.message,"Waring");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                toastr.error('Error Saving','Error');
            }
        });
       
    }
}

function Edit(id) {
    $('#spanParentID').html(id);
    var FilterData = _.filter(CourtList, function (item) { return item.id == id });
    $('#nameE').val(FilterData[0].nameE);
    $('#nameB').val(FilterData[0].nameB);
    $('#description').val(FilterData[0].description);
    $("#cmbCourtType").data("kendoComboBox").value(FilterData[0].courtTypeID);
    // $('#cmbCourtType').val(FilterData[0].courtTypeID);
    FilterData[0].isActive == false ? $('#isActive').prop('checked', false) : $('#isActive').prop('checked', true)
    $('#mdlUserReg').modal('toggle')
}

function AddNew() {
    $('#spanParentID').html(0);
    $('#nameE').val('');
    $('#nameB').val('');
    $('#description').val('');
    // $("#cmbCourtType").data('kendoComboBox').text('');
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
    if ($("#cmbCourtType").data("kendoComboBox").value() == "" || $("#cmbCourtType").data("kendoComboBox").selectedIndex == -1) {
        $('#cmbCourtType').focus();
        popupNotification.warning('Please input court type');
        return false;
    }
    return true;

}


function PasswordChange(id) {
    $('#mdlPassChange').modal('toggle')
}
function ChangePassword() {
    popupNotification.info('Password Changed Successfully...');
    $('#mdlPassChange').modal('hide')

}