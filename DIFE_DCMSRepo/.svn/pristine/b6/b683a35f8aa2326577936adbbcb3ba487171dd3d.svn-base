var DataA = [];
var DataJ = [];
var CategoryMonth = [];
$(document).ready(function () {
    BindInitialDDL();
    GetDashboardPageData();
})

function BindInitialDDL() {
    $("#ddlMinistryDepartment").kendoComboBox({
        placeholder: 'Select Ministry/Department',
        dataTextField: "ministryOrDepartmentName",
        dataValueField: "ministryOrDepartmentId",
        dataSource: [],
        filter: "contains",
        change: onMinistryDepartmentChange
    });

    $("#ddlConOffice").kendoComboBox({
        placeholder: 'All Office',
        dataTextField: "officeName",
        dataValueField: "officeId",
        dataSource: [],
        filter: "contains",
        change: onConOffChange
    });


    $("#ddlCaseCategory").kendoComboBox({
        placeholder: 'All Case Category',
        dataTextField: "nameECourtTypeName",
        dataValueField: "id",
        dataSource: [],
        filter: "contains",
        change: onCaseCategoryChange
    });
}

function onMinistryDepartmentChange(e) {
    if (this.dataItem() == undefined) {
        $("#ddlConOff").data('kendoComboBox').dataSource.data([]);
        $("#ddlConOff").data('kendoComboBox').value('');
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

    $("#ddlConOffice").data('kendoComboBox').dataSource.data([])
    $("#ddlConOffice").data('kendoComboBox').value('')
    $("#ddlConOffice").data('kendoComboBox').dataSource.data(FilterData)

    CardData()
}

function onConOffChange(e) {

    CardData()
}

function onCaseCategoryChange(e) {
    GetMonthlyCaseSummaryByCategory()
}


function GetDashboardPageData() {
    $.ajax({
        url: "/Case/GetDashboardPageData",
        method: "GET",
        dataType: "json",
        data: {},
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
   
            $("#ddlMinistryDepartment").data('kendoComboBox').dataSource.data(filterDepartmentData);
            $("#ddlMinistryDepartment").data('kendoComboBox').select(0);
           // $("#ddlMinistryDepartment").data("kendoComboBox").trigger("change");

            var minstryOrDeptId = $("#ddlMinistryDepartment").data('kendoComboBox').value()
            var FilterData = _.filter(officeAndMinistryOrDepartmentList, function (item) { return item.ministryOrDepartmentId == minstryOrDeptId });

            if (FilterData.length > 1) {
                var obj = {
                    officeId: 0,
                    officeName: "All"
                }
                FilterData.unshift(obj)
            }
            $("#ddlConOffice").data('kendoComboBox').dataSource.data([])
            $("#ddlConOffice").data('kendoComboBox').value('')
            $("#ddlConOffice").data('kendoComboBox').dataSource.data(FilterData)
            $("#ddlConOffice").data('kendoComboBox').select(0);

            CaseTypeList = data.caseType
            CaseCategoryList = data.casecategory
            CaseCategoryList = _.map(CaseCategoryList, function (category) {
                category.nameECourtTypeName = category.nameE + " (" + category.courtTypeName + ")";
                return category;
            })

            $("#ddlCaseCategory").data('kendoComboBox').dataSource.data(CaseCategoryList);

            MonthlyCaseSummaryList = data.monthlycasesummary;

            MonthlyCaseSummaryList.map(obj => {
                // Push the value of the 'id' key to the 'idArray'
                DataA.push(obj.aCount);
                DataJ.push(obj.jCount);
                CategoryMonth.push(obj.aMonth);
            });

            /*console.log(DataA, DataJ, CategoryMonth)*/

            CardAndPriority = data.cardAndPriority;
            $('#TotalUpcoming').html(CardAndPriority.totalUpcoming);
            $('#HearingPending').html(CardAndPriority.hearingPending);
            $('#CaseActivityUpdatePending').html(CardAndPriority.caseActivityUpdatePending);
            $('#MyUpcoming').html(CardAndPriority.myUpcoming);

            PriorityList = [{
                category: "High",
                value: CardAndPriority.highPriority,
                color: "#9ac70a"
            }, {
                category: "Normal",
                value: CardAndPriority.normalPriority,
                color: "#8f8fff"
            }, {
                category: "Low",
                value: CardAndPriority.lowPriority,
                color: "#1A75b6"
            }];

            createChart();
            createBarChart();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error:", textStatus, errorThrown);
        }
    })
}

