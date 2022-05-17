var $table = $("#table");

$('#addItemModal').find('#hasCoupon_cbx').change(function(){
  if(this.checked){
    $('#addItemModal').find('#coupon').prop('disabled', false);
  }else{
    $('#addItemModal').find('#coupon').prop('disabled', true);
  }
});



$(function () {
    // var json = "<%- JSON.stringify(products) %>";
    var json = $('#admin-events-page').attr('events-data');
    // alert(json);
    var myArr = eval(json); //Json.parse(json)
  
    $table.bootstrapTable({ data: myArr });
  
    // $table.on(
    //   "check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table",
    //   function () {
    //     $btn_delete.prop(
    //       "disabled",
    //       !$table.bootstrapTable("getSelections").length
    //     );
    //   }
    // );
    // $btn_delete.click(function () {
    //   var products = $.map(
    //     $table.bootstrapTable("getSelections"),
    //     function (row) {
    //       return {
    //         _id: row._id,
    //         title: row.title,
    //       };
    //     }
    //   );
  
    //   var productTitle = "";
    //   var productId = [];
    //   for (let i = 0; i < products.length; i++) {
    //     if (i == products.length - 1) {
    //       productTitle += products[i].title;
    //     } else {
    //       productTitle += products[i].title + ", ";
    //     }
    //     productId.push(products[i]._id);
    //   }
  
    //   $("#confirmDeleteProductModal").find(".title").text(productTitle);
    //   $("#confirmDeleteProductModal").find("#_id").val(productId);
    //   $("#confirmDeleteProductModal").modal("show");
  
    //   $btn_delete.prop("disabled", true);
    // });
  });