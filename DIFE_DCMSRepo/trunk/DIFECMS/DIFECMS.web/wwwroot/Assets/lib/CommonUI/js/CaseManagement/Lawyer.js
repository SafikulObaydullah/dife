﻿
var LawyerDistrictList = []
var DistrictList = []

$(document).ready(function () {
   LawyerLoad();
   $("#cmbDistrict").kendoComboBox({
      dataTextField: "districtName", 
      dataValueField: "id",
      dataSource: [],
      filter: "contains",
      suggest: true,
      placeholder: 'Select District'
   });
   
});

function LawyerLoad() {

   $.ajax({
      url: "/Lawyer/GetLawyerData",
      method: "GET",
      dataType: "json",
      success: function (data) {
       
         LawyerDistrictList = data.lawyerdis;
         DistrictList = data.district;
         $("#cmbDistrict").data('kendoComboBox').dataSource.data([]);
         $('#cmbDistrict').data('kendoComboBox').dataSource.data(DistrictList);
         LawyerDataBind();
      },
      error: function (jqXHR, textStatus, errorThrown) {
         console.log("Error:", textStatus, errorThrown);
      }
   });

}
function LawyerDataBind() {
   $("#gridTable").kendoGrid({
      dataSource: LawyerDistrictList,
      sortable: true,
      toolbar: ["search"],
      search: {
         fields: ["name", "degree"]
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
            title: "Lawer Name",
            field: "name", width: 90

         },
         {
            title: "Lawyer Degree",
            field: "degree", width: 90
         },
         {
            title: "District",
            field: "districtName", width: 120
         },
         {
            title: "Address",
            field: "address", width: 120
         },
         {
            title: "Designation",
            field: "designation", width: 120
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
    comboBox = $("#cmbDistrict").data("kendoComboBox");
   var o = new Object();
   var validate = true;
   validate = Validate();
   if (validate == true) {
      o.id = $('#spanParentID').html();
      o.name = $('#name').val();
      o.degree = $('#degree').val();
      o.districtID = $('#cmbDistrict').data('kendoComboBox').value();
      o.address = $('#address').val();
      o.designation = $('#designation').val();
      o.isActive = $('#isActive').is(':checked') ? true : false;
      blockUI();
      $.ajax({
         url: "/Lawyer/LawyerSave",
         type: "POST",
         dataType: "json",
         data: o,
         success: function (data) {
            unblockUI();
            if (data.code == 200) {
               toastr.success(data.message, 'Success');
               LawyerLoad();
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
   var FilterData = _.filter(LawyerDistrictList, function (item) { return item.id == id });
   $('#name').val(FilterData[0].name);
   $('#degree').val(FilterData[0].degree);
   $('#cmbDistrict').data('kendoComboBox').value(FilterData[0].id);
   $('#address').val(FilterData[0].address);
   $('#designation').val(FilterData[0].designation);
   FilterData[0].isActive == false ? $('#isActive').prop('checked', false) : $('#isActive').prop('checked', true)
   $('#mdlUserReg').modal('toggle')
}

function AddNew() {
   $('#spanParentID').html(0);
   $('#name').val('');
   $('#degree').val('');
   $('#address').val('');
   $('#designation').val('');
   $('#mdlUserReg').modal('toggle');
}

function Validate() {
   if ($("#cmbDistrict").data('kendoComboBox').value() == "" || $("#cmbDistrict").data('kendoComboBox').selectedIndex == -1) {
      $("#cmbDistrict").data('kendoComboBox').focus();
      $("#cmbDistrict").data('kendoComboBox').open();
      popupNotification.warning('Please input District Name');
      return false;
   }
   if ($('#name').val() == "") {
      $('#name').focus();
      popupNotification.warning('Please input Lawyer name');
      return false;
   }
   if ($('#degree').val() == "") {
      $('#degree').focus();
      popupNotification.warning('Please input Lawyer Degree name');
      return false;
   }
   if ($('#address').val() == "") {
      $('#address').focus();
      popupNotification.warning('Please input valid address');
      return false;
   }
   return true;
}