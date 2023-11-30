var CaseSubList = [
    {
        id: 1,
        name: 'Legal Culture of Bangladesh',
        description: 'Test',
        isActive: 'True'

    },
    {
        id: 2,
        name: 'Right to Human Life in The Constitutional Context of Bangladesh: Emphasis on Slum',
        description: 'Test',
        isActive: 'True'
    }
]


$(document).ready(function () {

    CaseSubGrid();

});


function CaseSubGrid() {
    $("#gridUser").kendoGrid({
        dataSource: CaseSubList,
        sortable: true,
        columns: [
            {
                title: "ID",
                field: "id", width: 50
            },

            {
                title: "Case Subject",
                field: "name", width: 120
            },
           
            {
                title: "Description",
                field: "description", width: 80
            },
            {
                title: "Status",
                field: "isActive", width: 80
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
    var id = $('#spanParentID').html();
    if (id > 0) {
        _.map(CaseSubList, function (o) {
            if (o.id == id) {
                o.name = $('#name').val();
                o.description = $('#description').val();

            }
        });
        popupNotification.success('Updated Sccessfully');

    }
    else {
        var o = new Object();
        o.id = (Math.max.apply(Math, CaseSubList.map(function (o) { return o.id; })) + 1);
        o.name = $('#name').val();
        o.description = $('#description').val();
        o.isActive = $("#eq1").is(":checked") ? 'True' : 'False';
        CaseSubList.push(o);
        popupNotification.success('Saved Sccessfully');

    }
    CaseSubGrid();
    $('#mdlUserReg').modal('hide')
}

function Edit(id) {
    $('#spanParentID').html(id);
    var FilterData = _.filter(CaseSubList, function (item) { return item.id == id });
    $('#name').val(FilterData[0].name);
    $('#description').val(FilterData[0].description);
   

    $('#mdlUserReg').modal('toggle')
}
function AddNew() {
    $('#spanParentID').html(0);
    $('#name').val('');
    $('#description').val('');
   
    $('#mdlUserReg').modal('toggle');

}
