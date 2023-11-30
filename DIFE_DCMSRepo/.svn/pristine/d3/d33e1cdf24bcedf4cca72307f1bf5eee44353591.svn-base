var popupNotification;
var windowWidget;

$(document).ready(function () {

    popupNotification = $("#popupNotification").kendoNotification().data("kendoNotification");
    $("#Loadwindow").kendoWindow({
        width: 500,
        height: 160,
        draggable: false,
        resizable:false,
        content: {
            template: "ডেটা লোড করা হচ্ছে। অনুগ্রহ করে অপেক্ষা করুন.."
        },
    });

    windowWidget = $("#Loadwindow").data("kendoWindow");
            $("#menu").kendoMenu();
            $(".KendotextButton").kendoButton();
            $(".select-period").kendoButtonGroup({
                index: 0
            });
            loadTextbox();
            loadDropdown();
});


function closeModuleWindow() {
    var dialog = $("#windowTin").data("kendoWindow");
    setTimeout(function() {
        dialog.close();
    });
}

function loadDropdown() {
    $(".Kdropdown").kendoDropDownList({
        placeholder: "No Data...",
        optionLabel: "No Data Found...",

    });
    $(".Kcombo").kendoComboBox({
        //placeholder: "Select...",
        filter: "contains",
        index: 0
    });
}

function loadTextbox() {
    $(".textbox").kendoTextBox({});
    $(".Kdatepicker").kendoDatePicker();
  //  $(".Kdatepicker").val(moment(new Date).format('MM/DD/YYYY'));
    $(".Ktextarea").kendoTextArea({
        rows: 2,
        maxLength: 500,
        placeholder: "Enter your text here."
    });
    $(".Kyear").kendoDatePicker({
        start: "decade",
        depth: "decade",
        format: "yyyy",
        value: new Date(),
        dateInput: true
    });
    $(".daterangepicker").kendoDateRangePicker({
        labels: false
    });
    $(".bstMYDatepicker").datepicker({
        format: "mm-yyyy",
        startView: "months",
        minViewMode: "months"
    });
    
    $(".multiselect").kendoMultiSelect({
        placeholder: "No Data to Select...",
    });

    $("#files").kendoUpload({
        async: {
            autoUpload: true,
            batch: true
        },
        select: onSelect,
        validation: {
            //allowedExtensions: [".gif", ".jpg", ".png", ".pdf",".xlxs"],
            maxFileSize: 4194304
        }
    });
    $(".files").kendoUpload({
        async: {
            autoUpload: true,
            batch: true
        },
        select: onSelect,
        validation: {
            //allowedExtensions: [".gif", ".jpg", ".png", ".pdf",".xlxs"],
            maxFileSize: 4194304
        }
    });
   
}

function onSelect(e) {
    $("#fileDetails").html(getFileInfo(e));
    //$("#txtDescription").val(getFileInfo(e));
}
function getFileInfo(e) {
    return $.map(e.files, function (file) {
        var info = file.name;

        // File size is not available in all browsers
        if (file.size > 0) {
            info += " (" + Math.ceil(file.size / 1024) + " KB)";
        }
        return info;
    }).join(", ");
}


function unblockUI() {
    var dialog = $("#Loadwindow").data("kendoWindow").center().open();
    $("#Loadwindow").parent().find(".k-window-action").css("visibility", "hidden");
    setTimeout(function () {
        dialog.close();
    });
    $("#body").removeClass('blur');
    kendo.ui.progress(windowWidget.element, false);

}

function blockUI() {
    var dialog = $("#Loadwindow").data("kendoWindow").center().open();
    $("#Loadwindow").parent().find(".k-window-action").css("visibility", "hidden");

    setTimeout(function () {
        dialog.open();
    });
    $("#body").addClass('blur');
    kendo.ui.progress(windowWidget.element, true);
}


