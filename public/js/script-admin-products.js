/**
 * The object oldRowValue to store old value
 */
var oldRowValue = {
  title: "",
  type: "",
  price: null,
  mount: null,
  description: "",
  imageUrl: "",
};

/**
 * The object newRowValue to store new inputed value
 */
var newRowValue = {
  title: "",
  type: "",
  price: null,
  mount: null,
  description: "",
  imageUrl: "",
};

$(function () {
  var addProductValidationErrors = $("#admin-products-page").attr(
    "addProductValidationErrors"
  );
  // alert(addProductValidationErrors + ' ' +  addProductValidationErrors.length);
  $(window).bind("load", function () {
    if (addProductValidationErrors.length > 2) {
      $("#addProductModal").modal("show");
    } else {
      $("#addProductModal").modal("hide");
    }
  });

  var $table = $("#table");
  var $btn_delete = $("#btn-delete");
  $btn_delete.prop("disabled", true);

  // var json = "<%- JSON.stringify(products) %>";
  var json = $("#admin-products-page").attr("products-data");
  var myArr = eval(json); //Json.parse(json)
  // alert(json);

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
    }
  );

  /**
   * The event will be trigged when user click show a confirm before delete
   */
  $btn_delete.click(function () {
    var products = $.map(
      $table.bootstrapTable("getSelections"),
      function (row) {
        return {
          _id: row._id,
          title: row.title,
        };
      }
    );

    var productTitle = "";
    var productId = [];
    for (let i = 0; i < products.length; i++) {
      if (i == products.length - 1) {
        productTitle += products[i].title;
      } else {
        productTitle += products[i].title + ", ";
      }
      productId.push(products[i]._id);
    }

    $("#confirmDeleteProductModal").find(".title").text(productTitle);
    $("#confirmDeleteProductModal").find("#_id").val(productId);
    $("#confirmDeleteProductModal").modal("show");

    $btn_delete.prop("disabled", true);
  });

  //Submit editproduct form
  $("#confirmEditProductModal")
    .find("#btn-submitConfirmEditProduct")
    .click(function () {
      $("#form-editProductModal").submit();
    });

  /**
   * Disable button of delete atfer canceling or closing confirm delete from
   */
  $("#confirmDeleteProductModal")
    .find("#btn-cancel, .btn-close")
    .click(function () {
      $btn_delete.prop("disabled", false);
      // $table.bootstrapTable('uncheckAll');
    });

  /**
   * will be set both objest backup of old and new value  to null when user click button as close or cancel
   */
  $("#editProductModal, #confirmEditProductModal, #detailProductModal")
    .find("#btn-cancel, .btn-close")
    .click(function () {
      oldRowValue = {
        id: "",
        title: "",
        type: "",
        price: null,
        mount: null,
        description: "",
        imageUrl: "",
      };

      newRowValue = {
        id: "",
        title: "",
        type: "",
        price: null,
        mount: null,
        description: "",
        imageUrl: "",
      };
    });

  $("#detailProductModal")
    .find("#btn-editProduct")
    .click(function () {
      $("#editProductModal").find("#title").val(oldRowValue.title);
      $("#editProductModal").find("#type").val(oldRowValue.type);
      $("#editProductModal").find("#price").val(oldRowValue.price);
      $("#editProductModal").find("#mount").val(oldRowValue.mount);
      $("#editProductModal").find("#description").val(oldRowValue.description);
      $("#editProductModal").find("#_id").val(oldRowValue._id);
      $("#editProductModal").find("#image").val(oldRowValue.imageUrl);
    });

  $("#confirmEditProductModal").on("shown.bs.modal", function (event) {
    newRowValue = {
      _id: $("#editProductModal").find("#_id").val(),
      title: $("#editProductModal").find("#title").val(),
      type: $("#editProductModal").find("#type").val(),
      price: $("#editProductModal").find("#price").val(),
      mount: $("#editProductModal").find("#mount").val(),
      description: $("#editProductModal").find("#description").val(),
      imageUrl: $("#editProductModal").find("#image").val(),
      // imageUrl: $('#editProductModal').find('#image').prop('files')[0],
    };

    // alert(JSON.stringify(newRowValue.imageUrl));

    if (String(newRowValue.price) === String(oldRowValue.price)) {
      $("#confirmEditProductModal")
        .find(".price")
        .text(oldRowValue.price)
        .css("color", "black");
    } else {
      $("#confirmEditProductModal")
        .find(".price")
        .text(oldRowValue.price + "  -->  " + newRowValue.price)
        .css("color", "red");
    }

    if (String(newRowValue.mount) === String(oldRowValue.mount)) {
      $("#confirmEditProductModal")
        .find(".mount")
        .text(oldRowValue.mount)
        .css("color", "black");
    } else {
      $("#confirmEditProductModal")
        .find(".mount")
        .text(oldRowValue.mount + "  -->  " + newRowValue.mount)
        .css("color", "red");
    }

    if (String(newRowValue.title) === String(oldRowValue.title)) {
      $("#confirmEditProductModal")
        .find(".title")
        .text(oldRowValue.title)
        .css("color", "black");
    } else {
      $("#confirmEditProductModal")
        .find(".title")
        .text(oldRowValue.title + "  -->  " + newRowValue.title)
        .css("color", "red");
    }

    if (String(newRowValue.type) === String(oldRowValue.type)) {
      $("#confirmEditProductModal")
        .find(".type")
        .text(oldRowValue.type)
        .css("color", "black");
    } else {
      $("#confirmEditProductModal")
        .find(".type")
        .text(oldRowValue.type + "  -->  " + newRowValue.type)
        .css("color", "red");
    }

    if (String(newRowValue.description) === String(oldRowValue.description)) {
      $("#confirmEditProductModal")
        .find(".description")
        .text(oldRowValue.description)
        .css("color", "black");
    } else {
      $("#confirmEditProductModal")
        .find(".description")
        .text(oldRowValue.description + "  -->  " + newRowValue.description)
        .css("color", "red");
    }

    // alert($('#editProductModal').find('#image').val().replace("C:\\fakepath\\", "images\/"));
    // alert(oldRowValue.imageUrl);
    const newImage = newRowValue.imageUrl.replace("C:\\fakepath\\", "images/");
    const oldImage = oldRowValue.imageUrl;
    if (newImage === oldImage || newImage === "") {
      $("#confirmEditProductModal")
        .find(".image")
        .text(oldRowValue.imageUrl)
        .css("color", "black");

      // alert("newImage " + newImage + "\n" + "oldImage" + oldImage);
    } else {
      $("#confirmEditProductModal")
        .find(".image")
        .text(oldRowValue.imageUrl + "  -->  " + newImage)
        .css("color", "red");

      // alert("'newImage ' + newImage + '\n' + 'oldImage' + oldImage");
      // alert("newImage " + newImage + "\n" + "oldImage" + oldImage);
    }

    // if (String(newRowValue._id) === String(oldRowValue._id)) {
    //   $("#confirmEditProductModal").find("#_id").val(oldRowValue._id);
    // } else {
    //   $("#confirmEditProductModal").find("#_id").val(oldRowValue._id);
    // }
  });
});

