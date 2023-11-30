var GridData = [
    {
        id: 1, type: ' Supreme Court', caseNo: 'Civil Appeal 175/2018(Judgment)', caseSubject: 'Crime ', description: 'Whenever an application for bail is made to a court, the first question that it has to decide is whether the offence for which the accused is being prosecuted is bailable or otherwise. If the offence is bailable, bail will be granted under section 496 of the Code of Criminal Procedure without more ado, but if the offence is non- bailable further consideration will arise and the court will decide the question of bail in light of those consideration such as nature and seriousness of the offence', supplierAddress: 'Dhaka', importContry: 'Argentina', billno: 'Bill-1', billDate: 'January', qtySum: 5500, note: 'OK' },
    { id: 2, type: 'High Court', caseNo: 'Civil Appeal 175/2018(Judgment)', caseSubject: 'Crime', description: 'Whenever an application for bail is made to a court, the first question that it has to decide is whether the offence for which the accused is being prosecuted is bailable or otherwise. If the offence is bailable, bail will be granted under section 496 of the Code of Criminal Procedure without more ado, but if the offence is non- bailable further consideration will arise and the court will decide the question of bail in light of those consideration such as nature and seriousness of the offence', supplierAddress: 'CTG', importContry: 'Argentina', billno: 'Bill-1', billDate: 'January', qtySum: 2000, note: 'OK' },
    { id: 3, type: 'District Court', caseNo: 'Civil Appeal 175/2018(Judgment)', caseSubject: 'Crime', description: 'Whenever an application for bail is made to a court, the first question that it has to decide is whether the offence for which the accused is being prosecuted is bailable or otherwise. If the offence is bailable, bail will be granted under section 496 of the Code of Criminal Procedure without more ado, but if the offence is non- bailable further consideration will arise and the court will decide the question of bail in light of those consideration such as nature and seriousness of the offence', supplierAddress: 'Khulna', importContry: 'Argentina', billno: 'Bill-1', billDate: 'February', qtySum: 9200, note: 'OK' },
    { id: 4, type: 'subordinate court', caseNo: 'Civil Appeal 21/2011(Judgment)', caseSubject: 'Crime', description: 'Whenever an application for bail is made to a court, the first question that it has to decide is whether the offence for which the accused is being prosecuted is bailable or otherwise. If the offence is bailable, bail will be granted under section 496 of the Code of Criminal Procedure without more ado, but if the offence is non- bailable further consideration will arise and the court will decide the question of bail in light of those consideration such as nature and seriousness of the offence', supplierAddress: 'Dhaka', importContry: 'Argentina', billno: 'Bill-1', billDate: 'March', qtySum: 1200, note: 'OK' },
  //  { id: 5, type: 'SKF  Pharmaceuticals Ltd - Mirpur (L-001)', purpose: 'Fire retardant', irc: '123455', supplierName: 'Supplier-5', supplierAddress: 'Dhaka', importContry: 'Argentina', billno: 'Bill-1', billDate: 'April', qtySum: 25500, note: 'OK' },
]

var caseCategory = [{ "name": "Crime", "value": "01" },
{ "name": "Test: 3", "value": "02" }];
var courtType = [{ "name": "Supreme Court", "value": "01" },
    { "name": "High Court", "value": "02" },
    { "name": "District Court", "value": "03" }];
$(document).ready(function () {
    Search();
    
});

function Search() {
    $("#tblCaseList").empty();
    $('#tblCaseList').show();

    var element = $("#tblCaseList").kendoGrid({
        dataSource: {
            type: "odata",
            data: GridData,
        },
        scrollable: {
            endless: true
        },      
        dataBound: function () {
            
        },
        columns:
            [
                {
                    field: "id",
                    title: "ID",
                    width: 30
                },
                {
                    field: "type",
                    title: "Court Type",
                    width: 100
                }, 
                {
                    field: "caseNo",
                    title: "Case No",
                    width: 100
                },
                {
                    field: "caseSubject",
                    title: "Subject Case",
                    width: 100
                },
                {
                    field: "description",
                    title: "Title/Description",
                    width: 300
                },
                     
              
                {
                    field: "id",
                    title: "Action",
                    template: "<button class='k-button info' onclick='Edit(\"#: id #\")'><span class='k-icon k-i-edit'></span></button><button class='k-button secondary' onclick='Report(\"#: id #\")'><span class='k-icon k-i-pdf'></span></button>",
                    width: 50
                }
            ]
    });

  
}

function Edit(id) {
    var url = '/CaseManagement/CaseEntry?ID=' + id;
    window.open(url, '_blank');
}

function Report(id) {
    var url = '/Reports/rpt_CaseReport?ID=' + id;
    window.open(url, '_blank');
}
