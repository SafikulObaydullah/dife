var OfficeList = []
var ConcernedPersonList = []

$(document).ready(function () {
    ConcernedPersonAndOfficeListLoad();
    $("#office").kendoComboBox({
        placeholder: 'Select Office',
        dataTextField: "nameE",
        dataValueField: "id",
        dataSource: []
    });

});


function ConcernedPersonAndOfficeListLoad() {
    $.ajax({
        url: "/ConcernedPerson/GetConcernedPersonAndOffice",
        method: "GET",
        dataType: "Json",
        success: function (data) {
            console.log(data);
            OfficeList = data.office;
            ConcernedPersonList = data.concernedPerson;
            $("#office").data('kendoComboBox').dataSource.data(OfficeList);
            ConcernedPersonDataBind();
        }
    });
}

function ConcernedPersonDataBind() {
    $("#gridUser").kendoGrid({
        dataSource: ConcernedPersonList,
        sortable: true,
        columns: [
            {
                title: "ID",
                field: "id", width: 50
            },
            {
                title: "Office Name",
                field: "officeName", width: 120,
            },
            {
                title: "Person Name English",
                field: "nameE", width: 120
            },
            {
                title: "Person Name Bengali",
                field: "nameB", width: 120
            },
            {
                title: "Email",
                field: "email", width: 120
            },
            {
                title: "Address",
                field: "address", width: 120
            },
            {
                title: "Phone",
                field: "phone", width: 120
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
    o.id = $('#spanParentID').html();
    o.officeId = $('#office').val();
    o.nameE = $('#nameE').val();
    o.nameB = $('#nameB').val();
    o.email = $('#email').val();
    o.address = $('#address').val();
    o.phone = $('#phone').val();
    o.isActive = $('#isActive').is(':checked') ? true : false;
    if (o.nameB == "" || o.nameB == "") {
        alert("Please enter required information");
    } else {
        $.ajax({
            url: "/ConcernedPerson/ConcernedPersonSave",
            type: "POST",
            dataType: "json",
            data: o,
            success: function (data) {
                console.log(data);
                if (data.code == 200) {
                    popupNotification.success('Saved Successfully');
                    ConcernedPersonAndOfficeListLoad();
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
    var FilterData = _.filter(ConcernedPersonList, function (item) { return item.id == id });
    $('#nameE').val(FilterData[0].nameE);
    $('#nameB').val(FilterData[0].nameB);
    $('#email').val(FilterData[0].email);
    $('#address').val(FilterData[0].address);
    $('#phone').val(FilterData[0].phone);
    $("#office").data("kendoComboBox").value(FilterData[0].officeId);
    // $('#cmbCourtType').val(FilterData[0].courtTypeID);
    FilterData[0].isActive == false ? $('#isActive').prop('checked', false) : $('#isActive').prop('checked', true)
    $('#mdlUserReg').modal('toggle')
}

function AddNew() {
    $('#spanParentID').html(0);
    $('#nameE').val('');
    $('#nameB').val('');
    $('#email').val('');
    $('#address').val('');
    $('#phone').val('');
    $("#office").data('kendoComboBox').text('');
    $('#mdlUserReg').modal('toggle');

}
function PasswordChange(id) {
    $('#mdlPassChange').modal('toggle')
}
function ChangePassword() {
    popupNotification.info('Password Changed Successfully...');
    $('#mdlPassChange').modal('hide')

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
    if ($('#phone').val() == "") {
        $('#phone').focus();
        popupNotification.warning('Please input phone');
        return false;
    }
    if ($('#address').val() == "") {
        $('#address').focus();
        popupNotification.warning('Please input address');
        return false;
    }
    if ($("#office").data("kendoComboBox").value() == "") {
        $('#office').focus();
        popupNotification.warning('Please input office');
        return false;
    }
    return true;
}