window.actionEditProductEvents = {
  "click .btn-editProduct": function (e, value, row, index) {
    // alert(String(oldRowValue._id));
    if (oldRowValue._id === undefined) {
      $("#editProductModal").find("#title").val(row.title);
      $("#editProductModal").find("#type").val(row.type);
      $("#editProductModal").find("#price").val(row.price);
      $("#editProductModal").find("#mount").val(row.mount);
      $("#editProductModal").find("#description").val(row.description);
      $("#editProductModal").find("#_id").val(row._id);
      $("#editProductModal").find("#imageUrl").val(row.imageUrl);

      oldRowValue = {
        _id: row._id,
        title: row.title,
        type: row.type,
        price: row.price,
        mount: row.mount,
        description: row.description,
        imageUrl: row.imageUrl,
      };
    } else {
      $("#editProductModal").find("#title").val(oldRowValue.title);
      $("#editProductModal").find("#type").val(oldRowValue.type);
      $("#editProductModal").find("#price").val(oldRowValue.price);
      $("#editProductModal").find("#mount").val(oldRowValue.mount);
      $("#editProductModal").find("#description").val(oldRowValue.description);
      $("#editProductModal").find("#_id").val(oldRowValue._id);
      $("#editProductModal").find("#image").val(row.imageUrl);
    }
  },
  "click .btn-detailProduct"(e, value, row, index) {
    $("#detailProductModal").find(".title").text(row.title);
    $("#detailProductModal").find(".type").text(row.type);
    $("#detailProductModal").find(".price").text(row.price);
    $("#detailProductModal").find(".mount").text(row.mount);
    $("#detailProductModal").find(".description").text(row.description);

    $("#detailProductModal")
      .find("#imageUrl")
      .attr("src", row.imageUrl.replace("images", "/images/"));

    oldRowValue = {
      _id: row._id,
      title: row.title,
      type: row.type,
      price: row.price,
      mount: row.mount,
      description: row.description,
      imageUrl: row.imageUrl,
    };
  },
};

function actionEditProduct(index, row) {
  return `<button class="btn-detailProduct btn btn-secondary" data-bs-toggle="modal" data-bs-target="#detailProductModal" >Chi tiết</button>
                <button class="btn-editProduct btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editProductModal" >Sửa</button>`;
}
