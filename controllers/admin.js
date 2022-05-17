const mongoose = require("mongoose");
const Product = require("../models/product");
const User = require("../models/user");
const Event = require("../models/event");
const Order = require("../models/order");
const path = require("path");

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
        path: "/login",
        products: products,
        // errorMessage: message,
        // oldInput: { loginId: "" },
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

  // console.log('OK111111111111');
  // console.log(JSON.stringify(image));
  // console.log(title);
  // console.log(JSON.stringify(req));
  console.log(req.file);
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

  console.log(updatedImageUrl);
  console.log(req.body.image);

  Product.findById(productId)
    .then((product) => {
      // console.log(product.imageUrl);
      product.title = updatedTitle;
      product.type = updatedType;
      product.price = updatedPrice;
      product.mount = updatedMount;
      product.description = updatedDescription;
      // product.imageUrl = updatedImageUrl;

      // if (image) {
      //   fileHelper.deleteFile(product.imageUrl);
      //   product.imageUrl = image.path;
      // }

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
        path: "/login",
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
