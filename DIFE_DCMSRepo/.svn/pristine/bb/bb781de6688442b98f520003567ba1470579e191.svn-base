var officeAndMinistryOrDepartmentList = [];
MinistryOrDeparmentList = [];
OfficeList = [];
OfficeAndCourtWiseReportList = [];
tempArray = [];
tempArra2 = [];

$(document).ready(function () {
    $('#ex0').kendoExpansionPanel({
        title: 'Search Panel',
        expanded: true
    });
    $("#cmbMinistryOrDepartment").kendoComboBox({
        placeholder: 'Select Ministry/Department',
        dataTextField: "ministryOrDepartmentName",
        dataValueField: "ministryOrDepartmentId",
        dataSource: [],
        filter: "contains",
        change: onMinistryDepartmentChange
    });
    $("#cmbOffice").kendoComboBox({
        dataTextField: "officeName",
        dataValueField: "officeId",
        dataSource: [],
        filter: "contains",
        suggest: true,
        placeholder: 'Select Office'
    });
    var dt = new Date();
    var yearTo = dt.getFullYear();
    var yearFrom = dt.getFullYear()-2;
    $('#issueDateFrom').val(yearFrom);
    $('#issueDateTo').val(yearTo);
    $(".Kyear").bind("focus", function () {
        $(this).data("kendoDatePicker").open();
    });
    BindDropdownData();
   
})
function onMinistryDepartmentChange(e) {
    if (this.dataItem() == undefined) {
        $("#cmbOffice").data('kendoComboBox').dataSource.data([]);
        $("#cmbOffice").data('kendoComboBox').value('');
        return;
    }
    var id = this.dataItem().ministryOrDepartmentId;
    var FilterData = _.filter(officeAndMinistryOrDepartmentList, function (item) { return item.ministryOrDepartmentId == id });

    if (FilterData.length > 1) {
        var obj = {
            officeId: 0,
            officeName: "All Office"
        }
        FilterData.unshift(obj)
    }

    $("#cmbOffice").data('kendoComboBox').dataSource.data([])
    $("#cmbOffice").data('kendoComboBox').value('')
    $("#cmbOffice").data('kendoComboBox').dataSource.data(FilterData)
    $("#cmbOffice").data('kendoComboBox').select(0);

}
function BindDropdownData() {
    $.ajax({
        url: '/Report/OfficeAndCourtWiseReport',
        method: 'GET',
        dataType: 'json',
        success: function (data) {

            officeAndMinistryOrDepartmentList = [];
            officeAndMinistryOrDepartmentList = data.officeAndMinistryOrDepartment;

            var filterDepartmentData = _.uniq(officeAndMinistryOrDepartmentList, function (itm) { return itm.ministryOrDepartmentId, itm.ministryOrDepartmentName });
            if (filterDepartmentData.length > 1) {
                var obj = {
                    ministryOrDepartmentId: 0,
                    ministryOrDepartmentName: "All Department"
                }
                filterDepartmentData.unshift(obj)
            }
            $("#cmbMinistryOrDepartment").data('kendoComboBox').dataSource.data([])
            $("#cmbMinistryOrDepartment").data('kendoComboBox').value('')
            $("#cmbMinistryOrDepartment").data('kendoComboBox').dataSource.data(filterDepartmentData);
            $("#cmbMinistryOrDepartment").data('kendoComboBox').select(0);
            // $("#ddlMinistryDepartment").data("kendoComboBox").trigger("change");

            var minstryOrDeptId = $("#cmbMinistryOrDepartment").data('kendoComboBox').value()
            var FilterData = _.filter(officeAndMinistryOrDepartmentList, function (item) { return item.ministryOrDepartmentId == minstryOrDeptId });

            if (FilterData.length > 1) {
                var obj = {
                    officeId: 0,
                    officeName: "All Office"
                }
                FilterData.unshift(obj)
            }
            $("#cmbOffice").data('kendoComboBox').dataSource.data([])
            $("#cmbOffice").data('kendoComboBox').value('')
            $("#cmbOffice").data('kendoComboBox').dataSource.data(FilterData)
            $("#cmbOffice").data('kendoComboBox').select(0);
           
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error:", textStatus, errorThrown);
        }
    })
}


function SearchFilter() {
   
    var IssueYearFrom = $('#issueDateFrom').val();
    var IssueYearTo = $('#issueDateTo').val();
    var MinistryOrDepartmentId = $("#cmbMinistryOrDepartment").data('kendoComboBox').value();
    var OfficeId = $("#cmbOffice").data('kendoComboBox').value();
    var url = '/Report/OfficeAndCourtWiseReportMaster?OfficeId=' + OfficeId + '&MinistryOrDepartmentId=' + MinistryOrDepartmentId + '&IssueYearFrom=' + $("#issueDateFrom").val() + '&IssueYearTo=' + $("#issueDateTo").val();
    window.open(url, '_blank');
    //BindData(o);
}
function ReportDateLoad() {
    var o = new Object();
    o.MinistryOrDepartmentId = $("#cmbMinistryOrDepartment").data('kendoComboBox').value('');
    o.OfficeId = $("#cmbOffice").data('kendoComboBox').value('');
    o.IssueYearFrom = 0;    // $("#issueDateFrom").val();
    o.IssueYearTo = 0;   // $("#issueDateTo").val();
    BindData(o);
}


