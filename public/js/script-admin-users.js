var oldRowValue = {
  email: "",
  password: "",
  permission: "",
  name: "",
  doB: null,
  phoneNumber: null,
  postcode: null,
  address: null,
  point: null,
  imageUrl: "",
};

var newRowValue = {
  email: "",
  password: "",
  permission: "",
  name: "",
  doB: null,
  phoneNumber: null,
  postcode: null,
  address: null,
  point: null,
  imageUrl: "",
};

$(function () {
  var $table = $("#table");
  var $btn_delete = $("#btn-delete");
  $btn_delete.prop("disabled", true);

  // var json = "<%- JSON.stringify(products) %>";
  var json = $("#admin-users-page").attr("users-data");
  // alert(json);
  var myArr = eval(json); //Json.parse(json)

  $table.bootstrapTable({ data: myArr });

  $table.on(
    "check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table",
    function () {
      $btn_delete.prop(
        "disabled",
        !$table.bootstrapTable("getSelections").length
      );
    }
  );

  $btn_delete.click(function () {
    var users = $.map($table.bootstrapTable("getSelections"), function (row) {
      return {
        _id: row._id,
        name: row.name,
      };
    });

    var userName = "";
    var userId = [];
    for (let i = 0; i < users.length; i++) {
      if (i == users.length - 1) {
        userName += users[i].name;
      } else {
        userName += users[i].name + ", ";
      }
      userId.push(users[i]._id);
    }

    $("#confirmDeleteItemModal").find(".name").text(userName);
    $("#confirmDeleteItemModal").find("#_id").val(userId);
    $("#confirmDeleteItemModal").modal("show");

    $btn_delete.prop("disabled", true);
  });

  $("#editItemModal, #detailItemModal")
    .find("#btn-cancel, .btn-close")
    .click(function () {
      oldRowValue = {
        title: "",
        startDate: null,
        endDate: null,
        hasCoupon: null,
        coupon: "",
        discount: null,
        description: "",
        imageUrl: "",
      };

      newRowValue = {
        title: "",
        startDate: null,
        endDate: null,
        hasCoupon: null,
        coupon: "",
        discount: null,
        description: "",
        imageUrl: "",
      };
    });

  $("#confirmDeleteItemModal")
    .find("#btn-cancel, .btn-close")
    .click(function () {
      $btn_delete.prop("disabled", false);
      // $table.bootstrapTable('uncheckAll');
    });

  $("#detailItemModal")
    .find("#btn-editItem")
    .click(function () {
      $("#editItemModal").find("#email").val(oldRowValue.email);
      //   $("#editItemModal").find("#password").val(row.password);
      $("#editItemModal").find("#permission").val(oldRowValue.permission);
      $("#editItemModal").find("#name").val(oldRowValue.name);
      $("#editItemModal").find("#doB").val(oldRowValue.doB);
      $("#editItemModal").find("#phoneNumber").val(oldRowValue.phoneNumber);
      $("#editItemModal").find("#postcode").val(oldRowValue.postcode);
      $("#editItemModal").find("#address").val(oldRowValue.address);
      $("#editItemModal").find("#point").val(oldRowValue.point);
      $("#editItemModal").find("#_id").val(oldRowValue._id);
      //   alert(JSON.stringify(oldRowValue));
    });

  $("#confirmEditItemModal").on("shown.bs.modal", function (event) {
    newRowValue = {
      _id: $("#editItemModal").find("#_id").val(),
      email: $("#editItemModal").find("#email").val(),
      password: $("#editItemModal").find("#password").val(),
      permission: $("#editItemModal").find("#permission").val(),
      name: $("#editItemModal").find("#name").val(),
      doB: $("#editItemModal").find("#doB").val(),
      phoneNumber: $("#editItemModal").find("#phoneNumber").val(),
      postcode: $("#editItemModal").find("#postcode").val(),
      address: $("#editItemModal").find("#address").val(),
      point: $("#editItemModal").find("#point").val(),
      imageUrl: $("#editItemModal").find("#image").val(),
      // imageUrl: $('#editProductModal').find('#image').prop('files')[0],
    };

    // alert('newRowValue ' +  JSON.stringify(newRowValue) + '\n oldRowValue' + JSON.stringify(oldRowValue));

    if (String(newRowValue.email) === String(oldRowValue.email)) {
      $("#confirmEditItemModal")
        .find(".email")
        .text(oldRowValue.email)
        .css("color", "black");
    } else {
      $("#confirmEditItemModal")
        .find(".email")
        .text(oldRowValue.email + "  -->  " + newRowValue.email)
        .css("color", "red");
    }

    if (String(newRowValue.password) === "") {
      $("#confirmEditItemModal")
        .find(".password")
        .text("Mật khẩu không đổi")
        .css("color", "black");
    } else {
      $("#confirmEditItemModal")
        .find(".password")
        .text("Thay đổi mật khẩu mới")
        .css("color", "red");
    }

    if (String(newRowValue.permission) === String(oldRowValue.permission)) {
      $("#confirmEditItemModal")
        .find(".permission")
        .text(oldRowValue.permission)
        .css("color", "black");
    } else {
      $("#confirmEditItemModal")
        .find(".permission")
        .text(oldRowValue.permission + "  -->  " + newRowValue.permission)
        .css("color", "red");
    }

    if (String(newRowValue.name) === String(oldRowValue.name)) {
      $("#confirmEditItemModal")
        .find(".name")
        .text(oldRowValue.name)
        .css("color", "black");
    } else {
      $("#confirmEditItemModal")
        .find(".name")
        .text(oldRowValue.name + "  -->  " + newRowValue.name)
        .css("color", "red");
    }

    if (String(newRowValue.doB) === String(oldRowValue.doB)) {
      $("#confirmEditItemModal")
        .find(".doB")
        .text(oldRowValue.doB)
        .css("color", "black");
    } else {
      $("#confirmEditItemModal")
        .find(".doB")
        .text(oldRowValue.doB + "  -->  " + newRowValue.doB)
        .css("color", "red");
    }

    if (String(newRowValue.phoneNumber) === String(oldRowValue.phoneNumber)) {
      $("#confirmEditItemModal")
        .find(".phoneNumber")
        .text(oldRowValue.phoneNumber)
        .css("color", "black");
    } else {
      $("#confirmEditItemModal")
        .find(".phoneNumber")
        .text(oldRowValue.phoneNumber + "  -->  " + newRowValue.phoneNumber)
        .css("color", "red");
    }

    if (String(newRowValue.postcode) === String(oldRowValue.postcode)) {
      $("#confirmEditItemModal")
        .find(".postcode")
        .text(oldRowValue.postcode)
        .css("color", "black");
    } else {
      $("#confirmEditItemModal")
        .find(".postcode")
        .text(oldRowValue.postcode + "  -->  " + newRowValue.postcode)
        .css("color", "red");
    }

    if (String(newRowValue.address) === String(oldRowValue.address)) {
      $("#confirmEditItemModal")
        .find(".address")
        .text(oldRowValue.address)
        .css("color", "black");
    } else {
      $("#confirmEditItemModal")
        .find(".address")
        .text(oldRowValue.address + "  -->  " + newRowValue.address)
        .css("color", "red");
    }

    if (String(newRowValue.point) === String(oldRowValue.point)) {
      $("#confirmEditItemModal")
        .find(".point")
        .text(oldRowValue.point)
        .css("color", "black");
    } else {
      $("#confirmEditItemModal")
        .find(".point")
        .text(oldRowValue.point + "  -->  " + newRowValue.point)
        .css("color", "red");
    }

    // // // alert($('#editProductModal').find('#image').val().replace("C:\\fakepath\\", "images\/"));
    // // // alert(oldRowValue.imageUrl);
    if (newRowValue.imageUrl) {
      const newImage = newRowValue.imageUrl.replace(
        "C:\\fakepath\\",
        "images/"
      );
      const oldImage = oldRowValue.imageUrl;
      if (newImage === oldImage || newImage === "") {
        $("#confirmEditItemModal")
          .find(".image")
          .text(oldRowValue.imageUrl)
          .css("color", "black");
      } else {
        $("#confirmEditItemModal")
          .find(".image")
          .text(oldRowValue.imageUrl + "  -->  " + newImage)
          .css("color", "red");
      }
    } else {
      $("#confirmEditItemModal")
        .find(".image")
        .text(oldRowValue.imageUrl)
        .css("color", "black");
    }

    if (String(newRowValue._id) === String(oldRowValue._id)) {
      $("#confirmEditItemModal").find("#_id").val(oldRowValue._id);
    } else {
      $("#confirmEditItemModal").find("#_id").val(oldRowValue._id);
    }
  });

  //Submit editproduct form
  $("#confirmEditItemModal")
    .find("#btn-submitConfirmEditItem")
    .click(function () {
      $("#form-editItemModal").submit();
    });
});

