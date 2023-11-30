﻿
$(document).ready(function () {
    console.log($('#spanCaseID').text())
    $('#ex0').kendoExpansionPanel({
        title: 'Search Panel',
        expanded: true
    });
    $("#caseDocfiles").kendoUpload({
        validation: {
            allowedExtensions: [".pdf", ".PDF", ".png", ".PNG", ".jpg", "jpeg", ".JPG", "JPEG"],
            maxFileSize: 5242880
        },
        async: {
            autoUpload: true
        },
        select: onSelectCase,
    });
});

function SaveCaseDocuments() {
    var savedata = new FormData();
    console.log($('#spanCaseID').html())
    if ($('#spanCaseID').html() <= 0) {
        popupNotification.warning('Please search a case and then upload documents.')
        return;
    }
   if ($('#ddlDocumentType').data('kendoComboBox').value() == 0 || $('#ddlDocumentType').data('kendoComboBox').value() == '') {
      $("#ddlDocumentType").data('kendoComboBox').focus();
      $("#ddlDocumentType").data('kendoComboBox').open();
      popupNotification.warning('Please select document Type.')
      return;
    }
    savedata.append("id", $('#docParentId').html())
    savedata.append("caseId", $('#spanCaseID').html())
    savedata.append("doctypeid", $('#ddlDocumentType').data('kendoComboBox').value());
    savedata.append("issuedate", ($('#txtIssueDate').val() == "" ? "" : moment($('#txtIssueDate').val()).format('YYYY-MM-DD')));
    savedata.append("description", $('#txtDocDescription').val());

    console.log($("#caseDocfiles").data("kendoUpload"))
    var totalFiles = $("#caseDocfiles").data("kendoUpload").getFiles();
    if ($('#docParentId').html() <= 0 && totalFiles.length <= 0) {
        popupNotification.warning('Please upload documents');
        return;
    }
    var sizeFlag = true;
    for (var i = 0; i < totalFiles.length; i++) {
        if (totalFiles[i].extension.toLowerCase() == ".jpg" || totalFiles[i].extension.toLowerCase() == ".jpeg" || totalFiles[i].extension.toLowerCase() == ".png" || totalFiles[i].extension.toLowerCase() == ".pdf") {
           if (totalFiles[i].size > 20971520) {
                sizeFlag = false;
            } else {
                savedata.append($('#ddlDocumentType').data('kendoComboBox').value(), totalFiles[i].rawFile);
            }           
        }
        else {
            $("#caseDocfiles").data("kendoUpload").destroy();
            $("#caseDocfiles").kendoUpload();
            popupNotification.warning('Please select .pdf .jpeg, .jpg, .png files only');
            return;
        }
    }
    if (sizeFlag == true) {
        blockUI();
        $.ajax({
            type: "POST",
            url: '/Case/SaveCaseDocumentsData',
            data: savedata,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function (response) {
                unblockUI();
                var result = JSON.parse(response);
                console.log(result)
                if (result.statuscode == 302) {
                    popupNotification.show(result.data.message, "success");
                    CaseDocuments = result.caseDocuments;
                   $("#gridCaseDocuments").show()
                   $(".k-upload-files").remove();
                   $(".k-upload-status").remove();
                   $(".k-upload.k-header").addClass("k-upload-empty");
                   $(".k-upload-button").removeClass("k-state-focused");
                    BindDocumentGrid();
                }
                else {
                    popupNotification.show(result.data.message, "error");
                }
            },
            error: function (error) {
                popupNotification.show('Error while saving data.', "error");
            }
        })
    }
    else {
        popupNotification.warning('File size is more than 20 Mb');
        return;
    }
}

function ViewDocuments(id) {

}

function onSelectCase(e) {
    var id = this.element[0].id;//.split('_')[1]
    this.clearAllFiles()
    var fileInfo = e.files[0];
    var wrapper = this.wrapper;

    setTimeout(function () {
        addPreviewDocImage(fileInfo, wrapper, id);
    });
}

function addPreviewDocImage(file, wrapper, id) {
    console.log(file);
    if (file.extension.toLowerCase() != ".png" && file.extension.toLowerCase() != ".jpeg" && file.extension.toLowerCase() != ".jpg" && file.extension.toLowerCase() != ".pdf") {
        kendo.alert('Only png, jpg, jpeg, pdf File supported');
        var upload = $("#" + id).data("kendoUpload");
        upload.removeAllFiles();
        return;
    }
    var raw = file.rawFile;

    var reader = new FileReader();

    if (raw) {
        reader.onloadend = function (e) {

            var image = new Image();

            //Set the Base64 string return from FileReader as source.
            image.src = e.target.result;

            //Validate the File Height and Width.
            image.onload = function () {
                var height = this.height;
                var width = this.width;


                if (width <= 1080) {
                    var preview = $("<img class='image-preview'>").attr("src", this.result);

                    wrapper.find(".k-file[data-uid='" + file.uid + "'] .k-file-group-wrapper")
                        .replaceWith(preview);
                }
                else {
                    kendo.alert('Image Size (Max-Width: 1080 pixels)');
                    var upload = $("#" + id).data("kendoUpload");
                    upload.removeAllFiles();
                    return;
                }


            };

        };

        reader.readAsDataURL(raw);
    }
}

