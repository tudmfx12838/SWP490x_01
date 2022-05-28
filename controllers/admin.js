const mongoose = require("mongoose");
const Product = require("../models/product");
const User = require("../models/user");
const Event = require("../models/event");
const Order = require("../models/order");
const path = require("path");

const { validationResult } = require("express-validator");

const fileHelper = require("../util/file");

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

exports.getAdminProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      // res.json(products);
      res.render("admin/admin-products", {
        pageTitle: "Quản lý Sản Phẩm",
        path: "/products",
        products: products,
        oldAddProductValue: null,
        addProductValidationErrors: [],
        editProductValidationErrors: [],
        // validationErrors: [],
        // isAuthenticated: req.session.isLoggedIn,
        csrfToken: "", //req.csrfToken() //duoc cung cap boi goi csrfProtection trong middleware app.js
      });
    })
    .catch((err) => console.log(err));
};

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
          csrfToken: "", //req.csrfToken() //duoc cung cap boi goi csrfProtection trong middleware app.js
        });
      })
      .catch((err) => console.log(err));
  } else {
    // console.log("not errors");
    // // return res.redirect("/admin/manage/products");
    // console.log(title);
    // console.log(type);
    // console.log(price);
    // console.log(mount);
    // console.log(description);
    // console.log(req.file);

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
        return res.redirect("/admin/manage/products");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

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
  const updatedImageUrl = req.file;

  // console.log(productId);
  // console.log(updatedTitle);
  // console.log(updatedType);
  // console.log(updatedPrice);
  // console.log(updatedMount);
  // console.log(updatedDescription);
  // console.log(updatedImageUrl);

  Product.findById(productId)
    .then((product) => {
      product.title = updatedTitle;
      product.type = updatedType;
      product.price = updatedPrice;
      product.mount = updatedMount;
      product.description = updatedDescription;

      if (updatedImageUrl) {
        fileHelper.deleteFile(product.imageUrl);
        product.imageUrl = updatedImageUrl.path;
      }

      return product.save().then((result) => {
        console.log("Updated Product");
        res.redirect("/admin/manage/products");
      }); //Ham save nay cua mongoose
    })
    .catch((err) => {
      console.log(err);
      // const error = new Error(err);
      // error.httpStatusCode = 500;
      // return next(error);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const deleteMode = req.query.delete;
  if (!deleteMode) {
    return res.redirect("/");
  }

  const productId = req.body._id.split(",");

  Product.deleteMany({ _id: productId })
    .then((result) => {
      console.log("Delete complete");
      res.redirect("/admin/manage/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAdminEvents = (req, res, next) => {
  Event.find()
    .then((events) => {
      // res.json(products);
      res.render("admin/admin-events", {
        pageTitle: "Quản Lý Sự Kiện",
        path: "/manage/events",
        events: events,
        // errorMessage: message,
        // oldInput: { loginId: "" },
        // validationErrors: [],
        // isAuthenticated: req.session.isLoggedIn,
        csrfToken: "", //req.csrfToken() //duoc cung cap boi goi csrfProtection trong middleware app.js
      });
    })
    .catch((err) => console.log(err));
};

exports.postAddEvent = (req, res, next) => {
  const title = req.body.title;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const hasCoupon = req.body.hasCoupon;
  const coupon = req.body.coupon;
  const description = req.body.description;
  const discount = req.body.discount;
  const image = req.file;

  // console.log(title);
  // console.log(startDate);
  // console.log(endDate);
  // console.log(hasCoupon);
  // console.log(coupon);
  // // console.log(description);
  // console.log(image);
  // console.log(req.file);

  if (!image) {
    return res.redirect("/admin/manage/events");
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
      return res.redirect("/admin/manage/events");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteEvent = (req, res, next) => {
  const deleteMode = req.query.delete;
  if (!deleteMode) {
    return res.redirect("/");
  }

  const eventIds = req.body._id.split(",");

  // console.log(req.body._id);
  // console.log(eventIds);

  Event.deleteMany({ _id: eventIds })
    .then((result) => {
      console.log("Delete complete");
      res.redirect("/admin/manage/events");
    })
    .catch((err) => {
      console.log(err);
    });
};

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

  // console.log(eventId);
  // console.log(updatedTitle);
  // console.log(updatedStartDate);
  //  console.log(updatedEndDate);
  //   console.log(updatedHasCoupon);
  //   console.log(updatedCoupon);
  //   console.log(updatedDiscount);
  // console.log(updatedDescription);
  console.log(updatedImageUrl);

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
        console.log("Updated Event");
        res.redirect("/admin/manage/events");
      }); //Ham save nay cua mongoose
    })
    .catch((err) => {
      console.log(err);
      // const error = new Error(err);
      // error.httpStatusCode = 500;
      // return next(error);
    });
};

exports.getAdminUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      // res.json(products);
      res.render("admin/admin-users", {
        pageTitle: "Quản Lý Người Dùng",
        path: "/manage/users",
        users: users,
        // errorMessage: message,
        // oldInput: { loginId: "" },
        // validationErrors: [],
        // isAuthenticated: req.session.isLoggedIn,
        csrfToken: "", //req.csrfToken() //duoc cung cap boi goi csrfProtection trong middleware app.js
      });
    })
    .catch((err) => console.log(err));
};

