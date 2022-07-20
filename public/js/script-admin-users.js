/**
 * The object oldRowValue to store old value
 */
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
  available: "",
};

/**
 * The object newRowValue to store new inputed value
 */
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
  available: "",
};

function getFormatDate(date) {
  var date_obj = new Date(date);
  var day =
    date_obj.getDate() < 10 ? "0" + date_obj.getDate() : date_obj.getDate();
  var month =
    date_obj.getMonth() + 1 < 10
      ? "0" + (date_obj.getMonth() + 1)
      : date_obj.getMonth() + 1;
  var formattedDate = date_obj.getFullYear() + "-" + month + "-" + day;
  return formattedDate;
}

$(function () {
  // const backendPath = "http://localhost:4000";
  const backendPath = "https://webbanhang-backend.herokuapp.com";

  var inform = $("#admin-users-page").attr("inform");
  if (inform !== "") {
    window.location.replace(backendPath + "/admin/manage/users");
    alert(inform);
  }

  var addUserValidationErrors = $("#admin-users-page").attr(
    "addUserValidationErrors"
  );
  // alert(JSON.stringify(addUserValidationErrors) + ' ' +  addUserValidationErrors);
  $(window).bind("load", function () {
    if (addUserValidationErrors.length > 2) {
      $("#addItemModal").modal("show");
    } else {
      $("#addItemModal").modal("hide");
    }
  });

  var $table = $("#table");
  var $btn_delete = $("#btn-delete");
  $btn_delete.prop("disabled", true);
  $btn_delete.hide();

  // var json = "<%- JSON.stringify(products) %>";
  var json = $("#admin-users-page").attr("users-data");
  // alert(json);
  var myArr = eval(json); //Json.parse(json)

  $table.bootstrapTable({ data: myArr });

  /**
   * The event will be trigged when user check or uncheck on checkbox to enable or disable button as delete
   */
  $table.on(
    "check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table",
    function () {
      $btn_delete.prop(
        "disabled",
        !$table.bootstrapTable("getSelections").length
      );
      if ($table.bootstrapTable("getSelections").length > 0) {
        $btn_delete.show();
      } else {
        $btn_delete.hide();
      }
    }
  );

  /**
   * The event will be trigged when user click show a confirm before delete
   */
  $btn_delete.click(function () {
    var users = $.map($table.bootstrapTable("getSelections"), function (row) {
      return {
        _id: row._id,
        name: row.name,
        permission: row.permission,
      };
    });

    var userName = "";
    var userId = [];
    var getAdminNames = "";
    for (let i = 0; i < users.length; i++) {
      if (users[i].permission === "admin") {
        getAdminNames += users[i].name + "\n";
      }
      if (i == users.length - 1) {
        userName += users[i].name;
      } else {
        userName += users[i].name + ", ";
      }
      userId.push(users[i]._id);
    }

    if (getAdminNames !== "") {
      alert("Không thể xóa admin: \n" + getAdminNames);
    } else {
      $("#confirmDeleteItemModal")
        .find(".name")
        .text(userName + " admin " + getAdminNames);
      $("#confirmDeleteItemModal").find("#_id").val(userId);
      $("#confirmDeleteItemModal").modal("show");
      $btn_delete.prop("disabled", true);
    }
  });

  /**
   * will be set both objest backup of old and new value  to null when user click button as close or cancel
   */
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
        available: "",
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
        available: "",
      };
    });

  /**
   * Disable button of delete atfer canceling or closing confirm delete from
   */
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
      $("#editItemModal").find("#available").val(oldRowValue.available);
      //   alert(JSON.stringify(oldRowValue));
    });

  $("#confirmEditItemModal").on("shown.bs.modal", function (event) {
    newRowValue = {
      _id: $("#editItemModal").find("#_id").val(),
      email: $("#editItemModal").find("#email").val(),
      password: $("#editItemModal").find("#password").val(),
      permission: $("#editItemModal").find("#permission").val(),
      available: $("#editItemModal").find("#available").val(),
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

    if (String(newRowValue.available) === String(oldRowValue.available)) {
      $("#confirmEditItemModal")
        .find(".available")
        .text(oldRowValue.available ? "Hoạt động" : "Vô hiệu hóa")
        .css("color", "black");
    } else {
      let old_value =
        oldRowValue.available == "true" ? "Hoạt động" : "Vô hiệu hóa";
      let new_value =
        newRowValue.available == "true" ? "Hoạt động" : "Vô hiệu hóa";
      $("#confirmEditItemModal")
        .find(".available")
        .text(old_value + "  -->  " + new_value)
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
    var doB = getFormatDate(row.doB);

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
    $("#editItemModal").find("#available").val(row.available.toString());
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
      available: row.available.toString(),
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
    var doB = getFormatDate(row.doB);

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
    $("#detailItemModal")
      .find(".available")
      .text(row.available ? "Hoạt động" : "Vô hiệu hóa");

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
      available: row.available.toString(),
    };
  },
};

function doBFormatter(index, row) {
  var doB = getFormatDate(row.doB);
  return doB;
}

function availableFormatter(index, row) {
  var status = "";
  if (row.available) {
    status = "Hoạt động";
  } else {
    status = "Vô hiệu hóa";
  }
  return status;
}

function actionEditEvent(index, row) {
  return `<button class="btn-detailItem btn btn-secondary" data-bs-toggle="modal" data-bs-target="#detailItemModal" >Chi tiết</button>
                  <button class="btn-editItem btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editItemModal" >Sửa</button>`;
}
