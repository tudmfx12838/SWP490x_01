const mongoose = require("mongoose");
const Product = require("../models/product");
const User = require("../models/user");
const Event = require("../models/event");
const Order = require("../models/order");
const path = require("path");

const { validationResult } = require("express-validator");

const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const fileHelper = require("../util/file");
const product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.json(products);
      // console.log(products);
    })
    .catch((err) => console.log(err));
};

exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.json(users);
      // console.log(users);
    })
    .catch((err) => console.log(err));
};

exports.getEvents = (req, res, next) => {
  Event.find()
    .then((events) => {
      res.json(events);
      // console.log(events);
    })
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  Event.find()
    .then((orders) => {
      res.json(orders);
      // console.log(orders);
    })
    .catch((err) => console.log(err));
};

exports.getAdminTest = (req, res, next) => {
  Product.find()
    .then((products) => {
      // res.json(products);
      res.render("admin/admin-test", {
        pageTitle: "Quản lý Sản Phẩm",
        path: "/manage/products",
        products: products,
      });
    })
    .catch((err) => console.log(err));
};

/**
 * The method getAdminProducts() implement geting product's data from database and rendering a admin's product management page
 */
exports.getAdminProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      // res.json(products);
      res.render("admin/admin-products", {
        pageTitle: "Quản lý Sản Phẩm",
        path: "/manage/products",
        products: products,
        oldAddProductValue: null,
        addProductValidationErrors: [],
        editProductValidationErrors: [],
        inform: "",
        // validationErrors: [],
        // isAuthenticated: req.session.isLoggedIn,
        // csrfToken: "", //req.csrfToken() //duoc cung cap boi goi csrfProtection trong middleware app.js
      });
    })
    .catch((err) => console.log(err));
};