exports.postAddUser = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const permission = req.body.permission;
  const name = req.body.name;
  const doB = req.body.doB;
  const phoneNumber = req.body.phoneNumber;
  const address = "〒" + req.body.postcode + " - " + req.body.address;
  const point = req.body.point;
  const image = req.file;

  // console.log(email);
  // console.log(password);
  // console.log(permission);
  // console.log(name);
  // console.log(doB);
  // console.log(phoneNumber);
  // console.log(address);
  // console.log(point);
  // console.log(image);

  var imageUrl = "";
  console.log(req.file);
  if (!image) {
    imageUrl = "images/avatar.jpg";
  } else {
    imageUrl = image.path;
  }

  const user = new User({
    email: email,
    password: password,
    permission: permission,
    name: name,
    doB: doB,
    phoneNumber: phoneNumber,
    address: address,
    point: point,
    imageUrl: imageUrl,
  });

  user
    .save()
    .then((result) => {
      return res.redirect("/admin/manage/users");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteUser = (req, res, next) => {
  const deleteMode = req.query.delete;
  if (!deleteMode) {
    return res.redirect("/");
  }

  const eventIds = req.body._id.split(",");

  // console.log(req.body._id);
  // console.log(eventIds);

  User.deleteMany({ _id: eventIds })
    .then((result) => {
      console.log("Delete complete");
      res.redirect("/admin/manage/users");
    })
    .catch((err) => {
      console.log(err);
    });
};

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
  const updatedName = req.body.name;
  const updatedDoB = req.body.doB;
  const updatedPhoneNumber = req.body.phoneNumber;
  const updatedAddress = "〒" + req.body.postcode + "-" + req.body.address;
  const updatedPoint = req.body.point;
  const updatedImageUrl = req.file;

  // console.log(userId);
  // console.log(updatedEmail);
  // console.log(updatedPassword);
  // console.log(updatedPermission);
  // console.log(updatedName);
  // console.log(updatedDoB);
  // console.log(updatedPhoneNumber);
  // console.log(updatedAddress);
  // console.log(updatedPoint);
  // console.log(updatedImageUrl);

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

      if (updatedImageUrl) {
        // fileHelper.deleteFile(event.imageUrl);
        user.imageUrl = updatedImageUrl.path;
      }

      return user.save().then((result) => {
        console.log("Updated Event");
        res.redirect("/admin/manage/events");
      }); //Ham save nay cua mongoose
    })
    .catch((err) => {
      console.log(err);
      // const error = new Error(err);
      // error.httpStatusCode = 500;
      // return next(error);
    });
};

exports.getAdminOrders = (req, res, next) => {
  Order.find()
    .then((orders) => {
      // res.json(products);
      res.render("admin/admin-orders", {
        pageTitle: "Quản Lý Đơn Hàng",
        path: "/manage/orders",
        orders: orders,
        // errorMessage: message,
        // oldInput: { loginId: "" },
        // validationErrors: [],
        // isAuthenticated: req.session.isLoggedIn,
        csrfToken: "", //req.csrfToken() //duoc cung cap boi goi csrfProtection trong middleware app.js
      });
    })
    .catch((err) => console.log(err));
};