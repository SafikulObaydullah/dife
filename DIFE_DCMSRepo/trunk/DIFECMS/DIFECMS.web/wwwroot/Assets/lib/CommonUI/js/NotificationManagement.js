var UserList = [
    {
        id: 1,
        name: 'Upcoming Hearing Date',
        designation: '',
        department: 'Software Development',
        userType: 'Reminder',
        email: 'admin@gmail.com',
        phone: '8801xxxxxxxxx',
        ministry: 'রাষ্ট্রপতির কার্যালয়',
        section: '',
        org: ''
    },
    {
        id: 2,
        name: 'Upcoming Judgement of ..... Case',
        designation: '',
        department: 'Software Development',
        userType: 'Reminder',
        email: 'external@gmail.com',
        phone: '8801xxxxxxxxx',
        ministry: 'মন্ত্রিপরিষদ বিভাগ',
        section: '',
        org: ''
    }
]

var userTypeList = [
    {
        id: 1,
        name:'DIFE Admin'
    },
    {
        id: 2,
        name: 'External User'
    },
    {
        id: 3,
        name: 'User'
    },
]

var MinistryList = [
    {
        id: 1,
        name:'রাষ্ট্রপতির কার্যালয়'
    },
    {
        id: 2,
        name: 'প্রধানমন্ত্রীর কার্যালয়'
    },
    {
        id: 3,
        name: 'সশস্ত্র বাহিনী বিভাগ'
    },
    {
        id: 4,
        name: 'মন্ত্রিপরিষদ বিভাগ'
    },
    {
        id: 5,
        name: '	কৃষি মন্ত্রণালয়'
    },
]
$(document).ready(function () {
    $("#ddlUserType").kendoDropDownList({
        optionLabel:'Select User Type',
        dataTextField: "name",
        dataValueField: "id",
        dataSource: userTypeList,
        index: 0
    });
    $("#ddlMinistry").kendoComboBox({
        placeholder: "Select Ministry..",
        dataTextField: "name",
        dataValueField: "id",
        dataSource: MinistryList
    });

    UserGrid();

});

function UserGrid() {
    $("#gridUser").kendoGrid({
        dataSource: UserList,
        sortable: true,
        columns: [
            {
                title: "ID",
                field: "id", width: 50
            },
            {
                title: "Title",
                field: "name", width: 120
            },
            {
                title: "Description",
                field: "designation", width: 120
            },
            {
                title: "Type",
                field: "userType", width: 80
            },
            {
                title: "Action",
                template:"<button class='btn btn-success'  title='Edit' onclick='Edit(#:id#)'><span class='k-icon k-i-edit'></span></button><button style='margin-left: 2px;' title='Password Change' class='btn btn-warning' onclick='PasswordChange(#:id#)'><span class='k-icon k-i-reset'></span></button>",
                field: "", width: 110
            },
        ]
    });
}

function Save() {
    var id = $('#spanParentID').html();
    if (id > 0) {
        _.map(UserList, function (o) {
            if (o.id == id) {
                o.name = $('#name').val();
                o.designation = $('#designation').val();
                o.department = $('#department').val();
                o.userType = $('#department').val();
                o.email = $('#email').val();
                o.phone = $('#phone').val();
                o.section = $('#section').val();
                o.org = $('#org').val();
                o.ministry = $("#ddlMinistry").data('kendoComboBox').text();
                o.userType = $("#ddlUserType").data('kendoDropDownList').text();
            }
        });
        popupNotification.success('Updated Sccessfully');

    }
    else {
        var o = new Object();
        o.id = (Math.max.apply(Math, UserList.map(function (o) { return o.id; })) + 1);
        o.name = $('#name').val();
        o.designation = $('#designation').val();
        o.department = $('#department').val();
        o.userType = $('#department').val();
        o.email = $('#email').val();
        o.phone = $('#phone').val();
        o.section = $('#section').val();
        o.org = $('#org').val();
        o.ministry = $("#ddlMinistry").data('kendoComboBox').text();
        o.userType = $("#ddlUserType").data('kendoDropDownList').text();
        UserList.push(o);
        popupNotification.success('Saved Sccessfully');

    }   
    UserGrid();
    $('#mdlUserReg').modal('hide')
}

function Edit(id) {
    $('#spanParentID').html(id);
    var FilterData = _.filter(UserList, function (item) { return item.id == id });
    $('#name').val(FilterData[0].name);
    $('#designation').val(FilterData[0].designation);
    $('#department').val(FilterData[0].department);
    $('#email').val(FilterData[0].email);
    $('#phone').val(FilterData[0].phone);
    $('#section').val(FilterData[0].section);
    $('#org').val(FilterData[0].org);
    $("#ddlMinistry").data('kendoComboBox').text(FilterData[0].ministry);
    $("#ddlUserType").data('kendoDropDownList').text(FilterData[0].userType);
    $('#mdlUserReg').modal('toggle')
}
function AddNew() {
    $('#spanParentID').html(0);
    $('#name').val('');
    $('#designation').val('');
    $('#department').val('');
    $('#email').val('');
    $('#phone').val('');
    $('#section').val('');
    $('#org').val('');
    $("#ddlMinistry").data('kendoComboBox').text('');
    $('#mdlUserReg').modal('toggle')

}
function PasswordChange(id) {
    $('#mdlPassChange').modal('toggle')
}
function ChangePassword() {
    popupNotification.info('Password Changed Successfully...');
    $('#mdlPassChange').modal('hide')

}