window.actionEditUserEvents = {
  "click .btn-editItem": function (e, value, row, index) {
    var doB_obj = new Date(row.doB);
    var doB_day =
      doB_obj.getDate() < 10 ? "0" + doB_obj.getDate() : doB_obj.getDate();
    var doB_month =
      doB_obj.getMonth() + 1 < 10
        ? "0" + (doB_obj.getMonth() + 1)
        : doB_obj.getMonth() + 1;
    var doB = doB_obj.getFullYear() + "-" + doB_month + "-" + doB_day;

    const postcode = row.address.substr(1, 7);
    const address = row.address.substr(9, row.address.length - 1);

    //   // if (oldRowValue._id === undefined) {

    $("#editItemModal").find("#email").val(row.email);
    //   $("#editItemModal").find("#password").val(row.password);
    $("#editItemModal").find("#permission").val(row.permission);
    $("#editItemModal").find("#name").val(row.name);
    $("#editItemModal").find("#doB").val(doB);
    $("#editItemModal").find("#phoneNumber").val(row.phoneNumber);
    $("#editItemModal").find("#postcode").val(postcode);
    $("#editItemModal").find("#address").val(address);
    $("#editItemModal").find("#point").val(row.point);
    $("#editItemModal").find("#_id").val(row._id);
    // $("#editItemModal").find("#imageUrl").val(row.imageUrl);

    oldRowValue = {
      _id: row._id,
      email: row.email,
      // password: row.password,
      permission: row.permission,
      name: row.name,
      doB: doB,
      phoneNumber: row.phoneNumber,
      postcode: postcode,
      address: address,
      point: row.point,
      imageUrl: row.imageUrl,
    };
    // } else {
    // $("#editItemModal").find("#title").val(oldRowValue.title);
    // $("#editItemModal").find("#startDate").val(oldRowValue.startDate);
    // $("#editItemModal").find("#endDate").val(oldRowValue.endDate);

    // $("#editItemModal").find("#hasCoupon").val(oldRowValue.hasCoupon);
    // if (oldRowValue.hasCoupon === false) {
    //   $("#editItemModal").find("#coupon").prop("disabled", true);
    //   $("#editItemModal").find("#hasCoupon_cbx").prop("checked", false);
    // } else {
    //   $("#editItemModal").find("#coupon").prop("disabled", false);
    //   $("#editItemModal").find("#hasCoupon_cbx").prop("checked", true);
    // }

    // $("#editItemModal").find("#coupon").val(oldRowValue.coupon);
    // $("#editItemModal").find("#discount").val(oldRowValue.discount);
    // $("#editItemModal").find("#description").val(oldRowValue.description);
    // $("#editItemModal").find("#_id").val(oldRowValue._id);
    // $("#editItemModal")
    //   .find("#imageUrl")
    //   .attr("src", oldRowValue.imageUrl.replace("images", "/images"));
    //   }
  },
  "click .btn-detailItem"(e, value, row, index) {
    alert(JSON.stringify(row));
    var doB_obj = new Date(row.doB);
    var doB_day =
      doB_obj.getDate() < 10 ? "0" + doB_obj.getDate() : doB_obj.getDate();
    var doB_month =
      doB_obj.getMonth() + 1 < 10
        ? "0" + (doB_obj.getMonth() + 1)
        : doB_obj.getMonth() + 1;
    var doB = doB_obj.getFullYear() + "-" + doB_month + "-" + doB_day;

    const postcode = row.address.substr(1, 7);
    const address = row.address.substr(9, row.address.length - 1);

    $("#detailItemModal").find(".email").text(row.email);
    //   $("#detailItemModal").find(".password").val(row.password);
    $("#detailItemModal").find(".permission").text(row.permission);
    $("#detailItemModal").find(".name").text(row.name);
    $("#detailItemModal").find(".doB").text(doB);
    $("#detailItemModal").find(".phoneNumber").text(row.phoneNumber);
    $("#detailItemModal").find(".postcode").text(postcode);
    $("#detailItemModal").find(".address").text(address);
    $("#detailItemModal").find(".point").text(row.point);
    $("#detailItemModal").find("#_id").val(row._id);
    $("#detailItemModal")
      .find("#imageUrl")
      .attr("src", row.imageUrl.replace("images", "/images"));

    oldRowValue = {
      _id: row._id,
      email: row.email,
      // password: row.password,
      permission: row.permission,
      name: row.name,
      doB: doB,
      phoneNumber: row.phoneNumber,
      postcode: postcode,
      address: address,
      point: row.point,
      imageUrl: row.imageUrl,
    };
  },
};

function actionEditEvent(index, row) {
  return `<button class="btn-detailItem btn btn-secondary" data-bs-toggle="modal" data-bs-target="#detailItemModal" >Chi tiết</button>
                  <button class="btn-editItem btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editItemModal" >Sửa</button>`;
}
