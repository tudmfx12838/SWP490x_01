// /

$(function () {
  var $table = $("#table");

  // var json = "<%- JSON.stringify(products) %>";
  var json = $("#admin-products-page").attr("products-data");
  var myArr = eval(json); //Json.parse(json)
  // alert(json);

  $table.bootstrapTable({ data: myArr });
});
