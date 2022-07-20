/**
 * The object oldRowValue to store old value
 */
var oldRowValue = {
  title: "",
  startDate: null,
  endDate: null,
  hasCoupon: null,
  coupon: "",
  discount: null,
  description: "",
  imageUrl: "",
};

/**
 * The object newRowValue to store new inputed value
 */
var newRowValue = {
  title: "",
  startDate: null,
  endDate: null,
  hasCoupon: null,
  coupon: "",
  discount: null,
  description: "",
  imageUrl: "",
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
  var inform = $("#admin-events-page").attr("inform");
  if (inform !== "") {
    window.location.replace("http://localhost:4000/admin/manage/events");
    alert(inform);
  }

  var $table = $("#table");
  var $btn_delete = $("#btn-delete");
  $btn_delete.prop("disabled", true);
  $btn_delete.hide();

  /**
   * The get data and init to table's data
   */
  var json = $("#admin-events-page").attr("events-data");
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
    var events = $.map($table.bootstrapTable("getSelections"), function (row) {
      return {
        _id: row._id,
        title: row.title,
      };
    });

    var eventTitle = "";
    var eventId = [];
    for (let i = 0; i < events.length; i++) {
      if (i == events.length - 1) {
        eventTitle += events[i].title;
      } else {
        eventTitle += events[i].title + ", ";
      }
      eventId.push(events[i]._id);
    }

    $("#confirmDeleteItemModal").find(".title").text(eventTitle);
    $("#confirmDeleteItemModal").find("#_id").val(eventId);
    $("#confirmDeleteItemModal").modal("show");

    $btn_delete.prop("disabled", true);
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

  /**
   * Disable button of delete atfer canceling or closing confirm delete from
   */
  $("#confirmDeleteItemModal")
    .find("#btn-cancel, .btn-close")
    .click(function () {
      $btn_delete.prop("disabled", false);
      // $table.bootstrapTable('uncheckAll');
    });

  $("#addItemModal")
    .find("#hasCoupon_cbx")
    .change(function () {
      if (this.checked) {
        $("#addItemModal").find("#coupon").prop("disabled", false);
        $("#addItemModal").find("#hasCoupon").val(true);
      } else {
        $("#addItemModal").find("#coupon").prop("disabled", true);
        $("#addItemModal").find("#hasCoupon").val(false);
      }
    });

  $("#editItemModal")
    .find("#hasCoupon_cbx")
    .change(function () {
      if (this.checked) {
        $("#editItemModal").find("#coupon").prop("disabled", false);
        // $("editItemModal").find("#coupon").prop('required',true);
        $("#editItemModal").find("#hasCoupon").val(true);
      } else {
        $("#editItemModal").find("#coupon").prop("disabled", true);
        // $("editItemModal").find("#coupon").prop('required', false);
        $("#editItemModal").find("#hasCoupon").val(false);
      }
    });

  $("#detailItemModal")
    .find("#btn-editItem")
    .click(function () {
      // alert(JSON.stringify(oldRowValue));
      $("#editItemModal").find("#title").val(oldRowValue.title);
      $("#editItemModal").find("#startDate").val(oldRowValue.startDate);
      $("#editItemModal").find("#endDate").val(oldRowValue.endDate);

      $("#editItemModal").find("#hasCoupon").val(oldRowValue.hasCoupon);
      if (oldRowValue.hasCoupon === false) {
        $("#editItemModal").find("#coupon").prop("disabled", true);
        $("#editItemModal").find("#hasCoupon_cbx").prop("checked", false);
      } else {
        $("#editItemModal").find("#coupon").prop("disabled", false);
        $("#editItemModal").find("#hasCoupon_cbx").prop("checked", true);
      }

      $("#editItemModal").find("#coupon").val(oldRowValue.coupon);
      $("#editItemModal").find("#discount").val(oldRowValue.discount);
      $("#editItemModal").find("#description").val(oldRowValue.description);
      $("#editItemModal").find("#_id").val(oldRowValue._id);
      $("#editItemModal").find("#image").val(oldRowValue.imageUrl);
    });

  $("#editItemModal")
    .find("#btn-confirmEditItem")
    .click(function () {
      // alert($('#editItemModal').find('#hasCoupon_cbx').val());
      // if($('#editItemModal').find('#hasCoupon_cbx').is(":checked")){
      //   alert('checked');
      //   $("editItemModal").find("#coupon").prop('required',true);
      // }else{
      //   alert('unchecked');
      //   $("editItemModal").find("#coupon").prop('required',false);
      // }
    });

  $("#confirmEditItemModal").on("shown.bs.modal", function (event) {
    newRowValue = {
      _id: $("#editItemModal").find("#_id").val(),
      title: $("#editItemModal").find("#title").val(),
      startDate: $("#editItemModal").find("#startDate").val(),
      endDate: $("#editItemModal").find("#endDate").val(),
      hasCoupon: $("#editItemModal").find("#hasCoupon").val(),
      coupon: $("#editItemModal").find("#coupon").val(),
      discount: $("#editItemModal").find("#discount").val(),
      description: $("#editItemModal").find("#description").val(),
      imageUrl: $("#editItemModal").find("#image").val(),
      // imageUrl: $('#editProductModal').find('#image').prop('files')[0],
    };

    if (String(newRowValue.title) === String(oldRowValue.title)) {
      $("#confirmEditItemModal")
        .find(".title")
        .text(oldRowValue.title)
        .css("color", "black");
    } else {
      $("#confirmEditItemModal")
        .find(".title")
        .text(oldRowValue.title + "  -->  " + newRowValue.title)
        .css("color", "red");
    }

    if (String(newRowValue.startDate) === String(oldRowValue.startDate)) {
      $("#confirmEditItemModal")
        .find(".startDate")
        .text(oldRowValue.startDate)
        .css("color", "black");
    } else {
      $("#confirmEditItemModal")
        .find(".startDate")
        .text(oldRowValue.startDate + "  -->  " + newRowValue.startDate)
        .css("color", "red");
    }

    if (String(newRowValue.endDate) === String(oldRowValue.endDate)) {
      $("#confirmEditItemModal")
        .find(".endDate")
        .text(oldRowValue.endDate)
        .css("color", "black");
    } else {
      $("#confirmEditItemModal")
        .find(".endDate")
        .text(oldRowValue.endDate + "  -->  " + newRowValue.endDate)
        .css("color", "red");
    }

    if (String(newRowValue.hasCoupon) === String(oldRowValue.hasCoupon)) {
      $("#confirmEditItemModal")
        .find(".hasCoupon")
        .text(oldRowValue.hasCoupon)
        .css("color", "black");
    } else {
      $("#confirmEditItemModal")
        .find(".hasCoupon")
        .text(oldRowValue.hasCoupon + "  -->  " + newRowValue.hasCoupon)
        .css("color", "red");
    }

    if (newRowValue.hasCoupon === false) {
      newRowValue.coupon = "";
    }

    if (String(newRowValue.coupon) === String(oldRowValue.coupon)) {
      $("#confirmEditItemModal")
        .find(".coupon")
        .text(oldRowValue.coupon)
        .css("color", "black");
    } else {
      $("#confirmEditItemModal")
        .find(".coupon")
        .text(oldRowValue.coupon + "  -->  " + newRowValue.coupon)
        .css("color", "red");
    }

    if (String(newRowValue.discount) === String(oldRowValue.discount)) {
      $("#confirmEditItemModal")
        .find(".discount")
        .text(oldRowValue.discount)
        .css("color", "black");
    } else {
      $("#confirmEditItemModal")
        .find(".discount")
        .text(oldRowValue.discount + "  -->  " + newRowValue.discount)
        .css("color", "red");
    }

    if (String(newRowValue.description) === String(oldRowValue.description)) {
      $("#confirmEditItemModal")
        .find(".description")
        .text(oldRowValue.description)
        .css("color", "black");
    } else {
      $("#confirmEditItemModal")
        .find(".description")
        .text(oldRowValue.description + "  -->  " + newRowValue.description)
        .css("color", "red");
    }

    // // alert($('#editProductModal').find('#image').val().replace("C:\\fakepath\\", "images\/"));
    // // alert(oldRowValue.imageUrl);
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

window.actionEditEventEvents = {
  "click .btn-editItem": function (e, value, row, index) {
    var startDate = getFormatDate(row.startDate);
    var endDate = getFormatDate(row.endDate);

    // if (oldRowValue._id === undefined) {

    $("#editItemModal").find("#title").val(row.title);
    $("#editItemModal").find("#startDate").val(startDate);
    $("#editItemModal").find("#endDate").val(endDate);

    $("#editItemModal").find("#hasCoupon").val(row.hasCoupon);
    if (row.hasCoupon === false) {
      $("#editItemModal").find("#coupon").prop("disabled", true);
      $("#editItemModal").find("#hasCoupon_cbx").prop("checked", false);
    } else {
      $("#editItemModal").find("#coupon").prop("disabled", false);
      $("#editItemModal").find("#hasCoupon_cbx").prop("checked", true);
    }

    $("#editItemModal").find("#coupon").val(row.coupon);
    $("#editItemModal").find("#discount").val(row.discount);
    $("#editItemModal").find("#description").val(row.description);
    $("#editItemModal").find("#_id").val(row._id);
    // $("#editItemModal").find("#imageUrl").val(row.imageUrl);

    oldRowValue = {
      _id: row._id,
      title: row.title,
      startDate: startDate,
      endDate: endDate,
      hasCoupon: row.hasCoupon,
      coupon: row.coupon,
      discount: row.discount,
      description: row.description,
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
    // }
  },
  "click .btn-detailItem"(e, value, row, index) {
    var startDate = getFormatDate(row.startDate);
    var endDate = getFormatDate(row.endDate);

    $("#detailItemModal").find(".title").text(row.title);
    $("#detailItemModal").find(".startDate").text(startDate);
    $("#detailItemModal").find(".endDate").text(endDate);
    $("#detailItemModal").find(".hasCoupon").text(row.hasCoupon);
    $("#detailItemModal").find(".coupon").text(row.coupon);
    $("#detailItemModal").find(".discount").text(row.discount);
    $("#detailItemModal").find(".description").text(row.description);
    $("#detailItemModal").find("#_id").text(row._id);
    $("#detailItemModal")
      .find("#imageUrl")
      .attr("src", row.imageUrl.replace("images", "/images"));

    oldRowValue = {
      _id: row._id,
      title: row.title,
      startDate: startDate,
      endDate: endDate,
      hasCoupon: row.hasCoupon,
      coupon: row.coupon,
      discount: row.discount,
      description: row.description,
      imageUrl: row.imageUrl,
    };
  },
};

function startDateFormatter(index, row) {
  var startDate = getFormatDate(row.startDate);
  return startDate;
}

function endDateFormatter(index, row) {
  var endDate = getFormatDate(row.endDate);
  return endDate;
}

function actionEditEvent(index, row) {
  return `<button class="btn-detailItem btn btn-secondary" data-bs-toggle="modal" data-bs-target="#detailItemModal" >Chi tiết</button>
                <button class="btn-editItem btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editItemModal" >Sửa</button>`;
}