function BindDocumentGrid() {
    $("#gridCaseDocuments").kendoGrid({
        dataSource: {
            data: CaseDocuments
        },
        sortable: true,
        columns: [{
            field: "id",
            title: "ID",
            hidden: true
        }, {
            field: "docTypeName",
            title: "Document Name"

        }, {
            field: "description",
            title: "Description"

        }, {
            template: "#=moment(issuedate).format('LL')#",
            field: "issuedate",
            title: "Issuedate"

        }, {
            //template: "<button class='btn btn-info' onclick='EditDocuments(#:id#)'><span class='k-icon k-i-edit'></span></button> &nbsp;&nbsp;" +
            //    "<button class='btn btn-secondary' onclick='DownloadDocuments(#:id#)'><span class='k-icon k-i-download'></span></button>",
            template: "<button class='btn btn-secondary' onclick='DownloadDocuments(#:id#)'><span class='k-icon k-i-download'></span></button>" + "   " +
                "<button class='btn btn-info' onclick='DeleteDocuments(#:id#)'><span class='fa fa-trash'></span></button> &nbsp;&nbsp;",
            field: "id",
            title: "Action",
            attributes: {
                style: "text-align:center"
            }

        }]
    });
}

function DeleteDocuments(id) {
    var dataObject = new Object();
    dataObject.id = id;

    kendo.confirm("Are You Sure want to Delete this data?")
        .done(function () {
            $.ajax({
                type: "GET",
                url: '/Case/DeleteCaseDocument',
                data: dataObject,
                dataType: 'json',
                success: function (response) {
                    var result = JSON.parse(response);
                    console.log(result)
                    if (result.code == "200") {

                        var grid = $("#gridCaseDocuments").data("kendoGrid");
                        var dataItem = grid.dataSource.get(id);
                        var row = grid.tbody.find("tr[data-uid='" + dataItem.uid + "']");
                        grid.removeRow(row);
                    }
                    else {
                        popupNotification.show(result.message, "error");
                    }
                },
                error: function (error) {
                    popupNotification.show('Error while Delete data.', "error");
                }
            });
            console.log("User accepted");
        })
        .fail(function () {
            /* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("User rejected");
        });
}
function EditDocuments(id) {
    var FilterData = _.filter(CaseDocuments, function (item) { return item.id == id });
    if (FilterData.length > 0) {
        $('#docParentId').html(FilterData[0].id);
        $('#ddlDocumentType').data('kendoComboBox').value(FilterData[0].doctypeid);
        $('#txtIssueDate').val(moment(FilterData[0].issuedate).format('MM/DD/YYYY'));
        $('#txtDocDescription').val(FilterData[0].description);
        $('#txtCaseSection').val(FilterData[0].caseSection)
    }

}

function ClearCaseDocuments() {
    $('#docParentId').html(0);
    $('#ddlDocumentType').data('kendoComboBox').value("");
    $('#txtIssueDate').val("");
   $('#txtDocDescription').val("");
   //$("#caseDocfiles").parents(".t-upload").find(".t-upload-files").remove()
   // $("#caseDocfiles").data("kendoUpload").destroy();
   //$("#caseDocfiles").kendoUpload();
   $(".k-upload-files").remove();
   $(".k-upload-status").remove();
   $(".k-upload.k-header").addClass("k-upload-empty");
   $(".k-upload-button").removeClass("k-state-focused");
    $('#txtCaseSection').val("");
}

function DownloadDocuments(id) {
    DownloadCaseDocumentById(id)
}

function DownloadCaseDocumentById(id) {
    $.ajax({
        url: "/Case/DownloadCaseDocumentById?ID=" + id,
        method: "GET",
        dataType: 'json',
        success: function (data) {
            console.log(data);
            debugger
            var link = document.createElement('a');
            link.href = "/TemporaryFileStorage/CaseDocFiles/Enc_Case_" + data[0].caseId + "_" + data[0].doctypeid + "_" + data[0].id + data[0].filetype;
            link.download = data[0].caseId + ' ' + data[0].docTypeName.trim() + ' (' + (data[0].issuedate == "0001-01-01T00_00_00" ? "" : moment(data[0].issuedate).format('LL')) + ')' + data[0].filetype;
            link.click();
            link.remove();
        }
    });
}