/**
 * The method postAddProduct() implement geting inputed data from DOM and store them into product's database
 * */
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const type = req.body.type;
  const price = req.body.price;
  const mount = req.body.mount;
  const description = req.body.description;
  const image = req.file;

  const errors = validationResult(req);
  // console.log(JSON.stringify(errors.array()) + 111111111111);
  // const price_msg = errors.array().filter(e => e.param === "price");
  // console.log(price_msg);

  if (!errors.isEmpty()) {
    const oldAddProductValue = {
      title: title,
      type: type,
      price: price,
      mount: mount,
      description: description,
    };

    Product.find()
      .then((products) => {
        return res.status(422).render("admin/admin-products", {
          path: "/manage/products",
          pageTitle: "Quản lý Sản Phẩm",
          products: products,
          oldAddProductValue: oldAddProductValue,
          addProductValidationErrors: errors.array(),
          editProductValidationErrors: [],
          inform: "Thêm sản phẩm thất bại",
          // csrfToken: "", //req.csrfToken() //duoc cung cap boi goi csrfProtection trong middleware app.js
        });
      })
      .catch((err) => console.log(err));
  } else {
    if (!image) {
      return res.redirect("/admin/manage/products");
    }

    const imageUrl = image.path;

    const product = new Product({
      title: title,
      type: type,
      price: price,
      mount: mount,
      description: description,
      imageUrl: imageUrl,
    });

    product
      .save()
      .then((result) => {
        // alert("Them thanh cong");
        // return res.redirect("/admin/manage/products");
        Product.find()
          .then((products) => {
            return res.render("admin/admin-products", {
              path: "/manage/products",
              pageTitle: "Quản lý Sản Phẩm",
              products: products,
              oldAddProductValue: oldAddProductValue,
              addProductValidationErrors: errors.array(),
              editProductValidationErrors: [],
              inform: "Thêm sản phẩm thành công",
              // csrfToken: "", //req.csrfToken() //duoc cung cap boi goi csrfProtection trong middleware app.js
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

/**
 * The method postEditProduct() implement geting eidted data from DOM and store them into product's database
 * */
exports.postEditProduct = (req, res, next) => {
  //Checking edit mode
  //http://localhost:4000/admin/manage/edit-product/?edit=true
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  const productId = req.body._id;
  const updatedTitle = req.body.title;
  const updatedType = req.body.type;
  const updatedPrice = req.body.price;
  const updatedMount = req.body.mount;
  const updatedDescription = req.body.description;
  const updatedAvailable = req.body.available;
  const updatedImageUrl = req.file;

  Product.findById(productId)
    .then((product) => {
      product.title = updatedTitle;
      product.type = updatedType;
      product.price = updatedPrice;
      product.mount = updatedMount;
      product.description = updatedDescription;
      product.available = updatedAvailable;

      if (updatedImageUrl) {
        fileHelper.deleteFile(product.imageUrl);
        product.imageUrl = updatedImageUrl.path;
      }

      return product.save().then((result) => {
        // console.log("Updated Product");
        Product.find()
          .then((products) => {
            return res.render("admin/admin-products", {
              path: "/manage/products",
              pageTitle: "Quản lý Sản Phẩm",
              products: products,
              oldAddProductValue: null,
              addProductValidationErrors: [],
              editProductValidationErrors: [],
              inform: "Cập nhật sản phẩm thành công",
            });
          })
          .catch((err) => console.log(err));
      }); //Ham save nay cua mongoose
    })
    .catch((err) => {
      console.log(err);
      // const error = new Error(err);
      // error.httpStatusCode = 500;
      // return next(error);
    });
};

var checkingProductExistInUserCart = (productIds, users) => {
  const checkingResult = productIds.map((productId) => {
    var result = false;
    for (let i = 0; i <= users.length - 1; i++) {
      if (users[i].cart.items.length > 0) {
        let items = users[i].cart.items;
        for (let j = 0; j <= items.length - 1; j++) {
          if (items[j]._id == productId) {
            result = true;
            break;
          }
        }
      }
      if (result) {
        break;
      }
    }

    return {
      _id: productId,
      isExist: result,
    };
  });

  var productIsExistInCart = checkingResult.filter(
    (product) => product.isExist === true
  );
  productIsExistInCart = productIsExistInCart.map((product) => product._id);

  var productIsNotExistInCart = checkingResult.filter(
    (product) => product.isExist === false
  );
  productIsNotExistInCart = productIsNotExistInCart.map(
    (product) => product._id
  );

  return {
    productIsExistInCart: productIsExistInCart,
    productIsNotExistInCart: productIsNotExistInCart,
  };
};

/**
 * The method postEditProduct() implement geting data's ID from DOM and delete them from product's database
 * */
exports.postDeleteProduct = (req, res, next) => {
  const deleteMode = req.query.delete;
  if (!deleteMode) {
    return res.redirect("/");
  }

  const productId = req.body._id.split(",");

  User.find()
    .then((users) => {
      const checkingResult = checkingProductExistInUserCart(productId, users);
      // console.log(checkingResult.productIsExistInCart);
      // console.log(checkingResult.productIsNotExistInCart);
      // console.log(productId);

      Product.find({ _id: productId })
        .then((prods) => {
          // console.log("Delete complete" + JSON.stringify(prods));
          const productIsExistInCart_info =
            checkingResult.productIsExistInCart.map((propductId) => {
              return prods.filter((prod) => prod._id == propductId)[0].title;
            });
          const productIsNotExistInCart_info =
            checkingResult.productIsNotExistInCart.map((propductId) => {
              return prods.filter((prod) => prod._id == propductId)[0].title;
            });

          for (let i = 0; i <= prods.length - 1; i++) {
            for (
              let j = 0;
              j <= checkingResult.productIsExistInCart.length - 1;
              j++
            ) {
              if (prods[i]._id == checkingResult.productIsExistInCart[j]) {
                // console.log("prods[i].available = false; " + prods[i].title);
                prods[i].available = false;
                prods[i]
                  .save()
                  .then((result) => {})
                  .catch((err) => console.log(err));
              }
            }
          }

          Product.deleteMany({ _id: checkingResult.productIsNotExistInCart })
            .then((result) => {
              // console.log("Delete complete");
              Product.find()
                .then((products) => {
                  const inform = `${
                    productIsExistInCart_info.length > 0
                      ? "Đã vô hiệu hóa sản phẩm" +
                        productIsExistInCart_info +
                        "\n"
                      : ""
                  }
                  ${
                    productIsNotExistInCart_info.length > 0
                      ? "Đã xóa sản phẩm:" +
                        productIsNotExistInCart_info +
                        "\n"
                      : ""
                  }
                  Chú thích: Sản phẩm chưa được thêm vào giỏ khách hàng sẽ bị xóa, ngược lại sẽ vô hiệu hóa sản phẩm và cảnh báo ngừng bán`;

                  return res.render("admin/admin-products", {
                    path: "/manage/products",
                    pageTitle: "Quản lý Sản Phẩm",
                    products: products,
                    oldAddProductValue: null,
                    addProductValidationErrors: [],
                    editProductValidationErrors: [],
                    inform: inform,
                  });
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => console.log(err));
};

/**
 * The method getAdminEvents() implement geting event's data from database and rendering a admin's event management page
 */
exports.getAdminEvents = (req, res, next) => {
  Event.find()
    .then((events) => {
      // res.json(products);
      res.render("admin/admin-events", {
        pageTitle: "Quản Lý Sự Kiện",
        path: "/manage/events",
        events: events,
        inform: "",
        // errorMessage: message,
        // oldInput: { loginId: "" },
        // validationErrors: [],
        // isAuthenticated: req.session.isLoggedIn,
        // csrfToken: "", //req.csrfToken() //duoc cung cap boi goi csrfProtection trong middleware app.js
      });
    })
    .catch((err) => console.log(err));
};

/**
 * The method postAddEvent() implement geting inputed event's data ID from DOM and store them into event's database
 * */
exports.postAddEvent = (req, res, next) => {
  const title = req.body.title;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const hasCoupon = req.body.hasCoupon;
  const coupon = req.body.coupon;
  const description = req.body.description;
  const discount = req.body.discount;
  const image = req.file;

  if (!image) {
    Event.find()
      .then((events) => {
        // res.json(products);
        return res.render("admin/admin-events", {
          pageTitle: "Quản Lý Sự Kiện",
          path: "/manage/events",
          events: events,
          inform: "Thêm sự kiện thất bại\nLý do: Thiếu hình ảnh",
        });
      })
      .catch((err) => console.log(err));
  }

  const imageUrl = image.path;

  const event = new Event({
    title: title,
    startDate: startDate,
    endDate: endDate,
    hasCoupon: hasCoupon,
    coupon: coupon,
    discount: discount,
    description: description,
    imageUrl: imageUrl,
  });

  event
    .save()
    .then((result) => {
      Event.find()
        .then((events) => {
          // res.json(products);
          return res.render("admin/admin-events", {
            pageTitle: "Quản Lý Sự Kiện",
            path: "/manage/events",
            events: events,
            inform: "Thêm sự kiện thành công",
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * The method postAddEvent() implement geting event's ID from DOM and delete them from event's database
 * */
exports.postDeleteEvent = (req, res, next) => {
  const deleteMode = req.query.delete;
  if (!deleteMode) {
    return res.redirect("/");
  }

  const eventIds = req.body._id.split(",");

  Event.deleteMany({ _id: eventIds })
    .then((result) => {
      // console.log("Delete complete");
      Event.find()
        .then((events) => {
          // res.json(products);
          return res.render("admin/admin-events", {
            pageTitle: "Quản Lý Sự Kiện",
            path: "/manage/events",
            events: events,
            inform: "Xóa sự kiện thành công",
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * The method postAddEvent() implement geting edited event's data from DOM and store them into event's database
 * */
exports.postEditEvent = (req, res, next) => {
  //Checking edit mode
  //http://localhost:4000/admin/manage/edit-event/?edit=true
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  const eventId = req.body._id;
  const updatedTitle = req.body.title;
  const updatedStartDate = req.body.startDate;
  const updatedEndDate = req.body.endDate;
  const updatedHasCoupon = req.body.hasCoupon;
  const updatedCoupon = req.body.coupon;
  const updatedDiscount = req.body.discount;
  const updatedDescription = req.body.description;
  const updatedImageUrl = req.file;

  // console.log(updatedImageUrl);

  Event.findById(eventId)
    .then((event) => {
      event.title = updatedTitle;
      event.startDate = updatedStartDate;
      event.endDate = updatedEndDate;
      event.hasCoupon = updatedHasCoupon;
      event.coupon = updatedCoupon;
      event.discount = updatedDiscount;
      event.description = updatedDescription;

      if (updatedImageUrl) {
        // fileHelper.deleteFile(event.imageUrl);
        event.imageUrl = updatedImageUrl.path;
      }

      return event.save().then((result) => {
        Event.find()
          .then((events) => {
            // res.json(products);
            return res.render("admin/admin-events", {
              pageTitle: "Quản Lý Sự Kiện",
              path: "/manage/events",
              events: events,
              inform: "Cập nhật sự kiện thành công",
            });
          })
          .catch((err) => console.log(err));
      }); //Ham save nay cua mongoose
    })
    .catch((err) => {
      console.log(err);
      // const error = new Error(err);
      // error.httpStatusCode = 500;
      // return next(error);
    });
};

/**
 * The method getAdminEvents() implement geting user's data from database and rendering a admin's user management page
 */
exports.getAdminUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      // res.json(products);
      res.render("admin/admin-users", {
        pageTitle: "Quản Lý Người Dùng",
        path: "/manage/users",
        users: users,
        oldAddUserValue: {},
        addUserValidationErrors: [],
        inform: "",
        // isAuthenticated: req.session.isLoggedIn,
        // csrfToken: "", //req.csrfToken() //duoc cung cap boi goi csrfProtection trong middleware app.js
      });
    })
    .catch((err) => console.log(err));
};

/**
 * The method postAddUser() implement geting inputed user's data from DOM and store them into user's database
 * */
exports.postAddUser = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const passwordConfirm = req.body.passwordConfirm;
  const permission = req.body.permission;
  const name = req.body.name;
  const doB = req.body.doB;
  const phoneNumber = req.body.phoneNumber;
  const address = "〒" + req.body.postcode + " - " + req.body.address;
  const point = req.body.point;
  const image = req.file;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const oldAddUserValue = {
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
      permission: permission,
      name: name,
      doB: doB,
      phoneNumber: phoneNumber,
      postcode: req.body.postcode,
      address: req.body.address,
      point: point,
    };

    User.find()
      .then((users) => {
        // res.json(products);
        res.status(422).render("admin/admin-users", {
          pageTitle: "Quản Lý Người Dùng",
          path: "/manage/users",
          users: users,
          oldAddUserValue: oldAddUserValue,
          addUserValidationErrors: errors.array(),
          inform: "Thêm user thất bại",
          // isAuthenticated: req.session.isLoggedIn,
        });
      })
      .catch((err) => console.log(err));
  } else {
    var imageUrl = "";
    // console.log(req.file);
    if (!image) {
      imageUrl = "images/avatar.jpg";
    } else {
      imageUrl = image.path;
    }

    bcrypt
      .hash(password, 12) //Ma hoa pw thanh ma hash, agr2 la so vong bam, gia tri cang cao cang ton tgian nhung  cang an toan, 12 la du
      .then((hashedPassword) => {
        const user = new User({
          email: email,
          password: hashedPassword,
          permission: permission,
          name: name,
          doB: doB,
          phoneNumber: phoneNumber,
          address: address,
          point: point,
          imageUrl: imageUrl,
          cart: { items: [] },
          orderHistory: [],
          available: true,
        });
        return user.save();
      })
      .then((result) => {
        //  res.redirect("/admin/manage/users");
        User.find()
          .then((users) => {
            return res.render("admin/admin-users", {
              pageTitle: "Quản Lý Người Dùng",
              path: "/manage/users",
              users: users,
              oldAddUserValue: [],
              addUserValidationErrors: [],
              inform: "Thêm user thành công",
            });
          })
          .catch((err) => console.log(err));
        // console.log(email);
        // return transporter.sendMail({
        //   to: email,
        //   from: "tudmfx12838@funix.edu.vn",
        //   subject: "Signup succeeded!",
        //   html: '<h1>You successfully signed up!<a href="http://localhost:3000/">Click here to return!</a></h1>',
        // });
      })
      .catch((err) => {
        console.log(err);
        // const error = new Error(err);
        // error.httpStatusCode = 500;
        // return next(error);
      });
  }
};

var checkingUserExistInOrder = (userIds, orders) => {
  const checkingResult = userIds.map((userId) => {
    var result = false;
    for (let i = 0; i <= orders.length - 1; i++) {
      if (orders[i].hasAccountInfo.userId == userId) {
        result = true;
        break;
      }
    }

    return {
      _id: userId,
      isExist: result,
    };
  });

  var userIsExistInOrder = checkingResult.filter(
    (user) => user.isExist === true
  );
  userIsExistInOrder = userIsExistInOrder.map((user) => user._id);

  var userIsNotExistInOrder = checkingResult.filter(
    (user) => user.isExist === false
  );
  userIsNotExistInOrder = userIsNotExistInOrder.map((user) => user._id);

  return {
    userIsExistInOrder: userIsExistInOrder,
    userIsNotExistInOrder: userIsNotExistInOrder,
  };
};

/**
 * The method postAddEvent() implement geting user's ID from DOM and delete them from user's database
 * */
exports.postDeleteUser = (req, res, next) => {
  const deleteMode = req.query.delete;
  if (!deleteMode) {
    return res.redirect("/");
  }

  const userIds = req.body._id.split(",");

  Order.find()
    .then((orders) => {
      const checkingResult = checkingUserExistInOrder(userIds, orders);
      // console.log("userIsExistInOrder" + checkingResult.userIsExistInOrder);
      // console.log("userIsNotExistInOrder" + checkingResult.userIsNotExistInOrder);
      // console.log(userIds);

      User.find()
        .then((users) => {
          const userIsExistInOrder_info = checkingResult.userIsExistInOrder.map(
            (userId) => {
              return users.filter((user) => user._id == userId)[0].email;
            }
          );
          const userIsNotExistInOrder_info =
            checkingResult.userIsNotExistInOrder.map((userId) => {
              return users.filter((user) => user._id == userId)[0].email;
            });

          for (let i = 0; i <= users.length - 1; i++) {
            for (
              let j = 0;
              j <= checkingResult.userIsExistInOrder.length - 1;
              j++
            ) {
              if (users[i]._id == checkingResult.userIsExistInOrder[j]) {
                // console.log("prods[i].available = false; " + prods[i].title);
                users[i].available = false;
                users[i]
                  .save()
                  .then((result) => {})
                  .catch((err) => console.log(err));
              }
            }
          }

          User.deleteMany({ _id: checkingResult.userIsNotExistInOrder })
            .then((result) => {
              // console.log("Delete complete");

              User.find()
                .then((users) => {
                  const inform = `${
                    userIsExistInOrder_info.length > 0
                      ? "Đã vô hiệu hóa tài khoản: " +
                        userIsExistInOrder_info +
                        "\n"
                      : ""
                  }
                  ${
                    userIsNotExistInOrder_info.length > 0
                      ? "Đã xóa tài khoản: " +
                        userIsNotExistInOrder_info +
                        "\n"
                      : ""
                  }
                  \nChú thích: Tài khoản chưa từng đặt hàng sẽ bị xóa, ngược lại sẽ vô hiệu hóa tài khoản`;

                  return res.render("admin/admin-users", {
                    pageTitle: "Quản Lý Người Dùng",
                    path: "/manage/users",
                    users: users,
                    oldAddUserValue: [],
                    addUserValidationErrors: [],
                    inform: inform,
                  });
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * The method postAddEvent() implement geting edited user's data from DOM and store them into user's database
 * */
exports.postEditUser = (req, res, next) => {
  //Checking edit mode
  //http://localhost:4000/admin/manage/edit-event/?edit=true
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  const userId = req.body._id;
  const updatedEmail = req.body.email;
  const updatedPassword = req.body.password;
  const updatedPermission = req.body.permission;
  const updatedAvailable = req.body.available;
  const updatedName = req.body.name;
  const updatedDoB = req.body.doB;
  const updatedPhoneNumber = req.body.phoneNumber;
  const updatedAddress = "〒" + req.body.postcode + "-" + req.body.address;
  const updatedPoint = req.body.point;
  const updatedImageUrl = req.file;

  User.findById(userId)
    .then((user) => {
      if (updatedPassword) {
        user.password = updatedPassword;
      }

      user.email = updatedEmail;
      user.permission = updatedPermission;
      user.name = updatedName;
      user.doB = updatedDoB;
      user.phoneNumber = updatedPhoneNumber;
      user.address = updatedAddress;
      user.point = updatedPoint;
      user.available = updatedAvailable;

      if (updatedImageUrl) {
        // fileHelper.deleteFile(event.imageUrl);
        user.imageUrl = updatedImageUrl.path;
      }

      return user.save().then((result) => {
        console.log("Updated Event");
        User.find()
          .then((users) => {
            return res.render("admin/admin-users", {
              pageTitle: "Quản Lý Người Dùng",
              path: "/manage/users",
              users: users,
              oldAddUserValue: [],
              addUserValidationErrors: [],
              inform: "Cập nhật user thành công",
            });
          })
          .catch((err) => console.log(err));
      }); //Ham save nay cua mongoose
    })
    .catch((err) => {
      console.log(err);
      // const error = new Error(err);
      // error.httpStatusCode = 500;
      // return next(error);
    });
};

/**
 * The method getAdminEvents() implement geting order's data from database and rendering a admin's order management page
 */
exports.getAdminOrders = (req, res, next) => {
  Order.find()
    .then((orders) => {
      // res.json(products);
      res.render("admin/admin-orders", {
        pageTitle: "Quản Lý Đơn Hàng",
        path: "/manage/orders",
        orders: orders,
        inform: "",
      });
    })
    .catch((err) => console.log(err));
};

exports.postDeleteOrder = (req, res, next) => {
  const deleteMode = req.query.delete;
  if (!deleteMode) {
    return res.redirect("/");
  }

  const orderIds = req.body._id.split(",");

  // console.log(req.body._id);
  // console.log(eventIds);

  Order.deleteMany({ _id: orderIds })
    .then((result) => {
      // console.log("Delete complete");
      // res.redirect("/admin/manage/orders");
      Order.find()
        .then((orders) => {
          // res.json(products);
          res.render("admin/admin-orders", {
            pageTitle: "Quản Lý Đơn Hàng",
            path: "/manage/orders",
            orders: orders,
            inform: "Xóa đơn hàng thành công",
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postConfirmOrder = (req, res, next) => {
  const confirmMode = req.query.confirm;

  if (!confirmMode) {
    return res.redirect("/");
  }

  const orderId = req.body._id;

  // console.log(orderId);
  Order.findOne({ _id: orderId })
    .then((order) => {
      if (!order) {
        return res.redirect("/");
      } else {
        // console.log(JSON.stringify(order));
        if (order.cashInfo.isPaid) {
          order.approveStatus = true;
          return order.save().then((result) => {
            // console.log("Confirmed");
            // res.redirect("/admin/manage/orders");
            Order.find()
              .then((orders) => {
                // res.json(products);
                res.render("admin/admin-orders", {
                  pageTitle: "Quản Lý Đơn Hàng",
                  path: "/manage/orders",
                  orders: orders,
                  inform: "Xác nhận đơn hàng thành công",
                });
              })
              .catch((err) => console.log(err));
          });
        } else {
          Order.find()
            .then((orders) => {
              // res.json(products);
              res.render("admin/admin-orders", {
                pageTitle: "Quản Lý Đơn Hàng",
                path: "/manage/orders",
                orders: orders,
                inform:
                  "Đơn hàng chưa được thanh toán\nXác nhận đơn hàng thất bại",
              });
            })
            .catch((err) => console.log(err));
        }
      }
    })
    .catch((err) => console.log(err));
};

exports.postCancelConfirmOrder = (req, res, next) => {
  const cancelConfirmMode = req.query.cancel;

  if (!cancelConfirmMode) {
    return res.redirect("/");
  }

  const orderId = req.body._id;

  console.log(orderId);
  Order.findOne({ _id: orderId })
    .then((order) => {
      if (!order) {
        return res.redirect("/");
      } else {
        // console.log(JSON.stringify(order));
        if (order.cashInfo.isPaid) {
          order.approveStatus = false;
          return order.save().then((result) => {
            // console.log("Cancelled");
            Order.find()
              .then((orders) => {
                // res.json(products);
                res.render("admin/admin-orders", {
                  pageTitle: "Quản Lý Đơn Hàng",
                  path: "/manage/orders",
                  orders: orders,
                  inform: "Hủy xác nhận đơn hàng thành công",
                });
              })
              .catch((err) => console.log(err));
          });
        } else {
          Order.find()
            .then((orders) => {
              // res.json(products);
              res.render("admin/admin-orders", {
                pageTitle: "Quản Lý Đơn Hàng",
                path: "/manage/orders",
                orders: orders,
                inform: "Hủy xác nhận đơn hàng thất bại",
              });
            })
            .catch((err) => console.log(err));
        }
      }
    })
    .catch((err) => console.log(err));
};

exports.postConfirmIsPaidOrder = (req, res, next) => {
  const confirmMode = req.query.confirm;

  if (!confirmMode) {
    return res.redirect("/");
  }

  const orderId = req.body._id;
  // console.log(orderId);
  Order.findOne({ _id: orderId })
    .then((order) => {
      if (!order) {
        return res.redirect("/");
      } else {
        // console.log(JSON.stringify(order));
        if (!order.cashInfo.isPaid) {
          order.cashInfo.isPaid = true;
          return order.save().then((result) => {
            // console.log("Confirmed");
            Order.find()
              .then((orders) => {
                // res.json(products);
                res.render("admin/admin-orders", {
                  pageTitle: "Quản Lý Đơn Hàng",
                  path: "/manage/orders",
                  orders: orders,
                  inform: "Xác thanh toán thành công",
                });
              })
              .catch((err) => console.log(err));
          });
        } else {
          Order.find()
            .then((orders) => {
              // res.json(products);
              res.render("admin/admin-orders", {
                pageTitle: "Quản Lý Đơn Hàng",
                path: "/manage/orders",
                orders: orders,
                inform: "Hủy xác thanh toán thất bại",
              });
            })
            .catch((err) => console.log(err));
        }
      }
    })
    .catch((err) => console.log(err));
};