function createBarChart() {
    $("#barChart").kendoChart({
        title: {
            text: "Monthly Case Issue And Close"
        },
        legend: {
            position: "top"
        },
        seriesDefaults: {
            type: "column"
        },
        series: [{
            name: "Issue",
            data: DataA,
            color: "#9ac70a"
        }, {
            name: "Close",
            data: DataJ,
            color: "#1A75b6"
        }],
        valueAxis: {
            labels: {
                format: "{0}"
            },
            line: {
                visible: false
            },
            axisCrossingValue: 0
        },
        categoryAxis: {
            categories: CategoryMonth,
            line: {
                visible: false
            },
            labels: {

            }
        },
        tooltip: {
            visible: true,
            format: "{0}",
            template: "#= category #: \n #= value#"
        }
    });
}

function createChart() {
    $("#chart").kendoChart({
        title: {
            position: "top",
            text: "Case Priority"
        },
        legend: {
            visible: false
        },
        chartArea: {
            background: ""
        },
        seriesDefaults: {
            labels: {
                visible: true,
                background: "transparent",
                template: "#= category #: \n #= value#%"
            }
        },
        series: [{
            type: "pie",
            /*startAngle: 150,*/
            data: PriorityList
        }],
        tooltip: {
            visible: true,
            format: "{0}%"
        }
    });
}

function CardData() {
    var data = new Object();
    data.ministryOrDeptId = $("#ddlMinistryDepartment").data('kendoComboBox').value() == "" ? 0 : $("#ddlMinistryDepartment").data('kendoComboBox').value();
    data.office = $("#ddlConOffice").data('kendoComboBox').value() == "" ? 0 : $("#ddlConOffice").data('kendoComboBox').value();
    blockUI()
    $.ajax({
        url: "/Case/GetDashboardPageDataByParam",
        method: "GET",
        dataType: "json",
        data: data,
        success: function (data) {
            unblockUI()

            console.log(data);

            CardAndPriority = [];
            CardAndPriority = data.cardAndPriority;
            $('#TotalUpcoming').html(CardAndPriority.totalUpcoming);
            $('#HearingPending').html(CardAndPriority.hearingPending);
            $('#CaseActivityUpdatePending').html(CardAndPriority.caseActivityUpdatePending);
            $('#MyUpcoming').html(CardAndPriority.myUpcoming);

            PriorityList = [];
            PriorityList = [{
                category: "High",
                value: CardAndPriority.highPriority,
                color: "#9ac70a"
            }, {
                category: "Normal",
                value: CardAndPriority.normalPriority,
                color: "#8f8fff"
            }, {
                category: "Low",
                value: CardAndPriority.lowPriority,
                color: "#1A75b6"
            }];

            createChart();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            unblockUI()

            console.log("Error:", textStatus, errorThrown);
        }
    })
}

function GetMonthlyCaseSummaryByCategory() {
    var data = new Object();
    data.caseCat = $("#ddlCaseCategory").data('kendoComboBox').value() == "" ? 0 : $("#ddlCaseCategory").data('kendoComboBox').value();
    blockUI()
    $.ajax({
        url: "/Case/GetMonthlyCaseSummaryByCategory",
        method: "GET",
        dataType: "json",
        data: data,
        success: function (data) {
            unblockUI();
            //console.log("Monthly Case Summary")
            //console.log(data)
            MonthlyCaseSummaryList = []
            MonthlyCaseSummaryList = data.monthlycasesummary;
            MonthlyCaseSummaryList.map(obj => {
                // Push the value of the 'id' key to the 'idArray'
                DataA.push(obj.aCount);
                DataJ.push(obj.jCount);
                CategoryMonth.push(obj.aMonth + '(' + obj.aYear + ')');
            });
            createBarChart();

        },
        error: function (jqXHR, textStatus, errorThrown) {
            unblockUI()

            console.log("Error:", textStatus, errorThrown);
        }
    })
}

function Get() {

}

function Report(type) {
    var office = $("#ddlConOffice").data('kendoComboBox').value();
    var url = '/Reports/DashboardCardReport?OfficeId=' + office + '&ReportType=' + type;
    window.open(url, '_blank');
}