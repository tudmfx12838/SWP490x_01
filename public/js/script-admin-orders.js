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

  var inform = $("#admin-orders-page").attr("inform");
  if (inform !== "") {
    window.location.replace("http://localhost:4000/admin/manage/orders");
    alert(inform);
  }

  var $table = $("#table-orders");
  var $btn_delete = $("#btn-delete");
  $btn_delete.prop("disabled", true);

  var json = $("#admin-orders-page").attr("orders-data");
  //   alert(json);
  var myArr = eval(json); //Json.parse(json)

  $table.bootstrapTable({ data: myArr });

  /**
   * The event will be trigged when user check or uncheck on checkbox to enable or disable button as delete
   */
  $table.on(
    "check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table",
    function () {
      // alert($table.bootstrapTable("getSelections").length);
      $btn_delete.prop(
        "disabled",
        !$table.bootstrapTable("getSelections").length
      );
    }
  );

  /**
   * The event will be trigged when user click show a confirm before delete
   */
  $btn_delete.click(function () {
    var orders = $.map($table.bootstrapTable("getSelections"), function (row) {
      return {
        _id: row._id,
        title: row.title,
        approveStatus: row.approveStatus,
      };
    });

    // var eventTitle = "";
    var orderId = "";
    var orderId_arr = [];
    var approvedOrderId = "";
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].approveStatus === true) {
        approvedOrderId += orders[i]._id + "\n";
      } else {
        orderId += `<p>${orders[i]._id}<p>`;
        orderId_arr.push(orders[i]._id);
      }
    }

    if (approvedOrderId !== "") {
      alert(
        `Không thể xác đơn hàng đã xác nhận \nMã đơn: \n${approvedOrderId} \nVui lòng bấm hủy xác nhận đơn hàng trước khi xóa.`
      );
    } else {
      $("#confirmDeleteItemModal").find(".orderId").html(orderId);
      $("#confirmDeleteItemModal").find("#_id").val(orderId_arr);
      $("#confirmDeleteItemModal").modal("show");
      $btn_delete.prop("disabled", true);
    }
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

});
window.actionConfirmPayEvents = {
  "click .btn-confirm-pay": function (e, value, row, index) {
    var date = getFormatDate(row.date);
    // alert(date);

    $("#confirmIsPaidModal").find("._id").text(row._id);
    $("#confirmIsPaidModal").find(".date").text(date);
    $("#confirmIsPaidModal").find(".name").text(row.deliveryInfo.name);
    $("#confirmIsPaidModal").find(".total").text(row.cashInfo.afterDiscount);
    if (row.cashInfo.isPaid) {
      $("#confirmIsPaidModal")
        .find(".isPaid")
        .text("Đã thanh toán")
        .css("color", "black");
      $("#confirmIsPaidModal")
        .find("#btn-submit-confirm-order")
        .prop("disabled", false);
    } else {
      $("#confirmIsPaidModal")
        .find(".isPaid")
        .text("Chưa thanh toán")
        .css("color", "red");
      $("#confirmIsPaidModal")
        .find("#btn-submit-confirm-order")
        .prop("disabled", true);
    }
    $("#confirmIsPaidModal").find("#_id").val(row._id);
  }
}

window.actionConfirmOrderEvents = {
  "click .btn-confirm": function (e, value, row, index) {
    var date = getFormatDate(row.date);
    // alert(date);

    $("#confirmOrderModal").find("._id").text(row._id);
    $("#confirmOrderModal").find(".date").text(date);
    $("#confirmOrderModal").find(".name").text(row.deliveryInfo.name);
    $("#confirmOrderModal").find(".email").text(row.deliveryInfo.email);
    $("#confirmOrderModal")
      .find(".phoneNumber")
      .text(row.deliveryInfo.phoneNumber);
    $("#confirmOrderModal").find(".address").text(row.deliveryInfo.address);
    $("#confirmOrderModal").find(".total").text(row.cashInfo.afterDiscount);
    if (row.cashInfo.isPaid) {
      $("#confirmOrderModal")
        .find(".isPaid")
        .text("Đã thanh toán")
        .css("color", "black");
      $("#confirmOrderModal")
        .find("#btn-submit-confirm-order")
        .prop("disabled", false);
    } else {
      $("#confirmOrderModal")
        .find(".isPaid")
        .text("Chưa thanh toán")
        .css("color", "red");
      $("#confirmOrderModal")
        .find("#btn-submit-confirm-order")
        .prop("disabled", true);
    }

    $("#confirmOrderModal").find("#_id").val(row._id);

    // btn-submit-confirm-order cancelOrderModal
  },
  "click .btn-cancelConfirm": function (e, value, row, index) {
    var date = getFormatDate(row.date);
    // alert(date);

    $("#cancelOrderModal").find("._id").text(row._id);
    $("#cancelOrderModal").find(".date").text(date);
    if (row.cashInfo.isPaid) {
      $("#cancelOrderModal")
        .find(".isPaid")
        .text("Đã thanh toán")
        .css("color", "black");
    } else {
      $("#cancelOrderModal")
        .find(".isPaid")
        .text("Chưa thanh toán")
        .css("color", "red");
    }

    $("#cancelOrderModal").find("#_id").val(row._id);

    // btn-submit-confirm-order cancelOrderModal
  },
};

function deliveryInfoFormatter(index, row) {
  return `<p><b>Tên:</b> ${row.deliveryInfo.name}</p>
            <p><b>Email:</b>  ${row.deliveryInfo.email}</p>
            <p><b>SDT:</b>  ${row.deliveryInfo.phoneNumber}</p>
            <p><b>Dc:</b> ${row.deliveryInfo.address}</p>`;
}

function productsInfoFormatter(index, row) {
  var orderDay = getFormatDate(row.date);
  // let isPaidCss = "";
  // if (!row.cashInfo.isPaid) {
  //   isPaidCss = 'style="color: red;"';
  // } else {
  //   isPaidCss = 'style="color: black;"';
  // }

  const productInfo = row.products.map((item) => {
    return `<p><i>${item.title}:</i> ${item.price} x ${item.quantity} = ${
      item.price * item.quantity
    }</p>`;
  });
  // productInfo.join("");
  const cashInfo = `<p><i>(Tên SP: Giá x SL = Thành tiền)</i></p> ${productInfo.join(
    " "
  )} <p><b>Tổng:</b> ${row.cashInfo.totalCash}</p>  
    <p><b>Ngày:</b> ${orderDay}</p> <p><b>Ghi chú:</b> ${row.deliveryInfo.node}</p>` ; 
  //   <p ${isPaidCss}><b>Trạng thái:</b> ${
  //   row.cashInfo.isPaid ? "Đã thanh toán" : "Chưa Thanh Toán"
  // }</p>`;

  return cashInfo;
}

function approveStatusFormatter(index, row) {
  let approveStatusCss = "";
  if (!row.approveStatus) {
    approveStatusCss = 'style="color: red;"';
  } else {
    approveStatusCss = 'style="color: black;"';
  }

  const approveStatus = `<p ${approveStatusCss}>${
    row.approveStatus === false ? "Chưa xác nhận" : "Đã xác nhận"
  }<p>`;

  return `${approveStatus}`;
}

function isPaidStatusFormatter(index, row) {
  let isPaidCss = "";
  let disable_btn = "";
  if (!row.cashInfo.isPaid) {
    isPaidCss = 'style="color: red;"';
    disable_btn = "";
  } else {
    isPaidCss = 'style="color: black;"';
    disable_btn = "disabled"
  }


  const isPaidStatus = `<p ${isPaidCss}>${
    row.cashInfo.isPaid === false ? "Chưa thanh toán" : "Đã thanh toán"
  }<p>`;

  const approveBotton = `<button ${disable_btn} class="btn-confirm-pay btn btn-primary red-border" data-bs-toggle="modal" data-bs-target="#confirmIsPaidModal" >Xác nhận</button>`;

  return `${isPaidStatus} ${approveBotton}`;
}

function actionEditEvent(index, row) {
  const isPaid = row.cashInfo.isPaid;
  const approveStatus = row.approveStatus;

  let disable_confirm_btn = "";
  let disable_cancel_btn = "";

  if (isPaid && !approveStatus) {
    disable_confirm_btn = "";
  } else {
    disable_confirm_btn = "disabled";
  }

  if (!approveStatus) {
    disable_cancel_btn = "disabled";
  } else {
    disable_cancel_btn = "";
  }

  // disabled={p.mount <= 0 ? true : false}
  const approveBotton = `<button ${disable_confirm_btn} class="btn-confirm btn btn-primary red-border" data-bs-toggle="modal" data-bs-target="#confirmOrderModal" >Xác nhận</button>`;
  const cancelBotton = `<button ${disable_cancel_btn} class="btn-cancelConfirm btn btn-danger" data-bs-toggle="modal" data-bs-target="#cancelOrderModal" >Hủy</button>`;

  return `${approveBotton} ${cancelBotton}`;

  // return `<button class="btn-approve btn btn-primary" data-bs-toggle="modal" data-bs-target="#detailItemModal" >Xác nhận</button>`;
  // <button class="btn-approve btn btn-danger" data-bs-toggle="modal" data-bs-target="#detailItemModal" >Hủy</button>`;
}
